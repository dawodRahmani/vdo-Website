<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Brand palette: rgb(0,175,239) cyan, rgb(62,64,149) indigo, rgb(189,191,193) gray
        $regions = [
            [
                'name' => 'North Eastern Region',
                'slug' => 'north-eastern',
                'description' => 'The North Eastern region encompasses Badakhshan, known for its mountainous terrain, rich cultural heritage, and stunning natural beauty.',
                'color' => 'rgb(0,175,239)',
                'svg_path' => '',
                'order' => 1,
            ],
            [
                'name' => 'Northern Region',
                'slug' => 'northern',
                'description' => 'The Northern region includes Balkh, Kunduz, Takhar, Samangan, and Sar-e Pol provinces, serving as a vital agricultural and economic zone.',
                'color' => 'rgb(62,64,149)',
                'svg_path' => '',
                'order' => 2,
            ],
            [
                'name' => 'Western Region',
                'slug' => 'western',
                'description' => 'The Western region, including Herat, Badghis, Ghor, Faryab, and Jawzjan, is known for its historical significance and cultural richness.',
                'color' => 'rgb(0,175,239)',
                'svg_path' => '',
                'order' => 3,
            ],
            [
                'name' => 'Central Region',
                'slug' => 'central',
                'description' => 'The Central region, home to Kabul, Kapisa, Parwan, Panjshir, Wardak, and Logar, is the political and administrative heart of Afghanistan.',
                'color' => 'rgb(62,64,149)',
                'svg_path' => '',
                'order' => 4,
            ],
            [
                'name' => 'Eastern Region',
                'slug' => 'eastern',
                'description' => 'The Eastern region includes Nangarhar, Kunar, Laghman, and Nuristan provinces, characterized by diverse communities and mountainous landscapes.',
                'color' => 'rgb(62,64,149)',
                'svg_path' => '',
                'order' => 5,
            ],
            [
                'name' => 'Central Highland Region',
                'slug' => 'central-highland',
                'description' => 'The Central Highland, including Bamyan and Daikundi, features stunning mountain landscapes, ancient cultural sites, and rich historical heritage.',
                'color' => 'rgb(0,175,239)',
                'svg_path' => '',
                'order' => 6,
            ],
            [
                'name' => 'South Eastern Region',
                'slug' => 'south-eastern',
                'description' => 'The South Eastern region includes Paktia, Paktika, Khost, and Ghazni provinces, known for their strategic importance and tribal communities.',
                'color' => 'rgb(0,175,239)',
                'svg_path' => '',
                'order' => 7,
            ],
            [
                'name' => 'Southern Region',
                'slug' => 'southern',
                'description' => 'The Southern region, including Kandahar, Helmand, Nimroz, Zabul, Uruzgan, and Farah, is vital for agriculture and has significant historical importance.',
                'color' => 'rgb(62,64,149)',
                'svg_path' => '',
                'order' => 8,
            ],
        ];

        foreach ($regions as $region) {
            Region::updateOrCreate(
                ['slug' => $region['slug']],
                array_merge($region, ['is_active' => true])
            );
        }
    }
}
