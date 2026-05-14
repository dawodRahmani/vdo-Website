import { useRef, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'

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
    { title: 'Our Capacity', href: '/admin/resilience/capacities' },
]

export default function AdminCapacities() {
    const { props } = usePage<Props>()
    const [items, setItems] = useState<ResilienceItem[]>(props.items)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [pendingFiles, setPendingFiles] = useState<Record<number, File>>({})
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const update = (id: number, patch: Partial<ResilienceItem>) =>
        setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))

    const save = (item: ResilienceItem) => {
        setSavingId(item.id)
        const payload: Record<string, string | number | File> = {
            _method: 'patch',
            section: 'capacity',
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
        if (!confirm(`Delete "${item.title ?? 'this slide'}"?`)) return
        router.delete(`/admin/resilience/${item.id}`, { preserveScroll: true })
    }

    const add = () => {
        router.post(
            '/admin/resilience',
            {
                section: 'capacity',
                title: 'New capacity slide',
                order: items.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Our Capacity — Admin" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Our Capacity ({items.length})
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Slides shown in the "Our Capacity" carousel.
                                Image is used both as the visible card and the
                                download link.
                            </p>
                        </div>
                        <Button
                            size="sm"
                            onClick={add}
                            className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                        >
                            + Add slide
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {items.length === 0 && (
                            <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                                No slides yet. Click "Add" to create one.
                            </p>
                        )}
                        {items.map((item) => {
                            const previewImg = pendingFiles[item.id]
                                ? URL.createObjectURL(pendingFiles[item.id])
                                : item.image_url
                            return (
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
                                            <Label>Title (used as download filename)</Label>
                                            <Input
                                                value={item.title ?? ''}
                                                onChange={(e) =>
                                                    update(item.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Image (SVG or PNG/JPG)</Label>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {previewImg && (
                                                    <img
                                                        src={previewImg}
                                                        alt=""
                                                        className="h-24 w-24 rounded border border-border object-contain bg-gray-50"
                                                    />
                                                )}
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
                                            <p className="text-[10px] text-muted-foreground">
                                                Up to 5 MB. Click "Save" to
                                                upload.
                                            </p>
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
