<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationDonutSegment extends Model
{
    protected $fillable = [
        'label',
        'percent',
        'color',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'percent' => 'float',
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
