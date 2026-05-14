<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminMediaController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/media', [
            'items' => MediaItem::ordered()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);

        if ($request->hasFile('image_file')) {
            $data['image'] = $request->file('image_file')->store('media-items', 'public');
        }

        unset($data['image_file']);
        MediaItem::create($data);

        return back();
    }

    public function update(Request $request, MediaItem $item)
    {
        $data = $this->validatedData($request);

        if ($request->hasFile('image_file')) {
            $this->deleteImageIfStored($item);
            $data['image'] = $request->file('image_file')->store('media-items', 'public');
        } elseif ($request->boolean('clear_image')) {
            $this->deleteImageIfStored($item);
            $data['image'] = null;
        }

        unset($data['image_file'], $data['clear_image']);
        $item->update($data);

        return back();
    }

    public function destroy(MediaItem $item)
    {
        $this->deleteImageIfStored($item);
        $item->delete();

        return back();
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'kind' => ['required', Rule::in([
                MediaItem::KIND_DOCUMENTARY,
                MediaItem::KIND_PHOTO,
                MediaItem::KIND_PUBLICATION,
            ])],
            'title' => 'nullable|string|max:191',
            'video_url' => 'nullable|string|max:500',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'image_file' => 'nullable|image|max:5120',
            'clear_image' => 'nullable|boolean',
        ]);
    }

    private function deleteImageIfStored(MediaItem $item): void
    {
        // Only delete if the image lives in the public disk (storage path).
        // Seeded items reference public folder paths like "/Header and Gallary Photos/..."
        if ($item->image && ! str_starts_with($item->image, '/') && ! str_starts_with($item->image, 'http')) {
            Storage::disk('public')->delete($item->image);
        }
    }
}
