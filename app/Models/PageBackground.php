<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageBackground extends Model
{
    public const DEFAULT_COLOR = 'rgb(245,245,245)';

    protected $fillable = ['page_key', 'label', 'background_color'];

    public static function colorFor(string $pageKey): string
    {
        $row = static::where('page_key', $pageKey)->first();

        return $row?->background_color ?: self::DEFAULT_COLOR;
    }

    public static function configuredPages(): array
    {
        return [
            'home' => 'Home',
            'about' => 'About Us',
            'strategic-priorities' => 'Strategic Priorities (Overview)',
            'strategic-priorities.education' => 'Strategic — Education',
            'strategic-priorities.economic-growth' => 'Strategic — Economic Growth',
            'strategic-priorities.rural-development' => 'Strategic — Rural Development',
            'strategic-priorities.health-and-nutrition' => 'Strategic — Health and Nutrition',
            'strategic-priorities.emergency-response' => 'Strategic — Emergency Response',
            'strategic-priorities.cross-cutting-areas' => 'Strategic — Cross-Cutting Areas',
            'strategic-priorities.target-group' => 'Strategic — Target Group',
            'strategic-priorities.secondary-beneficiaries' => 'Strategic — Secondary Beneficiaries',
            'strategic-priorities.tertiary-audience' => 'Strategic — Tertiary Audience',
            'strategic-priorities.contribution-project' => 'Strategic — Contribution Project',
            'where-we-work' => 'Where We Work',
            'our-commitment' => 'Our Commitment',
            'vdo-resilience' => "VDO's Resilience",
            'opportunities' => 'Opportunities',
            'media' => 'Media',
            'donate' => 'Donate',
        ];
    }
}
