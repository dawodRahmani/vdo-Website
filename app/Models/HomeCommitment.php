<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class HomeCommitment extends Model
{
    protected $fillable = ['title', 'svg_path', 'order', 'crop_scale', 'crop_offset_x', 'crop_offset_y'];

    protected $casts = [
        'order' => 'integer',
        'crop_scale' => 'integer',
        'crop_offset_x' => 'integer',
        'crop_offset_y' => 'integer',
    ];

    protected $appends = ['svg_url'];

    protected function svgUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->svg_path) {
                return '';
            }
            if (str_starts_with($this->svg_path, 'http://') || str_starts_with($this->svg_path, 'https://') || str_starts_with($this->svg_path, '/')) {
                return $this->svg_path;
            }

            return '/storage/'.ltrim($this->svg_path, '/');
        });
    }

    public function scopeOrdered($q)
    {
        return $q->orderBy('order');
    }
}
