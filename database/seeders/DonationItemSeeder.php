<?php

namespace Database\Seeders;

use App\Models\DonationItem;
use Illuminate\Database\Seeder;

class DonationItemSeeder extends Seeder
{
    public function run(): void
    {
        DonationItem::updateOrCreate(
            ['kind' => DonationItem::KIND_INTRO],
            [
                'kind' => DonationItem::KIND_INTRO,
                'icon_name' => 'HandHeart',
                'title' => 'Support Our Mission',
                'body' => 'Your generosity helps VDO deliver lifesaving aid, education, and long-term development to communities across Afghanistan. Choose a cause that matters to you, contribute any amount you wish, and join us in building a more resilient and dignified future.',
                'order' => 0,
                'is_active' => true,
            ],
        );

        $causes = [
            [
                'icon_name' => 'BookOpen',
                'title' => 'Education for Children',
                'body' => 'Help out-of-school children access learning by funding school supplies, textbooks, teacher stipends, and safe classroom spaces in underserved communities.',
                'order' => 1,
            ],
            [
                'icon_name' => 'Utensils',
                'title' => 'Food & Nutrition Support',
                'body' => 'Provide emergency food packages and nutrition support for families facing food insecurity, with a focus on malnourished children and pregnant women.',
                'order' => 2,
            ],
            [
                'icon_name' => 'Droplets',
                'title' => 'Clean Water Access',
                'body' => 'Bring safe drinking water to remote villages through community wells, water filtration systems, and hygiene awareness sessions.',
                'order' => 3,
            ],
            [
                'icon_name' => 'HeartPulse',
                'title' => 'Healthcare Services',
                'body' => 'Support mobile health clinics, essential medicines, maternal care, and lifesaving health services for communities with limited access to care.',
                'order' => 4,
            ],
            [
                'icon_name' => 'Sprout',
                'title' => "Women's Economic Empowerment",
                'body' => 'Fund vocational training, startup kits, and small business grants that help women and youth build sustainable livelihoods and financial independence.',
                'order' => 5,
            ],
            [
                'icon_name' => 'HandHeart',
                'title' => 'Emergency Relief',
                'body' => 'Enable rapid response to families affected by natural disasters, displacement, and conflict — including cash assistance and essential non-food items.',
                'order' => 6,
            ],
        ];

        foreach ($causes as $cause) {
            DonationItem::updateOrCreate(
                ['kind' => DonationItem::KIND_CAUSE, 'title' => $cause['title']],
                array_merge($cause, [
                    'kind' => DonationItem::KIND_CAUSE,
                    'is_active' => true,
                ]),
            );
        }

        $methods = [
            [
                'icon_name' => 'Landmark',
                'title' => 'Bank Transfer',
                'body' => "Account Name: Voluntary Development Organization\nBank: Afghanistan International Bank (AIB)\nAccount No: 0000-0000-0000\nSWIFT: AFIBAFKA",
                'order' => 1,
            ],
            [
                'icon_name' => 'Phone',
                'title' => 'Mobile Money / Hawala',
                'body' => "For Hawala transfers or mobile money options\nplease contact our finance office directly.\n+93 (0) 700 000 000",
                'order' => 2,
            ],
            [
                'icon_name' => 'MapPin',
                'title' => 'In-Person at Our Office',
                'body' => "Visit our main office in Kabul during\nworking hours (Sun–Thu, 8:00 AM – 4:00 PM)\nto make a direct contribution.",
                'order' => 3,
            ],
            [
                'icon_name' => 'Mail',
                'title' => 'Partnership & Sponsorship',
                'body' => "For organizational giving, sponsorship, or\nlong-term partnership inquiries, write to:\ninfo@vdo.org.af",
                'order' => 4,
            ],
        ];

        foreach ($methods as $method) {
            DonationItem::updateOrCreate(
                ['kind' => DonationItem::KIND_METHOD, 'title' => $method['title']],
                array_merge($method, [
                    'kind' => DonationItem::KIND_METHOD,
                    'is_active' => true,
                ]),
            );
        }
    }
}
