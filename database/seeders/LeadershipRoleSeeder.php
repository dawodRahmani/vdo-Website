<?php

namespace Database\Seeders;

use App\Models\LeadershipRole;
use Illuminate\Database\Seeder;

class LeadershipRoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'title' => 'UN Humanitarian Country Team (HCT)',
                'body' => 'Elected member, representing national NGO voices and elected for 3 years in 3 consecutive terms.',
                'color' => 'rgb(62,64,149)',
                'pin_style' => 'balloon',
                'icon_name' => null,
                'icon_image' => null,
                'pos_x' => 17,
                'pos_y' => 50,
                'order' => 1,
            ],
            [
                'title' => 'ACBAR',
                'body' => 'Steering Committee Member and currently Chairperson (2025–2026 term).',
                'color' => 'rgb(0,175,239)',
                'pin_style' => 'balloon',
                'icon_name' => null,
                'icon_image' => null,
                'pos_x' => 50,
                'pos_y' => 50,
                'order' => 2,
            ],
            [
                'title' => 'Strategic working groups and clusters',
                'body' => 'across protection, education, and humanitarian coordination platforms.',
                'color' => 'rgb(189,191,193)',
                'pin_style' => 'balloon',
                'icon_name' => null,
                'icon_image' => null,
                'pos_x' => 83,
                'pos_y' => 50,
                'order' => 3,
            ],
        ];

        foreach ($roles as $role) {
            LeadershipRole::updateOrCreate(
                ['title' => $role['title']],
                array_merge($role, ['is_active' => true]),
            );
        }
    }
}
