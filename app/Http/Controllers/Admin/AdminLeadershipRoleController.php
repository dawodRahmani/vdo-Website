<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LeadershipRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminLeadershipRoleController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/leadership-roles', [
            'roles' => LeadershipRole::ordered()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);

        if ($request->hasFile('icon_image_file')) {
            $data['icon_image'] = $request
                ->file('icon_image_file')
                ->store('leadership-roles', 'public');
            $data['pin_style'] = 'image';
        }

        LeadershipRole::create($data);

        return back();
    }

    public function update(Request $request, LeadershipRole $role)
    {
        $data = $this->validatedData($request);

        if ($request->hasFile('icon_image_file')) {
            if ($role->icon_image) {
                Storage::disk('public')->delete($role->icon_image);
            }
            $data['icon_image'] = $request
                ->file('icon_image_file')
                ->store('leadership-roles', 'public');
            $data['pin_style'] = 'image';
        } elseif ($request->boolean('clear_icon_image')) {
            if ($role->icon_image) {
                Storage::disk('public')->delete($role->icon_image);
            }
            $data['icon_image'] = null;
        }

        $role->update($data);

        return back();
    }

    public function destroy(LeadershipRole $role)
    {
        if ($role->icon_image) {
            Storage::disk('public')->delete($role->icon_image);
        }
        $role->delete();

        return back();
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:191',
            'body' => 'required|string|max:2000',
            'color' => 'required|string|max:32',
            'pin_style' => 'required|in:balloon,icon,image',
            'icon_name' => 'nullable|string|max:64',
            'icon_image_file' => 'nullable|image|max:2048',
            'pos_x' => 'required|numeric|min:0|max:100',
            'pos_y' => 'required|numeric|min:0|max:100',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);
    }
}
