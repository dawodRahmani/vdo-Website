<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_hero_slides', function (Blueprint $table) {
            $table->dropColumn(['photo2_path', 'photo2_alt', 'photo3_path', 'photo3_alt']);
        });
    }

    public function down(): void
    {
        Schema::table('home_hero_slides', function (Blueprint $table) {
            $table->string('photo2_path')->nullable()->after('photo1_alt');
            $table->string('photo2_alt')->nullable()->after('photo2_path');
            $table->string('photo3_path')->nullable()->after('photo2_alt');
            $table->string('photo3_alt')->nullable()->after('photo3_path');
        });
    }
};
