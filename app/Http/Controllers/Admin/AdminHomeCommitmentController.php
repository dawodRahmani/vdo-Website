<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeCommitment;
use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminHomeCommitmentController extends Controller
{
    public function index()
    {
        $settings = HomeSetting::current();

        return Inertia::render('admin/home-commitments', [
            'commitments' => HomeCommitment::ordered()->get()->map(fn ($c) => [
                'id' => $c->id,
                'title' => $c->title,
                'svg_path' => $c->svg_path,
                'svg_url' => $c->svg_url,
                'order' => $c->order,
                'crop_scale' => $c->crop_scale ?? 100,
                'crop_offset_x' => $c->crop_offset_x ?? 0,
                'crop_offset_y' => $c->crop_offset_y ?? 0,
            ]),
            'lineGap' => (int) ($settings->commitments_line_gap ?? -12),
        ]);
    }

    public function updateLineGap(Request $request)
    {
        $data = $request->validate([
            'commitments_line_gap' => 'required|integer|min:-60|max:60',
        ]);

        HomeSetting::current()->update([
            'commitments_line_gap' => (int) $data['commitments_line_gap'],
        ]);

        return back();
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        if ($request->hasFile('svg_file')) {
            $data['svg_path'] = $request->file('svg_file')->store('home-commitments', 'public');
        }

        HomeCommitment::create($data);

        return back();
    }

    public function update(Request $request, HomeCommitment $homeCommitment)
    {
        $data = $this->validated($request);

        if ($request->hasFile('svg_file')) {
            $this->deleteStoredIcon($homeCommitment);
            $data['svg_path'] = $request->file('svg_file')->store('home-commitments', 'public');
        } elseif ($request->boolean('clear_svg')) {
            $this->deleteStoredIcon($homeCommitment);
            $data['svg_path'] = null;
        }

        $homeCommitment->update($data);

        return back();
    }

    public function destroy(HomeCommitment $homeCommitment)
    {
        $this->deleteStoredIcon($homeCommitment);
        $homeCommitment->delete();

        return back();
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => 'required|string|max:191',
            'order' => 'required|integer|min:0',
            'svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
            'clear_svg' => 'nullable|boolean',
            'crop_scale' => 'nullable|integer|min:50|max:400',
            'crop_offset_x' => 'nullable|integer|min:-300|max:300',
            'crop_offset_y' => 'nullable|integer|min:-300|max:300',
        ]);

        return [
            'title' => $data['title'],
            'order' => (int) $data['order'],
            'crop_scale' => (int) ($data['crop_scale'] ?? 100),
            'crop_offset_x' => (int) ($data['crop_offset_x'] ?? 0),
            'crop_offset_y' => (int) ($data['crop_offset_y'] ?? 0),
        ];
    }

    private function deleteStoredIcon(HomeCommitment $commitment): void
    {
        if ($commitment->svg_path && Str::startsWith($commitment->svg_path, 'home-commitments/')) {
            Storage::disk('public')->delete($commitment->svg_path);
        }
    }
}
