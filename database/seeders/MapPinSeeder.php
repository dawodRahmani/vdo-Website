<?php

namespace Database\Seeders;

use App\Models\MapPin;
use Illuminate\Database\Seeder;

class MapPinSeeder extends Seeder
{
    public function run(): void
    {
        $pins = [
            ['name' => 'Kabul', 'region_label' => 'Central Region', 'description' => 'Head Office', 'stats' => '150,000+ beneficiaries', 'x' => 59.2, 'y' => 44.6, 'color' => '#E74C3C', 'order' => 1],
            ['name' => 'Badakhshan', 'region_label' => 'North Eastern Region', 'description' => 'Regional Office', 'stats' => '60,000+ beneficiaries', 'x' => 69.6, 'y' => 21.4, 'color' => '#E74C3C', 'order' => 2],
            ['name' => 'Kunduz', 'region_label' => 'Northern Region', 'description' => 'Regional Office', 'stats' => '120,000+ beneficiaries', 'x' => 56.7, 'y' => 21.2, 'color' => '#E74C3C', 'order' => 3],
            ['name' => 'Faryab', 'region_label' => 'North Western Region', 'description' => 'Field Office', 'stats' => '40,000+ beneficiaries', 'x' => 30.8, 'y' => 32.3, 'color' => '#E74C3C', 'order' => 4],
            ['name' => 'Jalalabad', 'region_label' => 'Eastern Region', 'description' => 'Regional Office', 'stats' => '85,000+ beneficiaries', 'x' => 67.5, 'y' => 48.1, 'color' => '#E74C3C', 'order' => 5],
            ['name' => 'Herat', 'region_label' => 'Western Region', 'description' => 'Regional Office', 'stats' => '95,000+ beneficiaries', 'x' => 13.7, 'y' => 47.1, 'color' => '#E74C3C', 'order' => 6],
            ['name' => 'Kandahar', 'region_label' => 'Southern Region', 'description' => 'Regional Office', 'stats' => '50,000+ beneficiaries', 'x' => 36.5, 'y' => 79.1, 'color' => '#F1C40F', 'order' => 7],
        ];

        foreach ($pins as $pin) {
            MapPin::updateOrCreate(
                ['name' => $pin['name']],
                array_merge($pin, ['is_active' => true])
            );
        }
    }
}
