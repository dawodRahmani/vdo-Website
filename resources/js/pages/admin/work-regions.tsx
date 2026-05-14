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

interface WorkRegion {
    id: number
    slug: string
    title: string
    subtitle: string | null
    body: string
    map_svg_path: string | null
    map_svg_url: string | null
    video_url: string | null
    map_on_right: boolean
    order: number
    is_active: boolean
}

interface PageProps {
    regions: WorkRegion[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Where We Work', href: '/admin/work-regions' },
]

interface Draft {
    title: string
    subtitle: string
    body: string
    video_url: string
    map_on_right: boolean
    order: number
    is_active: boolean
    file: File | null
    preview: string | null
    clear: boolean
}

function makeDraft(r: WorkRegion): Draft {
    return {
        title: r.title,
        subtitle: r.subtitle ?? '',
        body: r.body,
        video_url: r.video_url ?? '',
        map_on_right: r.map_on_right,
        order: r.order,
        is_active: r.is_active,
        file: null,
        preview: null,
        clear: false,
    }
}

export default function AdminWorkRegions() {
    const { props } = usePage<PageProps>()
    const [regions, setRegions] = useState<WorkRegion[]>(props.regions)
    const [drafts, setDrafts] = useState<Record<number, Draft>>(() => {
        const out: Record<number, Draft> = {}
        for (const r of props.regions) out[r.id] = makeDraft(r)
        return out
    })
    const [savingId, setSavingId] = useState<number | null>(null)
    const [creating, setCreating] = useState(false)
    const [newRegion, setNewRegion] = useState({
        slug: '',
        title: '',
        subtitle: '',
        body: '',
        video_url: '',
        map_on_right: false,
        order: regions.length + 1,
        is_active: true,
        file: null as File | null,
    })
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const newFileInput = useRef<HTMLInputElement | null>(null)

    const updateDraft = (id: number, patch: Partial<Draft>) =>
        setDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }))

    const setFile = (id: number, file: File | null) => {
        const prev = drafts[id].preview
        if (prev) URL.revokeObjectURL(prev)
        updateDraft(id, {
            file,
            preview: file ? URL.createObjectURL(file) : null,
            clear: false,
        })
    }

    const clearFile = (id: number) => {
        const prev = drafts[id].preview
        if (prev) URL.revokeObjectURL(prev)
        updateDraft(id, { file: null, preview: null, clear: true })
        if (fileInputs.current[id]) fileInputs.current[id]!.value = ''
    }

    const save = (r: WorkRegion) => {
        const d = drafts[r.id]
        setSavingId(r.id)
        const payload: Record<string, string | number | File> = {
            title: d.title,
            subtitle: d.subtitle,
            body: d.body,
            video_url: d.video_url,
            map_on_right: d.map_on_right ? 1 : 0,
            order: d.order,
            is_active: d.is_active ? 1 : 0,
            clear_map_svg: d.clear ? 1 : 0,
        }
        if (d.file) payload.map_svg_file = d.file
        router.post(`/admin/work-regions/${r.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingId(null),
            onSuccess: () => {
                if (d.preview) URL.revokeObjectURL(d.preview)
                updateDraft(r.id, { file: null, preview: null, clear: false })
                router.reload({ only: ['regions'] })
            },
        })
    }

    const destroy = (r: WorkRegion) => {
        if (!confirm(`Delete region "${r.title}"?`)) return
        router.delete(`/admin/work-regions/${r.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setRegions((xs) => xs.filter((x) => x.id !== r.id))
                setDrafts((d) => {
                    const next = { ...d }
                    delete next[r.id]
                    return next
                })
            },
        })
    }

    const create = () => {
        setCreating(true)
        const payload: Record<string, string | number | File> = {
            slug: newRegion.slug,
            title: newRegion.title,
            subtitle: newRegion.subtitle,
            body: newRegion.body,
            video_url: newRegion.video_url,
            map_on_right: newRegion.map_on_right ? 1 : 0,
            order: newRegion.order,
            is_active: newRegion.is_active ? 1 : 0,
        }
        if (newRegion.file) payload.map_svg_file = newRegion.file
        router.post('/admin/work-regions', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setCreating(false),
            onSuccess: () => {
                setNewRegion({
                    slug: '',
                    title: '',
                    subtitle: '',
                    body: '',
                    video_url: '',
                    map_on_right: false,
                    order: regions.length + 2,
                    is_active: true,
                    file: null,
                })
                if (newFileInput.current) newFileInput.current.value = ''
                router.reload({ only: ['regions'] })
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Where We Work" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Where We Work</h1>
                    <p className="text-muted-foreground text-sm">
                        Regions shown on the public Where We Work page.
                    </p>
                </div>

                {/* New region form */}
                <div className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Add region</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="nr-slug">Slug (URL anchor)</Label>
                            <Input
                                id="nr-slug"
                                value={newRegion.slug}
                                onChange={(e) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        slug: e.target.value,
                                    }))
                                }
                                placeholder="central"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nr-title">Title</Label>
                            <Input
                                id="nr-title"
                                value={newRegion.title}
                                onChange={(e) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Central Region:"
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="nr-sub">Subtitle</Label>
                            <Input
                                id="nr-sub"
                                value={newRegion.subtitle}
                                onChange={(e) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        subtitle: e.target.value,
                                    }))
                                }
                                placeholder="VDO's Work in the Central Region"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nr-video">Video URL</Label>
                            <Input
                                id="nr-video"
                                value={newRegion.video_url}
                                onChange={(e) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        video_url: e.target.value,
                                    }))
                                }
                                placeholder="https://www.youtube.com/watch?v=…"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nr-order">Order</Label>
                            <Input
                                id="nr-order"
                                type="number"
                                value={newRegion.order}
                                onChange={(e) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        order: parseInt(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Map SVG/image</Label>
                            <input
                                ref={newFileInput}
                                type="file"
                                accept="image/svg+xml,image/png,image/jpeg,image/webp"
                                onChange={(e) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        file: e.target.files?.[0] ?? null,
                                    }))
                                }
                                className="text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                            <Checkbox
                                id="nr-mor"
                                checked={newRegion.map_on_right}
                                onCheckedChange={(v) =>
                                    setNewRegion((n) => ({
                                        ...n,
                                        map_on_right: !!v,
                                    }))
                                }
                            />
                            <Label htmlFor="nr-mor" className="text-xs">
                                Map on right (video on left)
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="nr-body">
                            Body (separate paragraphs with a blank line)
                        </Label>
                        <textarea
                            id="nr-body"
                            value={newRegion.body}
                            onChange={(e) =>
                                setNewRegion((n) => ({
                                    ...n,
                                    body: e.target.value,
                                }))
                            }
                            rows={5}
                            className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={create}
                            disabled={
                                creating ||
                                !newRegion.slug ||
                                !newRegion.title ||
                                !newRegion.body
                            }
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            {creating ? 'Adding…' : 'Add region'}
                        </Button>
                    </div>
                </div>

                {/* Existing regions */}
                <div className="space-y-3">
                    {regions.map((r) => {
                        const d = drafts[r.id] ?? makeDraft(r)
                        const shown =
                            d.preview ?? (d.clear ? null : r.map_svg_url)
                        const saving = savingId === r.id
                        return (
                            <div
                                key={r.id}
                                className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm"
                            >
                                <p className="text-muted-foreground text-xs">
                                    Slug: {r.slug}
                                </p>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`r-title-${r.id}`}>
                                            Title
                                        </Label>
                                        <Input
                                            id={`r-title-${r.id}`}
                                            value={d.title}
                                            onChange={(e) =>
                                                updateDraft(r.id, {
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`r-sub-${r.id}`}>
                                            Subtitle
                                        </Label>
                                        <Input
                                            id={`r-sub-${r.id}`}
                                            value={d.subtitle}
                                            onChange={(e) =>
                                                updateDraft(r.id, {
                                                    subtitle: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor={`r-body-${r.id}`}>
                                        Body (separate paragraphs with a blank
                                        line)
                                    </Label>
                                    <textarea
                                        id={`r-body-${r.id}`}
                                        value={d.body}
                                        onChange={(e) =>
                                            updateDraft(r.id, {
                                                body: e.target.value,
                                            })
                                        }
                                        rows={6}
                                        className="border-input bg-background min-h-[160px] w-full rounded-md border px-3 py-2 text-sm"
                                    />
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`r-video-${r.id}`}>
                                            Video URL
                                        </Label>
                                        <Input
                                            id={`r-video-${r.id}`}
                                            value={d.video_url}
                                            onChange={(e) =>
                                                updateDraft(r.id, {
                                                    video_url: e.target.value,
                                                })
                                            }
                                            placeholder="https://www.youtube.com/watch?v=…"
                                        />
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`r-order-${r.id}`}
                                                className="text-xs"
                                            >
                                                Order
                                            </Label>
                                            <Input
                                                id={`r-order-${r.id}`}
                                                type="number"
                                                value={d.order}
                                                onChange={(e) =>
                                                    updateDraft(r.id, {
                                                        order:
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 0,
                                                    })
                                                }
                                                className="w-20"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pb-2">
                                            <Checkbox
                                                id={`r-mor-${r.id}`}
                                                checked={d.map_on_right}
                                                onCheckedChange={(v) =>
                                                    updateDraft(r.id, {
                                                        map_on_right: !!v,
                                                    })
                                                }
                                            />
                                            <Label
                                                htmlFor={`r-mor-${r.id}`}
                                                className="text-xs"
                                            >
                                                Map on right
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2 pb-2">
                                            <Checkbox
                                                id={`r-active-${r.id}`}
                                                checked={d.is_active}
                                                onCheckedChange={(v) =>
                                                    updateDraft(r.id, {
                                                        is_active: !!v,
                                                    })
                                                }
                                            />
                                            <Label
                                                htmlFor={`r-active-${r.id}`}
                                                className="text-xs"
                                            >
                                                Active
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex h-24 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                                        {shown ? (
                                            <img
                                                src={shown}
                                                alt={r.title}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-[10px] text-gray-400">
                                                (no map)
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-xs">
                                            Map image
                                        </Label>
                                        <input
                                            ref={(el) => {
                                                fileInputs.current[r.id] = el
                                            }}
                                            type="file"
                                            accept="image/svg+xml,image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={(e) =>
                                                setFile(
                                                    r.id,
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
                                                        r.id
                                                    ]?.click()
                                                }
                                            >
                                                <Upload className="mr-1 h-3.5 w-3.5" />
                                                {d.file ? 'Change' : 'Upload'}
                                            </Button>
                                            {(r.map_svg_url || d.file) && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        clearFile(r.id)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => destroy(r)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                                        Delete
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => save(r)}
                                        disabled={saving}
                                    >
                                        {saving ? 'Saving…' : 'Save'}
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AppLayout>
    )
}
