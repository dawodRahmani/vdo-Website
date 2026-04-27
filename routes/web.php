<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about', [
        'leadershipRoles' => \App\Models\LeadershipRole::active()->ordered()->get(),
    ]);
})->name('about');
Route::get('/strategic-priorities', fn () => Inertia::render('strategic-priorities'))->name('strategic-priorities');
Route::prefix('strategic-priorities')->name('strategic-priorities.')->group(function () {
    Route::get('education', function () {
        return Inertia::render('strategic-priorities/education', [
            'segments' => \App\Models\EducationDonutSegment::active()->ordered()->get(),
            'regions' => \App\Models\Region::active()->ordered()->get(),
            'mapPins' => \App\Models\MapPin::active()->ordered()->get(),
        ]);
    })->name('education');
    Route::get('economic-growth', fn () => Inertia::render('strategic-priorities/economic-growth'))->name('economic-growth');
    Route::get('rural-development', fn () => Inertia::render('strategic-priorities/rural-development'))->name('rural-development');
    Route::get('health-and-nutrition', fn () => Inertia::render('strategic-priorities/health-and-nutrition'))->name('health-and-nutrition');
    Route::get('emergency-response', fn () => Inertia::render('strategic-priorities/emergency-response'))->name('emergency-response');
    Route::get('cross-cutting-areas', fn () => Inertia::render('strategic-priorities/cross-cutting-areas'))->name('cross-cutting-areas');
    Route::get('target-group', fn () => Inertia::render('strategic-priorities/target-group'))->name('target-group');
    Route::get('secondary-beneficiaries', fn () => Inertia::render('strategic-priorities/secondary-beneficiaries'))->name('secondary-beneficiaries');
    Route::get('tertiary-audience', fn () => Inertia::render('strategic-priorities/tertiary-audience'))->name('tertiary-audience');
    Route::get('contribution-project', fn () => Inertia::render('strategic-priorities/contribution-project'))->name('contribution-project');
});
Route::get('/where-we-work', fn () => Inertia::render('where-we-work'))->name('where-we-work');
Route::get('/our-commitment', fn () => Inertia::render('our-commitment'))->name('our-commitment');
Route::get('/vdo-resilience', fn () => Inertia::render('vdo-resilience'))->name('vdo-resilience');
Route::get('/opportunities', fn () => Inertia::render('opportunities'))->name('opportunities');
Route::get('/media', fn () => Inertia::render('media'))->name('media');
Route::get('/donate', fn () => Inertia::render('donate'))->name('donate');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn () => redirect()->route('admin.map'))->name('home');
    Route::get('map', [\App\Http\Controllers\Admin\AdminMapController::class, 'index'])->name('map');
    Route::patch('map/regions/{region}', [\App\Http\Controllers\Admin\AdminMapController::class, 'updateRegion'])->name('map.region.update');
    Route::post('map/pins', [\App\Http\Controllers\Admin\AdminMapController::class, 'storePin'])->name('map.pin.store');
    Route::patch('map/pins/{pin}', [\App\Http\Controllers\Admin\AdminMapController::class, 'updatePin'])->name('map.pin.update');
    Route::delete('map/pins/{pin}', [\App\Http\Controllers\Admin\AdminMapController::class, 'destroyPin'])->name('map.pin.destroy');

    Route::get('diagrams/leadership-roles', [\App\Http\Controllers\Admin\AdminLeadershipRoleController::class, 'index'])->name('diagrams.leadership-roles');
    Route::post('diagrams/leadership-roles', [\App\Http\Controllers\Admin\AdminLeadershipRoleController::class, 'store'])->name('diagrams.leadership-roles.store');
    Route::patch('diagrams/leadership-roles/{role}', [\App\Http\Controllers\Admin\AdminLeadershipRoleController::class, 'update'])->name('diagrams.leadership-roles.update');
    Route::delete('diagrams/leadership-roles/{role}', [\App\Http\Controllers\Admin\AdminLeadershipRoleController::class, 'destroy'])->name('diagrams.leadership-roles.destroy');

    Route::get('diagrams/education-segments', [\App\Http\Controllers\Admin\AdminEducationController::class, 'index'])->name('diagrams.education-segments');
    Route::post('diagrams/education-segments', [\App\Http\Controllers\Admin\AdminEducationController::class, 'storeSegment'])->name('diagrams.education-segments.store');
    Route::patch('diagrams/education-segments/{segment}', [\App\Http\Controllers\Admin\AdminEducationController::class, 'updateSegment'])->name('diagrams.education-segments.update');
    Route::delete('diagrams/education-segments/{segment}', [\App\Http\Controllers\Admin\AdminEducationController::class, 'destroySegment'])->name('diagrams.education-segments.destroy');
});

require __DIR__.'/settings.php';
