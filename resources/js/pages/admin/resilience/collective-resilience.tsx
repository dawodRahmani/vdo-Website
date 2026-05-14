import { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Plus, X } from 'lucide-react'

interface ResilienceItem {
    id: number
    section: string
    title: string | null
    body: string | null
    bullets: string[] | null
    order: number
    is_active: boolean
}

interface Props {
    item: ResilienceItem
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Resilience', href: '#' },
    {
        title: 'Collective Resilience',
        href: '/admin/resilience/collective-resilience',
    },
]

export default function AdminCollectiveResilience() {
    const { props } = usePage<Props>()
    const [item, setItem] = useState<ResilienceItem>({
        ...props.item,
        bullets: props.item.bullets ?? [],
    })
    const [saving, setSaving] = useState(false)

    const update = (patch: Partial<ResilienceItem>) =>
        setItem((x) => ({ ...x, ...patch }))

    const updateBullet = (i: number, value: string) => {
        const next = [...(item.bullets ?? [])]
        next[i] = value
        update({ bullets: next })
    }
    const addBullet = () =>
        update({ bullets: [...(item.bullets ?? []), 'New point'] })
    const removeBullet = (i: number) => {
        const next = [...(item.bullets ?? [])]
        next.splice(i, 1)
        update({ bullets: next })
    }

    const save = () => {
        setSaving(true)
        const fd = new FormData()
        fd.append('_method', 'patch')
        fd.append('section', 'collective_resilience')
        fd.append('title', item.title ?? '')
        fd.append('body', item.body ?? '')
        fd.append('order', String(item.order))
        fd.append('is_active', item.is_active ? '1' : '0')
        ;(item.bullets ?? []).forEach((b, i) => fd.append(`bullets[${i}]`, b))

        router.post(`/admin/resilience/${item.id}`, fd, {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => setSaving(false),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Collective Resilience — Admin" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Contributing to Collective Resilience
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Heading, intro paragraph, bullet list, then any
                                follow-up paragraphs.
                            </p>
                        </div>
                        <Button
                            size="sm"
                            onClick={save}
                            disabled={saving}
                            className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                        >
                            {saving ? 'Saving…' : 'Save'}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label>Heading</Label>
                            <Input
                                value={item.title ?? ''}
                                onChange={(e) =>
                                    update({ title: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Body paragraphs</Label>
                            <textarea
                                className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={item.body ?? ''}
                                onChange={(e) =>
                                    update({ body: e.target.value })
                                }
                            />
                            <p className="text-[10px] text-muted-foreground">
                                First paragraph shows above the bullet list.
                                Anything after a blank line goes below the
                                bullets.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Bullet points</Label>
                            <div className="space-y-2">
                                {(item.bullets ?? []).map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <textarea
                                            className="flex min-h-[44px] flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            value={b}
                                            onChange={(e) =>
                                                updateBullet(i, e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeBullet(i)}
                                            aria-label="Remove bullet"
                                            className="mt-1 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={addBullet}
                                className="gap-1"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                Add bullet
                            </Button>
                        </div>

                        <label className="flex items-center gap-2 text-sm">
                            <Checkbox
                                checked={item.is_active}
                                onCheckedChange={(v) =>
                                    update({ is_active: !!v })
                                }
                            />
                            Active (show this section on the page)
                        </label>
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
