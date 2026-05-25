import { useRef, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { ExternalLink, Plus, Trash2, Upload } from 'lucide-react'
import { Link } from '@inertiajs/react'

interface HeroPhoto {
    url: string
    alt: string
}
interface HeroBlock {
    id: number
    photos: [HeroPhoto, HeroPhoto, HeroPhoto]
}
interface Stat {
    id: number
    label: string
    svg_url: string
    size_scale?: number
    order: number
}
interface Priority {
    id: number
    title: string
    href: string
    svg_url: string
    size_scale?: number
    order: number
}
interface Commitment {
    id: number
    title: string
    svg_url: string
    order: number
}

interface RegionsBlock {
    image_url: string
    alt: string
    max_width: number | null
}

interface PrioritiesSection {
    offset_x: number
    offset_y: number
    scale: number
}

const DEFAULT_REGIONS_MAX_WIDTH = 100
const MIN_REGIONS_MAX_WIDTH = 30
const MAX_REGIONS_MAX_WIDTH = 100

const MIN_PRIORITY_OFFSET_X = -400
const MAX_PRIORITY_OFFSET_X = 400
const MIN_PRIORITY_OFFSET_Y = -200
const MAX_PRIORITY_OFFSET_Y = 200
const MIN_PRIORITY_SCALE = 50
const MAX_PRIORITY_SCALE = 200

interface HeroSlidePhoto {
    url: string
    alt: string
    path: string | null
}
interface HeroSlide {
    id: number
    order: number
    is_active: boolean
    photo: HeroSlidePhoto
}

interface PageProps {
    hero: HeroBlock
    heroSlides: HeroSlide[]
    stats: Stat[]
    priorities: Priority[]
    prioritiesSection: PrioritiesSection
    commitments: Commitment[]
    regions: RegionsBlock
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Home Page', href: '/admin/home-page' },
]

function FileButton({
    onPick,
    hasFile,
    onReset,
}: {
    onPick: (file: File | null) => void
    hasFile: boolean
    onReset: () => void
}) {
    const ref = useRef<HTMLInputElement | null>(null)
    return (
        <div className="flex items-center gap-2">
            <input
                ref={ref}
                type="file"
                accept="image/*,.svg"
                className="hidden"
                onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
            <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => ref.current?.click()}
            >
                <Upload className="mr-1 h-3.5 w-3.5" />
                {hasFile ? 'Change' : 'Upload'}
            </Button>
            {hasFile && (
                <Button type="button" size="sm" variant="ghost" onClick={onReset}>
                    Reset
                </Button>
            )}
        </div>
    )
}

