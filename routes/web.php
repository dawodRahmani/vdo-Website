<?php

use App\Models\HeroSection;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

$heroPhotos = fn (string $key) => HeroSection::photosFor($key);

$spSlot = function (\App\Models\StrategicPriorityPage $page, string $slot): array {
    $path = $page->{$slot.'_path'};

    return [
        'url' => $path
            ? route('strategic-priorities.infographic.render', [
                'pageKey' => $page->page_key,
                'slot' => $slot,
            ]).'?v='.optional($page->updated_at)->timestamp
            : '',
        'alt' => $page->{$slot.'_alt'},
        'scale' => (int) ($page->{$slot.'_scale'} ?? 100),
        'offset_x' => (int) ($page->{$slot.'_offset_x'} ?? 0),
        'offset_y' => (int) ($page->{$slot.'_offset_y'} ?? 0),
    ];
};

$spPage = function (string $key) use ($spSlot) {
    $page = \App\Models\StrategicPriorityPage::where('page_key', $key)->first();
    if (! $page) {
        return null;
    }

    $infographic = $spSlot($page, 'infographic');
    $beneficiary = $spSlot($page, 'beneficiary');
    $extra = $spSlot($page, 'extra');

    return [
        'page_key' => $page->page_key,
        'heading' => $page->heading,
        'body' => $page->body,
        'between_body' => $page->between_body,
        // Flat fields kept for pages that haven't migrated to the slot object yet.
        'infographic_url' => $infographic['url'],
        'infographic_alt' => $infographic['alt'],
        'achievements_heading' => $page->achievements_heading,
        'beneficiary_url' => $beneficiary['url'],
        'beneficiary_alt' => $beneficiary['alt'],
        // Full per-slot payload (url + alt + scale + offsets).
        'infographics' => [
            'infographic' => $infographic,
            'beneficiary' => $beneficiary,
            'extra' => $extra,
        ],
        'bullets' => \App\Models\StrategicPriorityBullet::where('page_key', $key)
            ->orderBy('order')
            ->pluck('content')
            ->all(),
    ];
};

Route::get('/', function () use ($heroPhotos) {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
        'heroPhotos' => $heroPhotos('home'),
        'heroSlides' => \App\Models\HomeHeroSlide::active()->ordered()->get()
            ->map(fn ($s) => $s->toSlidePayload()),
        'impactStats' => \App\Models\HomeImpactStat::ordered()->get(),
        'priorityAreas' => \App\Models\HomePriorityArea::ordered()->get(),
        'prioritiesSection' => (function () {
            $s = \App\Models\HomeSetting::current();
            return [
                'offset_x' => (int) ($s->priorities_offset_x ?? 0),
                'offset_y' => (int) ($s->priorities_offset_y ?? 0),
                'scale' => (int) ($s->priorities_scale ?? 100),
            ];
        })(),
        'homeCommitments' => \App\Models\HomeCommitment::ordered()->get(),
        'homeCommitmentsLineGap' => (int) (\App\Models\HomeSetting::current()->commitments_line_gap ?? -12),
        'regionsImage' => (function () {
            $s = \App\Models\HomeSetting::current();
            return [
                'src' => $s->regions_image_url,
                'alt' => $s->regions_image_alt ?? '',
                'max_width' => $s->regions_image_max_width,
            ];
        })(),
        'latestNews' => \App\Models\NewsPost::published()->latest()->limit(2)->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'category' => $p->category,
                'body' => $p->body,
                'image_url' => $p->image_url,
                'published_at' => optional($p->published_at)->toDateString(),
            ]),
    ]);
})->name('home');

Route::get('/about', function () use ($heroPhotos) {
    return Inertia::render('about', [
        'leadershipRoles' => \App\Models\LeadershipRole::active()->ordered()->get(),
        'heroPhotos' => $heroPhotos('about'),
        'content' => \App\Models\AboutPage::current(),
    ]);
})->name('about');
Route::get('/render/strategic-priorities/{pageKey}/{slot}.svg', [\App\Http\Controllers\StrategicPriorityInfographicController::class, 'render'])
    ->where(['pageKey' => '[a-z0-9-]+', 'slot' => '(infographic|beneficiary|extra)'])
    ->name('strategic-priorities.infographic.render');

