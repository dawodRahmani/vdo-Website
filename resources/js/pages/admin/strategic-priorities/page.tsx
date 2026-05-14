import { useRef, useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Plus, Trash2, Upload } from 'lucide-react'

interface SpPage {
    id: number
    page_key: string
    page_label: string
    heading: string | null
    body: string | null
    between_body: string | null
    infographic_url: string
    infographic_alt: string | null
    achievements_heading: string | null
    beneficiary_url: string
    beneficiary_alt: string | null
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

function FileUpload({
    currentUrl,
    onPick,
    label,
}: {
    currentUrl: string
    onPick: (file: File | null) => void
    label: string
}) {
    const [preview, setPreview] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const ref = useRef<HTMLInputElement | null>(null)

    const pick = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setName(f?.name ?? null)
        onPick(f)
    }

    const shown = preview ?? currentUrl

    return (
        <div className="space-y-2">
            <Label className="text-xs">{label}</Label>
            <div className="rounded-lg border border-dashed border-border bg-background p-3">
                <div className="aspect-[5/3] w-full overflow-hidden rounded bg-gray-100">
                    {shown ? (
                        <img
                            src={shown}
                            alt=""
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            (no image)
                        </div>
                    )}
                </div>
                <input
                    ref={ref}
                    type="file"
                    accept="image/*,.svg"
                    className="hidden"
                    onChange={(e) => pick(e.target.files?.[0] ?? null)}
                />
                <div className="mt-2 flex items-center gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => ref.current?.click()}
                    >
                        <Upload className="mr-1 h-3.5 w-3.5" />
                        {name ? 'Change' : 'Upload'}
                    </Button>
                    {name && (
                        <Button type="button" size="sm" variant="ghost" onClick={() => pick(null)}>
                            Reset
                        </Button>
                    )}
                </div>
                {name && (
                    <p className="mt-1 truncate text-xs text-muted-foreground">{name}</p>
                )}
            </div>
        </div>
    )
}

function BulletRow({ bullet, pageKey }: { bullet: Bullet; pageKey: string }) {
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
                    <span className="text-[10px] text-muted-foreground">saving…</span>
                )}
                <Button type="button" size="sm" variant="ghost" onClick={remove}>
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    )
    void pageKey
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

export default function StrategicPriorityPageEditor({ page, bullets }: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Strategic Priorities', href: '/admin/strategic-priorities' },
        { title: page.page_label, href: `/admin/strategic-priorities/page/${page.page_key}` },
    ]

    const [heading, setHeading] = useState(page.heading ?? '')
    const [body, setBody] = useState(page.body ?? '')
    const [betweenBody, setBetweenBody] = useState(page.between_body ?? '')
    const [infoAlt, setInfoAlt] = useState(page.infographic_alt ?? '')
    const [achievementsHeading, setAchievementsHeading] = useState(page.achievements_heading ?? '')
    const [benefAlt, setBenefAlt] = useState(page.beneficiary_alt ?? '')
    const [infoFile, setInfoFile] = useState<File | null>(null)
    const [benefFile, setBenefFile] = useState<File | null>(null)
    const [saving, setSaving] = useState(false)

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | File> = {
            heading,
            body,
            between_body: betweenBody,
            infographic_alt: infoAlt,
            achievements_heading: achievementsHeading,
            beneficiary_alt: benefAlt,
        }
        if (infoFile) payload.infographic_file = infoFile
        if (benefFile) payload.beneficiary_file = benefFile

        router.post(`/admin/strategic-priorities/page/${page.page_key}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setInfoFile(null)
                setBenefFile(null)
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Strategic Priorities · ${page.page_label}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">{page.page_label}</h1>
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
                        {saving ? 'Saving…' : 'Save text & images'}
                    </Button>
                </div>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Heading & body</h2>
                    <div className="space-y-1">
                        <Label className="text-xs">Heading</Label>
                        <Input value={heading} onChange={(e) => setHeading(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Body (paragraphs separated by blank lines)</Label>
                        <Textarea value={body} onChange={setBody} rows={8} />
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Main infographic image</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[300px_1fr]">
                        <FileUpload
                            label=""
                            currentUrl={page.infographic_url}
                            onPick={(f) => setInfoFile(f)}
                        />
                        <div className="space-y-1">
                            <Label className="text-xs">Alt text</Label>
                            <Textarea value={infoAlt} onChange={setInfoAlt} rows={4} />
                        </div>
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Between-image body (optional)</h2>
                    <p className="text-xs text-muted-foreground">
                        Text shown between the main infographic and the achievements / bullets
                        section. Use <code>**bold**</code> for emphasis on terms like SDG goals.
                    </p>
                    <Textarea value={betweenBody} onChange={setBetweenBody} rows={6} />
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Achievements / bullets</h2>
                    <div className="space-y-1">
                        <Label className="text-xs">Section heading</Label>
                        <Input
                            value={achievementsHeading}
                            onChange={(e) => setAchievementsHeading(e.target.value)}
                            placeholder="e.g. Key Achievements:"
                        />
                    </div>
                    <div className="space-y-2">
                        {bullets.map((b) => (
                            <BulletRow key={b.id} bullet={b} pageKey={page.page_key} />
                        ))}
                        <NewBullet pageKey={page.page_key} />
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Beneficiary stats image (optional)</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[300px_1fr]">
                        <FileUpload
                            label=""
                            currentUrl={page.beneficiary_url}
                            onPick={(f) => setBenefFile(f)}
                        />
                        <div className="space-y-1">
                            <Label className="text-xs">Alt text</Label>
                            <Textarea value={benefAlt} onChange={setBenefAlt} rows={4} />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <Button onClick={save} disabled={saving} size="lg">
                        {saving ? 'Saving…' : 'Save text & images'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}