function HeroSlideRow({ slide }: { slide: HeroSlide }) {
    const [alt, setAlt] = useState<string>(slide.photo.alt)
    const [file, setFileState] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [order, setOrder] = useState<number>(slide.order)
    const [isActive, setIsActive] = useState<boolean>(slide.is_active)
    const [saving, setSaving] = useState(false)

    const setFile = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setFileState(f)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            photo1_alt: alt,
            order,
            is_active: isActive ? 1 : 0,
        }
        if (file) payload.photo1_file = file
        router.post(`/admin/home-page/hero-slides/${slide.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                if (preview) URL.revokeObjectURL(preview)
                setFileState(null)
                setPreview(null)
            },
        })
    }

    const remove = () => {
        if (!confirm(`Delete slide #${slide.order}?`)) return
        router.delete(`/admin/home-page/hero-slides/${slide.id}`, {
            preserveScroll: true,
        })
    }

    const shown = preview ?? slide.photo.url

    return (
        <div className="rounded-lg border border-border bg-background p-4">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                <h3 className="text-sm font-semibold">Slide #{slide.order}</h3>
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex items-center gap-2">
                        <Label className="text-xs">Order</Label>
                        <Input
                            type="number"
                            min={0}
                            value={order}
                            onChange={(e) =>
                                setOrder(parseInt(e.target.value, 10) || 0)
                            }
                            className="w-20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id={`slide-active-${slide.id}`}
                            checked={isActive}
                            onCheckedChange={(v) => setIsActive(!!v)}
                        />
                        <Label
                            htmlFor={`slide-active-${slide.id}`}
                            className="text-xs"
                        >
                            Active
                        </Label>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={remove}
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Delete
                    </Button>
                    <Button size="sm" onClick={save} disabled={saving}>
                        {saving ? 'Saving…' : 'Save slide'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
                <div className="rounded-lg border border-dashed border-border bg-background p-3">
                    <div className="aspect-[16/6] w-full overflow-hidden rounded-md bg-gray-100">
                        {shown ? (
                            <img
                                src={shown}
                                alt={alt}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                No image — upload one to use this slide
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-3 rounded-lg border border-dashed border-border bg-background p-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Alt text</Label>
                        <Input
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            placeholder="Describe the image for screen readers"
                        />
                    </div>
                    <FileButton
                        hasFile={!!file}
                        onPick={(f) => setFile(f)}
                        onReset={() => setFile(null)}
                    />
                    {file && (
                        <p className="truncate text-xs text-muted-foreground">
                            {file.name}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

function HeroSlidesEditor({ slides }: { slides: HeroSlide[] }) {
    const [adding, setAdding] = useState(false)

    const addSlide = () => {
        setAdding(true)
        router.post(
            '/admin/home-page/hero-slides',
            {},
            {
                preserveScroll: true,
                onFinish: () => setAdding(false),
            },
        )
    }

    return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Hero strip — slides
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Each slide is a row of 3 photos shown at the top of the
                        home page. With 2+ active slides, the strip becomes a
                        slider that auto-advances every 6 seconds.
                    </p>
                </div>
                <Button onClick={addSlide} disabled={adding}>
                    <Plus className="mr-1 h-4 w-4" />
                    {adding ? 'Adding…' : 'Add slide'}
                </Button>
            </div>

            {slides.length === 0 ? (
                <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    No slides yet. Click "Add slide" to create one.
                </p>
            ) : (
                <div className="space-y-4">
                    {slides.map((s) => (
                        <HeroSlideRow key={s.id} slide={s} />
                    ))}
                </div>
            )}
        </section>
    )
}

function StatRow({ stat }: { stat: Stat }) {
    const [label, setLabel] = useState(stat.label)
    const [size, setSize] = useState<number>(stat.size_scale ?? 100)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const pick = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setFile(f)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            label,
            size_scale: size,
        }
        if (file) payload.svg_file = file
        router.post(`/admin/home-page/stats/${stat.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setFile(null)
                setPreview(null)
            },
        })
    }

    const previewHeight = `${(size / 100) * 64}px`

    return (
        <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100">
                <img
                    src={preview ?? stat.svg_url}
                    alt={label}
                    className="w-auto object-contain"
                    style={{ height: previewHeight, maxHeight: '100%' }}
                />
            </div>
            <div className="flex-1 space-y-2">
                <Input value={label} onChange={(e) => setLabel(e.target.value)} />
                <FileButton
                    hasFile={!!file}
                    onPick={pick}
                    onReset={() => pick(null)}
                />
                <div className="flex items-center gap-2">
                    <span className="w-10 text-xs text-muted-foreground">
                        Size
                    </span>
                    <input
                        type="range"
                        min={50}
                        max={200}
                        step={5}
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value, 10))}
                        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                    />
                    <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                        {size}%
                    </span>
                </div>
            </div>
            <Button size="sm" onClick={save} disabled={saving}>
                {saving ? '…' : 'Save'}
            </Button>
        </div>
    )
}

function PriorityRow({ priority }: { priority: Priority }) {
    const [title, setTitle] = useState(priority.title)
    const [href, setHref] = useState(priority.href)
    const [size, setSize] = useState<number>(priority.size_scale ?? 100)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const pick = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setFile(f)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            title,
            href,
            size_scale: size,
        }
        if (file) payload.svg_file = file
        router.post(`/admin/home-page/priorities/${priority.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setFile(null)
                setPreview(null)
            },
        })
    }

    const scale = size / 100

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-3 md:flex-row md:items-center">
            <div className="flex h-20 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100">
                <img
                    src={preview ?? priority.svg_url}
                    alt={title}
                    className="h-full w-full object-contain transition-transform duration-150"
                    style={{ transform: `scale(${scale})` }}
                />
            </div>
            <div className="flex-1 space-y-2">
                <div className="space-y-1">
                    <Label className="text-xs">Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Link</Label>
                    <Input value={href} onChange={(e) => setHref(e.target.value)} />
                </div>
                <FileButton hasFile={!!file} onPick={pick} onReset={() => pick(null)} />
                <div className="flex items-center gap-2">
                    <span className="w-10 text-xs text-muted-foreground">
                        Size
                    </span>
                    <input
                        type="range"
                        min={50}
                        max={200}
                        step={5}
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value, 10))}
                        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                    />
                    <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                        {size}%
                    </span>
                </div>
            </div>
            <Button size="sm" onClick={save} disabled={saving}>
                {saving ? '…' : 'Save'}
            </Button>
        </div>
    )
}

