<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OpportunityCategory;
use App\Models\OpportunityListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminOpportunityController extends Controller
{
    public function index()
    {
        $categories = OpportunityCategory::ordered()->get()->map(fn ($c) => [
            'id' => $c->id,
            'slug' => $c->slug,
            'title' => $c->title,
            'body' => $c->body,
            'icon_path' => $c->icon_path,
            'icon_url' => $c->icon_url,
            'order' => $c->order,
            'is_active' => $c->is_active,
        ]);

        $listings = OpportunityListing::ordered()
            ->with('category:id,slug,title')
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'category_id' => $l->category_id,
                'slug' => $l->slug,
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
                'order' => $l->order,
                'is_active' => $l->is_active,
            ]);

        return Inertia::render('admin/opportunities', [
            'categories' => $categories,
            'listings' => $listings,
        ]);
    }

    public function updateCategory(Request $request, OpportunityCategory $category)
    {
        $request->validate([
            'title' => 'required|string|max:120',
            'body' => 'required|string|max:5000',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'icon_file' => 'nullable|image|max:4096',
            'clear_icon' => 'nullable|boolean',
        ]);

        $data = [
            'title' => $request->input('title'),
            'body' => $request->input('body'),
            'order' => (int) $request->input('order'),
            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('icon_file')) {
            if ($category->icon_path && Str::startsWith($category->icon_path, 'opportunities/')) {
                Storage::disk('public')->delete($category->icon_path);
            }
            $data['icon_path'] = $request->file('icon_file')->store('opportunities', 'public');
        } elseif ($request->boolean('clear_icon')) {
            if ($category->icon_path && Str::startsWith($category->icon_path, 'opportunities/')) {
                Storage::disk('public')->delete($category->icon_path);
            }
            $data['icon_path'] = null;
        }

        $category->update($data);

        return back();
    }

    public function storeListing(Request $request)
    {
        $data = $this->validatedListing($request);

        OpportunityListing::create($data);

        return back();
    }

    public function updateListing(Request $request, OpportunityListing $listing)
    {
        $data = $this->validatedListing($request);
        $listing->update($data);

        return back();
    }

    public function destroyListing(OpportunityListing $listing)
    {
        $listing->delete();

        return back();
    }

    private function validatedListing(Request $request): array
    {
        $data = $request->validate([
            'category_id' => 'required|exists:opportunity_categories,id',
            'title' => 'required|string|max:191',
            'ref' => 'nullable|string|max:64',
            'summary' => 'required|string|max:2000',
            'description' => 'nullable|string|max:50000',
            'responsibilities' => 'nullable|string|max:50000',
            'requirements' => 'nullable|string|max:50000',
            'employment_type' => 'nullable|in:'.implode(',', self::EMPLOYMENT_TYPES),
            'experience_level' => 'nullable|in:'.implode(',', self::EXPERIENCE_LEVELS),
            'location' => 'nullable|string|max:120',
            'deadline' => 'nullable|string|max:120',
            'posted_at' => 'nullable|date',
            'deadline_at' => 'nullable|date',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);
        $data['is_active'] = $request->boolean('is_active');
        return $data;
    }

    private const EMPLOYMENT_TYPES = [
        'full-time',
        'part-time',
        'contract',
        'volunteer',
        'internship',
        'consultancy',
    ];

    private const EXPERIENCE_LEVELS = [
        'entry',
        'mid',
        'senior',
    ];
}
