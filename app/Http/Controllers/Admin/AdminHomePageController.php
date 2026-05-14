<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Models\HomeCommitment;
use App\Models\HomeImpactStat;
use App\Models\HomePriorityArea;
use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminHomePageController extends Controller
{
    public function index()
    {
        $hero = HeroSection::firstOrCreate(
            ['page_key' => 'home'],
            [
                'page_label' => 'Home',
                'photo1_path' => '/Header and Gallary Photos/01.jpg',
                'photo1_alt' => '',
                'photo2_path' => '/Header and Gallary Photos/02.jpg',
                'photo2_alt' => '',
                'photo3_path' => '/Header and Gallary Photos/03.jpg',
                'photo3_alt' => '',
                'order' => -1,
            ]
        );

        $settings = HomeSetting::current();

        return Inertia::render('admin/home-page', [
            'hero' => [
                'id' => $hero->id,
                'photos' => [
                    ['url' => $hero->photo1Url(), 'alt' => $hero->photo1_alt ?? ''],
                    ['url' => $hero->photo2Url(), 'alt' => $hero->photo2_alt ?? ''],
                    ['url' => $hero->photo3Url(), 'alt' => $hero->photo3_alt ?? ''],
                ],
            ],
            'stats' => HomeImpactStat::ordered()->get(),
            'priorities' => HomePriorityArea::ordered()->get(),
            'commitments' => HomeCommitment::ordered()->get(),
            'regions' => [
                'image_url' => $settings->regions_image_url,
                'alt' => $settings->regions_image_alt ?? '',
            ],
        ]);
    }

    public function updateRegions(Request $request)
    {
        $validated = $request->validate([
            'regions_image_alt' => 'nullable|string|max:500',
            'regions_image_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:8192',
        ]);

        $settings = HomeSetting::current();
        $data = [
            'regions_image_alt' => $validated['regions_image_alt'] ?? $settings->regions_image_alt,
        ];

        if ($request->hasFile('regions_image_file')) {
            if ($settings->regions_image_path && Str::startsWith($settings->regions_image_path, ['home/'])) {
                Storage::disk('public')->delete($settings->regions_image_path);
            }
            $data['regions_image_path'] = $request->file('regions_image_file')->store('home/misc', 'public');
        }

        $settings->update($data);

        return back();
    }

    public function updateHero(Request $request, HeroSection $section)
    {
        abort_unless($section->page_key === 'home', 404);

        $validated = $request->validate([
            'photo1_alt' => 'nullable|string|max:191',
            'photo2_alt' => 'nullable|string|max:191',
            'photo3_alt' => 'nullable|string|max:191',
            'photo1_file' => 'nullable|image|max:8192',
            'photo2_file' => 'nullable|image|max:8192',
            'photo3_file' => 'nullable|image|max:8192',
        ]);

        $data = [
            'photo1_alt' => $validated['photo1_alt'] ?? $section->photo1_alt,
            'photo2_alt' => $validated['photo2_alt'] ?? $section->photo2_alt,
            'photo3_alt' => $validated['photo3_alt'] ?? $section->photo3_alt,
        ];

        $folder = 'hero/home';
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

    public function updateStat(Request $request, HomeImpactStat $stat)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:191',
            'svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
        ]);

        $data = ['label' => $validated['label']];

        if ($request->hasFile('svg_file')) {
            if ($stat->svg_path && Str::startsWith($stat->svg_path, ['home/'])) {
                Storage::disk('public')->delete($stat->svg_path);
            }
            $data['svg_path'] = $request->file('svg_file')->store('home/stats', 'public');
        }

        $stat->update($data);

        return back();
    }

    public function updatePriority(Request $request, HomePriorityArea $priority)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'href' => 'required|string|max:255',
            'svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
        ]);

        $data = [
            'title' => $validated['title'],
            'href' => $validated['href'],
        ];

        if ($request->hasFile('svg_file')) {
            if ($priority->svg_path && Str::startsWith($priority->svg_path, ['home/'])) {
                Storage::disk('public')->delete($priority->svg_path);
            }
            $data['svg_path'] = $request->file('svg_file')->store('home/priorities', 'public');
        }

        $priority->update($data);

        return back();
    }

    public function updateCommitment(Request $request, HomeCommitment $commitment)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
        ]);

        $data = ['title' => $validated['title']];

        if ($request->hasFile('svg_file')) {
            if ($commitment->svg_path && Str::startsWith($commitment->svg_path, ['home/'])) {
                Storage::disk('public')->delete($commitment->svg_path);
            }
            $data['svg_path'] = $request->file('svg_file')->store('home/commitments', 'public');
        }

        $commitment->update($data);

        return back();
    }
}
