<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('strategic_priority_pages', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->unique();
            $table->string('page_label');
            $table->string('heading')->nullable();
            $table->text('body')->nullable();
            $table->text('between_body')->nullable();
            $table->string('infographic_path')->nullable();
            $table->string('infographic_alt')->nullable();
            $table->string('achievements_heading')->nullable();
            $table->string('beneficiary_path')->nullable();
            $table->string('beneficiary_alt')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('strategic_priority_bullets', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->index();
            $table->text('content');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('strategic_priority_cards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('href');
            $table->string('icon_name', 64)->nullable();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('strategic_priority_bullets');
        Schema::dropIfExists('strategic_priority_cards');
        Schema::dropIfExists('strategic_priority_pages');
    }
};
