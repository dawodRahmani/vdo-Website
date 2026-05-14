import { useRef, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { ExternalLink, Upload } from 'lucide-react'
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
    order: number
}
interface Priority {
    id: number
    title: string
    href: string
    svg_url: string
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
}

interface PageProps {
    hero: HeroBlock
    stats: Stat[]
    priorities: Priority[]
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

function HeroEditor({ hero }: { hero: HeroBlock }) {
    const [alts, setAlts] = useState<[string, string, string]>([
        hero.photos[0].alt,
        hero.photos[1].alt,
        hero.photos[2].alt,
    ])
    const [files, setFiles] = useState<[File | null, File | null, File | null]>([null, null, null])
    const [previews, setPreviews] = useState<[string | null, string | null, string | null]>([
        null,
        null,
        null,
    ])
    const [saving, setSaving] = useState(false)

    const setFile = (i: 0 | 1 | 2, file: File | null) => {
        const np = [...previews] as [string | null, string | null, string | null]
        if (np[i]) URL.revokeObjectURL(np[i] as string)
        np[i] = file ? URL.createObjectURL(file) : null
        setPreviews(np)
        const nf = [...files] as [File | null, File | null, File | null]
        nf[i] = file
        setFiles(nf)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | File> = {
            photo1_alt: alts[0],
            photo2_alt: alts[1],
            photo3_alt: alts[2],
        }
        files.forEach((f, i) => {
            if (f) payload[`photo${i + 1}_file`] = f
        })
        router.post(`/admin/home-page/hero/${hero.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setFiles([null, null, null])
                setPreviews([null, null, null])
            },
        })
    }

    return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Hero strip</h2>
                    <p className="text-xs text-muted-foreground">
                        The 3 photos at the top of the home page.
                    </p>
                </div>
                <Button onClick={save} disabled={saving}>
                    {saving ? 'Saving…' : 'Save hero'}
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {([0, 1, 2] as const).map((i) => {
                    const shown = previews[i] ?? hero.photos[i].url
                    return (
                        <div
                            key={i}
                            className="space-y-2 rounded-lg border border-dashed border-border bg-background p-3"
                        >
                            <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-gray-100">
                                {shown ? (
                                    <img
                                        src={shown}
                                        alt={alts[i]}
                                        className="h-full w-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Alt text</Label>
                                <Input
                                    value={alts[i]}
                                    onChange={(e) => {
                                        const next = [...alts] as [string, string, string]
                                        next[i] = e.target.value
                                        setAlts(next)
                                    }}
                                />
                            </div>
                            <FileButton
                                hasFile={!!files[i]}
                                onPick={(f) => setFile(i, f)}
                                onReset={() => setFile(i, null)}
                            />
                            {files[i] && (
                                <p className="truncate text-xs text-muted-foreground">
                                    {files[i]?.name}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

function StatRow({ stat }: { stat: Stat }) {
    const [label, setLabel] = useState(stat.label)
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
        const payload: Record<string, string | File> = { label }
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

    return (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100">
                <img
                    src={preview ?? stat.svg_url}
                    alt={label}
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex-1 space-y-2">
                <Input value={label} onChange={(e) => setLabel(e.target.value)} />
                <FileButton
                    hasFile={!!file}
                    onPick={pick}
                    onReset={() => pick(null)}
                />
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
        const payload: Record<string, string | File> = { title, href }
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

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-3 md:flex-row md:items-center">
            <div className="flex h-20 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100">
                <img
                    src={preview ?? priority.svg_url}
                    alt={title}
                    className="h-full w-full object-contain"
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

function RegionsEditor({ regions }: { regions: RegionsBlock }) {
    const [alt, setAlt] = useState(regions.alt)
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
        const payload: Record<string, string | File> = { regions_image_alt: alt }
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
                    <div className="aspect-[4/3] w-full overflow-hidden rounded bg-gray-100">
                        {(preview ?? regions.image_url) ? (
                            <img
                                src={preview ?? regions.image_url}
                                alt={alt}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
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

export default function AdminHomePage({ hero, stats, priorities, commitments, regions }: PageProps) {
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

                <HeroEditor hero={hero} />

                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Key Impact Numbers</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {stats.map((s) => (
                            <StatRow key={s.id} stat={s} />
                        ))}
                    </div>
                </section>

                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Strategic Priority Areas</h2>
                    <div className="space-y-3">
                        {priorities.map((p) => (
                            <PriorityRow key={p.id} priority={p} />
                        ))}
                    </div>
                </section>

                <MapAdminLink />

                <RegionsEditor regions={regions} />

                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Our Commitment icons</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {commitments.map((c) => (
                            <CommitmentRow key={c.id} commitment={c} />
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
