import { useMemo, useRef, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Search, X } from 'lucide-react'

interface ResilienceItem {
    id: number
    section: string
    title: string | null
    body: string | null
    image: string | null
    image_url: string | null
    order: number
    is_active: boolean
}

interface Props {
    items: ResilienceItem[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Resilience', href: '#' },
    { title: 'Policies', href: '/admin/resilience/policies' },
]

export default function AdminPolicies() {
    const { props } = usePage<Props>()
    const [items, setItems] = useState<ResilienceItem[]>(props.items)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [pendingFiles, setPendingFiles] = useState<Record<number, File>>({})
    const [search, setSearch] = useState('')
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const update = (id: number, patch: Partial<ResilienceItem>) =>
        setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))

    const save = (item: ResilienceItem) => {
        setSavingId(item.id)
        const payload: Record<string, string | number | File> = {
            section: 'policy',
            title: item.title ?? '',
            body: item.body ?? '',
            order: item.order,
            is_active: item.is_active ? 1 : 0,
        }
        const file = pendingFiles[item.id]
        if (file) payload.image_file = file

        router.post(`/admin/resilience/${item.id}`, payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPendingFiles((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                if (fileInputs.current[item.id])
                    fileInputs.current[item.id]!.value = ''
            },
            onFinish: () => setSavingId(null),
        })
    }

    const remove = (item: ResilienceItem) => {
        if (!confirm(`Delete "${item.title ?? 'this policy'}"?`)) return
        router.delete(`/admin/resilience/${item.id}`, { preserveScroll: true })
    }

    const add = () => {
        router.post(
            '/admin/resilience',
            {
                section: 'policy',
                title: 'New policy',
                body: 'Describe this policy.',
                order: items.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        const base = [...items].sort((a, b) => a.order - b.order)
        if (!q) return base
        return base.filter(
            (i) =>
                (i.title ?? '').toLowerCase().includes(q) ||
                (i.body ?? '').toLowerCase().includes(q),
        )
    }, [items, search])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Policies — Admin" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
                    <Label
                        htmlFor="policy-search"
                        className="mb-2 block text-xs font-medium text-muted-foreground"
                    >
                        Find policy to edit
                    </Label>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="policy-search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or body…"
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
                            {filtered.length}{' '}
                            {filtered.length === 1 ? 'match' : 'matches'} for
                            “{search}”
                        </p>
                    )}
                </div>

                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Policies ({items.length})
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Each policy card has an icon, title, and body
                                paragraph.
                            </p>
                        </div>
                        {!search && (
                            <Button
                                size="sm"
                                onClick={add}
                                className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                            >
                                + Add policy
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {filtered.length === 0 && !search && (
                            <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                                No policies yet.
                            </p>
                        )}
                        {filtered.map((item) => {
                            const previewImg = pendingFiles[item.id]
                                ? URL.createObjectURL(pendingFiles[item.id])
                                : item.image_url
                            return (
                                <div
                                    key={item.id}
                                    className="rounded-lg border border-border bg-background p-4"
                                >
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {previewImg && (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(0,175,239)]">
                                                    <img
                                                        src={previewImg}
                                                        alt=""
                                                        className="h-6 w-6"
                                                    />
                                                </div>
                                            )}
                                            <h3 className="font-semibold">
                                                {item.title || 'Untitled'}
                                            </h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => remove(item)}
                                                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => save(item)}
                                                disabled={savingId === item.id}
                                                className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                            >
                                                {savingId === item.id
                                                    ? 'Saving…'
                                                    : 'Save'}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="space-y-1 md:col-span-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={item.title ?? ''}
                                                onChange={(e) =>
                                                    update(item.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-1 md:col-span-2">
                                            <Label>Body</Label>
                                            <textarea
                                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                value={item.body ?? ''}
                                                onChange={(e) =>
                                                    update(item.id, {
                                                        body: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Icon</Label>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <input
                                                    ref={(el) => {
                                                        fileInputs.current[
                                                            item.id
                                                        ] = el
                                                    }}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const f =
                                                            e.target.files?.[0]
                                                        if (!f) return
                                                        setPendingFiles(
                                                            (p) => ({
                                                                ...p,
                                                                [item.id]: f,
                                                            }),
                                                        )
                                                    }}
                                                    className="text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Order</Label>
                                            <Input
                                                type="number"
                                                min={0}
                                                value={item.order}
                                                onChange={(e) =>
                                                    update(item.id, {
                                                        order:
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 0,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="flex items-end">
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={item.is_active}
                                                    onCheckedChange={(v) =>
                                                        update(item.id, {
                                                            is_active: !!v,
                                                        })
                                                    }
                                                />
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
