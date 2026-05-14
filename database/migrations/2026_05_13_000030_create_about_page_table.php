<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_page', function (Blueprint $table) {
            $table->id();
            $table->string('executive_heading')->nullable();
            $table->string('executive_subheading')->nullable();
            $table->text('executive_body')->nullable();
            $table->string('history_heading')->nullable();
            $table->text('history_body')->nullable();
            $table->text('coordination_intro')->nullable();
            $table->text('coordination_outro')->nullable();
            $table->string('mission_lead')->nullable();
            $table->text('mission_body')->nullable();
            $table->string('vision_lead')->nullable();
            $table->text('vision_body')->nullable();
            $table->string('looking_ahead_heading')->nullable();
            $table->string('looking_ahead_subheading')->nullable();
            $table->text('looking_ahead_body')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_page');
    }
};
