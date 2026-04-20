<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
        'regions' => \App\Models\Region::active()->ordered()->get(),
    ]);
})->name('home');

Route::get('/about', fn () => Inertia::render('about'))->name('about');
Route::get('/strategic-priorities', fn () => Inertia::render('strategic-priorities'))->name('strategic-priorities');
Route::prefix('strategic-priorities')->name('strategic-priorities.')->group(function () {
    Route::get('education', fn () => Inertia::render('strategic-priorities/education'))->name('education');
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

require __DIR__.'/settings.php';
