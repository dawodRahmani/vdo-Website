import { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { ExternalLink } from 'lucide-react'
import { Link } from '@inertiajs/react'

interface AboutContent {
    executive_heading: string | null
    executive_subheading: string | null
    executive_body: string | null
    history_heading: string | null
    history_body: string | null
    coordination_intro: string | null
    coordination_outro: string | null
    mission_lead: string | null
    mission_body: string | null
    vision_lead: string | null
    vision_body: string | null
    looking_ahead_heading: string | null
    looking_ahead_subheading: string | null
    looking_ahead_body: string | null
}

interface PageProps {
    content: AboutContent
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'About Page', href: '/admin/about-page' },
]

type FieldKey = keyof AboutContent

function Textarea({
    value,
    onChange,
    rows = 6,
}: {
    value: string
    onChange: (v: string) => void
    rows?: number
}) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
    )
}

export default function AdminAboutPage({ content }: PageProps) {
    const [data, setData] = useState<AboutContent>(() => ({
        executive_heading: content.executive_heading ?? '',
        executive_subheading: content.executive_subheading ?? '',
        executive_body: content.executive_body ?? '',
        history_heading: content.history_heading ?? '',
        history_body: content.history_body ?? '',
        coordination_intro: content.coordination_intro ?? '',
        coordination_outro: content.coordination_outro ?? '',
        mission_lead: content.mission_lead ?? '',
        mission_body: content.mission_body ?? '',
        vision_lead: content.vision_lead ?? '',
        vision_body: content.vision_body ?? '',
        looking_ahead_heading: content.looking_ahead_heading ?? '',
        looking_ahead_subheading: content.looking_ahead_subheading ?? '',
        looking_ahead_body: content.looking_ahead_body ?? '',
    }))
    const [saving, setSaving] = useState(false)

    const set = (k: FieldKey, v: string) => setData((d) => ({ ...d, [k]: v }))

    const save = () => {
        setSaving(true)
        router.patch('/admin/about-page', data as unknown as Record<string, string>, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Page" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">About Page</h1>
                        <p className="text-sm text-muted-foreground">
                            Edit the text content of the public About Us page. Hero photos and
                            the coordination diagram are managed separately.
                        </p>
                    </div>
                    <Button onClick={save} disabled={saving}>
                        {saving ? 'Saving…' : 'Save all'}
                    </Button>
                </div>

                <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold">Hero photos & diagrams</h2>
                            <p className="text-xs text-muted-foreground">
                                The 3-image hero strip and the coordination-bodies diagram have
                                their own admin pages.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Link
                                href="/admin/hero-sections"
                                className="inline-flex items-center gap-2 text-sm text-[rgb(0,175,239)] hover:underline"
                            >
                                Hero Sections <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                            <Link
                                href="/admin/diagrams/leadership-roles"
                                className="inline-flex items-center gap-2 text-sm text-[rgb(0,175,239)] hover:underline"
                            >
                                Coordination diagram <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Executive Summary</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Heading</Label>
                            <Input
                                value={data.executive_heading ?? ''}
                                onChange={(e) => set('executive_heading', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Sub-heading</Label>
                            <Input
                                value={data.executive_subheading ?? ''}
                                onChange={(e) => set('executive_subheading', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Body — separate paragraphs with a blank line
                        </Label>
                        <Textarea
                            rows={12}
                            value={data.executive_body ?? ''}
                            onChange={(v) => set('executive_body', v)}
                        />
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">History</h2>
                    <div className="space-y-1">
                        <Label className="text-xs">Heading</Label>
                        <Input
                            value={data.history_heading ?? ''}
                            onChange={(e) => set('history_heading', e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Body — paragraphs separated by blank lines</Label>
                        <Textarea
                            rows={10}
                            value={data.history_body ?? ''}
                            onChange={(v) => set('history_body', v)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Line above the coordination diagram
                        </Label>
                        <Textarea
                            rows={2}
                            value={data.coordination_intro ?? ''}
                            onChange={(v) => set('coordination_intro', v)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">
                            Line below the coordination diagram
                        </Label>
                        <Textarea
                            rows={2}
                            value={data.coordination_outro ?? ''}
                            onChange={(v) => set('coordination_outro', v)}
                        />
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Mission</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr]">
                        <div className="space-y-1">
                            <Label className="text-xs">Lead (bold prefix)</Label>
                            <Input
                                value={data.mission_lead ?? ''}
                                onChange={(e) => set('mission_lead', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Body</Label>
                            <Textarea
                                rows={4}
                                value={data.mission_body ?? ''}
                                onChange={(v) => set('mission_body', v)}
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Vision</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr]">
                        <div className="space-y-1">
                            <Label className="text-xs">Lead (bold prefix)</Label>
                            <Input
                                value={data.vision_lead ?? ''}
                                onChange={(e) => set('vision_lead', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Body</Label>
                            <Textarea
                                rows={3}
                                value={data.vision_body ?? ''}
                                onChange={(v) => set('vision_body', v)}
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-semibold">Looking Ahead</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Heading</Label>
                            <Input
                                value={data.looking_ahead_heading ?? ''}
                                onChange={(e) => set('looking_ahead_heading', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Sub-heading</Label>
                            <Input
                                value={data.looking_ahead_subheading ?? ''}
                                onChange={(e) => set('looking_ahead_subheading', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Body — paragraphs separated by blank lines</Label>
                        <Textarea
                            rows={10}
                            value={data.looking_ahead_body ?? ''}
                            onChange={(v) => set('looking_ahead_body', v)}
                        />
                    </div>
                </section>

                <div className="flex justify-end">
                    <Button onClick={save} disabled={saving} size="lg">
                        {saving ? 'Saving…' : 'Save all changes'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}
