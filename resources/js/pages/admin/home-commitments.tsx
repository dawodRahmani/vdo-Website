import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Plus, RotateCcw, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

interface HomeCommitment {
    id: number
    title: string
    svg_path: string | null
    svg_url: string | null
    order: number
    crop_scale: number
    crop_offset_x: number
    crop_offset_y: number
}

interface PageProps {
    commitments: HomeCommitment[]
    lineGap: number
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Home: Our Commitment', href: '/admin/home-commitments' },
]

const MIN_SCALE = 50
const MAX_SCALE = 400
const MIN_OFFSET = -300
const MAX_OFFSET = 300
const PREVIEW_SIZE = 112
const MIN_LINE_GAP = -60
const MAX_LINE_GAP = 60

interface Draft {
    title: string
    order: number
    crop_scale: number
    crop_offset_x: number
    crop_offset_y: number
    file: File | null
    preview: string | null
    clear: boolean
}

function draftOf(c: HomeCommitment): Draft {
    return {
        title: c.title,
        order: c.order,
        crop_scale: c.crop_scale,
        crop_offset_x: c.crop_offset_x,
        crop_offset_y: c.crop_offset_y,
        file: null,
        preview: null,
        clear: false,
    }
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

export default function AdminHomeCommitments() {
    const { props } = usePage<PageProps>()
    const [commitments, setCommitments] = useState<HomeCommitment[]>(
        props.commitments,
    )
    const [drafts, setDrafts] = useState<Record<number, Draft>>(() => {
        const out: Record<number, Draft> = {}
        for (const c of props.commitments) out[c.id] = draftOf(c)
        return out
    })
    const [savingId, setSavingId] = useState<number | null>(null)
    const [creating, setCreating] = useState(false)
    const [lineGap, setLineGap] = useState<number>(props.lineGap)
    const [savingLineGap, setSavingLineGap] = useState(false)
    const [newItem, setNewItem] = useState({
        title: '',
        order: commitments.length + 1,
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

    const resetCrop = (id: number) =>
        updateDraft(id, { crop_scale: 100, crop_offset_x: 0, crop_offset_y: 0 })

    const saveLineGap = () => {
        setSavingLineGap(true)
        router.post(
            '/admin/home-commitments/line-gap',
            { commitments_line_gap: lineGap },
            {
                preserveScroll: true,
                onFinish: () => setSavingLineGap(false),
            },
        )
    }

    const save = (c: HomeCommitment) => {
        const d = drafts[c.id]
        setSavingId(c.id)
        const payload: Record<string, string | number | File> = {
            title: d.title,
            order: d.order,
            crop_scale: d.crop_scale,
            crop_offset_x: d.crop_offset_x,
            crop_offset_y: d.crop_offset_y,
            clear_svg: d.clear ? 1 : 0,
        }
        if (d.file) payload.svg_file = d.file
        router.post(`/admin/home-commitments/${c.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingId(null),
            onSuccess: () => {
                if (d.preview) URL.revokeObjectURL(d.preview)
                updateDraft(c.id, { file: null, preview: null, clear: false })
                router.reload({ only: ['commitments'] })
            },
        })
    }

    const destroy = (c: HomeCommitment) => {
        if (!confirm(`Delete "${c.title}"?`)) return
        router.delete(`/admin/home-commitments/${c.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setCommitments((xs) => xs.filter((x) => x.id !== c.id))
                setDrafts((d) => {
                    const next = { ...d }
                    delete next[c.id]
                    return next
                })
            },
        })
    }

    const create = () => {
        setCreating(true)
        const payload: Record<string, string | number | File> = {
            title: newItem.title,
            order: newItem.order,
        }
        if (newItem.file) payload.svg_file = newItem.file
        router.post('/admin/home-commitments', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setCreating(false),
            onSuccess: () => {
                setNewItem({
                    title: '',
                    order: commitments.length + 2,
                    file: null,
                })
                if (newFileInput.current) newFileInput.current.value = ''
                router.reload({ only: ['commitments'] })
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home: Our Commitment" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Home: Our Commitment
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Edit the 12 icons shown on the home page. Use the crop
                        sliders to zoom in and pan past any text baked into the
                        icon artwork — only the visible portion of the preview
                        will show on the home page. Titles are rendered as
                        clean text below each icon and all share the same font
                        size.
                    </p>
                </div>

                {/* Line gap (distance between icons and the dotted line) */}
                <div className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold">
                            Distance from icons to the dotted line
                        </h2>
                        <button
                            type="button"
                            onClick={() => setLineGap(-12)}
                            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline"
                        >
                            <RotateCcw className="h-3 w-3" />
                            Reset
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <Label className="w-12 text-xs">Gap</Label>
                        <input
                            type="range"
                            min={MIN_LINE_GAP}
                            max={MAX_LINE_GAP}
                            value={lineGap}
                            onChange={(e) =>
                                setLineGap(parseInt(e.target.value))
                            }
                            className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                        />
                        <Input
                            type="number"
                            min={MIN_LINE_GAP}
                            max={MAX_LINE_GAP}
                            value={lineGap}
                            onChange={(e) => {
                                const v = parseInt(e.target.value)
                                setLineGap(
                                    Number.isNaN(v)
                                        ? -12
                                        : clamp(v, MIN_LINE_GAP, MAX_LINE_GAP),
                                )
                            }}
                            className="h-8 w-20 text-xs"
                        />
                        <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                            {lineGap}px
                        </span>
                        <Button
                            type="button"
                            size="sm"
                            onClick={saveLineGap}
                            disabled={savingLineGap}
                        >
                            {savingLineGap ? 'Saving…' : 'Save spacing'}
                        </Button>
                    </div>
                    {/* Mini preview */}
                    <div className="rounded-md border bg-[rgb(245,245,245)] p-3">
                        <div className="grid grid-cols-6 gap-x-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center"
                                >
                                    <div className="h-10 w-10 rounded bg-gray-300" />
                                    <span className="mt-1 text-[8px] text-gray-500">
                                        title
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div
                            className="relative"
                            style={{ marginTop: `${lineGap}px` }}
                        >
                            <div
                                className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle, rgb(0,175,239) 1px, transparent 1px)',
                                    backgroundSize: '10px 2px',
                                    backgroundRepeat: 'repeat-x',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div className="relative grid grid-cols-6">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="flex justify-center"
                                    >
                                        <span className="h-2 w-2 border border-[rgb(0,175,239)] bg-white" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-xs">
                        Negative pulls the line up closer to the icons,
                        positive pushes it down. Default is -12px.
                    </p>
                </div>

                {/* New item */}
                <div className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Add commitment</h2>
                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="nc-title">Title</Label>
                            <Input
                                id="nc-title"
                                value={newItem.title}
                                onChange={(e) =>
                                    setNewItem((n) => ({
                                        ...n,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nc-order">Order</Label>
                            <Input
                                id="nc-order"
                                type="number"
                                value={newItem.order}
                                onChange={(e) =>
                                    setNewItem((n) => ({
                                        ...n,
                                        order: parseInt(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-3">
                            <Label>Icon (SVG/PNG)</Label>
                            <input
                                ref={newFileInput}
                                type="file"
                                accept="image/svg+xml,image/png,image/jpeg,image/webp"
                                onChange={(e) =>
                                    setNewItem((n) => ({
                                        ...n,
                                        file: e.target.files?.[0] ?? null,
                                    }))
                                }
                                className="text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={create}
                            disabled={creating || !newItem.title}
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            {creating ? 'Adding…' : 'Add commitment'}
                        </Button>
                    </div>
                </div>

                {/* Existing items */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {commitments.map((c) => {
                        const d = drafts[c.id] ?? draftOf(c)
                        const shown =
                            d.preview ?? (d.clear ? null : c.svg_url)
                        const saving = savingId === c.id
                        return (
                            <div
                                key={c.id}
                                className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-sm"
                            >
                                <div className="flex gap-3">
                                    {/* Live cropped preview matching the public viewport */}
                                    <div
                                        className="relative flex-shrink-0 overflow-hidden rounded-md border bg-gray-50"
                                        style={{
                                            width: `${PREVIEW_SIZE}px`,
                                            height: `${PREVIEW_SIZE}px`,
                                        }}
                                    >
                                        {shown ? (
                                            <img
                                                src={shown}
                                                alt={c.title}
                                                className="absolute left-1/2 top-1/2 max-h-none max-w-none object-contain"
                                                style={{
                                                    width: `${PREVIEW_SIZE}px`,
                                                    height: `${PREVIEW_SIZE}px`,
                                                    transform: `translate(-50%, -50%) translate(${d.crop_offset_x}px, ${d.crop_offset_y}px) scale(${d.crop_scale / 100})`,
                                                    transformOrigin: 'center',
                                                }}
                                            />
                                        ) : (
                                            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400">
                                                (no icon)
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col gap-2">
                                        <input
                                            ref={(el) => {
                                                fileInputs.current[c.id] = el
                                            }}
                                            type="file"
                                            accept="image/svg+xml,image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={(e) =>
                                                setFile(
                                                    c.id,
                                                    e.target.files?.[0] ?? null,
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
                                                        c.id
                                                    ]?.click()
                                                }
                                            >
                                                <Upload className="mr-1 h-3.5 w-3.5" />
                                                {d.file ? 'Change' : 'Upload'}
                                            </Button>
                                            {(c.svg_url || d.file) && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        clearFile(c.id)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`title-${c.id}`}
                                                className="text-xs"
                                            >
                                                Title
                                            </Label>
                                            <Input
                                                id={`title-${c.id}`}
                                                value={d.title}
                                                onChange={(e) =>
                                                    updateDraft(c.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Crop controls */}
                                <div className="border-border space-y-2 rounded-md border bg-gray-50 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-gray-700">
                                            Crop the icon
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => resetCrop(c.id)}
                                            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline"
                                        >
                                            <RotateCcw className="h-3 w-3" />
                                            Reset crop
                                        </button>
                                    </div>

                                    {/* Scale */}
                                    <div className="flex items-center gap-2">
                                        <Label className="w-12 text-xs">
                                            Scale
                                        </Label>
                                        <input
                                            type="range"
                                            min={MIN_SCALE}
                                            max={MAX_SCALE}
                                            step={5}
                                            value={d.crop_scale}
                                            onChange={(e) =>
                                                updateDraft(c.id, {
                                                    crop_scale: parseInt(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                            className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                                        />
                                        <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                            {d.crop_scale}%
                                        </span>
                                    </div>

                                    {/* X */}
                                    <div className="flex items-center gap-2">
                                        <Label className="w-12 text-xs">
                                            X
                                        </Label>
                                        <input
                                            type="range"
                                            min={MIN_OFFSET}
                                            max={MAX_OFFSET}
                                            value={d.crop_offset_x}
                                            onChange={(e) =>
                                                updateDraft(c.id, {
                                                    crop_offset_x: parseInt(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                            className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                                        />
                                        <Input
                                            type="number"
                                            min={MIN_OFFSET}
                                            max={MAX_OFFSET}
                                            value={d.crop_offset_x}
                                            onChange={(e) => {
                                                const v = parseInt(
                                                    e.target.value,
                                                )
                                                updateDraft(c.id, {
                                                    crop_offset_x: Number.isNaN(
                                                        v,
                                                    )
                                                        ? 0
                                                        : clamp(
                                                              v,
                                                              MIN_OFFSET,
                                                              MAX_OFFSET,
                                                          ),
                                                })
                                            }}
                                            className="h-7 w-16 text-xs"
                                        />
                                    </div>

                                    {/* Y */}
                                    <div className="flex items-center gap-2">
                                        <Label className="w-12 text-xs">
                                            Y
                                        </Label>
                                        <input
                                            type="range"
                                            min={MIN_OFFSET}
                                            max={MAX_OFFSET}
                                            value={d.crop_offset_y}
                                            onChange={(e) =>
                                                updateDraft(c.id, {
                                                    crop_offset_y: parseInt(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                            className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                                        />
                                        <Input
                                            type="number"
                                            min={MIN_OFFSET}
                                            max={MAX_OFFSET}
                                            value={d.crop_offset_y}
                                            onChange={(e) => {
                                                const v = parseInt(
                                                    e.target.value,
                                                )
                                                updateDraft(c.id, {
                                                    crop_offset_y: Number.isNaN(
                                                        v,
                                                    )
                                                        ? 0
                                                        : clamp(
                                                              v,
                                                              MIN_OFFSET,
                                                              MAX_OFFSET,
                                                          ),
                                                })
                                            }}
                                            className="h-7 w-16 text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Label
                                            htmlFor={`order-${c.id}`}
                                            className="text-xs"
                                        >
                                            Order
                                        </Label>
                                        <Input
                                            id={`order-${c.id}`}
                                            type="number"
                                            value={d.order}
                                            onChange={(e) =>
                                                updateDraft(c.id, {
                                                    order:
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                })
                                            }
                                            className="w-20"
                                        />
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => destroy(c)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => save(c)}
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
            </div>
        </AppLayout>
    )
}
