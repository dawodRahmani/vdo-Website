<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MapPin;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMapController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/map', [
            'regions' => Region::ordered()->get(),
            'mapPins' => MapPin::ordered()->get(),
        ]);
    }

    public function updateRegion(Request $request, Region $region)
    {
        $data = $request->validate([
            'label' => 'nullable|string|max:120',
            'color' => 'required|string|max:32',
            'label_x' => 'required|numeric|min:0|max:100',
            'label_y' => 'required|numeric|min:0|max:100',
            'label_two_line' => 'required|boolean',
            'is_active' => 'required|boolean',
        ]);

        $region->update($data);

        return back();
    }

    public function storePin(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:120',
            'region_label' => 'required|string|max:120',
            'description' => 'nullable|string|max:255',
            'stats' => 'nullable|string|max:255',
            'x' => 'required|numeric|min:0|max:100',
            'y' => 'required|numeric|min:0|max:100',
            'color' => 'required|string|max:32',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        MapPin::create($data);

        return back();
    }

    public function updatePin(Request $request, MapPin $pin)
    {
        $data = $request->validate([
            'name' => 'required|string|max:120',
            'region_label' => 'required|string|max:120',
            'description' => 'nullable|string|max:255',
            'stats' => 'nullable|string|max:255',
            'x' => 'required|numeric|min:0|max:100',
            'y' => 'required|numeric|min:0|max:100',
            'color' => 'required|string|max:32',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $pin->update($data);

        return back();
    }

    public function destroyPin(MapPin $pin)
    {
        $pin->delete();

        return back();
    }
}
