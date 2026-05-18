import { useMemo, useRef, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Search, Upload } from 'lucide-react'

interface HeroPhoto {
    url: string
    alt: string
    path: string
}

interface HeroSectionRow {
    id: number
    page_key: string
    page_label: string
    background_color: string | null
    photos: [HeroPhoto, HeroPhoto, HeroPhoto]
}

interface PageProps {
    sections: HeroSectionRow[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Hero Sections', href: '/admin/hero-sections' },
]

interface RowDraft {
    alts: [string, string, string]
    files: [File | null, File | null, File | null]
    previews: [string | null, string | null, string | null]
    background_color: string
}

function emptyDraft(section: HeroSectionRow): RowDraft {
    return {
        alts: [section.photos[0].alt, section.photos[1].alt, section.photos[2].alt],
        files: [null, null, null],
        previews: [null, null, null],
        background_color: section.background_color ?? '',
    }
}

const HERO_BG_PRESETS = [
    '',
    'rgb(189,191,193)',
    'rgb(243,244,246)',
    'rgb(255,255,255)',
    'rgb(62,64,149)',
    'rgb(0,175,239)',
]

function toHexForPicker(value: string): string {
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return value
    const m = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
    if (m) {
        const [r, g, b] = [m[1], m[2], m[3]].map((n) => parseInt(n, 10))
        return (
            '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')
        )
    }
    return '#bdbfc1'
}

