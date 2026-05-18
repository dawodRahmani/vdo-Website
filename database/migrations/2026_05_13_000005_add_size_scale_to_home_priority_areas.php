<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_priority_areas', function (Blueprint $table) {
            $table->unsignedSmallInteger('size_scale')->default(100)->after('svg_path');
        });
    }

    public function down(): void
    {
        Schema::table('home_priority_areas', function (Blueprint $table) {
            $table->dropColumn('size_scale');
        });
    }
};
