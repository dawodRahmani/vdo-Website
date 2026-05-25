import RichTextEditor from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Pencil, Plus, Trash2, Upload } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

interface Category {
    id: number
    slug: string
    title: string
    body: string
    icon_path: string | null
    icon_url: string | null
    order: number
    is_active: boolean
}

interface Listing {
    id: number
    category_id: number
    slug: string | null
    title: string
    ref: string | null
    summary: string
    description: string | null
    responsibilities: string | null
    requirements: string | null
    employment_type: string | null
    experience_level: string | null
    location: string | null
    deadline: string | null
    posted_at: string | null
    deadline_at: string | null
    order: number
    is_active: boolean
}

interface PageProps {
    categories: Category[]
    listings: Listing[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Opportunities', href: '/admin/opportunities' },
]

const EMPLOYMENT_TYPES: { value: string; label: string }[] = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'internship', label: 'Internship' },
    { value: 'consultancy', label: 'Consultancy' },
]

const EXPERIENCE_LEVELS: { value: string; label: string }[] = [
    { value: 'entry', label: 'Entry level' },
    { value: 'mid', label: 'Mid level' },
    { value: 'senior', label: 'Senior' },
]

interface CategoryDraft {
    title: string
    body: string
    order: number
    is_active: boolean
    iconFile: File | null
    iconPreview: string | null
    clearIcon: boolean
}

function categoryDraft(c: Category): CategoryDraft {
    return {
        title: c.title,
        body: c.body,
        order: c.order,
        is_active: c.is_active,
        iconFile: null,
        iconPreview: null,
        clearIcon: false,
    }
}

function emptyListing(categories: Category[], order: number): Listing {
    return {
        id: 0,
        category_id: categories[0]?.id ?? 0,
        slug: null,
        title: '',
        ref: '',
        summary: '',
        description: '',
        responsibilities: '',
        requirements: '',
        employment_type: 'full-time',
        experience_level: null,
        location: '',
        deadline: '',
        posted_at: null,
        deadline_at: null,
        order,
        is_active: true,
    }
}

