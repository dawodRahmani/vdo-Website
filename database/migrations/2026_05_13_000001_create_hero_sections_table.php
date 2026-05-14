<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->unique();
            $table->string('page_label');
            $table->string('photo1_path');
            $table->string('photo1_alt')->nullable();
            $table->string('photo2_path');
            $table->string('photo2_alt')->nullable();
            $table->string('photo3_path');
            $table->string('photo3_alt')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_sections');
    }
};
