<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('opportunity_listings', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('category_id');
            $table->longText('description')->nullable()->after('summary');
            $table->longText('responsibilities')->nullable()->after('description');
            $table->longText('requirements')->nullable()->after('responsibilities');
            $table->string('employment_type', 32)->nullable()->after('requirements');
            $table->string('experience_level', 32)->nullable()->after('employment_type');
            $table->date('posted_at')->nullable()->after('experience_level');
            $table->date('deadline_at')->nullable()->after('posted_at');
        });
    }

    public function down(): void
    {
        Schema::table('opportunity_listings', function (Blueprint $table) {
            $table->dropColumn([
                'slug',
                'description',
                'responsibilities',
                'requirements',
                'employment_type',
                'experience_level',
                'posted_at',
                'deadline_at',
            ]);
        });
    }
};