Route::get('/strategic-priorities', fn () => Inertia::render('strategic-priorities', [
    'heroPhotos' => HeroSection::photosFor('strategic-priorities'),
    'cards' => \App\Models\StrategicPriorityCard::ordered()->get(),
]))->name('strategic-priorities');
Route::prefix('strategic-priorities')->name('strategic-priorities.')->group(function () use ($heroPhotos, $spPage) {
    Route::get('education', function () use ($heroPhotos, $spPage) {
        return Inertia::render('strategic-priorities/education', [
            'segments' => \App\Models\EducationDonutSegment::active()->ordered()->get(),
            'regions' => \App\Models\Region::active()->ordered()->get(),
            'mapPins' => \App\Models\MapPin::active()->ordered()->get(),
            'heroPhotos' => $heroPhotos('strategic-priorities.education'),
            'content' => $spPage('education'),
        ]);
    })->name('education');
    Route::get('economic-growth', fn () => Inertia::render('strategic-priorities/economic-growth', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.economic-growth'),
        'content' => $spPage('economic-growth'),
    ]))->name('economic-growth');
    Route::get('rural-development', fn () => Inertia::render('strategic-priorities/rural-development', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.rural-development'),
        'content' => $spPage('rural-development'),
    ]))->name('rural-development');
    Route::get('health-and-nutrition', fn () => Inertia::render('strategic-priorities/health-and-nutrition', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.health-and-nutrition'),
        'content' => $spPage('health-and-nutrition'),
    ]))->name('health-and-nutrition');
    Route::get('emergency-response', fn () => Inertia::render('strategic-priorities/emergency-response', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.emergency-response'),
        'content' => $spPage('emergency-response'),
    ]))->name('emergency-response');
    Route::get('cross-cutting-areas', fn () => Inertia::render('strategic-priorities/cross-cutting-areas', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.cross-cutting-areas'),
        'content' => $spPage('cross-cutting-areas'),
    ]))->name('cross-cutting-areas');
    Route::get('target-group', fn () => Inertia::render('strategic-priorities/target-group', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.target-group'),
        'primary' => $spPage('target-group'),
        'secondary' => $spPage('secondary-beneficiaries'),
        'tertiary' => $spPage('tertiary-audience'),
    ]))->name('target-group');
    Route::redirect('secondary-beneficiaries', '/strategic-priorities/target-group#secondary')->name('secondary-beneficiaries');
    Route::redirect('tertiary-audience', '/strategic-priorities/target-group#tertiary')->name('tertiary-audience');
    Route::get('contribution-project', fn () => Inertia::render('strategic-priorities/contribution-project', [
        'heroPhotos' => HeroSection::photosFor('strategic-priorities.contribution-project'),
        'content' => $spPage('contribution-project'),
    ]))->name('contribution-project');
});
Route::get('/where-we-work', fn () => Inertia::render('where-we-work', [
    'heroPhotos' => HeroSection::photosFor('where-we-work'),
    'workRegions' => \App\Models\WorkRegion::active()->ordered()->get()->map(fn ($r) => [
        'id' => $r->id,
        'slug' => $r->slug,
        'title' => $r->title,
        'subtitle' => $r->subtitle,
        'body' => $r->body,
        'map_svg_url' => $r->map_svg_url,
        'video_url' => $r->video_url,
        'map_on_right' => $r->map_on_right,
    ]),
]))->name('where-we-work');
Route::post('/our-commitment/report', [\App\Http\Controllers\CommitmentReportController::class, 'store'])->name('our-commitment.report');
Route::get('/our-commitment', fn () => Inertia::render('our-commitment', [
    'heroPhotos' => HeroSection::photosFor('our-commitment'),
    'commitments' => \App\Models\Commitment::active()->ordered()->get()->map(fn ($c) => [
        'id' => $c->id,
        'slug' => $c->slug,
        'title' => $c->title,
        'body' => $c->body,
        'card_svg_url' => $c->card_svg_url,
        'size_scale' => (int) ($c->size_scale ?? 100),
        'offset_x' => (int) ($c->offset_x ?? 0),
        'offset_y' => (int) ($c->offset_y ?? 0),
    ]),
    'publications' => \App\Models\CommitmentPublication::active()->ordered()->get()->map(fn ($p) => [
        'id' => $p->id,
        'title' => $p->title,
        'cover_url' => $p->cover_url,
        'document_url' => $p->document_url,
        'size_scale' => (int) ($p->size_scale ?? 100),
        'offset_x' => (int) ($p->offset_x ?? 0),
        'offset_y' => (int) ($p->offset_y ?? 0),
    ]),
]))->name('our-commitment');
Route::get('/vdo-resilience', fn () => Inertia::render('vdo-resilience', [
    'heroPhotos' => HeroSection::photosFor('vdo-resilience'),
    'items' => \App\Models\ResilienceItem::active()->ordered()->get(),
]))->name('vdo-resilience');
Route::get('/opportunities', fn () => Inertia::render('opportunities', [
    'heroPhotos' => HeroSection::photosFor('opportunities'),
    'categories' => \App\Models\OpportunityCategory::active()->ordered()->get()->map(fn ($c) => [
        'id' => $c->id,
        'slug' => $c->slug,
        'title' => $c->title,
        'body' => $c->body,
        'icon_url' => $c->icon_url,
    ]),
    'listings' => \App\Models\OpportunityListing::active()
        ->ordered()
        ->with('category:id,slug,title')
        ->get()
        ->map(fn ($l) => [
            'id' => $l->id,
            'slug' => $l->slug,
            'category_slug' => $l->category?->slug,
            'category_title' => $l->category?->title,
            'title' => $l->title,
            'ref' => $l->ref,
            'summary' => $l->summary,
            'employment_type' => $l->employment_type,
            'experience_level' => $l->experience_level,
            'location' => $l->location,
            'deadline' => $l->deadline,
            'posted_at' => optional($l->posted_at)->toDateString(),
            'deadline_at' => optional($l->deadline_at)->toDateString(),
        ]),
]))->name('opportunities');

