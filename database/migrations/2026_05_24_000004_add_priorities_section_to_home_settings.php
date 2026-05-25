<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_settings', function (Blueprint $table) {
            $table->smallInteger('priorities_offset_x')->default(0)->after('commitments_line_gap');
            $table->smallInteger('priorities_offset_y')->default(0)->after('priorities_offset_x');
            $table->unsignedSmallInteger('priorities_scale')->default(100)->after('priorities_offset_y');
        });
    }

    public function down(): void
    {
        Schema::table('home_settings', function (Blueprint $table) {
            $table->dropColumn(['priorities_offset_x', 'priorities_offset_y', 'priorities_scale']);
        });
    }
};
