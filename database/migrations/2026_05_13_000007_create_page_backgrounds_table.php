<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->string('page_key', 80)->unique();
            $table->string('label')->nullable();
            $table->string('background_color', 32)->default('rgb(189,191,193)');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_backgrounds');
    }
};
