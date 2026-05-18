<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class HomeImpactStat extends Model
{
    protected $fillable = ['label', 'svg_path', 'size_scale', 'order'];

    protected $casts = ['order' => 'integer', 'size_scale' => 'integer'];

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
