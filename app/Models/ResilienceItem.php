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
        'document',
        'caption',
        'bullets',
        'order',
        'is_active',
        'size_scale',
        'offset_x',
        'offset_y',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'bullets' => 'array',
        'size_scale' => 'integer',
        'offset_x' => 'integer',
        'offset_y' => 'integer',
    ];

    protected $appends = ['image_url', 'document_url'];

    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn () => $this->resolveStorageUrl($this->image));
    }

    protected function documentUrl(): Attribute
    {
        return Attribute::get(fn () => $this->resolveStorageUrl($this->document));
    }

    private function resolveStorageUrl(?string $path): ?string
    {
        if (! $path) return null;
        if (str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }
        return '/storage/'.ltrim($path, '/');
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
