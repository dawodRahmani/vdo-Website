import { useRef, useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Plus, RotateCcw, Trash2, Upload } from 'lucide-react'

type SlotKey = 'infographic' | 'beneficiary' | 'extra'

interface SlotPayload {
    path: string | null
    url: string
    render_url: string
    alt: string | null
    scale: number
    offset_x: number
    offset_y: number
    text_labels: string[]
    text_overrides: string[] | Record<string, string>
}

interface SpPage {
    id: number
    page_key: string
    page_label: string
    heading: string | null
    body: string | null
    between_body: string | null
    achievements_heading: string | null
    infographics: Record<SlotKey, SlotPayload>
}

interface Bullet {
    id: number
    page_key: string
    content: string
    order: number
}

interface PageProps {
    page: SpPage
    bullets: Bullet[]
    [key: string]: unknown
}

const SLOT_TITLES: Record<SlotKey, string> = {
    infographic: 'Main infographic',
    beneficiary: 'Beneficiary stats image',
    extra: 'Third infographic (optional)',
}

const MIN_SCALE = 25
const MAX_SCALE = 400
const MIN_OFFSET = -500
const MAX_OFFSET = 500

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

function toOverridesArray(
    raw: SlotPayload['text_overrides'],
    length: number,
): string[] {
    const out: string[] = new Array(length).fill('')
    if (Array.isArray(raw)) {
        raw.forEach((v, i) => {
            if (i < length && typeof v === 'string') out[i] = v
        })
        return out
    }
    if (raw && typeof raw === 'object') {
        for (const [k, v] of Object.entries(raw)) {
            const i = parseInt(k, 10)
            if (!Number.isNaN(i) && i < length && typeof v === 'string') {
                out[i] = v
            }
        }
    }
    return out
}

function Textarea({
    value,
    onChange,
    rows = 4,
    placeholder,
}: {
    value: string
    onChange: (v: string) => void
    rows?: number
    placeholder?: string
}) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
    )
}

interface SlotDraft {
    file: File | null
    fileName: string | null
    localPreview: string | null
    alt: string
    scale: number
    offsetX: number
    offsetY: number
    overrides: string[]
}

function slotDraftOf(slot: SlotPayload): SlotDraft {
    return {
        file: null,
        fileName: null,
        localPreview: null,
        alt: slot.alt ?? '',
        scale: slot.scale,
        offsetX: slot.offset_x,
        offsetY: slot.offset_y,
        overrides: toOverridesArray(slot.text_overrides, slot.text_labels.length),
    }
}

