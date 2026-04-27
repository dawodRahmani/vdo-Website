<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = [
        'name',
        'label',
        'slug',
        'description',
        'color',
        'svg_path',
        'label_x',
        'label_y',
        'label_two_line',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'label_two_line' => 'boolean',
        'order' => 'integer',
        'label_x' => 'float',
        'label_y' => 'float',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
