<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    // Reverses the data set by 2026_05_24_000003_split_education_infographic.
    // The split SVGs that migration pointed at distorted the Education layout;
    // we point the main slot back at the original and clear the third slot.
    public function up(): void
    {
        DB::table('strategic_priority_pages')
            ->where('page_key', 'education')
            ->update([
                'infographic_path' => '/svg/education.svg',
                'extra_path' => null,
                'extra_alt' => null,
                'extra_text_overrides' => null,
            ]);
    }

    public function down(): void
    {
        // Intentionally no-op: rolling back this revert would point at SVGs
        // that no longer exist on disk.
    }
};
