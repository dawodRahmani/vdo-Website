<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MapPin extends Model
{
    protected $fillable = [
        'name',
        'region_label',
        'description',
        'stats',
        'x',
        'y',
        'color',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'x' => 'float',
        'y' => 'float',
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