function SlotEditor({
    slotKey,
    slot,
    draft,
    setDraft,
    onClear,
}: {
    slotKey: SlotKey
    slot: SlotPayload
    draft: SlotDraft
    setDraft: (patch: Partial<SlotDraft>) => void
    onClear?: () => void
}) {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const previewUrl =
        draft.localPreview ?? (slot.render_url || slot.url || '')
    const labels = slot.text_labels
    const hasLabels = labels.length > 0
    const scalePct = draft.scale / 100

    const pickFile = (file: File | null) => {
        if (draft.localPreview) URL.revokeObjectURL(draft.localPreview)
        setDraft({
            file,
            fileName: file?.name ?? null,
            localPreview: file ? URL.createObjectURL(file) : null,
        })
    }

    const updateOverride = (index: number, value: string) => {
        const next = [...draft.overrides]
        next[index] = value
        setDraft({ overrides: next })
    }

    const resetOverrides = () =>
        setDraft({ overrides: new Array(labels.length).fill('') })

    const resetTransform = () =>
        setDraft({ scale: 100, offsetX: 0, offsetY: 0 })

    return (
        <section className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{SLOT_TITLES[slotKey]}</h2>
                {onClear && slot.path && (
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={onClear}
                    >
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Remove
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr]">
                {/* Preview + upload */}
                <div className="space-y-2">
                    <div
                        className="overflow-hidden rounded-lg border border-dashed border-border bg-[rgb(245,245,245)]"
                        style={{ aspectRatio: '5 / 3' }}
                    >
                        {previewUrl ? (
                            <div
                                className="h-full w-full"
                                style={{
                                    transform: `translate(${draft.offsetX}px, ${draft.offsetY}px) scale(${scalePct})`,
                                    transformOrigin: 'center center',
                                }}
                            >
                                <img
                                    src={previewUrl}
                                    alt=""
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                (no image)
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    />
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Upload className="mr-1 h-3.5 w-3.5" />
                            {draft.fileName ? 'Change' : 'Upload'}
                        </Button>
                        {draft.fileName && (
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => pickFile(null)}
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                    {draft.fileName && (
                        <p className="truncate text-xs text-muted-foreground">
                            {draft.fileName}
                        </p>
                    )}
                    {draft.file && hasLabels && (
                        <p className="text-xs text-amber-600">
                            Uploading a new file will clear current text edits.
                        </p>
                    )}
                </div>

                {/* Alt + transform controls */}
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Alt text</Label>
                        <Textarea
                            value={draft.alt}
                            onChange={(v) => setDraft({ alt: v })}
                            rows={2}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs">Scale ({draft.scale}%)</Label>
                            <button
                                type="button"
                                onClick={resetTransform}
                                className="flex items-center gap-1 text-xs text-muted-foreground underline hover:text-foreground"
                            >
                                <RotateCcw className="h-3 w-3" />
                                Reset position
                            </button>
                        </div>
                        <input
                            type="range"
                            min={MIN_SCALE}
                            max={MAX_SCALE}
                            value={draft.scale}
                            onChange={(e) =>
                                setDraft({
                                    scale: clamp(
                                        parseInt(e.target.value, 10),
                                        MIN_SCALE,
                                        MAX_SCALE,
                                    ),
                                })
                            }
                            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">
                                Horizontal offset ({draft.offsetX}px)
                            </Label>
                            <input
                                type="range"
                                min={MIN_OFFSET}
                                max={MAX_OFFSET}
                                value={draft.offsetX}
                                onChange={(e) =>
                                    setDraft({
                                        offsetX: clamp(
                                            parseInt(e.target.value, 10),
                                            MIN_OFFSET,
                                            MAX_OFFSET,
                                        ),
                                    })
                                }
                                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">
                                Vertical offset ({draft.offsetY}px)
                            </Label>
                            <input
                                type="range"
                                min={MIN_OFFSET}
                                max={MAX_OFFSET}
                                value={draft.offsetY}
                                onChange={(e) =>
                                    setDraft({
                                        offsetY: clamp(
                                            parseInt(e.target.value, 10),
                                            MIN_OFFSET,
                                            MAX_OFFSET,
                                        ),
                                    })
                                }
                                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Text editing */}
            {hasLabels && !draft.file && (
                <div className="space-y-2 rounded-lg border border-dashed border-border bg-background p-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">
                            Text inside the image ({labels.length})
                        </h3>
                        <button
                            type="button"
                            onClick={resetOverrides}
                            className="text-xs text-muted-foreground underline hover:text-foreground"
                        >
                            Restore originals
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Each label below maps to a text element in the image.
                        Edit any value to override it — leave blank to keep the
                        original. Saved fonts and colors match site body text.
                    </p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {labels.map((label, i) => (
                            <div key={i} className="space-y-1">
                                <Label className="text-[11px] text-muted-foreground">
                                    Original: {label || '(blank)'}
                                </Label>
                                <Input
                                    value={draft.overrides[i] ?? ''}
                                    onChange={(e) =>
                                        updateOverride(i, e.target.value)
                                    }
                                    placeholder={label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

function BulletRow({ bullet }: { bullet: Bullet }) {
    const [content, setContent] = useState(bullet.content)
    const [saving, setSaving] = useState(false)

    const save = () => {
        if (content === bullet.content) return
        setSaving(true)
        router.patch(
            `/admin/strategic-priorities/bullets/${bullet.id}`,
            { content },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        )
    }

    const remove = () => {
        if (!confirm('Delete this bullet?')) return
        router.delete(`/admin/strategic-priorities/bullets/${bullet.id}`, {
            preserveScroll: true,
        })
    }

    return (
        <div className="flex items-start gap-2 rounded-lg border border-border bg-background p-2">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={save}
                rows={2}
                className="flex-1 rounded-md border-0 bg-transparent px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex flex-col gap-1 pt-1">
                {saving && (
                    <span className="text-[10px] text-muted-foreground">
                        saving…
                    </span>
                )}
                <Button type="button" size="sm" variant="ghost" onClick={remove}>
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    )
}

function NewBullet({ pageKey }: { pageKey: string }) {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')
    const [saving, setSaving] = useState(false)

    if (!open) {
        return (
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setOpen(true)}
                className="self-start"
            >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add bullet
            </Button>
        )
    }

    const submit = () => {
        if (!content.trim()) return
        setSaving(true)
        router.post(
            `/admin/strategic-priorities/page/${pageKey}/bullets`,
            { content },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
                onSuccess: () => {
                    setContent('')
                    setOpen(false)
                },
            },
        )
    }

    return (
        <div className="space-y-2 rounded-lg border border-dashed border-border bg-background p-3">
            <Textarea value={content} onChange={setContent} rows={2} />
            <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={submit} disabled={saving}>
                    {saving ? 'Adding…' : 'Add'}
                </Button>
            </div>
        </div>
    )
}

export default function StrategicPriorityPageEditor({
    page,
    bullets,
}: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Strategic Priorities', href: '/admin/strategic-priorities' },
        {
            title: page.page_label,
            href: `/admin/strategic-priorities/page/${page.page_key}`,
        },
    ]

    const [heading, setHeading] = useState(page.heading ?? '')
    const [body, setBody] = useState(page.body ?? '')
    const [betweenBody, setBetweenBody] = useState(page.between_body ?? '')
    const [achievementsHeading, setAchievementsHeading] = useState(
        page.achievements_heading ?? '',
    )
    const [clearExtra, setClearExtra] = useState(false)

    const [slotDrafts, setSlotDrafts] = useState<Record<SlotKey, SlotDraft>>(
        () => ({
            infographic: slotDraftOf(page.infographics.infographic),
            beneficiary: slotDraftOf(page.infographics.beneficiary),
            extra: slotDraftOf(page.infographics.extra),
        }),
    )

    const updateSlot = (key: SlotKey, patch: Partial<SlotDraft>) =>
        setSlotDrafts((s) => ({ ...s, [key]: { ...s[key], ...patch } }))

    const [saving, setSaving] = useState(false)

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File | Blob> = {
            heading,
            body,
            between_body: betweenBody,
            achievements_heading: achievementsHeading,
            clear_extra: clearExtra ? 1 : 0,
        }

        for (const key of ['infographic', 'beneficiary', 'extra'] as SlotKey[]) {
            const d = slotDrafts[key]
            payload[`${key}_alt`] = d.alt
            payload[`${key}_scale`] = d.scale
            payload[`${key}_offset_x`] = d.offsetX
            payload[`${key}_offset_y`] = d.offsetY
            if (d.file) {
                payload[`${key}_file`] = d.file
            } else {
                // Only send overrides when there is no new file — uploading
                // a new file resets overrides on the server side.
                d.overrides.forEach((value, i) => {
                    payload[`${key}_text_overrides[${i}]`] = value
                })
            }
        }

        router.post(`/admin/strategic-priorities/page/${page.page_key}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setClearExtra(false)
                // Reset file pickers so subsequent saves don't re-upload.
                setSlotDrafts((s) => {
                    const next = { ...s }
                    for (const k of ['infographic', 'beneficiary', 'extra'] as SlotKey[]) {
                        if (next[k].localPreview)
                            URL.revokeObjectURL(next[k].localPreview!)
                        next[k] = {
                            ...next[k],
                            file: null,
                            fileName: null,
                            localPreview: null,
                        }
                    }
                    return next
                })
                router.reload({ only: ['page'] })
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Strategic Priorities · ${page.page_label}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {page.page_label}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Edit content for{' '}
                            <Link
                                href={`/strategic-priorities/${page.page_key}`}
                                className="text-[rgb(0,175,239)] hover:underline"
                            >
                                /strategic-priorities/{page.page_key}
                            </Link>
                        </p>
                    </div>
                    <Button onClick={save} disabled={saving}>
                        {saving ? 'Saving…' : 'Save changes'}
                    </Button>
                </div>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Heading & body</h2>
                    <div className="space-y-1">
                        <Label className="text-xs">Heading</Label>
                        <Input
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Body (paragraphs separated by blank lines)
                        </Label>
                        <Textarea value={body} onChange={setBody} rows={8} />
                    </div>
                </section>

                <SlotEditor
                    slotKey="infographic"
                    slot={page.infographics.infographic}
                    draft={slotDrafts.infographic}
                    setDraft={(patch) => updateSlot('infographic', patch)}
                />

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">
                        Between-image body (optional)
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Text shown between the main infographic and the
                        achievements / bullets section. Use{' '}
                        <code>**bold**</code> for emphasis on terms like SDG
                        goals.
                    </p>
                    <Textarea
                        value={betweenBody}
                        onChange={setBetweenBody}
                        rows={6}
                    />
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">
                        Achievements / bullets
                    </h2>
                    <div className="space-y-1">
                        <Label className="text-xs">Section heading</Label>
                        <Input
                            value={achievementsHeading}
                            onChange={(e) =>
                                setAchievementsHeading(e.target.value)
                            }
                            placeholder="e.g. Key Achievements:"
                        />
                    </div>
                    <div className="space-y-2">
                        {bullets.map((b) => (
                            <BulletRow key={b.id} bullet={b} />
                        ))}
                        <NewBullet pageKey={page.page_key} />
                    </div>
                </section>

                <SlotEditor
                    slotKey="beneficiary"
                    slot={page.infographics.beneficiary}
                    draft={slotDrafts.beneficiary}
                    setDraft={(patch) => updateSlot('beneficiary', patch)}
                />

                <SlotEditor
                    slotKey="extra"
                    slot={page.infographics.extra}
                    draft={slotDrafts.extra}
                    setDraft={(patch) => updateSlot('extra', patch)}
                    onClear={() => setClearExtra(true)}
                />

                {clearExtra && (
                    <p className="text-xs text-amber-600">
                        Third infographic will be removed on the next save.
                    </p>
                )}

                <div className="flex justify-end">
                    <Button onClick={save} disabled={saving} size="lg">
                        {saving ? 'Saving…' : 'Save changes'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}
