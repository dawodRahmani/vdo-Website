<?php

namespace Database\Seeders;

use App\Models\OpportunityCategory;
use App\Models\OpportunityListing;
use Illuminate\Database\Seeder;

class OpportunitiesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'jobs',
                'title' => 'Jobs',
                'icon_path' => '/svg/Opportunities/01.svg',
                'body' => 'VDO offers meaningful career opportunities for individuals who are passionate about making a difference. This section provides information on current vacancies, including roles across program management, technical support, and operational functions. We encourage qualified candidates to apply and join us in delivering sustainable impact and empowering communities.',
                'order' => 1,
            ],
            [
                'slug' => 'bids',
                'title' => 'Bids',
                'icon_path' => '/svg/Opportunities/02.svg',
                'body' => 'VDO is committed to transparent and competitive procurement processes that ensure fairness, accountability, and value for money. The organization regularly invites qualified suppliers, service providers, and contractors to participate in bidding opportunities for goods, services, and project implementation. All bids are evaluated based on clear criteria, and VDO adheres to strict ethical and procurement standards to maintain integrity throughout the process. By fostering an open and competitive environment, VDO ensures that its projects are supported by reliable partners, delivering quality outcomes for the communities it serves.',
                'order' => 2,
            ],
            [
                'slug' => 'volunteer',
                'title' => 'Volunteer',
                'icon_path' => '/svg/Opportunities/03.svg',
                'body' => 'VDO welcomes passionate individuals who want to make a difference through volunteer work. By joining our team as a volunteer, you can contribute your time, skills, and energy to support our programs and help empower communities. Volunteering with VDO is a meaningful way to create positive change while gaining valuable experience and connecting with like-minded people.',
                'order' => 3,
            ],
            [
                'slug' => 'participation',
                'title' => 'Participation',
                'icon_path' => '/svg/Opportunities/04.svg',
                'body' => "This section provides opportunities to engage in workshops, awareness campaigns, and community programs, allowing individuals to contribute their ideas, skills, and energy. By participating, you can play a direct role in creating positive change and supporting VDO's mission to empower communities.",
                'order' => 4,
            ],
        ];

        foreach ($categories as $cat) {
            OpportunityCategory::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        $catBySlug = OpportunityCategory::pluck('id', 'slug');

        $listings = [
            [
                'slug' => 'jobs',
                'title' => 'Programs Coordinator',
                'ref' => 'VDO-HR-2026-014',
                'summary' => 'Lead day-to-day coordination of education and protection programs across central provinces, working closely with field teams and partners.',
                'location' => 'Kabul, Afghanistan',
                'deadline' => 'Closes 15 May 2026',
                'order' => 1,
            ],
            [
                'slug' => 'jobs',
                'title' => 'Health & Nutrition Officer',
                'ref' => 'VDO-HR-2026-018',
                'summary' => 'Implement community health and nutrition activities, including outreach, MUAC screening, and awareness sessions in Herat province.',
                'location' => 'Herat, Afghanistan',
                'deadline' => 'Closes 22 May 2026',
                'order' => 2,
            ],
            [
                'slug' => 'bids',
                'title' => 'Office Supplies & Stationery (Annual Framework)',
                'ref' => 'VDO-PROC-2026-021',
                'summary' => 'Open invitation to qualified suppliers for an annual framework agreement covering office supplies and stationery for VDO offices.',
                'location' => 'Nationwide',
                'deadline' => 'Closes 8 May 2026',
                'order' => 3,
            ],
            [
                'slug' => 'bids',
                'title' => 'IT Equipment Supply (Laptops & Networking)',
                'ref' => 'VDO-PROC-2026-024',
                'summary' => 'Sealed bids invited for the supply of laptops, networking gear, and accessories. Bid documents available on request.',
                'location' => 'Kabul (delivery nationwide)',
                'deadline' => 'Closes 18 May 2026',
                'order' => 4,
            ],
            [
                'slug' => 'volunteer',
                'title' => 'Community Education Mentor',
                'ref' => 'VDO-VOL-2026-007',
                'summary' => 'Support after-school learning sessions for children and youth in your community. Training and materials provided.',
                'location' => 'Multiple regions',
                'deadline' => 'Rolling intake',
                'order' => 5,
            ],
            [
                'slug' => 'participation',
                'title' => 'Youth Empowerment Workshop',
                'ref' => 'VDO-PART-2026-003',
                'summary' => 'Three-day workshop on civic engagement, leadership, and project design for youth aged 18–28. Travel stipends available.',
                'location' => 'Mazar-e-Sharif',
                'deadline' => 'Apply by 30 May 2026',
                'order' => 6,
            ],
        ];

        foreach ($listings as $l) {
            OpportunityListing::updateOrCreate(
                ['title' => $l['title']],
                [
                    'category_id' => $catBySlug[$l['slug']],
                    'title' => $l['title'],
                    'ref' => $l['ref'],
                    'summary' => $l['summary'],
                    'location' => $l['location'],
                    'deadline' => $l['deadline'],
                    'order' => $l['order'],
                    'is_active' => true,
                ]
            );
        }
    }
}
