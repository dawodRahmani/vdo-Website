<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminHeroSectionController extends Controller
{
    public function index()
    {
        $sections = HeroSection::orderBy('order')->get()->map(function (HeroSection $s) {
            return [
                'id' => $s->id,
                'page_key' => $s->page_key,
                'page_label' => $s->page_label,
                'background_color' => $s->background_color,
                'photos' => [
                    ['url' => $s->photo1Url(), 'alt' => $s->photo1_alt ?? '', 'path' => $s->photo1_path],
                    ['url' => $s->photo2Url(), 'alt' => $s->photo2_alt ?? '', 'path' => $s->photo2_path],
                    ['url' => $s->photo3Url(), 'alt' => $s->photo3_alt ?? '', 'path' => $s->photo3_path],
                ],
            ];
        });

        return Inertia::render('admin/hero-sections', [
            'sections' => $sections,
        ]);
    }

    public function update(Request $request, HeroSection $section)
    {
        $validated = $request->validate([
            'photo1_alt' => 'nullable|string|max:191',
            'photo2_alt' => 'nullable|string|max:191',
            'photo3_alt' => 'nullable|string|max:191',
            'photo1_file' => 'nullable|image|max:8192',
            'photo2_file' => 'nullable|image|max:8192',
            'photo3_file' => 'nullable|image|max:8192',
            'background_color' => 'nullable|string|max:32',
        ]);

        $data = [
            'photo1_alt' => $validated['photo1_alt'] ?? $section->photo1_alt,
            'photo2_alt' => $validated['photo2_alt'] ?? $section->photo2_alt,
            'photo3_alt' => $validated['photo3_alt'] ?? $section->photo3_alt,
        ];

        if ($request->has('background_color')) {
            $data['background_color'] = $validated['background_color'] ?: null;
        }

        $folder = 'hero/'.$section->page_key;

        foreach ([1, 2, 3] as $i) {
            $field = "photo{$i}_file";
            if ($request->hasFile($field)) {
                $existing = $section->{"photo{$i}_path"};
                if ($existing && Str::startsWith($existing, ['hero/'])) {
                    Storage::disk('public')->delete($existing);
                }
                $data["photo{$i}_path"] = $request->file($field)->store($folder, 'public');
            }
        }

        $section->update($data);

        return back();
    }
}