Route::get('/opportunities/{slug}', function (string $slug) {
    $l = \App\Models\OpportunityListing::active()
        ->where('slug', $slug)
        ->with('category:id,slug,title,icon_path')
        ->firstOrFail();

    return Inertia::render('opportunities/show', [
        'heroPhotos' => HeroSection::photosFor('opportunities'),
        'listing' => [
            'id' => $l->id,
            'slug' => $l->slug,
            'category_slug' => $l->category?->slug,
            'category_title' => $l->category?->title,
            'category_icon_url' => $l->category?->icon_url,
            'title' => $l->title,
            'ref' => $l->ref,
            'summary' => $l->summary,
            'description' => $l->description,
            'responsibilities' => $l->responsibilities,
            'requirements' => $l->requirements,
            'employment_type' => $l->employment_type,
            'experience_level' => $l->experience_level,
            'location' => $l->location,
            'deadline' => $l->deadline,
            'posted_at' => optional($l->posted_at)->toDateString(),
            'deadline_at' => optional($l->deadline_at)->toDateString(),
        ],
    ]);
})->name('opportunities.show');
Route::get('/media', fn () => Inertia::render('media', [
    'heroPhotos' => HeroSection::photosFor('media'),
    'items' => \App\Models\MediaItem::active()->ordered()->get(),
]))->name('media');
Route::get('/donate', fn () => Inertia::render('donate', [
    'heroPhotos' => HeroSection::photosFor('donate'),
    'items' => \App\Models\DonationItem::active()->ordered()->get(),
]))->name('donate');

