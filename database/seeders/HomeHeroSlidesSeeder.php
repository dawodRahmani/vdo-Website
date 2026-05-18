<?php

namespace Database\Seeders;

use App\Models\HeroSection;
use App\Models\HomeHeroSlide;
use Illuminate\Database\Seeder;

class HomeHeroSlidesSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeHeroSlide::count() > 0) {
            return;
        }

        $existing = HeroSection::where('page_key', 'home')->first();

        HomeHeroSlide::create([
            'photo1_path' => $existing?->photo1_path ?? '/Header and Gallary Photos/01.jpg',
            'photo1_alt' => $existing?->photo1_alt ?? 'Health and nutrition program',
            'photo2_path' => $existing?->photo2_path ?? '/Header and Gallary Photos/02.jpg',
            'photo2_alt' => $existing?->photo2_alt ?? 'Agriculture and livelihoods',
            'photo3_path' => $existing?->photo3_path ?? '/Header and Gallary Photos/03.jpg',
            'photo3_alt' => $existing?->photo3_alt ?? 'Education for all',
            'order' => 1,
            'is_active' => true,
        ]);
    }
}
