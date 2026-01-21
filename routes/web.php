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

// Contact Us Route
Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

// About Us Routes
Route::get('/about', function () {
    return Inertia::render('about/index');
})->name('about');

Route::prefix('about')->name('about.')->group(function () {
    Route::get('executive-summary', function () {
        return Inertia::render('about/index', ['scrollTo' => 'executive-summary']);
    })->name('executive-summary');

    Route::get('history', function () {
        return Inertia::render('about/index', ['scrollTo' => 'history']);
    })->name('history-section');

    Route::get('looking-ahead', function () {
        return Inertia::render('about/index', ['scrollTo' => 'looking-ahead']);
    })->name('looking-ahead');

    Route::get('best-practices', function () {
        return Inertia::render('about/index', ['scrollTo' => 'best-practices']);
    })->name('best-practices');

    Route::get('strength', function () {
        return Inertia::render('about/index', ['scrollTo' => 'strength']);
    })->name('strength');

    Route::get('history-page', function () {
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

// Organization Capacity Routes
Route::get('/organization-capacity', function () {
    return Inertia::render('organization/index');
})->name('organization-capacity');

Route::prefix('organization')->name('organization.')->group(function () {
    Route::get('capacity', function () {
        return Inertia::render('organization/index', ['scrollTo' => 'our-capacity']);
    })->name('capacity');

    Route::get('policies', function () {
        return Inertia::render('organization/index', ['scrollTo' => 'policies']);
    })->name('policies');

    Route::get('programmatic-approach', function () {
        return Inertia::render('organization/index', ['scrollTo' => 'programmatic-approach']);
    })->name('programmatic-approach');

    Route::get('localization-framework', function () {
        return Inertia::render('organization/index', ['scrollTo' => 'localization-framework']);
    })->name('localization-framework');

    Route::get('stakeholder-engagement', function () {
        return Inertia::render('organization/index', ['scrollTo' => 'stakeholder-engagement']);
    })->name('stakeholder-engagement');

    Route::get('governance', function () {
        return Inertia::render('organization/index', ['scrollTo' => 'governance']);
    })->name('governance');
});

// Where We Work Routes
Route::get('/where-we-work', function () {
    return Inertia::render('work/where-we-work');
})->name('where-we-work');

Route::prefix('where-we-work')->name('where-we-work.')->group(function () {
    Route::get('map', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'map']);
    })->name('map');

    Route::get('area-based', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'area-based']);
    })->name('area-based');

    Route::get('offices', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'offices']);
    })->name('offices');

    // Regional routes
    Route::get('central', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'central']);
    })->name('central');

    Route::get('northern', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'northern']);
    })->name('northern');

    Route::get('eastern', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'eastern']);
    })->name('eastern');

    Route::get('western', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'western']);
    })->name('western');

    Route::get('southern', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'southern']);
    })->name('southern');

    Route::get('northwestern', function () {
        return Inertia::render('work/where-we-work', ['scrollTo' => 'northwestern']);
    })->name('northwestern');
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

// Strategic Priorities Routes
Route::get('/strategic-priorities', function () {
    return Inertia::render('strategic/index');
})->name('strategic-priorities');

Route::prefix('strategic-priorities')->name('strategic.')->group(function () {
    Route::get('education', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'education']);
    })->name('education');

    Route::get('health-nutrition', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'health-nutrition']);
    })->name('health-nutrition');

    Route::get('economic-growth', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'economic-growth']);
    })->name('economic-growth');

    Route::get('rural-urban-development', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'urban-development']);
    })->name('urban-development');

    Route::get('emergency-response', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'emergency-response']);
    })->name('emergency-response');

    Route::get('achievements', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'achievements']);
    })->name('achievements');

    Route::get('cross-cutting', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'cross-cutting']);
    })->name('cross-cutting');

    Route::get('target-group', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'target-groups']);
    })->name('target-groups');

    Route::get('vdo-contribution', function () {
        return Inertia::render('strategic/index', ['scrollTo' => 'vdo-contribution']);
    })->name('vdo-contribution');
});

// Our Commitment Routes
Route::get('/our-commitment', function () {
    return Inertia::render('commitment/index');
})->name('our-commitment');

Route::prefix('commitment')->name('commitment.')->group(function () {
    Route::get('inclusivity', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'inclusivity']);
    })->name('inclusivity');

    Route::get('aap', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'aap']);
    })->name('aap');

    Route::get('safeguarding', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'safeguarding']);
    })->name('safeguarding');

    Route::get('pseah', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'pseah']);
    })->name('pseah');

    Route::get('anti-fraud', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'anti-fraud']);
    })->name('anti-fraud');

    Route::get('effectiveness', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'effectiveness']);
    })->name('effectiveness');

    Route::get('impact', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'impact']);
    })->name('impact');

    Route::get('aid-diversion', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'aid-diversion']);
    })->name('aid-diversion');

    Route::get('humanitarian-principles', function () {
        return Inertia::render('commitment/index', ['scrollTo' => 'humanitarian-principles']);
    })->name('humanitarian-principles');
});

// Media Routes
Route::prefix('media')->name('media.')->group(function () {
    Route::get('news', function () {
        return Inertia::render('media/coming-soon', ['section' => 'News']);
    })->name('news');

    Route::get('press-release', function () {
        return Inertia::render('media/coming-soon', ['section' => 'Press Release']);
    })->name('press-release');

    Route::get('publications', function () {
        return Inertia::render('media/coming-soon', ['section' => 'Publications']);
    })->name('publications');

    Route::get('project-snapshot', function () {
        return Inertia::render('media/coming-soon', ['section' => 'Project Snapshot']);
    })->name('project-snapshot');

    Route::get('documentary', function () {
        return Inertia::render('media/coming-soon', ['section' => 'Documentary']);
    })->name('documentary');

    Route::get('success-story', function () {
        return Inertia::render('media/coming-soon', ['section' => 'Success Story']);
    })->name('success-story');
});

// Donate Route
Route::get('/donate', function () {
    return Inertia::render('donate/index');
})->name('donate');

// Opportunities Routes
Route::get('/opportunities', function () {
    return Inertia::render('opportunities/index');
})->name('opportunities');

Route::prefix('opportunities')->name('opportunities.')->group(function () {
    Route::get('bids-section', function () {
        return Inertia::render('opportunities/index', ['scrollTo' => 'bids']);
    })->name('bids-section');

    Route::get('jobs-section', function () {
        return Inertia::render('opportunities/index', ['scrollTo' => 'jobs']);
    })->name('jobs-section');

    Route::get('volunteer-section', function () {
        return Inertia::render('opportunities/index', ['scrollTo' => 'volunteer']);
    })->name('volunteer-section');

    Route::get('participation-section', function () {
        return Inertia::render('opportunities/index', ['scrollTo' => 'participation']);
    })->name('participation-section');

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
