<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'logo_path' => '/svg/logo.png',
                'contact_phone' => '+93 728 777 117',
                'contact_email' => 'communications@vdongo.org',
                'social_facebook_url' => 'https://www.facebook.com/profile.php?id=61554735623328',
                'social_twitter_url' => 'https://twitter.com/vdoafg',
                'social_linkedin_url' => 'https://www.linkedin.com/in/vision-development-organization-4169362a7/',
                'social_youtube_url' => 'https://www.youtube.com/channel/UCxW1GenM8SeBrumZzKY4wsQ',
                'newsletter_heading' => 'Sign up for our newsletter',
                'donate_button_text' => 'Donate',
                'donate_button_url' => '/donate',
            ]
        );
    }
}
