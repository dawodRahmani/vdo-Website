<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DonationItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminDonateController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/donate', [
            'items' => DonationItem::ordered()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        DonationItem::create($data);

        return back();
    }

    public function update(Request $request, DonationItem $item)
    {
        $data = $this->validatedData($request);
        $item->update($data);

        return back();
    }

    public function destroy(DonationItem $item)
    {
        $item->delete();

        return back();
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'kind' => ['required', Rule::in([DonationItem::KIND_INTRO, DonationItem::KIND_CAUSE, DonationItem::KIND_METHOD])],
            'icon_name' => 'required|string|max:60',
            'title' => 'required|string|max:191',
            'body' => 'required|string|max:4000',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);
    }
}
