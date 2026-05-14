import { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'

interface Card {
    id: number
    title: string
    href: string
    icon_name: string | null
    description: string | null
    order: number
}

interface PageProps {
    cards: Card[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Strategic Priorities', href: '/admin/strategic-priorities' },
    { title: 'Hub Cards', href: '/admin/strategic-priorities/hub' },
]

function CardRow({ card }: { card: Card }) {
    const [title, setTitle] = useState(card.title)
    const [href, setHref] = useState(card.href)
    const [iconName, setIconName] = useState(card.icon_name ?? '')
    const [description, setDescription] = useState(card.description ?? '')
    const [saving, setSaving] = useState(false)

    const save = () => {
        setSaving(true)
        router.patch(
            `/admin/strategic-priorities/cards/${card.id}`,
            { title, href, icon_name: iconName, description },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        )
    }

    return (
        <div className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                    <Label className="text-xs">Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Link (href)</Label>
                    <Input value={href} onChange={(e) => setHref(e.target.value)} />
                </div>
            </div>
            <div className="space-y-1">
                <Label className="text-xs">Icon name (lucide-react)</Label>
                <Input
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    placeholder="e.g. BookOpen, TrendingUp"
                />
            </div>
            <div className="space-y-1">
                <Label className="text-xs">Description</Label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
            </div>
            <div className="flex justify-end">
                <Button onClick={save} disabled={saving} size="sm">
                    {saving ? 'Saving…' : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default function StrategicPrioritiesHub({ cards }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Strategic Priorities · Hub" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Hub Cards</h1>
                    <p className="text-sm text-muted-foreground">
                        The 10 cards shown on the /strategic-priorities landing page.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {cards.map((c) => (
                        <CardRow key={c.id} card={c} />
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
