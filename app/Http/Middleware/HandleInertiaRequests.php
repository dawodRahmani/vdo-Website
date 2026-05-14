<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $settings = SiteSetting::current();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'siteSettings' => [
                'logo_url' => $settings->logoUrl(),
                'contact_phone' => $settings->contact_phone,
                'contact_email' => $settings->contact_email,
                'social_facebook_url' => $settings->social_facebook_url,
                'social_twitter_url' => $settings->social_twitter_url,
                'social_linkedin_url' => $settings->social_linkedin_url,
                'social_youtube_url' => $settings->social_youtube_url,
                'newsletter_heading' => $settings->newsletter_heading,
                'donate_button_text' => $settings->donate_button_text,
                'donate_button_url' => $settings->donate_button_url,
            ],
            'flash' => [
                'reportSent' => fn () => $request->session()->get('reportSent'),
            ],
        ];
    }
}
