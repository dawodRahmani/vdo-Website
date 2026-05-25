<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class StrategicPriorityPage extends Model
{
    protected $guarded = [];

    protected $casts = [
        'infographic_text_overrides' => 'array',
        'beneficiary_text_overrides' => 'array',
        'extra_text_overrides' => 'array',
    ];

    protected $appends = ['infographic_url', 'beneficiary_url', 'extra_url'];

    private static function url(?string $path): string
    {
        if (! $path) {
            return '';
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return '/storage/'.ltrim($path, '/');
    }

    protected function infographicUrl(): Attribute
    {
        return Attribute::get(fn () => static::url($this->infographic_path));
    }

    protected function beneficiaryUrl(): Attribute
    {
        return Attribute::get(fn () => static::url($this->beneficiary_path));
    }

    protected function extraUrl(): Attribute
    {
        return Attribute::get(fn () => static::url($this->extra_path));
    }

    public function bullets()
    {
        return $this->hasMany(StrategicPriorityBullet::class, 'page_key', 'page_key')
            ->orderBy('order');
    }

    public static function forKey(string $key): ?self
    {
        return static::where('page_key', $key)->first();
    }
}
