<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminSiteSettingsController extends Controller
{
    public function editHeader()
    {
        $settings = SiteSetting::current();

        return Inertia::render('admin/site-header', [
            'settings' => $this->payload($settings),
        ]);
    }

    public function updateHeader(Request $request)
    {
        $request->validate([
            'logo_file' => 'nullable|image|max:4096',
            'clear_logo' => 'nullable|boolean',
            'logo_height' => 'nullable|integer|min:24|max:200',
            'logo_offset_x' => 'nullable|integer|min:-200|max:400',
            'logo_offset_y' => 'nullable|integer|min:-100|max:200',
        ]);

        $settings = SiteSetting::current();
        $data = [
            'logo_height' => $request->filled('logo_height')
                ? (int) $request->input('logo_height')
                : null,
            'logo_offset_x' => (int) $request->input('logo_offset_x', 0),
            'logo_offset_y' => (int) $request->input('logo_offset_y', 0),
        ];

        if ($request->hasFile('logo_file')) {
            if ($settings->logo_path && Str::startsWith($settings->logo_path, 'site/')) {
                Storage::disk('public')->delete($settings->logo_path);
            }
            $data['logo_path'] = $request->file('logo_file')->store('site', 'public');
        } elseif ($request->boolean('clear_logo')) {
            if ($settings->logo_path && Str::startsWith($settings->logo_path, 'site/')) {
                Storage::disk('public')->delete($settings->logo_path);
            }
            $data['logo_path'] = null;
        }

        $settings->update($data);

        return back();
    }

    public function editFooter()
    {
        $settings = SiteSetting::current();

        return Inertia::render('admin/site-footer', [
            'settings' => $this->payload($settings),
        ]);
    }

    public function updateFooter(Request $request)
    {
        $validated = $request->validate([
            'contact_phone' => 'nullable|string|max:64',
            'contact_email' => 'nullable|email|max:191',
            'social_facebook_url' => 'nullable|url|max:255',
            'social_twitter_url' => 'nullable|url|max:255',
            'social_linkedin_url' => 'nullable|url|max:255',
            'social_youtube_url' => 'nullable|url|max:255',
            'newsletter_heading' => 'nullable|string|max:191',
            'donate_button_text' => 'nullable|string|max:64',
            'donate_button_url' => 'nullable|string|max:255',
        ]);

        $settings = SiteSetting::current();
        $settings->update($validated);

        return back();
    }

    private function payload(SiteSetting $settings): array
    {
        return [
            'logo_url' => $settings->logoUrl(),
            'logo_path' => $settings->logo_path,
            'logo_height' => $settings->logo_height,
            'logo_offset_x' => $settings->logo_offset_x,
            'logo_offset_y' => $settings->logo_offset_y,
            'contact_phone' => $settings->contact_phone,
            'contact_email' => $settings->contact_email,
            'social_facebook_url' => $settings->social_facebook_url,
            'social_twitter_url' => $settings->social_twitter_url,
            'social_linkedin_url' => $settings->social_linkedin_url,
            'social_youtube_url' => $settings->social_youtube_url,
            'newsletter_heading' => $settings->newsletter_heading,
            'donate_button_text' => $settings->donate_button_text,
            'donate_button_url' => $settings->donate_button_url,
        ];
    }
}
