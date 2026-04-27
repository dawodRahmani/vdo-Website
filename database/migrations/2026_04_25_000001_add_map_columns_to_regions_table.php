<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('regions', function (Blueprint $table) {
            $table->string('label')->nullable()->after('name');
            $table->float('label_x')->default(50)->after('svg_path');
            $table->float('label_y')->default(50)->after('label_x');
            $table->boolean('label_two_line')->default(false)->after('label_y');
        });
    }

    public function down(): void
    {
        Schema::table('regions', function (Blueprint $table) {
            $table->dropColumn(['label', 'label_x', 'label_y', 'label_two_line']);
        });
    }
};
