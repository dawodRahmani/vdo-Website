<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_settings', function (Blueprint $table) {
            // Percent of the container width (40-100)
            $table->unsignedSmallInteger('regions_image_max_width')->nullable()->after('regions_image_alt');
        });
    }

    public function down(): void
    {
        Schema::table('home_settings', function (Blueprint $table) {
            $table->dropColumn('regions_image_max_width');
        });
    }
};
