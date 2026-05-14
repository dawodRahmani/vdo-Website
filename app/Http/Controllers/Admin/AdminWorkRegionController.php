<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorkRegion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminWorkRegionController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/work-regions', [
            'regions' => WorkRegion::ordered()->get()->map(fn ($r) => [
                'id' => $r->id,
                'slug' => $r->slug,
                'title' => $r->title,
                'subtitle' => $r->subtitle,
                'body' => $r->body,
                'map_svg_path' => $r->map_svg_path,
                'map_svg_url' => $r->map_svg_url,
                'video_url' => $r->video_url,
                'map_on_right' => $r->map_on_right,
                'order' => $r->order,
                'is_active' => $r->is_active,
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request, slugRequired: true);

        if ($request->hasFile('map_svg_file')) {
            $data['map_svg_path'] = $request->file('map_svg_file')->store('work-regions', 'public');
        }

        WorkRegion::create($data);

        return back();
    }

    public function update(Request $request, WorkRegion $region)
    {
        $data = $this->validated($request, slugRequired: false);

        if ($request->hasFile('map_svg_file')) {
            if ($region->map_svg_path && Str::startsWith($region->map_svg_path, 'work-regions/')) {
                Storage::disk('public')->delete($region->map_svg_path);
            }
            $data['map_svg_path'] = $request->file('map_svg_file')->store('work-regions', 'public');
        } elseif ($request->boolean('clear_map_svg')) {
            if ($region->map_svg_path && Str::startsWith($region->map_svg_path, 'work-regions/')) {
                Storage::disk('public')->delete($region->map_svg_path);
            }
            $data['map_svg_path'] = null;
        }

        $region->update($data);

        return back();
    }

    public function destroy(WorkRegion $region)
    {
        if ($region->map_svg_path && Str::startsWith($region->map_svg_path, 'work-regions/')) {
            Storage::disk('public')->delete($region->map_svg_path);
        }
        $region->delete();

        return back();
    }

    private function validated(Request $request, bool $slugRequired): array
    {
        $rules = [
            'title' => 'required|string|max:191',
            'subtitle' => 'nullable|string|max:191',
            'body' => 'required|string|max:8000',
            'video_url' => 'nullable|url|max:500',
            'map_on_right' => 'required|boolean',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'map_svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
            'clear_map_svg' => 'nullable|boolean',
        ];

        if ($slugRequired) {
            $rules['slug'] = 'required|string|max:120|unique:work_regions,slug';
        }

        $data = $request->validate($rules);

        $payload = [
            'title' => $data['title'],
            'subtitle' => $data['subtitle'] ?? null,
            'body' => $data['body'],
            'video_url' => $data['video_url'] ?? null,
            'map_on_right' => $request->boolean('map_on_right'),
            'order' => (int) $data['order'],
            'is_active' => $request->boolean('is_active'),
        ];

        if ($slugRequired) {
            $payload['slug'] = $data['slug'];
        }

        return $payload;
    }
}
