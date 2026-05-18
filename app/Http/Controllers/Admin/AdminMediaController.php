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
        if ($request->hasFile('video_file')) {
            $data['video_path'] = $request->file('video_file')->store('media-videos', 'public');
        }

        unset($data['image_file'], $data['video_file'], $data['clear_image'], $data['clear_video']);
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

        if ($request->hasFile('video_file')) {
            $this->deleteVideoIfStored($item);
            $data['video_path'] = $request->file('video_file')->store('media-videos', 'public');
        } elseif ($request->boolean('clear_video')) {
            $this->deleteVideoIfStored($item);
            $data['video_path'] = null;
        }

        unset(
            $data['image_file'],
            $data['clear_image'],
            $data['video_file'],
            $data['clear_video'],
        );
        $item->update($data);

        return back();
    }

    public function destroy(MediaItem $item)
    {
        $this->deleteImageIfStored($item);
        $this->deleteVideoIfStored($item);
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
            'size_scale' => 'nullable|integer|min:40|max:150',
            'image_file' => 'nullable|image|max:5120',
            'clear_image' => 'nullable|boolean',
            // Up to ~100 MB per video (Laravel kilobytes). Larger files require
            // chunked upload + bumping PHP upload_max_filesize / post_max_size.
            'video_file' => 'nullable|file|mimetypes:video/mp4,video/webm,video/quicktime,video/ogg|max:102400',
            'clear_video' => 'nullable|boolean',
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

    private function deleteVideoIfStored(MediaItem $item): void
    {
        if ($item->video_path && ! str_starts_with($item->video_path, '/') && ! str_starts_with($item->video_path, 'http')) {
            Storage::disk('public')->delete($item->video_path);
        }
    }
}
