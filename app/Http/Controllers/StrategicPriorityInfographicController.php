<?php

namespace App\Http\Controllers;

use App\Models\StrategicPriorityPage;
use App\Services\SvgTextEditor;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class StrategicPriorityInfographicController extends Controller
{
    private const SLOTS = [
        'infographic' => ['path' => 'infographic_path', 'overrides' => 'infographic_text_overrides'],
        'beneficiary' => ['path' => 'beneficiary_path', 'overrides' => 'beneficiary_text_overrides'],
        'extra' => ['path' => 'extra_path', 'overrides' => 'extra_text_overrides'],
    ];

    public function render(string $pageKey, string $slot): SymfonyResponse
    {
        if (! isset(self::SLOTS[$slot])) {
            abort(404);
        }

        $page = StrategicPriorityPage::where('page_key', $pageKey)->first();
        if (! $page) {
            abort(404);
        }

        $slotConfig = self::SLOTS[$slot];
        $path = $page->{$slotConfig['path']};
        if (! $path) {
            abort(404);
        }

        $content = $this->readContent($path);
        if ($content === null) {
            abort(404);
        }

        $isSvg = str_ends_with(strtolower($path), '.svg')
            || str_starts_with(ltrim($content), '<?xml')
            || str_starts_with(ltrim($content), '<svg');

        if (! $isSvg) {
            return new Response($content, 200, [
                'Content-Type' => $this->guessMime($path),
                'Cache-Control' => 'public, max-age=300',
            ]);
        }

        $overrides = $page->{$slotConfig['overrides']} ?? [];
        $rendered = SvgTextEditor::render(
            $content,
            is_array($overrides) ? $overrides : [],
            SvgTextEditor::DEFAULT_FONT_FAMILY,
            SvgTextEditor::DEFAULT_FILL,
        );

        return new Response($rendered, 200, [
            'Content-Type' => 'image/svg+xml; charset=utf-8',
            'Cache-Control' => 'public, max-age=300',
        ]);
    }

    private function readContent(string $path): ?string
    {
        // Absolute http(s) URLs aren't served by us — caller shouldn't reach here.
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return null;
        }

        // /-prefixed paths refer to the public folder (default SVGs shipped with the site).
        if (str_starts_with($path, '/')) {
            $full = public_path(ltrim($path, '/'));

            return is_file($full) ? (string) file_get_contents($full) : null;
        }

        // Otherwise: stored on the public disk.
        return Storage::disk('public')->exists($path)
            ? Storage::disk('public')->get($path)
            : null;
    }

    private function guessMime(string $path): string
    {
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        return match ($ext) {
            'png' => 'image/png',
            'jpg', 'jpeg' => 'image/jpeg',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
            default => 'application/octet-stream',
        };
    }
}