Route::get('/search', [\App\Http\Controllers\SearchController::class, 'search'])->name('search');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $newsTotal = \App\Models\NewsPost::count();
        $newsPublished = \App\Models\NewsPost::where('is_published', true)->count();

        return Inertia::render('dashboard', [
            'stats' => [
                'news_total' => $newsTotal,
                'news_published' => $newsPublished,
                'news_drafts' => $newsTotal - $newsPublished,
                'hero_sections' => \App\Models\HeroSection::count(),
                'strategic_pages' => \App\Models\StrategicPriorityPage::count(),
                'regions' => \App\Models\Region::count(),
                'map_pins' => \App\Models\MapPin::count(),
                'leadership_roles' => \App\Models\LeadershipRole::count(),
            ],
            'recentNews' => \App\Models\NewsPost::latest()
                ->limit(5)
                ->get()
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'category' => $p->category,
                    'is_published' => (bool) $p->is_published,
                    'published_at' => optional($p->published_at)->toDateString(),
                    'updated_at' => $p->updated_at?->diffForHumans(),
                ]),
        ]);
    })->name('dashboard');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn () => redirect()->route('admin.map'))->name('home');
    Route::get('search', [\App\Http\Controllers\Admin\AdminSearchController::class, 'search'])->name('search');
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

    Route::get('hero-sections', [\App\Http\Controllers\Admin\AdminHeroSectionController::class, 'index'])->name('hero-sections');
    Route::post('hero-sections/{section}', [\App\Http\Controllers\Admin\AdminHeroSectionController::class, 'update'])->name('hero-sections.update');

    Route::get('about-page', [\App\Http\Controllers\Admin\AdminAboutPageController::class, 'index'])->name('about-page');
    Route::patch('about-page', [\App\Http\Controllers\Admin\AdminAboutPageController::class, 'update'])->name('about-page.update');

    Route::get('strategic-priorities', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'index'])->name('strategic-priorities');
    Route::get('strategic-priorities/hub', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'editHub'])->name('strategic-priorities.hub');
    Route::patch('strategic-priorities/cards/{card}', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'updateCard'])->name('strategic-priorities.cards.update');
    Route::get('strategic-priorities/page/{pageKey}', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'editPage'])->name('strategic-priorities.page');
    Route::post('strategic-priorities/page/{pageKey}', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'updatePage'])->name('strategic-priorities.page.update');
    Route::post('strategic-priorities/page/{pageKey}/bullets', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'storeBullet'])->name('strategic-priorities.bullets.store');
    Route::patch('strategic-priorities/bullets/{bullet}', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'updateBullet'])->name('strategic-priorities.bullets.update');
    Route::delete('strategic-priorities/bullets/{bullet}', [\App\Http\Controllers\Admin\AdminStrategicPrioritiesController::class, 'destroyBullet'])->name('strategic-priorities.bullets.destroy');

    Route::get('home-page', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'index'])->name('home-page');
    Route::post('home-page/hero/{section}', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updateHero'])->name('home-page.hero.update');
    Route::post('home-page/stats/{stat}', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updateStat'])->name('home-page.stats.update');
    Route::post('home-page/priorities/{priority}', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updatePriority'])->name('home-page.priorities.update');
    Route::post('home-page/priorities-section', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updatePrioritiesSection'])->name('home-page.priorities-section.update');
    Route::post('home-page/commitments/{commitment}', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updateCommitment'])->name('home-page.commitments.update');
    Route::post('home-page/regions', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updateRegions'])->name('home-page.regions.update');
    Route::post('home-page/hero-slides', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'storeHeroSlide'])->name('home-page.hero-slides.store');
    Route::post('home-page/hero-slides/{slide}', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'updateHeroSlide'])->name('home-page.hero-slides.update');
    Route::delete('home-page/hero-slides/{slide}', [\App\Http\Controllers\Admin\AdminHomePageController::class, 'destroyHeroSlide'])->name('home-page.hero-slides.destroy');

    Route::get('news', [\App\Http\Controllers\Admin\AdminNewsController::class, 'index'])->name('news');
    Route::post('news', [\App\Http\Controllers\Admin\AdminNewsController::class, 'store'])->name('news.store');
    Route::post('news/{post}', [\App\Http\Controllers\Admin\AdminNewsController::class, 'update'])->name('news.update');
    Route::delete('news/{post}', [\App\Http\Controllers\Admin\AdminNewsController::class, 'destroy'])->name('news.destroy');

    Route::get('donate', [\App\Http\Controllers\Admin\AdminDonateController::class, 'index'])->name('donate');
    Route::post('donate', [\App\Http\Controllers\Admin\AdminDonateController::class, 'store'])->name('donate.store');
    Route::patch('donate/{item}', [\App\Http\Controllers\Admin\AdminDonateController::class, 'update'])->name('donate.update');
    Route::delete('donate/{item}', [\App\Http\Controllers\Admin\AdminDonateController::class, 'destroy'])->name('donate.destroy');

    Route::get('media', [\App\Http\Controllers\Admin\AdminMediaController::class, 'index'])->name('media');
    Route::post('media', [\App\Http\Controllers\Admin\AdminMediaController::class, 'store'])->name('media.store');
    Route::post('media/{item}', [\App\Http\Controllers\Admin\AdminMediaController::class, 'update'])->name('media.update');
    Route::delete('media/{item}', [\App\Http\Controllers\Admin\AdminMediaController::class, 'destroy'])->name('media.destroy');

    Route::get('resilience/capacities', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'capacities'])->name('resilience.capacities');
    Route::get('resilience/policies', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'policies'])->name('resilience.policies');
    Route::get('resilience/programmatic-approach', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'programmaticApproach'])->name('resilience.programmatic-approach');
    Route::get('resilience/collective-resilience', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'collectiveResilience'])->name('resilience.collective-resilience');
    Route::post('resilience', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'store'])->name('resilience.store');
    Route::post('resilience/{item}', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'update'])->name('resilience.update');
    Route::delete('resilience/{item}', [\App\Http\Controllers\Admin\AdminResilienceController::class, 'destroy'])->name('resilience.destroy');

    Route::get('page-backgrounds', [\App\Http\Controllers\Admin\AdminPageBackgroundController::class, 'index'])->name('page-backgrounds');
    Route::patch('page-backgrounds/{page}', [\App\Http\Controllers\Admin\AdminPageBackgroundController::class, 'update'])->name('page-backgrounds.update');

    Route::get('opportunities', [\App\Http\Controllers\Admin\AdminOpportunityController::class, 'index'])->name('opportunities');
    Route::post('opportunities/categories/{category}', [\App\Http\Controllers\Admin\AdminOpportunityController::class, 'updateCategory'])->name('opportunities.categories.update');
    Route::post('opportunities/listings', [\App\Http\Controllers\Admin\AdminOpportunityController::class, 'storeListing'])->name('opportunities.listings.store');
    Route::patch('opportunities/listings/{listing}', [\App\Http\Controllers\Admin\AdminOpportunityController::class, 'updateListing'])->name('opportunities.listings.update');
    Route::delete('opportunities/listings/{listing}', [\App\Http\Controllers\Admin\AdminOpportunityController::class, 'destroyListing'])->name('opportunities.listings.destroy');

    Route::get('work-regions', [\App\Http\Controllers\Admin\AdminWorkRegionController::class, 'index'])->name('work-regions');
    Route::post('work-regions', [\App\Http\Controllers\Admin\AdminWorkRegionController::class, 'store'])->name('work-regions.store');
    Route::post('work-regions/{region}', [\App\Http\Controllers\Admin\AdminWorkRegionController::class, 'update'])->name('work-regions.update');
    Route::delete('work-regions/{region}', [\App\Http\Controllers\Admin\AdminWorkRegionController::class, 'destroy'])->name('work-regions.destroy');

    Route::get('home-commitments', [\App\Http\Controllers\Admin\AdminHomeCommitmentController::class, 'index'])->name('home-commitments');
    Route::post('home-commitments/line-gap', [\App\Http\Controllers\Admin\AdminHomeCommitmentController::class, 'updateLineGap'])->name('home-commitments.line-gap');
    Route::post('home-commitments', [\App\Http\Controllers\Admin\AdminHomeCommitmentController::class, 'store'])->name('home-commitments.store');
    Route::post('home-commitments/{homeCommitment}', [\App\Http\Controllers\Admin\AdminHomeCommitmentController::class, 'update'])->name('home-commitments.update');
    Route::delete('home-commitments/{homeCommitment}', [\App\Http\Controllers\Admin\AdminHomeCommitmentController::class, 'destroy'])->name('home-commitments.destroy');

    Route::get('commitments', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'index'])->name('commitments');
    Route::post('commitments', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'storeCommitment'])->name('commitments.store');
    Route::post('commitments/{commitment}', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'updateCommitment'])->name('commitments.update');
    Route::delete('commitments/{commitment}', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'destroyCommitment'])->name('commitments.destroy');
    Route::post('commitments/publications', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'storePublication'])->name('commitments.publications.store');
    Route::post('commitments/publications/{publication}', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'updatePublication'])->name('commitments.publications.update');
    Route::delete('commitments/publications/{publication}', [\App\Http\Controllers\Admin\AdminCommitmentController::class, 'destroyPublication'])->name('commitments.publications.destroy');

    Route::get('mail-settings', [\App\Http\Controllers\Admin\AdminMailSettingsController::class, 'edit'])->name('mail-settings');
    Route::patch('mail-settings', [\App\Http\Controllers\Admin\AdminMailSettingsController::class, 'update'])->name('mail-settings.update');
    Route::post('mail-settings/test', [\App\Http\Controllers\Admin\AdminMailSettingsController::class, 'sendTest'])->name('mail-settings.test');

    Route::get('users', [\App\Http\Controllers\Admin\AdminUserController::class, 'index'])->name('users');
    Route::post('users', [\App\Http\Controllers\Admin\AdminUserController::class, 'store'])->name('users.store');
    Route::patch('users/{user}', [\App\Http\Controllers\Admin\AdminUserController::class, 'update'])->name('users.update');
    Route::patch('users/{user}/password', [\App\Http\Controllers\Admin\AdminUserController::class, 'updatePassword'])->name('users.password.update');
    Route::delete('users/{user}', [\App\Http\Controllers\Admin\AdminUserController::class, 'destroy'])->name('users.destroy');

    Route::get('site/header', [\App\Http\Controllers\Admin\AdminSiteSettingsController::class, 'editHeader'])->name('site.header');
    Route::post('site/header', [\App\Http\Controllers\Admin\AdminSiteSettingsController::class, 'updateHeader'])->name('site.header.update');
    Route::get('site/footer', [\App\Http\Controllers\Admin\AdminSiteSettingsController::class, 'editFooter'])->name('site.footer');
    Route::patch('site/footer', [\App\Http\Controllers\Admin\AdminSiteSettingsController::class, 'updateFooter'])->name('site.footer.update');
});

require __DIR__.'/settings.php';
