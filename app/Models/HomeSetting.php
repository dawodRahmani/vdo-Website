<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class HomeSetting extends Model
{
    protected $guarded = [];

    protected $appends = ['regions_image_url'];

    public static function current(): self
    {
        return static::query()->firstOrCreate(['id' => 1], [
            'regions_image_path' => '/Home Page/11.svg',
            'regions_image_alt' => 'Regions and Provinces: Central (Kabul main office), Northeastern (Badakhshan), Northern (Kunduz), Northwestern (Faryab), Eastern (Jalalabad), Western (Herat), Southern (Qandahar)',
        ]);
    }

    protected function regionsImageUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->regions_image_path) {
                return '';
            }
            $path = $this->regions_image_path;
            if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
                return $path;
            }

            return '/storage/'.ltrim($path, '/');
        });
    }
}
