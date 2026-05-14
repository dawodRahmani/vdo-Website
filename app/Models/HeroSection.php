<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'page_key',
        'page_label',
        'photo1_path',
        'photo1_alt',
        'photo2_path',
        'photo2_alt',
        'photo3_path',
        'photo3_alt',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public static function photosFor(string $key): array
    {
        $row = static::where('page_key', $key)->first();

        if (! $row) {
            return [];
        }

        return [
            ['src' => static::resolveUrl($row->photo1_path), 'alt' => $row->photo1_alt ?? ''],
            ['src' => static::resolveUrl($row->photo2_path), 'alt' => $row->photo2_alt ?? ''],
            ['src' => static::resolveUrl($row->photo3_path), 'alt' => $row->photo3_alt ?? ''],
        ];
    }

    public static function resolveUrl(?string $path): string
    {
        if (! $path) {
            return '';
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return '/storage/'.ltrim($path, '/');
    }

    public function photo1Url(): string
    {
        return static::resolveUrl($this->photo1_path);
    }

    public function photo2Url(): string
    {
        return static::resolveUrl($this->photo2_path);
    }

    public function photo3Url(): string
    {
        return static::resolveUrl($this->photo3_path);
    }
}
