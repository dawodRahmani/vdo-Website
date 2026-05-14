<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DonationItem extends Model
{
    public const KIND_INTRO = 'intro';
    public const KIND_CAUSE = 'cause';
    public const KIND_METHOD = 'method';

    protected $fillable = [
        'kind',
        'icon_name',
        'title',
        'body',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

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
