<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class HomeHeroSlide extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true);
    }

    public function scopeOrdered(Builder $q): Builder
    {
        return $q->orderBy('order')->orderBy('id');
    }

    public static function resolveUrl(?string $path): string
    {
        if (! $path) {
            return '';
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return '/storage/'.ltrim($path, '/');
    }

    public function photoUrl(): string
    {
        return static::resolveUrl($this->photo1_path);
    }

    public function toSlidePayload(): array
    {
        return [
            'id' => $this->id,
            'order' => $this->order,
            'is_active' => $this->is_active,
            'photo' => [
                'url' => $this->photoUrl(),
                'alt' => $this->photo1_alt ?? '',
                'path' => $this->photo1_path,
            ],
        ];
    }
}
