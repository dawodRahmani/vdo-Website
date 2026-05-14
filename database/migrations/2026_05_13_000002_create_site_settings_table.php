<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('logo_path')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('social_facebook_url')->nullable();
            $table->string('social_twitter_url')->nullable();
            $table->string('social_linkedin_url')->nullable();
            $table->string('social_youtube_url')->nullable();
            $table->string('newsletter_heading')->nullable();
            $table->string('donate_button_text')->nullable();
            $table->string('donate_button_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
