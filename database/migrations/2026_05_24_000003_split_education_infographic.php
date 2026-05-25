<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // The original /svg/education.svg combined the Afghanistan coverage map
        // with a target-groups percentage chart. split_education_svg.php (in the
        // repo root at creation time) produced two clean halves; point the
        // Education page's slots at them.
        DB::table('strategic_priority_pages')
            ->where('page_key', 'education')
            ->update([
                'infographic_path' => '/svg/education-coverage.svg',
                'extra_path' => '/svg/education-target-groups.svg',
                'extra_alt' => 'Target group beneficiary breakdown by percentage',
            ]);
    }

    public function down(): void
    {
        DB::table('strategic_priority_pages')
            ->where('page_key', 'education')
            ->update([
                'infographic_path' => '/svg/education.svg',
                'extra_path' => null,
                'extra_alt' => null,
            ]);
    }
};
