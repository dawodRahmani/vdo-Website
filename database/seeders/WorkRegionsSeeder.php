<?php

namespace Database\Seeders;

use App\Models\WorkRegion;
use Illuminate\Database\Seeder;

class WorkRegionsSeeder extends Seeder
{
    public function run(): void
    {
        $regions = [
            [
                'slug' => 'central',
                'title' => 'Central Region:',
                'subtitle' => "VDO's Work in the Central Region",
                'map_svg_path' => '/svg/Where We Work/01.svg',
                'body' => "VDO is committed to improving lives in the central region through education, economic growth, urban development, and emergency response.\n\nIn education, VDO expands urban school access, ensuring children in underserved areas can learn and thrive. For economic growth, the organization supports MSMEs, helping small businesses grow, create jobs, and strengthen local livelihoods. In urban development, VDO addresses challenges like flooding by improving infrastructure and promoting resilient, livable communities. Additionally, VDO provides emergency response support to vulnerable populations, helping communities recover and build resilience.\n\nThrough these integrated efforts, VDO empowers communities, fosters inclusive growth, and strengthens resilience across the central region.",
                'map_on_right' => false,
                'order' => 1,
            ],
            [
                'slug' => 'northeastern',
                'title' => 'North Eastern Region:',
                'subtitle' => "VDO's Impact in the Northern Region",
                'map_svg_path' => '/svg/Where We Work/02.svg',
                'body' => 'VDO empowers communities in the northern region through integrated interventions in education, economic growth, urban development, and health. The organization improves access to schools in underserved rural areas, supports MSMEs and TVET training for youth, and strengthens resilience in drought-prone provinces. In health and nutrition, VDO raises awareness on COVID-19, nutrition, and menstrual hygiene, trains frontline workers, conducts nutrition sessions, and provides dignity kits and women- and girls-friendly spaces for recreational activities and GBV awareness. Through these efforts, VDO enhances livelihoods, health, and community resilience, ensuring no one is left behind.',
                'map_on_right' => true,
                'order' => 2,
            ],
            [
                'slug' => 'eastern',
                'title' => 'Eastern Region:',
                'subtitle' => "VDO's Work in the Eastern Region",
                'map_svg_path' => '/svg/Where We Work/03.svg',
                'body' => "VDO empowers communities in the eastern region through integrated programs in education, economic growth, urban development, and health. The organization supports children in crisis-affected areas to continue learning, provides MSME support and TVET training to boost livelihoods, and strengthens flood-affected communities through resilient urban development initiatives.\n\nIn health and nutrition, VDO's Integrated Health–Nutrition–Immunization Project addresses vaccine misconceptions, promotes positive health behaviors, and increases caregivers' understanding and acceptance of immunization and nutrition services, improving child health outcomes.\n\nThrough these interventions, VDO enhances education, economic opportunities, health, and resilience, ensuring that vulnerable populations in the eastern region are supported to thrive.",
                'map_on_right' => false,
                'order' => 3,
            ],
            [
                'slug' => 'western',
                'title' => 'Western Region:',
                'subtitle' => "VDO's Work in the Western Region",
                'map_svg_path' => '/svg/Where We Work/04.svg',
                'body' => "VDO empowers communities in the western region through integrated programs in education, economic growth, urban development, and health and nutrition. The organization provides education support to ensure children and youth access quality learning opportunities, helping them build knowledge and skills for the future.\n\nIn economic growth, VDO equips women and youth with startup kits, small business grants, financial literacy training, and TVET and market-aligned skills development. Through mentorship, coaching, and the WAQAR Career Center, participants gain the tools, guidance, and opportunities needed to launch or expand businesses and secure meaningful employment, strengthening local economies and promoting financial independence.\n\nVDO also supports drought-prone provinces through urban development initiatives, including infrastructure improvements and sustainable planning, to build resilient communities capable of withstanding environmental challenges.\n\nIn health and nutrition, VDO works to improve community well-being by raising awareness on key health issues, providing nutrition services, and supporting families with access to essential health resources. These interventions strengthen caregivers' knowledge, promote healthy behaviors, and improve overall child and community health outcomes.\n\nThrough these integrated efforts, VDO strengthens livelihoods, education, urban resilience, and health, creating lasting impact for vulnerable populations in the western region.",
                'map_on_right' => true,
                'order' => 4,
            ],
            [
                'slug' => 'southern',
                'title' => 'Southern Region:',
                'subtitle' => "VDO's Work in the Southern Region",
                'map_svg_path' => '/svg/Where We Work/05.svg',
                'body' => "VDO empowers communities in the southern region through integrated programs in education, economic growth, urban development, emergency response, and health and nutrition. Working with local partners, the organization ensures that vulnerable populations, especially women, youth, and children, receive the support they need to thrive.\n\nIn education, VDO improves access to learning opportunities for children and youth in underserved and crisis-affected areas. In economic growth, the organization supports MSMEs and provides TVET training, startup kits, small business grants, and mentorship, helping participants launch sustainable businesses and gain meaningful employment.\n\nVDO strengthens urban development and resilience in drought- and disaster-prone areas through infrastructure improvements, sustainable planning, and community-based risk reduction. In health and nutrition, partner-led initiatives raise awareness on vaccines, nutrition, and hygiene, while supporting women and girls with safe spaces and essential services.\n\nThrough these integrated interventions, VDO builds resilient communities, strengthens livelihoods, improves health outcomes, and ensures that vulnerable populations in the southern region are empowered to thrive.",
                'map_on_right' => false,
                'order' => 5,
            ],
            [
                'slug' => 'northwestern',
                'title' => 'North-Western Region:',
                'subtitle' => "VDO's Work in the North-Western Region",
                'map_svg_path' => '/svg/Where We Work/06.svg',
                'body' => "VDO, through its local partners, supports communities in the north-western region across education, economic growth, urban development, emergency response, and health and nutrition. The organization focuses on empowering women, youth, and children, helping communities become more resilient.\n\nIn education, VDO improves access to learning for children and youth in underserved and crisis-affected areas. In economic growth, it provides MSME support, TVET training, startup kits, and small business grants, enabling sustainable livelihoods and job opportunities.\n\nVDO strengthens urban resilience in drought- and disaster-prone areas through infrastructure improvements and sustainable planning. In health and nutrition, partner-led programs address vaccine misconceptions, promote positive health practices, and provide women and girls with safe spaces and essential services.\n\nThrough these efforts, VDO enhances livelihoods, education, health, and community resilience in the north-western region.",
                'map_on_right' => true,
                'order' => 6,
            ],
        ];

        foreach ($regions as $r) {
            WorkRegion::updateOrCreate(['slug' => $r['slug']], $r + ['is_active' => true]);
        }
    }
}
