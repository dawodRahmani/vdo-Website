<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_commitments', function (Blueprint $table) {
            $table->unsignedSmallInteger('crop_scale')->default(100)->after('svg_path');
            $table->smallInteger('crop_offset_x')->default(0)->after('crop_scale');
            $table->smallInteger('crop_offset_y')->default(0)->after('crop_offset_x');
        });
    }

    public function down(): void
    {
        Schema::table('home_commitments', function (Blueprint $table) {
            $table->dropColumn(['crop_scale', 'crop_offset_x', 'crop_offset_y']);
        });
    }
};
