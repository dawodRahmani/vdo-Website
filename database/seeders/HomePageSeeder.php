<?php

namespace Database\Seeders;

use App\Models\HeroSection;
use App\Models\HomeCommitment;
use App\Models\HomeImpactStat;
use App\Models\HomePriorityArea;
use Illuminate\Database\Seeder;

class HomePageSeeder extends Seeder
{
    public function run(): void
    {
        HeroSection::updateOrCreate(
            ['page_key' => 'home'],
            [
                'page_label' => 'Home',
                'photo1_path' => '/Header and Gallary Photos/01.jpg',
                'photo1_alt' => 'Health and nutrition program',
                'photo2_path' => '/Header and Gallary Photos/02.jpg',
                'photo2_alt' => 'Agriculture and livelihoods',
                'photo3_path' => '/Header and Gallary Photos/03.jpg',
                'photo3_alt' => 'Education for all',
                'order' => -1,
            ]
        );

        $stats = [
            ['Regions', '/Home Page/01.svg'],
            ['Lives Impact', '/Home Page/02.svg'],
            ['Implemented Projects', '/Home Page/03.svg'],
            ['Active Projects', '/Home Page/04.svg'],
            ['Years of Service', '/Home Page/05.svg'],
        ];
        foreach ($stats as $i => [$label, $svg]) {
            HomeImpactStat::updateOrCreate(
                ['label' => $label],
                ['svg_path' => $svg, 'order' => $i]
            );
        }

        $priorities = [
            ['Education — 610,000 Community Members', '/Home Page/06.svg', '/strategic-priorities/education'],
            ['Economic Growth — 760 Family & Businesses', '/Home Page/07.svg', '/strategic-priorities/economic-growth'],
            ['Rural Development — 32,100', '/Home Page/08.svg', '/strategic-priorities/rural-development'],
            ['Health and Nutrition — 960,515 Individuals', '/Home Page/09.svg', '/strategic-priorities/health-and-nutrition'],
            ['Emergency Response — 418,400 Individuals', '/Home Page/10.svg', '/strategic-priorities/emergency-response'],
        ];
        foreach ($priorities as $i => [$title, $svg, $href]) {
            HomePriorityArea::updateOrCreate(
                ['order' => $i],
                ['title' => $title, 'svg_path' => $svg, 'href' => $href]
            );
        }

        $commitments = [
            ['Gender Equality & Women Empowerment', '/Home Page/H1.svg'],
            ['Safeguarding, PSEAH & Child Protection', '/Home Page/H2.svg'],
            ['Accountability to Affected People', '/Home Page/H3.svg'],
            ['Do No Harm & Conflict Sensitivity', '/Home Page/H4.svg'],
            ['Protection Mainstreaming', '/Home Page/H5.svg'],
            ['Inclusion of Person with Disabilities', '/Home Page/H6.svg'],
            ['Environmental Sustainability & Climate Sensitivity', '/Home Page/H7.svg'],
            ['Localization & Community Ownership', '/Home Page/H8.svg'],
            ['Data Protection & Ethical Information Management', '/Home Page/H9.svg'],
            ['Anti-Fraud, Anti-Corruption & Aid Diversion Protection', '/Home Page/H10.svg'],
            ['MEAL & Evidence-Based Programming', '/Home Page/H11.svg'],
            ['Equity, Diversity & Inclusion (EDI)', '/Home Page/H12.svg'],
        ];
        foreach ($commitments as $i => [$title, $svg]) {
            HomeCommitment::updateOrCreate(
                ['order' => $i],
                ['title' => $title, 'svg_path' => $svg]
            );
        }
    }
}
