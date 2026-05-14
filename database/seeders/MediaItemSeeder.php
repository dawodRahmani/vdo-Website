<?php

namespace Database\Seeders;

use App\Models\MediaItem;
use Illuminate\Database\Seeder;

class MediaItemSeeder extends Seeder
{
    public function run(): void
    {
        $documentaries = [
            'Integrated Health Service Program for Improved Community Well-...',
            'Strengthening Food Security Through Food Distribution Pro...',
            'Empowering Rural Women Through Vocational Training Initiat...',
            'Clean Water Access for Remote Villages in Northern Afghan...',
            'Education for All: Building Schools in Underserved Comm...',
            'Emergency Response and Disaster Relief Operations Doc...',
        ];

        foreach ($documentaries as $i => $title) {
            MediaItem::updateOrCreate(
                [
                    'kind' => MediaItem::KIND_DOCUMENTARY,
                    'title' => $title,
                ],
                [
                    'kind' => MediaItem::KIND_DOCUMENTARY,
                    'title' => $title,
                    'image' => null,
                    'video_url' => null,
                    'order' => $i + 1,
                    'is_active' => true,
                ],
            );
        }

        for ($i = 1; $i <= 12; $i++) {
            $path = "/Header and Gallary Photos/G{$i}.jpg";
            MediaItem::updateOrCreate(
                [
                    'kind' => MediaItem::KIND_PHOTO,
                    'image' => $path,
                ],
                [
                    'kind' => MediaItem::KIND_PHOTO,
                    'title' => null,
                    'image' => $path,
                    'order' => $i,
                    'is_active' => true,
                ],
            );
        }

        $publications = [
            ['title' => 'Project Final Report', 'cover' => '/Header and Gallary Photos/P1.jpg'],
            ['title' => 'Guide Book', 'cover' => '/Header and Gallary Photos/P2.jpg'],
            ['title' => 'Project Conclusion Report', 'cover' => '/Header and Gallary Photos/P3.jpg'],
            ['title' => 'Annual Booklet 2023', 'cover' => '/Header and Gallary Photos/P4.jpg'],
            ['title' => 'Health Program Report', 'cover' => '/Header and Gallary Photos/P1.jpg'],
            ['title' => 'Education Impact Study', 'cover' => '/Header and Gallary Photos/P2.jpg'],
            ['title' => 'Annual Booklet 2022', 'cover' => '/Header and Gallary Photos/P3.jpg'],
            ['title' => 'Field Operations Brief', 'cover' => '/Header and Gallary Photos/P4.jpg'],
            ['title' => 'Annual Booklet 2021', 'cover' => '/Header and Gallary Photos/P1.jpg'],
            ['title' => 'Community Outreach Report', 'cover' => '/Header and Gallary Photos/P2.jpg'],
        ];

        foreach ($publications as $i => $pub) {
            MediaItem::updateOrCreate(
                [
                    'kind' => MediaItem::KIND_PUBLICATION,
                    'title' => $pub['title'],
                ],
                [
                    'kind' => MediaItem::KIND_PUBLICATION,
                    'title' => $pub['title'],
                    'image' => $pub['cover'],
                    'order' => $i + 1,
                    'is_active' => true,
                ],
            );
        }
    }
}
