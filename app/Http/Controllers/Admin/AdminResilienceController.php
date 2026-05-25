<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResilienceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminResilienceController extends Controller
{
    public function capacities()
    {
        return Inertia::render('admin/resilience/capacities', [
            'items' => ResilienceItem::ofSection(ResilienceItem::SECTION_CAPACITY)
                ->ordered()->get(),
        ]);
    }

    public function policies()
    {
        return Inertia::render('admin/resilience/policies', [
            'items' => ResilienceItem::ofSection(ResilienceItem::SECTION_POLICY)
                ->ordered()->get(),
        ]);
    }

    public function programmaticApproach()
    {
        $item = ResilienceItem::firstOrCreate(
            ['section' => ResilienceItem::SECTION_PROGRAMMATIC_APPROACH],
            [
                'title' => 'Programmatic Approach',
                'body' => '',
                'is_active' => true,
            ],
        );

        return Inertia::render('admin/resilience/programmatic-approach', [
            'item' => $item->fresh(),
        ]);
    }

    public function collectiveResilience()
    {
        $item = ResilienceItem::firstOrCreate(
            ['section' => ResilienceItem::SECTION_COLLECTIVE_RESILIENCE],
            [
                'title' => 'Contributing to Collective Resilience',
                'body' => '',
                'bullets' => [],
                'is_active' => true,
            ],
        );

        return Inertia::render('admin/resilience/collective-resilience', [
            'item' => $item->fresh(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);

        if ($request->hasFile('image_file')) {
            $data['image'] = $request->file('image_file')->store('resilience', 'public');
        }
        if ($request->hasFile('document_file')) {
            $data['document'] = $request->file('document_file')->store('resilience-documents', 'public');
        }
        unset($data['image_file'], $data['clear_image'], $data['document_file'], $data['clear_document']);

        ResilienceItem::create($data);

        return back();
    }

    public function update(Request $request, ResilienceItem $item)
    {
        $data = $this->validatedData($request);

        if ($request->hasFile('image_file')) {
            $this->deleteStoredFile($item->image);
            $data['image'] = $request->file('image_file')->store('resilience', 'public');
        } elseif ($request->boolean('clear_image')) {
            $this->deleteStoredFile($item->image);
            $data['image'] = null;
        }

        if ($request->hasFile('document_file')) {
            $this->deleteStoredFile($item->document);
            $data['document'] = $request->file('document_file')->store('resilience-documents', 'public');
        } elseif ($request->boolean('clear_document')) {
            $this->deleteStoredFile($item->document);
            $data['document'] = null;
        }

        unset($data['image_file'], $data['clear_image'], $data['document_file'], $data['clear_document']);

        $item->update($data);

        return back();
    }

    public function destroy(ResilienceItem $item)
    {
        // Don't allow deleting singleton sections
        if (in_array($item->section, [
            ResilienceItem::SECTION_PROGRAMMATIC_APPROACH,
            ResilienceItem::SECTION_COLLECTIVE_RESILIENCE,
        ], true)) {
            return back();
        }

        $this->deleteStoredFile($item->image);
        $this->deleteStoredFile($item->document);
        $item->delete();

        return back();
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'section' => ['required', Rule::in([
                ResilienceItem::SECTION_CAPACITY,
                ResilienceItem::SECTION_POLICY,
                ResilienceItem::SECTION_PROGRAMMATIC_APPROACH,
                ResilienceItem::SECTION_COLLECTIVE_RESILIENCE,
            ])],
            'title' => 'nullable|string|max:191',
            'body' => 'nullable|string|max:8000',
            'caption' => 'nullable|string|max:500',
            'bullets' => 'nullable|array',
            'bullets.*' => 'string|max:500',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'size_scale' => 'nullable|integer|min:25|max:300',
            'offset_x' => 'nullable|integer|min:-500|max:500',
            'offset_y' => 'nullable|integer|min:-500|max:500',
            'image_file' => 'nullable|image|max:5120',
            'clear_image' => 'nullable|boolean',
            'document_file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:51200',
            'clear_document' => 'nullable|boolean',
        ]);
    }

    private function deleteStoredFile(?string $path): void
    {
        if ($path && ! str_starts_with($path, '/') && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }
}
