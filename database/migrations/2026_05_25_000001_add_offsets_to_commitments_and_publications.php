<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('commitments', function (Blueprint $table) {
            $table->smallInteger('offset_x')->default(0)->after('size_scale');
            $table->smallInteger('offset_y')->default(0)->after('offset_x');
        });

        Schema::table('commitment_publications', function (Blueprint $table) {
            $table->smallInteger('offset_x')->default(0)->after('size_scale');
            $table->smallInteger('offset_y')->default(0)->after('offset_x');
        });
    }

    public function down(): void
    {
        Schema::table('commitments', function (Blueprint $table) {
            $table->dropColumn(['offset_x', 'offset_y']);
        });

        Schema::table('commitment_publications', function (Blueprint $table) {
            $table->dropColumn(['offset_x', 'offset_y']);
        });
    }
};
