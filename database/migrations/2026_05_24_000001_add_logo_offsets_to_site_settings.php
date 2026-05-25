<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->smallInteger('logo_offset_x')->default(0)->after('logo_height');
            $table->smallInteger('logo_offset_y')->default(0)->after('logo_offset_x');
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['logo_offset_x', 'logo_offset_y']);
        });
    }
};
