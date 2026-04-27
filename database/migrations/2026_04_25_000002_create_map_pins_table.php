<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('map_pins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('region_label');
            $table->string('description')->nullable();
            $table->string('stats')->nullable();
            $table->float('x');
            $table->float('y');
            $table->string('color', 32)->default('#E74C3C');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('map_pins');
    }
};