function CommitmentRow({ commitment }: { commitment: Commitment }) {
    const [title, setTitle] = useState(commitment.title)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const pick = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setFile(f)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | File> = { title }
        if (file) payload.svg_file = file
        router.post(`/admin/home-page/commitments/${commitment.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setFile(null)
                setPreview(null)
            },
        })
    }

    return (
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded bg-gray-100">
                <img
                    src={preview ?? commitment.svg_url}
                    alt={title}
                    className="h-full w-full object-contain"
                />
            </div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <FileButton hasFile={!!file} onPick={pick} onReset={() => pick(null)} />
            <Button size="sm" onClick={save} disabled={saving} className="w-full">
                {saving ? 'Saving…' : 'Save'}
            </Button>
        </div>
    )
}

function PrioritiesSectionEditor({
    section,
}: {
    section: PrioritiesSection
}) {
    const [offsetX, setOffsetX] = useState<number>(section.offset_x)
    const [offsetY, setOffsetY] = useState<number>(section.offset_y)
    const [scale, setScale] = useState<number>(section.scale)
    const [saving, setSaving] = useState(false)

    const reset = () => {
        setOffsetX(0)
        setOffsetY(0)
        setScale(100)
    }

    const save = () => {
        setSaving(true)
        router.post(
            '/admin/home-page/priorities-section',
            {
                offset_x: offsetX,
                offset_y: offsetY,
                scale,
            },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        )
    }

    return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Section: position & scale
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Shifts and scales the whole "Strategic Priority Areas
                        & Reached Beneficiaries" block (heading + grid of
                        cards) on the home page.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={reset}
                        className="text-xs text-muted-foreground underline hover:text-foreground"
                    >
                        Reset
                    </button>
                    <Button onClick={save} disabled={saving}>
                        {saving ? 'Saving…' : 'Save'}
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {/* Scale */}
                <div className="flex items-center gap-3">
                    <Label className="w-20 text-xs">Scale</Label>
                    <input
                        type="range"
                        min={MIN_PRIORITY_SCALE}
                        max={MAX_PRIORITY_SCALE}
                        value={scale}
                        onChange={(e) => setScale(parseInt(e.target.value))}
                        className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                    />
                    <Input
                        type="number"
                        min={MIN_PRIORITY_SCALE}
                        max={MAX_PRIORITY_SCALE}
                        value={scale}
                        onChange={(e) => {
                            const v = parseInt(e.target.value)
                            if (Number.isNaN(v)) {
                                setScale(100)
                            } else {
                                setScale(
                                    Math.min(
                                        MAX_PRIORITY_SCALE,
                                        Math.max(MIN_PRIORITY_SCALE, v),
                                    ),
                                )
                            }
                        }}
                        className="h-8 w-20 text-xs"
                    />
                    <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                        {scale}%
                    </span>
                </div>

                {/* X */}
                <div className="flex items-center gap-3">
                    <Label className="w-20 text-xs">Horizontal</Label>
                    <input
                        type="range"
                        min={MIN_PRIORITY_OFFSET_X}
                        max={MAX_PRIORITY_OFFSET_X}
                        value={offsetX}
                        onChange={(e) => setOffsetX(parseInt(e.target.value))}
                        className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                    />
                    <Input
                        type="number"
                        min={MIN_PRIORITY_OFFSET_X}
                        max={MAX_PRIORITY_OFFSET_X}
                        value={offsetX}
                        onChange={(e) => {
                            const v = parseInt(e.target.value)
                            if (Number.isNaN(v)) {
                                setOffsetX(0)
                            } else {
                                setOffsetX(
                                    Math.min(
                                        MAX_PRIORITY_OFFSET_X,
                                        Math.max(MIN_PRIORITY_OFFSET_X, v),
                                    ),
                                )
                            }
                        }}
                        className="h-8 w-20 text-xs"
                    />
                    <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                        {offsetX}px
                    </span>
                </div>

                {/* Y */}
                <div className="flex items-center gap-3">
                    <Label className="w-20 text-xs">Vertical</Label>
                    <input
                        type="range"
                        min={MIN_PRIORITY_OFFSET_Y}
                        max={MAX_PRIORITY_OFFSET_Y}
                        value={offsetY}
                        onChange={(e) => setOffsetY(parseInt(e.target.value))}
                        className="h-1.5 flex-1 cursor-pointer accent-[rgb(0,175,239)]"
                    />
                    <Input
                        type="number"
                        min={MIN_PRIORITY_OFFSET_Y}
                        max={MAX_PRIORITY_OFFSET_Y}
                        value={offsetY}
                        onChange={(e) => {
                            const v = parseInt(e.target.value)
                            if (Number.isNaN(v)) {
                                setOffsetY(0)
                            } else {
                                setOffsetY(
                                    Math.min(
                                        MAX_PRIORITY_OFFSET_Y,
                                        Math.max(MIN_PRIORITY_OFFSET_Y, v),
                                    ),
                                )
                            }
                        }}
                        className="h-8 w-20 text-xs"
                    />
                    <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                        {offsetY}px
                    </span>
                </div>

                <p className="text-xs text-muted-foreground">
                    Scale grows from the top-left so the heading stays
                    anchored. Negative offsets move up / left, positive offsets
                    move down / right.
                </p>
            </div>
        </section>
    )
}

function RegionsEditor({ regions }: { regions: RegionsBlock }) {
    const [alt, setAlt] = useState(regions.alt)
    const [maxWidth, setMaxWidth] = useState<number>(
        regions.max_width ?? DEFAULT_REGIONS_MAX_WIDTH,
    )
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const pick = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setFile(f)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            regions_image_alt: alt,
            regions_image_max_width: maxWidth,
        }
        if (file) payload.regions_image_file = file
        router.post('/admin/home-page/regions', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setFile(null)
                setPreview(null)
            },
        })
    }

    return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Regions & Provinces image</h2>
                    <p className="text-xs text-muted-foreground">
                        The image shown below the Afghanistan map on the home page.
                    </p>
                </div>
                <Button onClick={save} disabled={saving}>
                    {saving ? 'Saving…' : 'Save'}
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr]">
                <div className="rounded-lg border border-dashed border-border bg-background p-3">
                    <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded bg-gray-100">
                        {(preview ?? regions.image_url) ? (
                            <img
                                src={preview ?? regions.image_url}
                                alt={alt}
                                className="h-auto object-contain"
                                style={{
                                    width: `${maxWidth}%`,
                                    maxHeight: '100%',
                                }}
                            />
                        ) : (
                            <div className="text-xs text-gray-400">
                                (no image)
                            </div>
                        )}
                    </div>
                    <div className="mt-2">
                        <FileButton
                            hasFile={!!file}
                            onPick={pick}
                            onReset={() => pick(null)}
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs">Alt text</Label>
                        <textarea
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            rows={5}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        {file && (
                            <p className="truncate text-xs text-muted-foreground">{file.name}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Width: {maxWidth}%</Label>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min={MIN_REGIONS_MAX_WIDTH}
                                max={MAX_REGIONS_MAX_WIDTH}
                                value={maxWidth}
                                onChange={(e) =>
                                    setMaxWidth(parseInt(e.target.value))
                                }
                                className="h-2 flex-1 cursor-pointer"
                            />
                            <input
                                type="number"
                                min={MIN_REGIONS_MAX_WIDTH}
                                max={MAX_REGIONS_MAX_WIDTH}
                                value={maxWidth}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value)
                                    if (Number.isNaN(v)) {
                                        setMaxWidth(DEFAULT_REGIONS_MAX_WIDTH)
                                    } else {
                                        setMaxWidth(
                                            Math.min(
                                                MAX_REGIONS_MAX_WIDTH,
                                                Math.max(
                                                    MIN_REGIONS_MAX_WIDTH,
                                                    v,
                                                ),
                                            ),
                                        )
                                    }
                                }}
                                className="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            Percent of the column width. {MIN_REGIONS_MAX_WIDTH}–{MAX_REGIONS_MAX_WIDTH}%. Default {DEFAULT_REGIONS_MAX_WIDTH}.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function MapAdminLink() {
    return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">Afghanistan map</h2>
                    <p className="text-xs text-muted-foreground">
                        The interactive &ldquo;Where We Work&rdquo; map (regions, colors, pins) is
                        managed on its own page.
                    </p>
                </div>
                <Link
                    href="/admin/map"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
                >
                    Open Map admin
                    <ExternalLink className="h-3.5 w-3.5" />
                </Link>
            </div>
        </section>
    )
}

export default function AdminHomePage({ heroSlides, stats, priorities, prioritiesSection, commitments, regions }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home Page" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Home Page</h1>
                    <p className="text-sm text-muted-foreground">
                        Edit every section of the home page. News & Announcements has its own page.
                    </p>
                </div>

                <HeroSlidesEditor slides={heroSlides ?? []} />

                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Key Impact Numbers</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {stats.map((s) => (
                            <StatRow key={s.id} stat={s} />
                        ))}
                    </div>
                </section>

                <PrioritiesSectionEditor section={prioritiesSection} />

                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Strategic Priority Areas</h2>
                    <div className="space-y-3">
                        {priorities.map((p) => (
                            <PriorityRow key={p.id} priority={p} />
                        ))}
                    </div>
                </section>

                <RegionsEditor regions={regions} />

                {/* Hidden — full editor lives at /admin/home-commitments
                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Our Commitment icons</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {commitments.map((c) => (
                            <CommitmentRow key={c.id} commitment={c} />
                        ))}
                    </div>
                </section>
                */}
            </div>
        </AppLayout>
    )
}
