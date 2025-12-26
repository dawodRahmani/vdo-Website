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

// About Us Routes
Route::prefix('about')->name('about.')->group(function () {
    Route::get('history', function () {
        return Inertia::render('about/history');
    })->name('history');

    Route::get('policies', function () {
        return Inertia::render('about/policies');
    })->name('policies');

    Route::get('capacity', function () {
        return Inertia::render('about/capacity');
    })->name('capacity');

    Route::get('outreach-contribution', function () {
        return Inertia::render('about/outreach-contribution');
    })->name('outreach-contribution');

    // Our Commitment Routes
    Route::get('humanitarian-principles', function () {
        return Inertia::render('about/commitment/humanitarian-principles');
    })->name('humanitarian-principles');

    Route::get('aid-diversion', function () {
        return Inertia::render('about/commitment/aid-diversion');
    })->name('aid-diversion');

    Route::get('aap', function () {
        return Inertia::render('about/commitment/aap');
    })->name('aap');

    Route::get('safeguarding-beneficiaries', function () {
        return Inertia::render('about/commitment/safeguarding-beneficiaries');
    })->name('safeguarding-beneficiaries');

    Route::get('zero-tolerance-pseah', function () {
        return Inertia::render('about/commitment/zero-tolerance-pseah');
    })->name('zero-tolerance-pseah');
});

// Our Work Routes
Route::prefix('work')->name('work.')->group(function () {
    Route::get('programmatic-approach', function () {
        return Inertia::render('work/programmatic-approach');
    })->name('programmatic-approach');

    Route::get('where-we-work', function () {
        return Inertia::render('work/where-we-work');
    })->name('where-we-work');

    Route::get('target-groups', function () {
        return Inertia::render('work/target-groups');
    })->name('target-groups');

    // Thematic Area Routes
    Route::prefix('thematic')->name('thematic.')->group(function () {
        Route::get('education', function () {
            return Inertia::render('work/thematic/education');
        })->name('education');

        Route::get('economic-growth', function () {
            return Inertia::render('work/thematic/economic-growth');
        })->name('economic-growth');

        Route::get('urban-development', function () {
            return Inertia::render('work/thematic/urban-development');
        })->name('urban-development');

        Route::get('health-nutrition', function () {
            return Inertia::render('work/thematic/health-nutrition');
        })->name('health-nutrition');

        Route::get('emergency-response', function () {
            return Inertia::render('work/thematic/emergency-response');
        })->name('emergency-response');
    });
});

// Media Routes
Route::prefix('media')->name('media.')->group(function () {
    Route::get('news', function () {
        return Inertia::render('media/news');
    })->name('news');

    Route::get('press-release', function () {
        return Inertia::render('media/press-release');
    })->name('press-release');

    Route::get('publications', function () {
        return Inertia::render('media/publications');
    })->name('publications');

    Route::get('project-snapshot', function () {
        return Inertia::render('media/project-snapshot');
    })->name('project-snapshot');

    Route::get('documentary', function () {
        return Inertia::render('media/documentary');
    })->name('documentary');
});

// Opportunities Routes
Route::prefix('opportunities')->name('opportunities.')->group(function () {
    Route::get('jobs', function () {
        return Inertia::render('opportunities/jobs');
    })->name('jobs');

    Route::get('bids', function () {
        return Inertia::render('opportunities/bids');
    })->name('bids');

    Route::get('participation', function () {
        return Inertia::render('opportunities/participation');
    })->name('participation');

    Route::get('volunteers', function () {
        return Inertia::render('opportunities/volunteers');
    })->name('volunteers');

    Route::get('vacancy-announcement', function () {
        return Inertia::render('opportunities/vacancy-announcement');
    })->name('vacancy-announcement');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
