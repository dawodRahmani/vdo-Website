<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('opportunity_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')
                ->constrained('opportunity_categories')
                ->cascadeOnDelete();
            $table->string('title');
            $table->string('ref')->nullable();
            $table->text('summary');
            $table->string('location')->nullable();
            $table->string('deadline')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('opportunity_listings');
    }
};
