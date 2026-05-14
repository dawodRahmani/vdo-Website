<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class ResilienceItem extends Model
{
    public const SECTION_CAPACITY = 'capacity';
    public const SECTION_POLICY = 'policy';
    public const SECTION_PROGRAMMATIC_APPROACH = 'programmatic_approach';
    public const SECTION_COLLECTIVE_RESILIENCE = 'collective_resilience';

    protected $fillable = [
        'section',
        'title',
        'body',
        'image',
        'caption',
        'bullets',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'bullets' => 'array',
    ];

    protected $appends = ['image_url'];

    protected function imageUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->image) return null;
            if (str_starts_with($this->image, '/') || str_starts_with($this->image, 'http')) {
                return $this->image;
            }
            return '/storage/'.ltrim($this->image, '/');
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    public function scopeOfSection($query, string $section)
    {
        return $query->where('section', $section);
    }
}
