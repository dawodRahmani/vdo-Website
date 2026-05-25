<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('strategic_priority_pages', function (Blueprint $table) {
            // Slot 1 (existing "infographic"): scale/offset/text overrides
            $table->smallInteger('infographic_scale')->default(100)->after('infographic_alt');
            $table->smallInteger('infographic_offset_x')->default(0)->after('infographic_scale');
            $table->smallInteger('infographic_offset_y')->default(0)->after('infographic_offset_x');
            $table->text('infographic_text_overrides')->nullable()->after('infographic_offset_y');

            // Slot 2 (existing "beneficiary"): scale/offset/text overrides
            $table->smallInteger('beneficiary_scale')->default(100)->after('beneficiary_alt');
            $table->smallInteger('beneficiary_offset_x')->default(0)->after('beneficiary_scale');
            $table->smallInteger('beneficiary_offset_y')->default(0)->after('beneficiary_offset_x');
            $table->text('beneficiary_text_overrides')->nullable()->after('beneficiary_offset_y');

            // Slot 3 ("extra"): new image + same controls
            $table->string('extra_path')->nullable();
            $table->string('extra_alt')->nullable();
            $table->smallInteger('extra_scale')->default(100);
            $table->smallInteger('extra_offset_x')->default(0);
            $table->smallInteger('extra_offset_y')->default(0);
            $table->text('extra_text_overrides')->nullable();
        });

        // Backfill the Education page's defaults so text editing works out of the box.
        DB::table('strategic_priority_pages')
            ->where('page_key', 'education')
            ->whereNull('infographic_path')
            ->update(['infographic_path' => '/svg/education.svg']);

        DB::table('strategic_priority_pages')
            ->where('page_key', 'education')
            ->whereNull('beneficiary_path')
            ->update(['beneficiary_path' => '/svg/Strategic Priorities/03.svg']);
    }

    public function down(): void
    {
        Schema::table('strategic_priority_pages', function (Blueprint $table) {
            $table->dropColumn([
                'infographic_scale',
                'infographic_offset_x',
                'infographic_offset_y',
                'infographic_text_overrides',
                'beneficiary_scale',
                'beneficiary_offset_x',
                'beneficiary_offset_y',
                'beneficiary_text_overrides',
                'extra_path',
                'extra_alt',
                'extra_scale',
                'extra_offset_x',
                'extra_offset_y',
                'extra_text_overrides',
            ]);
        });
    }
};
