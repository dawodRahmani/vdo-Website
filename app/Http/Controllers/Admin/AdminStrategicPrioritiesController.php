<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StrategicPriorityBullet;
use App\Models\StrategicPriorityCard;
use App\Models\StrategicPriorityPage;
use App\Services\SvgTextEditor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminStrategicPrioritiesController extends Controller
{
    private const SLOTS = ['infographic', 'beneficiary', 'extra'];

    public function index()
    {
        return Inertia::render('admin/strategic-priorities/index', [
            'pages' => StrategicPriorityPage::orderBy('order')->get(['id', 'page_key', 'page_label', 'heading']),
        ]);
    }

    public function editHub()
    {
        return Inertia::render('admin/strategic-priorities/hub', [
            'cards' => StrategicPriorityCard::ordered()->get(),
        ]);
    }

    public function updateCard(Request $request, StrategicPriorityCard $card)
    {
        $card->update($request->validate([
            'title' => 'required|string|max:191',
            'href' => 'required|string|max:255',
            'icon_name' => 'nullable|string|max:64',
            'description' => 'nullable|string|max:1000',
        ]));

        return back();
    }

    public function editPage(string $pageKey)
    {
        $page = StrategicPriorityPage::where('page_key', $pageKey)->firstOrFail();

        return Inertia::render('admin/strategic-priorities/page', [
            'page' => [
                'id' => $page->id,
                'page_key' => $page->page_key,
                'page_label' => $page->page_label,
                'heading' => $page->heading,
                'body' => $page->body,
                'between_body' => $page->between_body,
                'achievements_heading' => $page->achievements_heading,
                'infographics' => [
                    'infographic' => $this->slotPayload($page, 'infographic'),
                    'beneficiary' => $this->slotPayload($page, 'beneficiary'),
                    'extra' => $this->slotPayload($page, 'extra'),
                ],
            ],
            'bullets' => StrategicPriorityBullet::where('page_key', $pageKey)->orderBy('order')->get(),
        ]);
    }

    public function updatePage(Request $request, string $pageKey)
    {
        $page = StrategicPriorityPage::where('page_key', $pageKey)->firstOrFail();

        $validated = $request->validate([
            'heading' => 'nullable|string|max:191',
            'body' => 'nullable|string|max:20000',
            'between_body' => 'nullable|string|max:10000',
            'achievements_heading' => 'nullable|string|max:191',

            'infographic_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:8192',
            'infographic_alt' => 'nullable|string|max:500',
            'infographic_scale' => 'nullable|integer|min:25|max:400',
            'infographic_offset_x' => 'nullable|integer|min:-500|max:500',
            'infographic_offset_y' => 'nullable|integer|min:-500|max:500',
            'infographic_text_overrides' => 'nullable|array',
            'infographic_text_overrides.*' => 'nullable|string|max:1000',

            'beneficiary_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:8192',
            'beneficiary_alt' => 'nullable|string|max:500',
            'beneficiary_scale' => 'nullable|integer|min:25|max:400',
            'beneficiary_offset_x' => 'nullable|integer|min:-500|max:500',
            'beneficiary_offset_y' => 'nullable|integer|min:-500|max:500',
            'beneficiary_text_overrides' => 'nullable|array',
            'beneficiary_text_overrides.*' => 'nullable|string|max:1000',

            'extra_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:8192',
            'extra_alt' => 'nullable|string|max:500',
            'extra_scale' => 'nullable|integer|min:25|max:400',
            'extra_offset_x' => 'nullable|integer|min:-500|max:500',
            'extra_offset_y' => 'nullable|integer|min:-500|max:500',
            'extra_text_overrides' => 'nullable|array',
            'extra_text_overrides.*' => 'nullable|string|max:1000',

            'clear_extra' => 'nullable|boolean',
        ]);

        $data = [
            'heading' => $validated['heading'] ?? null,
            'body' => $validated['body'] ?? null,
            'between_body' => $validated['between_body'] ?? null,
            'achievements_heading' => $validated['achievements_heading'] ?? null,
        ];

        foreach (self::SLOTS as $slot) {
            $this->applySlot($request, $page, $data, $pageKey, $slot);
        }

        if ($request->boolean('clear_extra')) {
            $this->deleteIfStored($page->extra_path);
            $data['extra_path'] = null;
            $data['extra_text_overrides'] = null;
        }

        $page->update($data);

        return back();
    }

    public function storeBullet(Request $request, string $pageKey)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $maxOrder = StrategicPriorityBullet::where('page_key', $pageKey)->max('order') ?? -1;

        StrategicPriorityBullet::create([
            'page_key' => $pageKey,
            'content' => $validated['content'],
            'order' => $maxOrder + 1,
        ]);

        return back();
    }

    public function updateBullet(Request $request, StrategicPriorityBullet $bullet)
    {
        $bullet->update($request->validate([
            'content' => 'required|string|max:2000',
            'order' => 'nullable|integer|min:0',
        ]));

        return back();
    }

    public function destroyBullet(StrategicPriorityBullet $bullet)
    {
        $bullet->delete();

        return back();
    }

    /**
     * Build the admin payload for one infographic slot, including the list of
     * `<text>` element default contents so the admin can see what's editable.
     */
    private function slotPayload(StrategicPriorityPage $page, string $slot): array
    {
        $pathField = $slot.'_path';
        $altField = $slot.'_alt';
        $scaleField = $slot.'_scale';
        $offsetXField = $slot.'_offset_x';
        $offsetYField = $slot.'_offset_y';
        $overridesField = $slot.'_text_overrides';

        // Existing slots use a custom URL accessor; "extra" uses the new one.
        $url = match ($slot) {
            'infographic' => $page->infographic_url,
            'beneficiary' => $page->beneficiary_url,
            'extra' => $page->extra_url,
        };

        $path = $page->{$pathField};
        $textLabels = [];
        if ($path) {
            $content = $this->readFileContent($path);
            if ($content !== null) {
                $textLabels = SvgTextEditor::extractTexts($content);
            }
        }

        return [
            'path' => $path,
            'url' => $url,
            'render_url' => $path
                ? route('strategic-priorities.infographic.render', [
                    'pageKey' => $page->page_key,
                    'slot' => $slot,
                ]).'?v='.optional($page->updated_at)->timestamp
                : '',
            'alt' => $page->{$altField},
            'scale' => (int) ($page->{$scaleField} ?? 100),
            'offset_x' => (int) ($page->{$offsetXField} ?? 0),
            'offset_y' => (int) ($page->{$offsetYField} ?? 0),
            'text_labels' => $textLabels,
            'text_overrides' => $page->{$overridesField} ?? [],
        ];
    }

    private function applySlot(Request $request, StrategicPriorityPage $page, array &$data, string $pageKey, string $slot): void
    {
        $fileKey = $slot.'_file';
        $altKey = $slot.'_alt';
        $scaleKey = $slot.'_scale';
        $offsetXKey = $slot.'_offset_x';
        $offsetYKey = $slot.'_offset_y';
        $overridesKey = $slot.'_text_overrides';

        $data[$altKey] = $request->input($altKey);
        $data[$scaleKey] = (int) $request->input($scaleKey, 100);
        $data[$offsetXKey] = (int) $request->input($offsetXKey, 0);
        $data[$offsetYKey] = (int) $request->input($offsetYKey, 0);

        if ($request->hasFile($fileKey)) {
            $this->deleteIfStored($page->{$slot.'_path'});
            $folder = 'strategic-priorities/'.$pageKey;
            $data[$slot.'_path'] = $request->file($fileKey)->store($folder, 'public');
            // A new file replaces the canvas — discard old text overrides since
            // they're indexed by the old SVG's <text> ordering.
            $data[$overridesKey] = null;

            return;
        }

        if ($request->has($overridesKey)) {
            $overrides = $request->input($overridesKey) ?? [];
            $clean = [];
            foreach ($overrides as $i => $value) {
                $clean[(int) $i] = is_string($value) ? $value : '';
            }
            $data[$overridesKey] = empty($clean) ? null : $clean;
        }
    }

    private function deleteIfStored(?string $path): void
    {
        if ($path && Str::startsWith($path, 'strategic-priorities/')) {
            Storage::disk('public')->delete($path);
        }
    }

    private function readFileContent(string $path): ?string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return null;
        }
        if (str_starts_with($path, '/')) {
            $full = public_path(ltrim($path, '/'));

            return is_file($full) ? (string) file_get_contents($full) : null;
        }

        return Storage::disk('public')->exists($path)
            ? Storage::disk('public')->get($path)
            : null;
    }
}
