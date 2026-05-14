<?php

namespace Database\Seeders;

use App\Models\HeroSection;
use Illuminate\Database\Seeder;

class HeroSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sharedStrategic = [
            ['/Header and Gallary Photos/06.jpg', 'Education programs'],
            ['/Header and Gallary Photos/12.jpg', 'Community development'],
            ['/Header and Gallary Photos/20.jpg', 'Humanitarian response'],
        ];

        $rows = [
            ['about', 'About', [
                ['/Header and Gallary Photos/09.jpg', 'Education programs in local classrooms'],
                ['/Header and Gallary Photos/14.jpg', 'Community engagement in rural areas'],
                ['/Header and Gallary Photos/17.jpg', 'Humanitarian aid distribution'],
            ]],
            ['strategic-priorities', 'Strategic Priorities (hub)', $sharedStrategic],
            ['where-we-work', 'Where We Work', [
                ['/Header and Gallary Photos/04.jpg', 'Community engagement'],
                ['/Header and Gallary Photos/10.jpg', 'Regional programs'],
                ['/Header and Gallary Photos/18.jpg', 'Women-led initiatives'],
            ]],
            ['our-commitment', 'Our Commitment', [
                ['/Header and Gallary Photos/07.jpg', 'Inclusive programs'],
                ['/Header and Gallary Photos/13.jpg', 'Community accountability'],
                ['/Header and Gallary Photos/19.jpg', 'Safeguarding and dignity'],
            ]],
            ['vdo-resilience', 'VDO Resilience', [
                ['/Header and Gallary Photos/08.jpg', 'Organizational capacity'],
                ['/Header and Gallary Photos/15.jpg', 'Team collaboration'],
                ['/Header and Gallary Photos/21.jpg', 'Field operations'],
            ]],
            ['opportunities', 'Opportunities', [
                ['/Header and Gallary Photos/16.jpg', 'Career opportunities'],
                ['/Header and Gallary Photos/22.jpg', 'Volunteers in action'],
                ['/Header and Gallary Photos/24.jpg', 'Community participation'],
            ]],
            ['media', 'Media', [
                ['/Header and Gallary Photos/05.jpg', 'Food distribution'],
                ['/Header and Gallary Photos/11.jpg', 'Community outreach'],
                ['/Header and Gallary Photos/23.jpg', 'Health services'],
            ]],
            ['donate', 'Donate', [
                ['/Header and Gallary Photos/08.jpg', 'Community support'],
                ['/Header and Gallary Photos/15.jpg', 'Aid distribution'],
                ['/Header and Gallary Photos/21.jpg', 'Education programs'],
            ]],
            ['strategic-priorities.education', 'Strategic Priorities · Education', $sharedStrategic],
            ['strategic-priorities.economic-growth', 'Strategic Priorities · Economic Growth', $sharedStrategic],
            ['strategic-priorities.rural-development', 'Strategic Priorities · Rural Development', $sharedStrategic],
            ['strategic-priorities.health-and-nutrition', 'Strategic Priorities · Health & Nutrition', $sharedStrategic],
            ['strategic-priorities.emergency-response', 'Strategic Priorities · Emergency Response', $sharedStrategic],
            ['strategic-priorities.cross-cutting-areas', 'Strategic Priorities · Cross-Cutting Areas', $sharedStrategic],
            ['strategic-priorities.target-group', 'Strategic Priorities · Target Group', $sharedStrategic],
            ['strategic-priorities.secondary-beneficiaries', 'Strategic Priorities · Secondary Beneficiaries', $sharedStrategic],
            ['strategic-priorities.tertiary-audience', 'Strategic Priorities · Tertiary Audience', $sharedStrategic],
            ['strategic-priorities.contribution-project', 'Strategic Priorities · Contribution Project', $sharedStrategic],
        ];

        foreach ($rows as $i => [$key, $label, $photos]) {
            HeroSection::updateOrCreate(
                ['page_key' => $key],
                [
                    'page_label' => $label,
                    'photo1_path' => $photos[0][0],
                    'photo1_alt' => $photos[0][1],
                    'photo2_path' => $photos[1][0],
                    'photo2_alt' => $photos[1][1],
                    'photo3_path' => $photos[2][0],
                    'photo3_alt' => $photos[2][1],
                    'order' => $i,
                ]
            );
        }
    }
}
