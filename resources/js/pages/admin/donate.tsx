import { useMemo, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Search, X } from 'lucide-react'

type Kind = 'intro' | 'cause' | 'method'

interface DonationItem {
    id: number
    kind: Kind
    icon_name: string
    title: string
    body: string
    order: number
    is_active: boolean
}

interface AdminDonateProps {
    items: DonationItem[]
    [key: string]: unknown
}

const ICON_SUGGESTIONS = [
    'BookOpen',
    'Utensils',
    'Droplets',
    'HeartPulse',
    'Sprout',
    'HandHeart',
    'Heart',
    'Stethoscope',
    'GraduationCap',
    'Briefcase',
    'Home',
    'LifeBuoy',
    'Globe',
    'Users',
    'Landmark',
    'Phone',
    'MapPin',
    'Mail',
    'Wallet',
    'CreditCard',
    'Smartphone',
    'Send',
]

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Donate', href: '/admin/donate' },
]

export default function AdminDonate() {
    const { props } = usePage<AdminDonateProps>()
    const [items, setItems] = useState<DonationItem[]>(props.items)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [search, setSearch] = useState('')

    const update = (id: number, patch: Partial<DonationItem>) => {
        setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))
    }

    const save = (item: DonationItem) => {
        setSavingId(item.id)
        router.patch(
            `/admin/donate/${item.id}`,
            {
                kind: item.kind,
                icon_name: item.icon_name,
                title: item.title,
                body: item.body,
                order: item.order,
                is_active: item.is_active,
            },
            {
                preserveScroll: true,
                onFinish: () => setSavingId(null),
            },
        )
    }

    const remove = (item: DonationItem) => {
        if (!confirm(`Delete "${item.title}"?`)) return
        router.delete(`/admin/donate/${item.id}`, { preserveScroll: true })
    }

    const add = (kind: Kind) => {
        const sameKind = items.filter((i) => i.kind === kind)
        router.post(
            '/admin/donate',
            {
                kind,
                icon_name: kind === 'cause' ? 'HandHeart' : 'Landmark',
                title: kind === 'cause' ? 'New cause' : 'New donation method',
                body:
                    kind === 'cause'
                        ? 'Describe what this donation supports.'
                        : 'Line 1\nLine 2\nLine 3',
                order: sameKind.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    const intro = items.find((i) => i.kind === 'intro') ?? null

    const matches = (i: DonationItem) => {
        const q = search.trim().toLowerCase()
        if (!q) return true
        return (
            i.title.toLowerCase().includes(q) ||
            i.body.toLowerCase().includes(q)
        )
    }

    const causes = useMemo(
        () =>
            items
                .filter((i) => i.kind === 'cause')
                .filter(matches)
                .sort((a, b) => a.order - b.order),
        [items, search],
    )
    const methods = useMemo(
        () =>
            items
                .filter((i) => i.kind === 'method')
                .filter(matches)
                .sort((a, b) => a.order - b.order),
        [items, search],
    )
    const introMatches = intro ? matches(intro) : false
    const totalMatches =
        causes.length + methods.length + (introMatches ? 1 : 0)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Donate — Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
                    <Label
                        htmlFor="donate-search"
                        className="mb-2 block text-xs font-medium text-muted-foreground"
                    >
                        Find text to edit
                    </Label>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="donate-search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or content…"
                            className="pl-9 pr-9"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    {search && (
                        <p className="mt-2 text-xs text-muted-foreground">
                            {totalMatches}{' '}
                            {totalMatches === 1 ? 'match' : 'matches'} for
                            “{search}”
                        </p>
                    )}
                </div>

                {(!search || introMatches) && (
                    <IntroSection
                        intro={intro}
                        onChange={update}
                        onSave={save}
                        savingId={savingId}
                        onCreate={() => add('intro')}
                    />
                )}

                <ItemListSection
                    title="Where Your Donation Goes (Cause Cards)"
                    description='These appear in the "Where Your Donation Goes" section. Each card has an icon, title, and a short description.'
                    items={causes}
                    onAdd={() => add('cause')}
                    onChange={update}
                    onSave={save}
                    onDelete={remove}
                    savingId={savingId}
                    bodyLabel="Description"
                    bodyHelp="A single paragraph describing this cause."
                    isMethod={false}
                    searchActive={!!search.trim()}
                />

                <ItemListSection
                    title="Ways to Donate (Methods)"
                    description='These appear in the "Ways to Donate" section. The body is shown as multiple lines — put one line of content per row.'
                    items={methods}
                    onAdd={() => add('method')}
                    onChange={update}
                    onSave={save}
                    onDelete={remove}
                    savingId={savingId}
                    bodyLabel="Body lines"
                    bodyHelp="One line per row — e.g. account name, account number, SWIFT code."
                    isMethod={true}
                    searchActive={!!search.trim()}
                />
            </div>
        </AppLayout>
    )
}

function IntroSection({
    intro,
    onChange,
    onSave,
    savingId,
    onCreate,
}: {
    intro: DonationItem | null
    onChange: (id: number, patch: Partial<DonationItem>) => void
    onSave: (item: DonationItem) => void
    savingId: number | null
    onCreate: () => void
}) {
    return (
        <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Intro Section</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                    The heading and paragraph shown at the top of the donate
                    page, above the cause cards.
                </p>
            </div>

            {!intro ? (
                <div className="rounded-md border border-dashed border-border p-6 text-center">
                    <p className="mb-3 text-sm text-muted-foreground">
                        No intro content yet.
                    </p>
                    <Button
                        size="sm"
                        onClick={onCreate}
                        className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                    >
                        Create intro
                    </Button>
                </div>
            ) : (
                <div className="rounded-lg border border-border bg-background p-4">
                    <div className="mb-3 flex items-center justify-end">
                        <Button
                            size="sm"
                            onClick={() => onSave(intro)}
                            disabled={savingId === intro.id}
                            className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                        >
                            {savingId === intro.id ? 'Saving…' : 'Save'}
                        </Button>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <Label>Heading</Label>
                            <Input
                                value={intro.title}
                                onChange={(e) =>
                                    onChange(intro.id, {
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Paragraph</Label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={intro.body}
                                onChange={(e) =>
                                    onChange(intro.id, {
                                        body: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

function ItemListSection({
    title,
    description,
    items,
    onAdd,
    onChange,
    onSave,
    onDelete,
    savingId,
    bodyLabel,
    bodyHelp,
    isMethod,
    searchActive,
}: {
    title: string
    description: string
    items: DonationItem[]
    onAdd: () => void
    onChange: (id: number, patch: Partial<DonationItem>) => void
    onSave: (item: DonationItem) => void
    onDelete: (item: DonationItem) => void
    savingId: number | null
    bodyLabel: string
    bodyHelp: string
    isMethod: boolean
    searchActive: boolean
}) {
    if (searchActive && items.length === 0) return null
    return (
        <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        {title} ({items.length})
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>
                {!searchActive && (
                    <Button
                        size="sm"
                        onClick={onAdd}
                        className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                    >
                        + Add {isMethod ? 'method' : 'cause'}
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {items.length === 0 && !searchActive && (
                    <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        No entries yet. Click "Add" to create one.
                    </p>
                )}
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-lg border border-border bg-background p-4"
                    >
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <h3 className="font-semibold">
                                {item.title || 'Untitled'}
                            </h3>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onDelete(item)}
                                    className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                                >
                                    Delete
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => onSave(item)}
                                    disabled={savingId === item.id}
                                    className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                >
                                    {savingId === item.id ? 'Saving…' : 'Save'}
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1 md:col-span-2">
                                <Label>Title</Label>
                                <Input
                                    value={item.title}
                                    onChange={(e) =>
                                        onChange(item.id, {
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <Label>{bodyLabel}</Label>
                                <textarea
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={item.body}
                                    onChange={(e) =>
                                        onChange(item.id, {
                                            body: e.target.value,
                                        })
                                    }
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    {bodyHelp}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label>Icon name</Label>
                                <Input
                                    value={item.icon_name}
                                    onChange={(e) =>
                                        onChange(item.id, {
                                            icon_name: e.target.value,
                                        })
                                    }
                                    placeholder="e.g. BookOpen, HeartPulse"
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Lucide icon name (PascalCase). Browse at
                                    lucide.dev/icons.
                                </p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                    {ICON_SUGGESTIONS.map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() =>
                                                onChange(item.id, {
                                                    icon_name: n,
                                                })
                                            }
                                            className={`rounded border px-2 py-0.5 text-[11px] hover:bg-accent ${
                                                item.icon_name === n
                                                    ? 'border-[rgb(0,175,239)] bg-accent'
                                                    : 'border-border'
                                            }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>Order</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={item.order}
                                    onChange={(e) =>
                                        onChange(item.id, {
                                            order:
                                                parseInt(e.target.value, 10) ||
                                                0,
                                        })
                                    }
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 text-sm">
                                    <Checkbox
                                        checked={item.is_active}
                                        onCheckedChange={(v) =>
                                            onChange(item.id, {
                                                is_active: !!v,
                                            })
                                        }
                                    />
                                    Active (show on donate page)
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
