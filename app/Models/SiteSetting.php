<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SiteSetting extends Model
{
    protected $guarded = [];

    public static function current(): self
    {
        return static::query()->firstOrCreate(['id' => 1]);
    }

    public function logoUrl(): ?string
    {
        if (! $this->logo_path) {
            return null;
        }

        if (str_starts_with($this->logo_path, 'http://') || str_starts_with($this->logo_path, 'https://')) {
            return $this->logo_path;
        }

        if (str_starts_with($this->logo_path, '/')) {
            return $this->logo_path;
        }

        return Storage::disk('public')->url($this->logo_path);
    }
}
