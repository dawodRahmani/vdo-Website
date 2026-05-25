<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class OpportunityListing extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'posted_at' => 'date',
        'deadline_at' => 'date',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $listing) {
            if (empty($listing->slug) && ! empty($listing->title)) {
                $listing->slug = self::uniqueSlug($listing->title, $listing->id);
            }
        });
    }

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'opportunity';
        $slug = $base;
        $i = 2;
        while (
            self::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base.'-'.$i++;
        }
        return $slug;
    }

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true);
    }

    public function scopeOrdered(Builder $q): Builder
    {
        return $q->orderBy('order')->orderBy('id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(OpportunityCategory::class, 'category_id');
    }
}
