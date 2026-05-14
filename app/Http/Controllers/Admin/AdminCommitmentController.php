<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commitment;
use App\Models\CommitmentPublication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminCommitmentController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/commitments', [
            'commitments' => Commitment::ordered()->get()->map(fn ($c) => [
                'id' => $c->id,
                'slug' => $c->slug,
                'title' => $c->title,
                'body' => $c->body,
                'card_svg_path' => $c->card_svg_path,
                'card_svg_url' => $c->card_svg_url,
                'order' => $c->order,
                'is_active' => $c->is_active,
            ]),
            'publications' => CommitmentPublication::ordered()->get()->map(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'cover_path' => $p->cover_path,
                'cover_url' => $p->cover_url,
                'order' => $p->order,
                'is_active' => $p->is_active,
            ]),
        ]);
    }

    public function storeCommitment(Request $request)
    {
        $data = $this->validatedCommitment($request, slugRequired: true);

        if ($request->hasFile('card_svg_file')) {
            $data['card_svg_path'] = $request->file('card_svg_file')->store('commitments', 'public');
        }

        Commitment::create($data);

        return back();
    }

    public function updateCommitment(Request $request, Commitment $commitment)
    {
        $data = $this->validatedCommitment($request, slugRequired: false);

        if ($request->hasFile('card_svg_file')) {
            if ($commitment->card_svg_path && Str::startsWith($commitment->card_svg_path, 'commitments/')) {
                Storage::disk('public')->delete($commitment->card_svg_path);
            }
            $data['card_svg_path'] = $request->file('card_svg_file')->store('commitments', 'public');
        } elseif ($request->boolean('clear_card_svg')) {
            if ($commitment->card_svg_path && Str::startsWith($commitment->card_svg_path, 'commitments/')) {
                Storage::disk('public')->delete($commitment->card_svg_path);
            }
            $data['card_svg_path'] = null;
        }

        $commitment->update($data);

        return back();
    }

    public function destroyCommitment(Commitment $commitment)
    {
        if ($commitment->card_svg_path && Str::startsWith($commitment->card_svg_path, 'commitments/')) {
            Storage::disk('public')->delete($commitment->card_svg_path);
        }
        $commitment->delete();

        return back();
    }

    public function storePublication(Request $request)
    {
        $data = $this->validatedPublication($request);

        if ($request->hasFile('cover_file')) {
            $data['cover_path'] = $request->file('cover_file')->store('commitment-publications', 'public');
        }

        CommitmentPublication::create($data);

        return back();
    }

    public function updatePublication(Request $request, CommitmentPublication $publication)
    {
        $data = $this->validatedPublication($request);

        if ($request->hasFile('cover_file')) {
            if ($publication->cover_path && Str::startsWith($publication->cover_path, 'commitment-publications/')) {
                Storage::disk('public')->delete($publication->cover_path);
            }
            $data['cover_path'] = $request->file('cover_file')->store('commitment-publications', 'public');
        } elseif ($request->boolean('clear_cover')) {
            if ($publication->cover_path && Str::startsWith($publication->cover_path, 'commitment-publications/')) {
                Storage::disk('public')->delete($publication->cover_path);
            }
            $data['cover_path'] = null;
        }

        $publication->update($data);

        return back();
    }

    public function destroyPublication(CommitmentPublication $publication)
    {
        if ($publication->cover_path && Str::startsWith($publication->cover_path, 'commitment-publications/')) {
            Storage::disk('public')->delete($publication->cover_path);
        }
        $publication->delete();

        return back();
    }

    private function validatedCommitment(Request $request, bool $slugRequired): array
    {
        $rules = [
            'title' => 'required|string|max:191',
            'body' => 'required|string|max:5000',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'card_svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
            'clear_card_svg' => 'nullable|boolean',
        ];

        if ($slugRequired) {
            $rules['slug'] = 'required|string|max:120|unique:commitments,slug';
        }

        $data = $request->validate($rules);

        return [
            'title' => $data['title'],
            'body' => $data['body'],
            'order' => (int) $data['order'],
            'is_active' => $request->boolean('is_active'),
        ] + ($slugRequired ? ['slug' => $data['slug']] : []);
    }

    private function validatedPublication(Request $request): array
    {
        $request->validate([
            'title' => 'required|string|max:191',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'cover_file' => 'nullable|image|max:4096',
            'clear_cover' => 'nullable|boolean',
        ]);

        return [
            'title' => $request->input('title'),
            'order' => (int) $request->input('order'),
            'is_active' => $request->boolean('is_active'),
        ];
    }
}
