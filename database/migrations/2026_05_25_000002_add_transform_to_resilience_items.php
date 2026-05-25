<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resilience_items', function (Blueprint $table) {
            $table->unsignedSmallInteger('size_scale')->default(100)->after('document');
            $table->smallInteger('offset_x')->default(0)->after('size_scale');
            $table->smallInteger('offset_y')->default(0)->after('offset_x');
        });
    }

    public function down(): void
    {
        Schema::table('resilience_items', function (Blueprint $table) {
            $table->dropColumn(['size_scale', 'offset_x', 'offset_y']);
        });
    }
};
