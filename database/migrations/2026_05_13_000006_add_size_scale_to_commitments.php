<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('commitments', function (Blueprint $table) {
            $table->unsignedSmallInteger('size_scale')->default(100)->after('card_svg_path');
        });

        Schema::table('commitment_publications', function (Blueprint $table) {
            $table->unsignedSmallInteger('size_scale')->default(100)->after('cover_path');
        });
    }

    public function down(): void
    {
        Schema::table('commitments', function (Blueprint $table) {
            $table->dropColumn('size_scale');
        });
        Schema::table('commitment_publications', function (Blueprint $table) {
            $table->dropColumn('size_scale');
        });
    }
};