export default function AdminOpportunities() {
    const { props } = usePage<PageProps>()
    const [categories] = useState<Category[]>(props.categories)
    const [listings, setListings] = useState<Listing[]>(props.listings)
    const [categoryDrafts, setCategoryDrafts] = useState<
        Record<number, CategoryDraft>
    >(() => {
        const out: Record<number, CategoryDraft> = {}
        for (const c of props.categories) out[c.id] = categoryDraft(c)
        return out
    })
    const [savingCategoryId, setSavingCategoryId] = useState<number | null>(null)
    const [editing, setEditing] = useState<Listing | null>(null)
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const categoryById = useMemo(
        () => Object.fromEntries(categories.map((c) => [c.id, c])),
        [categories],
    )

    const updateCategoryDraft = (id: number, patch: Partial<CategoryDraft>) => {
        setCategoryDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }))
    }

    const setCategoryFile = (id: number, file: File | null) => {
        setCategoryDrafts((d) => {
            const cur = d[id]
            if (cur.iconPreview) URL.revokeObjectURL(cur.iconPreview)
            return {
                ...d,
                [id]: {
                    ...cur,
                    iconFile: file,
                    iconPreview: file ? URL.createObjectURL(file) : null,
                    clearIcon: false,
                },
            }
        })
    }

    const clearCategoryIcon = (id: number) => {
        setCategoryDrafts((d) => {
            const cur = d[id]
            if (cur.iconPreview) URL.revokeObjectURL(cur.iconPreview)
            return {
                ...d,
                [id]: {
                    ...cur,
                    iconFile: null,
                    iconPreview: null,
                    clearIcon: true,
                },
            }
        })
        const input = fileInputs.current[id]
        if (input) input.value = ''
    }

    const saveCategory = (cat: Category) => {
        const draft = categoryDrafts[cat.id]
        setSavingCategoryId(cat.id)
        const payload: Record<string, string | number | File> = {
            title: draft.title,
            body: draft.body,
            order: draft.order,
            is_active: draft.is_active ? 1 : 0,
            clear_icon: draft.clearIcon ? 1 : 0,
        }
        if (draft.iconFile) payload.icon_file = draft.iconFile

        router.post(`/admin/opportunities/categories/${cat.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingCategoryId(null),
            onSuccess: () => {
                if (draft.iconPreview) URL.revokeObjectURL(draft.iconPreview)
                updateCategoryDraft(cat.id, {
                    iconFile: null,
                    iconPreview: null,
                    clearIcon: false,
                })
            },
        })
    }

    const destroyListing = (l: Listing) => {
        if (!confirm(`Delete listing "${l.title}"?`)) return
        router.delete(`/admin/opportunities/listings/${l.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setListings((xs) => xs.filter((x) => x.id !== l.id))
            },
        })
    }

    const startNew = () =>
        setEditing(emptyListing(categories, listings.length + 1))

    const handleSaved = () => {
        setEditing(null)
        router.reload({ only: ['listings'] })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Opportunities" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                {/* Categories */}
                <section>
                    <div className="mb-3">
                        <h1 className="text-2xl font-semibold">Categories</h1>
                        <p className="text-muted-foreground text-sm">
                            The 4 category cards shown on the Opportunities
                            page.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {categories.map((cat) => {
                            const draft =
                                categoryDrafts[cat.id] ?? categoryDraft(cat)
                            const shown =
                                draft.iconPreview ??
                                (draft.clearIcon ? null : cat.icon_url)
                            const saving = savingCategoryId === cat.id
                            return (
                                <div
                                    key={cat.id}
                                    className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                                            {shown ? (
                                                <img
                                                    src={shown}
                                                    alt={cat.title}
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-400">
                                                    (no icon)
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-muted-foreground text-xs">
                                                Slug: {cat.slug}
                                            </p>
                                            <input
                                                ref={(el) => {
                                                    fileInputs.current[cat.id] = el
                                                }}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setCategoryFile(
                                                        cat.id,
                                                        e.target.files?.[0] ??
                                                            null,
                                                    )
                                                }
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        fileInputs.current[
                                                            cat.id
                                                        ]?.click()
                                                    }
                                                >
                                                    <Upload className="mr-1 h-3.5 w-3.5" />
                                                    {draft.iconFile
                                                        ? 'Change'
                                                        : 'Upload'}
                                                </Button>
                                                {(cat.icon_url ||
                                                    draft.iconFile) && (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            clearCategoryIcon(
                                                                cat.id,
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor={`title-${cat.id}`}>
                                            Title
                                        </Label>
                                        <Input
                                            id={`title-${cat.id}`}
                                            value={draft.title}
                                            onChange={(e) =>
                                                updateCategoryDraft(cat.id, {
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor={`body-${cat.id}`}>
                                            Body
                                        </Label>
                                        <textarea
                                            id={`body-${cat.id}`}
                                            value={draft.body}
                                            onChange={(e) =>
                                                updateCategoryDraft(cat.id, {
                                                    body: e.target.value,
                                                })
                                            }
                                            rows={5}
                                            className="border-input bg-background min-h-[100px] w-full rounded-md border px-3 py-2 text-sm"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <Label
                                                    htmlFor={`order-${cat.id}`}
                                                    className="text-xs"
                                                >
                                                    Order
                                                </Label>
                                                <Input
                                                    id={`order-${cat.id}`}
                                                    type="number"
                                                    value={draft.order}
                                                    onChange={(e) =>
                                                        updateCategoryDraft(
                                                            cat.id,
                                                            {
                                                                order:
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ) || 0,
                                                            },
                                                        )
                                                    }
                                                    className="w-20"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`active-${cat.id}`}
                                                    checked={draft.is_active}
                                                    onCheckedChange={(v) =>
                                                        updateCategoryDraft(
                                                            cat.id,
                                                            { is_active: !!v },
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`active-${cat.id}`}
                                                    className="text-xs"
                                                >
                                                    Active
                                                </Label>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => saveCategory(cat)}
                                            disabled={saving}
                                        >
                                            {saving ? 'Saving…' : 'Save'}
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Listings */}
                <section>
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Job postings
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Individual job, bid, volunteer, or
                                participation postings. Click a row to edit.
                            </p>
                        </div>
                        <Button onClick={startNew}>
                            <Plus className="mr-1 h-4 w-4" />
                            New posting
                        </Button>
                    </div>

                    <div className="border-border overflow-hidden rounded-xl border bg-card shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-2 font-medium">
                                        Title
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Category
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Type
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Deadline
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-sm text-muted-foreground"
                                        >
                                            No postings yet. Click "New posting"
                                            to add one.
                                        </td>
                                    </tr>
                                )}
                                {listings.map((l) => {
                                    const cat = categoryById[l.category_id]
                                    return (
                                        <tr
                                            key={l.id}
                                            className="border-b border-border last:border-b-0 hover:bg-muted/20"
                                        >
                                            <td className="px-4 py-2 font-medium">
                                                {l.title}
                                                {l.ref && (
                                                    <span className="ml-2 text-xs text-muted-foreground">
                                                        {l.ref}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-muted-foreground">
                                                {cat?.title ?? '—'}
                                            </td>
                                            <td className="px-4 py-2 capitalize text-muted-foreground">
                                                {l.employment_type ?? '—'}
                                            </td>
                                            <td className="px-4 py-2 text-muted-foreground">
                                                {l.deadline_at ??
                                                    l.deadline ??
                                                    '—'}
                                            </td>
                                            <td className="px-4 py-2">
                                                {l.is_active ? (
                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                                                        Hidden
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            setEditing(l)
                                                        }
                                                    >
                                                        <Pencil className="mr-1 h-3.5 w-3.5" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            destroyListing(l)
                                                        }
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {editing && (
                <ListingDialog
                    listing={editing}
                    categories={categories}
                    onClose={() => setEditing(null)}
                    onSaved={handleSaved}
                />
            )}
        </AppLayout>
    )
}

function ListingDialog({
    listing,
    categories,
    onClose,
    onSaved,
}: {
    listing: Listing
    categories: Category[]
    onClose: () => void
    onSaved: () => void
}) {
    const [draft, setDraft] = useState<Listing>(listing)
    const [saving, setSaving] = useState(false)
    const isNew = listing.id === 0

    const set = (patch: Partial<Listing>) =>
        setDraft((d) => ({ ...d, ...patch }))

    const handleSubmit = () => {
        setSaving(true)
        const payload = {
            category_id: draft.category_id,
            title: draft.title,
            ref: draft.ref ?? '',
            summary: draft.summary,
            description: draft.description ?? '',
            responsibilities: draft.responsibilities ?? '',
            requirements: draft.requirements ?? '',
            employment_type: draft.employment_type ?? '',
            experience_level: draft.experience_level ?? '',
            location: draft.location ?? '',
            deadline: draft.deadline ?? '',
            posted_at: draft.posted_at ?? '',
            deadline_at: draft.deadline_at ?? '',
            order: draft.order,
            is_active: draft.is_active ? 1 : 0,
        }

        const opts = {
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => onSaved(),
        }

        if (isNew) {
            router.post('/admin/opportunities/listings', payload, opts)
        } else {
            router.patch(
                `/admin/opportunities/listings/${listing.id}`,
                payload,
                opts,
            )
        }
    }

    const canSave = draft.title.trim() && draft.summary.trim() && draft.category_id

    return (
        <Dialog open onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
                <DialogHeader className="border-b border-border px-6 py-4">
                    <DialogTitle>
                        {isNew ? 'New posting' : draft.title || 'Edit posting'}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
                    {/* Basics */}
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="d-title">Title</Label>
                            <Input
                                id="d-title"
                                value={draft.title}
                                onChange={(e) => set({ title: e.target.value })}
                                placeholder="Programs Coordinator"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-category">Category</Label>
                            <select
                                id="d-category"
                                value={draft.category_id}
                                onChange={(e) =>
                                    set({
                                        category_id: parseInt(e.target.value),
                                    })
                                }
                                className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                            >
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-ref">
                                Reference{' '}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </Label>
                            <Input
                                id="d-ref"
                                value={draft.ref ?? ''}
                                onChange={(e) => set({ ref: e.target.value })}
                                placeholder="VDO-HR-2026-014"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-emp">Employment type</Label>
                            <select
                                id="d-emp"
                                value={draft.employment_type ?? ''}
                                onChange={(e) =>
                                    set({
                                        employment_type: e.target.value || null,
                                    })
                                }
                                className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                            >
                                <option value="">—</option>
                                {EMPLOYMENT_TYPES.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-exp">Experience level</Label>
                            <select
                                id="d-exp"
                                value={draft.experience_level ?? ''}
                                onChange={(e) =>
                                    set({
                                        experience_level: e.target.value || null,
                                    })
                                }
                                className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                            >
                                <option value="">—</option>
                                {EXPERIENCE_LEVELS.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-loc">Location</Label>
                            <Input
                                id="d-loc"
                                value={draft.location ?? ''}
                                onChange={(e) =>
                                    set({ location: e.target.value })
                                }
                                placeholder="Kabul, Afghanistan"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-posted">Posted on</Label>
                            <Input
                                id="d-posted"
                                type="date"
                                value={draft.posted_at ?? ''}
                                onChange={(e) =>
                                    set({ posted_at: e.target.value || null })
                                }
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-deadline-at">Deadline</Label>
                            <Input
                                id="d-deadline-at"
                                type="date"
                                value={draft.deadline_at ?? ''}
                                onChange={(e) =>
                                    set({
                                        deadline_at: e.target.value || null,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-1.5">
                        <Label htmlFor="d-summary">Card summary</Label>
                        <p className="text-xs text-muted-foreground">
                            Short pitch shown on the listing card (1–2
                            sentences).
                        </p>
                        <textarea
                            id="d-summary"
                            value={draft.summary}
                            onChange={(e) => set({ summary: e.target.value })}
                            rows={3}
                            className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Rich text fields */}
                    <div className="space-y-1.5">
                        <Label>Description</Label>
                        <p className="text-xs text-muted-foreground">
                            Full description of the role.
                        </p>
                        <RichTextEditor
                            value={draft.description ?? ''}
                            onChange={(html) => set({ description: html })}
                            placeholder="About this role…"
                            minHeight={180}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Responsibilities</Label>
                        <p className="text-xs text-muted-foreground">
                            Use bullet lists for duties.
                        </p>
                        <RichTextEditor
                            value={draft.responsibilities ?? ''}
                            onChange={(html) =>
                                set({ responsibilities: html })
                            }
                            placeholder="Key duties…"
                            minHeight={140}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Requirements</Label>
                        <p className="text-xs text-muted-foreground">
                            Qualifications, education, experience.
                        </p>
                        <RichTextEditor
                            value={draft.requirements ?? ''}
                            onChange={(html) => set({ requirements: html })}
                            placeholder="Qualifications and experience…"
                            minHeight={140}
                        />
                    </div>

                    {/* Footer fields */}
                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="d-order">Order</Label>
                            <Input
                                id="d-order"
                                type="number"
                                value={draft.order}
                                onChange={(e) =>
                                    set({
                                        order: parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="d-deadline">
                                Deadline label{' '}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </Label>
                            <Input
                                id="d-deadline"
                                value={draft.deadline ?? ''}
                                onChange={(e) =>
                                    set({ deadline: e.target.value })
                                }
                                placeholder="Closes 15 May 2026"
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <Checkbox
                                id="d-active"
                                checked={draft.is_active}
                                onCheckedChange={(v) =>
                                    set({ is_active: !!v })
                                }
                            />
                            <Label htmlFor="d-active" className="text-sm">
                                Active (show on site)
                            </Label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="border-t border-border px-6 py-3">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!canSave || saving}
                    >
                        {saving ? 'Saving…' : isNew ? 'Create' : 'Save changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
