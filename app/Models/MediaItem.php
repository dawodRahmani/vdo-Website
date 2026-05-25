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
        'video_path',
        'document_path',
        'order',
        'is_active',
        'size_scale',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'size_scale' => 'integer',
    ];

    protected $appends = ['image_url', 'video_file_url', 'document_url'];

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

    protected function videoFileUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->video_path) return null;
            if (str_starts_with($this->video_path, '/') || str_starts_with($this->video_path, 'http')) {
                return $this->video_path;
            }
            return '/storage/'.ltrim($this->video_path, '/');
        });
    }

    protected function documentUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->document_path) return null;
            if (str_starts_with($this->document_path, '/') || str_starts_with($this->document_path, 'http')) {
                return $this->document_path;
            }
            return '/storage/'.ltrim($this->document_path, '/');
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
