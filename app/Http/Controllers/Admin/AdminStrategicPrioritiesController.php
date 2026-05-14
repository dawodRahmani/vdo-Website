<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StrategicPriorityBullet;
use App\Models\StrategicPriorityCard;
use App\Models\StrategicPriorityPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminStrategicPrioritiesController extends Controller
{
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
                'infographic_url' => $page->infographic_url,
                'infographic_alt' => $page->infographic_alt,
                'achievements_heading' => $page->achievements_heading,
                'beneficiary_url' => $page->beneficiary_url,
                'beneficiary_alt' => $page->beneficiary_alt,
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
            'infographic_alt' => 'nullable|string|max:500',
            'achievements_heading' => 'nullable|string|max:191',
            'beneficiary_alt' => 'nullable|string|max:500',
            'infographic_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:8192',
            'beneficiary_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:8192',
        ]);

        $data = [
            'heading' => $validated['heading'] ?? null,
            'body' => $validated['body'] ?? null,
            'between_body' => $validated['between_body'] ?? null,
            'infographic_alt' => $validated['infographic_alt'] ?? null,
            'achievements_heading' => $validated['achievements_heading'] ?? null,
            'beneficiary_alt' => $validated['beneficiary_alt'] ?? null,
        ];

        $folder = 'strategic-priorities/'.$pageKey;
        if ($request->hasFile('infographic_file')) {
            if ($page->infographic_path && Str::startsWith($page->infographic_path, ['strategic-priorities/'])) {
                Storage::disk('public')->delete($page->infographic_path);
            }
            $data['infographic_path'] = $request->file('infographic_file')->store($folder, 'public');
        }
        if ($request->hasFile('beneficiary_file')) {
            if ($page->beneficiary_path && Str::startsWith($page->beneficiary_path, ['strategic-priorities/'])) {
                Storage::disk('public')->delete($page->beneficiary_path);
            }
            $data['beneficiary_path'] = $request->file('beneficiary_file')->store($folder, 'public');
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
}
