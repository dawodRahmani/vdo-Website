<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAboutPageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/about-page', [
            'content' => AboutPage::current(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'executive_heading' => 'nullable|string|max:191',
            'executive_subheading' => 'nullable|string|max:255',
            'executive_body' => 'nullable|string|max:20000',
            'history_heading' => 'nullable|string|max:191',
            'history_body' => 'nullable|string|max:20000',
            'coordination_intro' => 'nullable|string|max:2000',
            'coordination_outro' => 'nullable|string|max:2000',
            'mission_lead' => 'nullable|string|max:120',
            'mission_body' => 'nullable|string|max:5000',
            'vision_lead' => 'nullable|string|max:120',
            'vision_body' => 'nullable|string|max:5000',
            'looking_ahead_heading' => 'nullable|string|max:191',
            'looking_ahead_subheading' => 'nullable|string|max:255',
            'looking_ahead_body' => 'nullable|string|max:20000',
        ]);

        AboutPage::current()->update($validated);

        return back();
    }
}
