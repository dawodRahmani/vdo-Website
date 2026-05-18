<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('photo1_path')->nullable();
            $table->string('photo1_alt')->nullable();
            $table->string('photo2_path')->nullable();
            $table->string('photo2_alt')->nullable();
            $table->string('photo3_path')->nullable();
            $table->string('photo3_alt')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_hero_slides');
    }
};
