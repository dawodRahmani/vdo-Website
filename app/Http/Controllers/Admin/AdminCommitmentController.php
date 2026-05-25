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
                'size_scale' => (int) ($c->size_scale ?? 100),
                'offset_x' => (int) ($c->offset_x ?? 0),
                'offset_y' => (int) ($c->offset_y ?? 0),
                'order' => $c->order,
                'is_active' => $c->is_active,
            ]),
            'publications' => CommitmentPublication::ordered()->get()->map(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'cover_path' => $p->cover_path,
                'cover_url' => $p->cover_url,
                'document_path' => $p->document_path,
                'document_url' => $p->document_url,
                'size_scale' => (int) ($p->size_scale ?? 100),
                'offset_x' => (int) ($p->offset_x ?? 0),
                'offset_y' => (int) ($p->offset_y ?? 0),
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
        if ($request->hasFile('document_file')) {
            $data['document_path'] = $request->file('document_file')->store('commitment-publication-documents', 'public');
        }

        CommitmentPublication::create($data);

        return back();
    }

    public function updatePublication(Request $request, CommitmentPublication $publication)
    {
        $data = $this->validatedPublication($request);

        if ($request->hasFile('cover_file')) {
            $this->deletePublicationCover($publication);
            $data['cover_path'] = $request->file('cover_file')->store('commitment-publications', 'public');
        } elseif ($request->boolean('clear_cover')) {
            $this->deletePublicationCover($publication);
            $data['cover_path'] = null;
        }

        if ($request->hasFile('document_file')) {
            $this->deletePublicationDocument($publication);
            $data['document_path'] = $request->file('document_file')->store('commitment-publication-documents', 'public');
        } elseif ($request->boolean('clear_document')) {
            $this->deletePublicationDocument($publication);
            $data['document_path'] = null;
        }

        $publication->update($data);

        return back();
    }

    public function destroyPublication(CommitmentPublication $publication)
    {
        $this->deletePublicationCover($publication);
        $this->deletePublicationDocument($publication);
        $publication->delete();

        return back();
    }

    private function deletePublicationCover(CommitmentPublication $publication): void
    {
        if ($publication->cover_path && Str::startsWith($publication->cover_path, 'commitment-publications/')) {
            Storage::disk('public')->delete($publication->cover_path);
        }
    }

    private function deletePublicationDocument(CommitmentPublication $publication): void
    {
        if ($publication->document_path && Str::startsWith($publication->document_path, 'commitment-publication-documents/')) {
            Storage::disk('public')->delete($publication->document_path);
        }
    }

    private function validatedCommitment(Request $request, bool $slugRequired): array
    {
        $rules = [
            'title' => 'required|string|max:191',
            'body' => 'required|string|max:5000',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'size_scale' => 'nullable|integer|min:50|max:200',
            'offset_x' => 'nullable|integer|min:-200|max:200',
            'offset_y' => 'nullable|integer|min:-200|max:200',
            'card_svg_file' => 'nullable|file|mimes:svg,png,jpg,jpeg,webp|max:4096',
            'clear_card_svg' => 'nullable|boolean',
        ];

        if ($slugRequired) {
            $rules['slug'] = 'required|string|max:120|unique:commitments,slug';
        }

        $data = $request->validate($rules);

        $out = [
            'title' => $data['title'],
            'body' => $data['body'],
            'order' => (int) $data['order'],
            'is_active' => $request->boolean('is_active'),
            'offset_x' => (int) $request->input('offset_x', 0),
            'offset_y' => (int) $request->input('offset_y', 0),
        ] + ($slugRequired ? ['slug' => $data['slug']] : []);

        if (isset($data['size_scale'])) {
            $out['size_scale'] = (int) $data['size_scale'];
        }

        return $out;
    }

    private function validatedPublication(Request $request): array
    {
        $data = $request->validate([
            'title' => 'required|string|max:191',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'size_scale' => 'nullable|integer|min:50|max:200',
            'offset_x' => 'nullable|integer|min:-200|max:200',
            'offset_y' => 'nullable|integer|min:-200|max:200',
            'cover_file' => 'nullable|image|max:4096',
            'clear_cover' => 'nullable|boolean',
            // Same allowed formats as the media publications. 50 MB cap.
            'document_file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:51200',
            'clear_document' => 'nullable|boolean',
        ]);

        $out = [
            'title' => $data['title'],
            'order' => (int) $data['order'],
            'is_active' => $request->boolean('is_active'),
            'offset_x' => (int) $request->input('offset_x', 0),
            'offset_y' => (int) $request->input('offset_y', 0),
        ];

        if (isset($data['size_scale'])) {
            $out['size_scale'] = (int) $data['size_scale'];
        }

        return $out;
    }
}
