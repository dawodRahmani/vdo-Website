<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class NewsPost extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'image_path',
        'body',
        'published_at',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $appends = ['image_url'];

    protected function imageUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->image_path) {
                return '';
            }
            if (str_starts_with($this->image_path, 'http://') || str_starts_with($this->image_path, 'https://') || str_starts_with($this->image_path, '/')) {
                return $this->image_path;
            }

            return '/storage/'.ltrim($this->image_path, '/');
        });
    }

    public function scopePublished($q)
    {
        return $q->where('is_published', true)
            ->where(function ($q2) {
                $q2->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    public function scopeLatest($q)
    {
        return $q->orderByDesc('published_at')->orderByDesc('id');
    }
}
