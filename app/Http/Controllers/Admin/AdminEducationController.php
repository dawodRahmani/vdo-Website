<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EducationDonutSegment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminEducationController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/education-segments', [
            'segments' => EducationDonutSegment::ordered()->get(),
        ]);
    }

    public function storeSegment(Request $request)
    {
        $data = $request->validate([
            'label' => 'required|string|max:120',
            'percent' => 'required|numeric|min:0|max:100',
            'color' => 'required|string|max:32',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        EducationDonutSegment::create($data);

        return back();
    }

    public function updateSegment(Request $request, EducationDonutSegment $segment)
    {
        $data = $request->validate([
            'label' => 'required|string|max:120',
            'percent' => 'required|numeric|min:0|max:100',
            'color' => 'required|string|max:32',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $segment->update($data);

        return back();
    }

    public function destroySegment(EducationDonutSegment $segment)
    {
        $segment->delete();

        return back();
    }
}
