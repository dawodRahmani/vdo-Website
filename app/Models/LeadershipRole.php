<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class LeadershipRole extends Model
{
    protected $fillable = [
        'title',
        'body',
        'color',
        'pin_style',
        'icon_name',
        'icon_image',
        'pos_x',
        'pos_y',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'pos_x' => 'float',
        'pos_y' => 'float',
    ];

    protected $appends = ['icon_image_url'];

    protected function iconImageUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->icon_image
                ? '/storage/'.ltrim($this->icon_image, '/')
                : null;
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
}
