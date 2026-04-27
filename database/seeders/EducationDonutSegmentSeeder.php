<?php

namespace Database\Seeders;

use App\Models\EducationDonutSegment;
use Illuminate\Database\Seeder;

class EducationDonutSegmentSeeder extends Seeder
{
    public function run(): void
    {
        $segments = [
            ['label' => 'Girls', 'percent' => 30, 'color' => 'rgb(62,64,149)', 'order' => 1],
            ['label' => 'Adolescents', 'percent' => 25, 'color' => 'rgb(0,175,239)', 'order' => 2],
            ['label' => 'Out-of-school Children', 'percent' => 20, 'color' => '#7AC4E8', 'order' => 3],
            ['label' => 'Children with Disabilities', 'percent' => 10, 'color' => '#a8dcf0', 'order' => 4],
            ['label' => 'Youth without Education', 'percent' => 15, 'color' => '#cdeaf7', 'order' => 5],
        ];

        foreach ($segments as $segment) {
            EducationDonutSegment::updateOrCreate(
                ['label' => $segment['label']],
                array_merge($segment, ['is_active' => true])
            );
        }
    }
}