export default function AdminHeroSections({ sections }: PageProps) {
    const [drafts, setDrafts] = useState<Record<number, RowDraft>>(() => {
        const initial: Record<number, RowDraft> = {}
        for (const s of sections) initial[s.id] = emptyDraft(s)
        return initial
    })
    const [savingId, setSavingId] = useState<number | null>(null)
    const [query, setQuery] = useState('')
    const fileInputs = useRef<Record<string, HTMLInputElement | null>>({})

    const filteredSections = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return sections
        return sections.filter(
            (s) =>
                s.page_label.toLowerCase().includes(q) ||
                s.page_key.toLowerCase().includes(q),
        )
    }, [query, sections])

    const getDraft = (id: number, fallback: HeroSectionRow): RowDraft =>
        drafts[id] ?? emptyDraft(fallback)

    const setAlt = (id: number, index: 0 | 1 | 2, value: string, fallback: HeroSectionRow) => {
        setDrafts((d) => {
            const cur = d[id] ?? emptyDraft(fallback)
            const next = { ...cur, alts: [...cur.alts] as [string, string, string] }
            next.alts[index] = value
            return { ...d, [id]: next }
        })
    }

    const setFile = (id: number, index: 0 | 1 | 2, file: File | null, fallback: HeroSectionRow) => {
        setDrafts((d) => {
            const cur = d[id] ?? emptyDraft(fallback)
            const files = [...cur.files] as [File | null, File | null, File | null]
            const previews = [...cur.previews] as [string | null, string | null, string | null]
            if (previews[index]) URL.revokeObjectURL(previews[index] as string)
            files[index] = file
            previews[index] = file ? URL.createObjectURL(file) : null
            return { ...d, [id]: { ...cur, files, previews } }
        })
    }

    const setBackground = (id: number, color: string, fallback: HeroSectionRow) => {
        setDrafts((d) => {
            const cur = d[id] ?? emptyDraft(fallback)
            return { ...d, [id]: { ...cur, background_color: color } }
        })
    }

    const save = (section: HeroSectionRow) => {
        const draft = getDraft(section.id, section)
        setSavingId(section.id)
        const payload: Record<string, string | File> = {
            photo1_alt: draft.alts[0],
            photo2_alt: draft.alts[1],
            photo3_alt: draft.alts[2],
            background_color: draft.background_color,
        }
        draft.files.forEach((file, i) => {
            if (file) payload[`photo${i + 1}_file`] = file
        })

        router.post(`/admin/hero-sections/${section.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingId(null),
            onSuccess: () => {
                setDrafts((d) => ({
                    ...d,
                    [section.id]: {
                        alts: draft.alts,
                        files: [null, null, null],
                        previews: [null, null, null],
                        background_color: draft.background_color,
                    },
                }))
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Sections" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Hero Sections</h1>
                        <p className="text-sm text-muted-foreground">
                            Edit the 3-image hero strip that appears below the header on each page.
                        </p>
                    </div>
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search pages…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                {filteredSections.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
                        No pages match &ldquo;{query}&rdquo;.
                    </div>
                )}

                <div className="space-y-6">
                    {filteredSections.map((section) => {
                        const draft = getDraft(section.id, section)
                        const isSaving = savingId === section.id
                        return (
                            <div
                                key={section.id}
                                className="rounded-xl border border-border bg-card p-5 shadow-sm"
                            >
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="font-semibold">
                                            {section.page_label}
                                        </h2>
                                        <p className="text-xs text-muted-foreground">
                                            {section.page_key}
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => save(section)}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving…' : 'Save'}
                                    </Button>
                                </div>

                                <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-3">
                                    <div
                                        className="h-10 w-10 flex-none rounded-md border border-border shadow-inner"
                                        style={{
                                            backgroundColor:
                                                draft.background_color ||
                                                'transparent',
                                            backgroundImage: draft.background_color
                                                ? undefined
                                                : 'repeating-conic-gradient(#e5e7eb 0% 25%, #f3f4f6 0% 50%) 50% / 12px 12px',
                                        }}
                                        aria-hidden="true"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <Label className="text-xs">
                                            Hero background color
                                        </Label>
                                        <p className="text-[10px] text-muted-foreground">
                                            Color shown behind the 3 hero
                                            photos. Leave blank to inherit the
                                            page background.
                                        </p>
                                    </div>
                                    <input
                                        type="color"
                                        value={toHexForPicker(
                                            draft.background_color,
                                        )}
                                        onChange={(e) =>
                                            setBackground(
                                                section.id,
                                                e.target.value,
                                                section,
                                            )
                                        }
                                        className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                                        title="Pick a color"
                                    />
                                    <Input
                                        value={draft.background_color}
                                        onChange={(e) =>
                                            setBackground(
                                                section.id,
                                                e.target.value,
                                                section,
                                            )
                                        }
                                        placeholder="(inherit)"
                                        className="w-44 font-mono text-xs"
                                    />
                                    <div className="flex flex-wrap items-center gap-1">
                                        {HERO_BG_PRESETS.map((c) => (
                                            <button
                                                key={c || 'none'}
                                                type="button"
                                                title={c || 'inherit'}
                                                onClick={() =>
                                                    setBackground(
                                                        section.id,
                                                        c,
                                                        section,
                                                    )
                                                }
                                                className="h-6 w-6 rounded border border-border"
                                                style={
                                                    c
                                                        ? { backgroundColor: c }
                                                        : {
                                                              backgroundImage:
                                                                  'repeating-conic-gradient(#e5e7eb 0% 25%, #f3f4f6 0% 50%) 50% / 8px 8px',
                                                          }
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {([0, 1, 2] as const).map((i) => {
                                        const currentUrl = section.photos[i].url
                                        const previewUrl = draft.previews[i]
                                        const shown = previewUrl ?? currentUrl
                                        const inputKey = `${section.id}-${i}`
                                        return (
                                            <div
                                                key={i}
                                                className="space-y-2 rounded-lg border border-dashed border-border bg-background p-3"
                                            >
                                                <div className="aspect-[5/3] w-full overflow-hidden rounded-md bg-gray-100">
                                                    {shown ? (
                                                        <img
                                                            src={shown}
                                                            alt={draft.alts[i]}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                            (no image)
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor={`${inputKey}-alt`}
                                                        className="text-xs"
                                                    >
                                                        Alt text
                                                    </Label>
                                                    <Input
                                                        id={`${inputKey}-alt`}
                                                        value={draft.alts[i]}
                                                        onChange={(e) =>
                                                            setAlt(
                                                                section.id,
                                                                i,
                                                                e.target.value,
                                                                section,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <input
                                                    ref={(el) => {
                                                        fileInputs.current[inputKey] = el
                                                    }}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const f = e.target.files?.[0] ?? null
                                                        setFile(section.id, i, f, section)
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex-1"
                                                        onClick={() =>
                                                            fileInputs.current[inputKey]?.click()
                                                        }
                                                    >
                                                        <Upload className="mr-1 h-3.5 w-3.5" />
                                                        {draft.files[i] ? 'Change' : 'Upload'}
                                                    </Button>
                                                    {draft.files[i] && (
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                setFile(section.id, i, null, section)
                                                            }
                                                        >
                                                            Reset
                                                        </Button>
                                                    )}
                                                </div>
                                                {draft.files[i] && (
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {draft.files[i]?.name}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AppLayout>
    )
}
