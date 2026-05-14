<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class MediaItem extends Model
{
    public const KIND_DOCUMENTARY = 'documentary';
    public const KIND_PHOTO = 'photo';
    public const KIND_PUBLICATION = 'publication';

    protected $fillable = [
        'kind',
        'title',
        'image',
        'video_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
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

    public function scopeOfKind($query, string $kind)
    {
        return $query->where('kind', $kind);
    }
}
