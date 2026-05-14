<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminNewsController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/news', [
            'posts' => NewsPost::latest()->get()->map(fn ($p) => $this->shape($p)),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->makeUniqueSlug($data['title']);

        if ($request->hasFile('image_file')) {
            $data['image_path'] = $request->file('image_file')->store('news', 'public');
        }
        unset($data['image_file']);

        NewsPost::create($data);

        return back();
    }

    public function update(Request $request, NewsPost $post)
    {
        $data = $this->validated($request);

        if ($data['title'] !== $post->title) {
            $data['slug'] = $this->makeUniqueSlug($data['title'], $post->id);
        }

        if ($request->hasFile('image_file')) {
            if ($post->image_path && Str::startsWith($post->image_path, ['news/'])) {
                Storage::disk('public')->delete($post->image_path);
            }
            $data['image_path'] = $request->file('image_file')->store('news', 'public');
        }
        unset($data['image_file']);

        $post->update($data);

        return back();
    }

    public function destroy(NewsPost $post)
    {
        if ($post->image_path && Str::startsWith($post->image_path, ['news/'])) {
            Storage::disk('public')->delete($post->image_path);
        }
        $post->delete();

        return back();
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'body' => 'nullable|string|max:20000',
            'published_at' => 'nullable|date',
            'is_published' => 'required|boolean',
            'image_file' => 'nullable|image|max:8192',
        ]);
    }

    private function makeUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'post';
        $slug = $base;
        $n = 2;
        while (
            NewsPost::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base.'-'.$n++;
        }

        return $slug;
    }

    private function shape(NewsPost $p): array
    {
        return [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'category' => $p->category,
            'body' => $p->body,
            'image_url' => $p->image_url,
            'published_at' => optional($p->published_at)->toDateString(),
            'is_published' => $p->is_published,
        ];
    }
}
