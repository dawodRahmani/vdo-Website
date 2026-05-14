<?php

namespace Database\Seeders;

use App\Models\NewsPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Strengthening Food Security Through Food Distribution Program',
                'category' => 'Food Security',
                'image_path' => '/Header and Gallary Photos/05.jpg',
                'body' => null,
                'published_at' => '2026-04-12',
            ],
            [
                'title' => 'Integrated Health Service Program for Improved Community Wellbeing',
                'category' => 'Health',
                'image_path' => '/Header and Gallary Photos/11.jpg',
                'body' => null,
                'published_at' => '2026-04-05',
            ],
        ];

        foreach ($posts as $p) {
            NewsPost::updateOrCreate(
                ['title' => $p['title']],
                array_merge($p, [
                    'slug' => Str::slug($p['title']),
                    'is_published' => true,
                ])
            );
        }
    }
}
