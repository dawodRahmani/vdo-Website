<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leadership_roles', function (Blueprint $table) {
            $table->float('pos_x')->default(50)->after('icon_name');
            $table->float('pos_y')->default(50)->after('pos_x');
            $table->string('icon_image')->nullable()->after('pos_y');
        });

        // Backfill defaults for existing rows so they spread along the line.
        $rows = \App\Models\LeadershipRole::orderBy('order')->get();
        $count = $rows->count();
        if ($count > 0) {
            $rows->values()->each(function ($row, $i) use ($count) {
                $row->pos_x = $count === 1 ? 50 : round((($i + 1) / ($count + 1)) * 100, 2);
                $row->pos_y = 50;
                $row->save();
            });
        }
    }

    public function down(): void
    {
        Schema::table('leadership_roles', function (Blueprint $table) {
            $table->dropColumn(['pos_x', 'pos_y', 'icon_image']);
        });
    }
};
