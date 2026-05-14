import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

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
    title: string
    ref: string | null
    summary: string
    location: string | null
    deadline: string | null
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

export default function AdminOpportunities() {
    const { props } = usePage<PageProps>()
    const [categories, setCategories] = useState<Category[]>(props.categories)
    const [listings, setListings] = useState<Listing[]>(props.listings)
    const [categoryDrafts, setCategoryDrafts] = useState<
        Record<number, CategoryDraft>
    >(() => {
        const out: Record<number, CategoryDraft> = {}
        for (const c of props.categories) out[c.id] = categoryDraft(c)
        return out
    })
    const [savingCategoryId, setSavingCategoryId] = useState<number | null>(null)
    const [savingListingId, setSavingListingId] = useState<number | null>(null)
    const [creating, setCreating] = useState(false)
    const [newListing, setNewListing] = useState<Omit<Listing, 'id'>>({
        category_id: props.categories[0]?.id ?? 0,
        title: '',
        ref: '',
        summary: '',
        location: '',
        deadline: '',
        order: listings.length + 1,
        is_active: true,
    })
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

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

    const updateListingField = (id: number, patch: Partial<Listing>) => {
        setListings((xs) => xs.map((l) => (l.id === id ? { ...l, ...patch } : l)))
    }

    const saveListing = (l: Listing) => {
        setSavingListingId(l.id)
        router.patch(
            `/admin/opportunities/listings/${l.id}`,
            {
                category_id: l.category_id,
                title: l.title,
                ref: l.ref ?? '',
                summary: l.summary,
                location: l.location ?? '',
                deadline: l.deadline ?? '',
                order: l.order,
                is_active: l.is_active,
            },
            {
                preserveScroll: true,
                onFinish: () => setSavingListingId(null),
            },
        )
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

    const createListing = () => {
        setCreating(true)
        router.post('/admin/opportunities/listings', newListing, {
            preserveScroll: true,
            onFinish: () => setCreating(false),
            onSuccess: () => {
                setNewListing({
                    category_id: props.categories[0]?.id ?? 0,
                    title: '',
                    ref: '',
                    summary: '',
                    location: '',
                    deadline: '',
                    order: listings.length + 2,
                    is_active: true,
                })
                router.reload({ only: ['listings'] })
            },
        })
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
                                                            {
                                                                is_active:
                                                                    !!v,
                                                            },
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
                    <div className="mb-3">
                        <h1 className="text-2xl font-semibold">
                            Current Listings
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Individual job, bid, volunteer, or participation
                            postings.
                        </p>
                    </div>

                    {/* New listing form */}
                    <div className="border-border bg-card mb-4 space-y-3 rounded-xl border p-4 shadow-sm">
                        <h2 className="text-sm font-semibold">Add listing</h2>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="new-category">Category</Label>
                                <select
                                    id="new-category"
                                    value={newListing.category_id}
                                    onChange={(e) =>
                                        setNewListing((n) => ({
                                            ...n,
                                            category_id: parseInt(
                                                e.target.value,
                                            ),
                                        }))
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
                                <Label htmlFor="new-title">Title</Label>
                                <Input
                                    id="new-title"
                                    value={newListing.title}
                                    onChange={(e) =>
                                        setNewListing((n) => ({
                                            ...n,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Programs Coordinator"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="new-ref">Reference</Label>
                                <Input
                                    id="new-ref"
                                    value={newListing.ref ?? ''}
                                    onChange={(e) =>
                                        setNewListing((n) => ({
                                            ...n,
                                            ref: e.target.value,
                                        }))
                                    }
                                    placeholder="VDO-HR-2026-014"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="new-location">Location</Label>
                                <Input
                                    id="new-location"
                                    value={newListing.location ?? ''}
                                    onChange={(e) =>
                                        setNewListing((n) => ({
                                            ...n,
                                            location: e.target.value,
                                        }))
                                    }
                                    placeholder="Kabul, Afghanistan"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="new-deadline">Deadline</Label>
                                <Input
                                    id="new-deadline"
                                    value={newListing.deadline ?? ''}
                                    onChange={(e) =>
                                        setNewListing((n) => ({
                                            ...n,
                                            deadline: e.target.value,
                                        }))
                                    }
                                    placeholder="Closes 15 May 2026"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="new-order">Order</Label>
                                <Input
                                    id="new-order"
                                    type="number"
                                    value={newListing.order}
                                    onChange={(e) =>
                                        setNewListing((n) => ({
                                            ...n,
                                            order: parseInt(e.target.value) || 0,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="new-summary">Summary</Label>
                            <textarea
                                id="new-summary"
                                value={newListing.summary}
                                onChange={(e) =>
                                    setNewListing((n) => ({
                                        ...n,
                                        summary: e.target.value,
                                    }))
                                }
                                rows={3}
                                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={createListing}
                                disabled={
                                    creating ||
                                    !newListing.title ||
                                    !newListing.summary ||
                                    !newListing.category_id
                                }
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                {creating ? 'Adding…' : 'Add listing'}
                            </Button>
                        </div>
                    </div>

                    {/* Listings list */}
                    <div className="space-y-3">
                        {listings.map((l) => {
                            const saving = savingListingId === l.id
                            return (
                                <div
                                    key={l.id}
                                    className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm"
                                >
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`l-cat-${l.id}`}
                                                className="text-xs"
                                            >
                                                Category
                                            </Label>
                                            <select
                                                id={`l-cat-${l.id}`}
                                                value={l.category_id}
                                                onChange={(e) =>
                                                    updateListingField(l.id, {
                                                        category_id: parseInt(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                                            >
                                                {categories.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`l-title-${l.id}`}
                                                className="text-xs"
                                            >
                                                Title
                                            </Label>
                                            <Input
                                                id={`l-title-${l.id}`}
                                                value={l.title}
                                                onChange={(e) =>
                                                    updateListingField(l.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`l-ref-${l.id}`}
                                                className="text-xs"
                                            >
                                                Reference
                                            </Label>
                                            <Input
                                                id={`l-ref-${l.id}`}
                                                value={l.ref ?? ''}
                                                onChange={(e) =>
                                                    updateListingField(l.id, {
                                                        ref: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`l-loc-${l.id}`}
                                                className="text-xs"
                                            >
                                                Location
                                            </Label>
                                            <Input
                                                id={`l-loc-${l.id}`}
                                                value={l.location ?? ''}
                                                onChange={(e) =>
                                                    updateListingField(l.id, {
                                                        location:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`l-dl-${l.id}`}
                                                className="text-xs"
                                            >
                                                Deadline
                                            </Label>
                                            <Input
                                                id={`l-dl-${l.id}`}
                                                value={l.deadline ?? ''}
                                                onChange={(e) =>
                                                    updateListingField(l.id, {
                                                        deadline:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`l-order-${l.id}`}
                                                className="text-xs"
                                            >
                                                Order
                                            </Label>
                                            <Input
                                                id={`l-order-${l.id}`}
                                                type="number"
                                                value={l.order}
                                                onChange={(e) =>
                                                    updateListingField(l.id, {
                                                        order:
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 0,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor={`l-sum-${l.id}`}
                                            className="text-xs"
                                        >
                                            Summary
                                        </Label>
                                        <textarea
                                            id={`l-sum-${l.id}`}
                                            value={l.summary}
                                            onChange={(e) =>
                                                updateListingField(l.id, {
                                                    summary: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={`l-active-${l.id}`}
                                                checked={l.is_active}
                                                onCheckedChange={(v) =>
                                                    updateListingField(l.id, {
                                                        is_active: !!v,
                                                    })
                                                }
                                            />
                                            <Label
                                                htmlFor={`l-active-${l.id}`}
                                                className="text-xs"
                                            >
                                                Active
                                            </Label>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    destroyListing(l)
                                                }
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="mr-1 h-3.5 w-3.5" />
                                                Delete
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => saveListing(l)}
                                                disabled={saving}
                                            >
                                                {saving ? 'Saving…' : 'Save'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
