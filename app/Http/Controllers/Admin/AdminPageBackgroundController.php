<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageBackground;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPageBackgroundController extends Controller
{
    public function index()
    {
        $configured = PageBackground::configuredPages();

        // Make sure every configured page has a row so the admin sees them all.
        foreach ($configured as $key => $label) {
            PageBackground::firstOrCreate(
                ['page_key' => $key],
                ['label' => $label, 'background_color' => PageBackground::DEFAULT_COLOR],
            );
        }

        $rows = PageBackground::orderByRaw('CASE page_key '
            . collect(array_keys($configured))
                ->map(fn ($k, $i) => "WHEN " . "'" . str_replace("'", "''", $k) . "' THEN {$i}")
                ->implode(' ')
            . ' ELSE 999 END')
            ->get();

        return Inertia::render('admin/page-backgrounds', [
            'pages' => $rows->map(fn ($r) => [
                'id' => $r->id,
                'page_key' => $r->page_key,
                'label' => $r->label ?: ($configured[$r->page_key] ?? $r->page_key),
                'background_color' => $r->background_color,
            ]),
            'default_color' => PageBackground::DEFAULT_COLOR,
        ]);
    }

    public function update(Request $request, PageBackground $page)
    {
        $data = $request->validate([
            'background_color' => 'required|string|max:32',
        ]);

        $page->update($data);

        return back();
    }
}
