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
    document: string | null
    document_url: string | null
    order: number
    is_active: boolean
    size_scale: number
    offset_x: number
    offset_y: number
}

interface Props {
    items: ResilienceItem[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Resilience', href: '#' },
    { title: 'Annual Organization Resilience Publication', href: '/admin/resilience/capacities' },
]

export default function AdminCapacities() {
    const { props } = usePage<Props>()
    const [items, setItems] = useState<ResilienceItem[]>(props.items)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [pendingFiles, setPendingFiles] = useState<Record<number, File>>({})
    const [pendingDocs, setPendingDocs] = useState<Record<number, File>>({})
    const [clearDocs, setClearDocs] = useState<Record<number, boolean>>({})
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const docInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const update = (id: number, patch: Partial<ResilienceItem>) =>
        setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))

    const save = (item: ResilienceItem) => {
        setSavingId(item.id)
        const payload: Record<string, string | number | File> = {
            section: 'capacity',
            title: item.title ?? '',
            body: item.body ?? '',
            order: item.order,
            is_active: item.is_active ? 1 : 0,
            size_scale: item.size_scale ?? 100,
            offset_x: item.offset_x ?? 0,
            offset_y: item.offset_y ?? 0,
        }
        const file = pendingFiles[item.id]
        if (file) payload.image_file = file
        const doc = pendingDocs[item.id]
        if (doc) payload.document_file = doc
        if (clearDocs[item.id] && !doc) payload.clear_document = 1

        router.post(`/admin/resilience/${item.id}`, payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPendingFiles((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                setPendingDocs((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                setClearDocs((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                if (fileInputs.current[item.id])
                    fileInputs.current[item.id]!.value = ''
                if (docInputs.current[item.id])
                    docInputs.current[item.id]!.value = ''
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
            <Head title="Annual Organization Resilience Publication — Admin" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Annual Organization Resilience Publication ({items.length})
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Cards shown in the "Annual Organization
                                Resilience Publication" carousel. The image is
                                the visible card; the uploaded document
                                (PDF/Office file) is what opens and downloads
                                from the card.
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

                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Publication file (PDF preferred)</Label>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {item.document_url &&
                                                    !clearDocs[item.id] &&
                                                    !pendingDocs[item.id] && (
                                                        <a
                                                            href={item.document_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="rounded border border-border bg-muted px-2 py-1 text-xs text-foreground hover:bg-accent"
                                                        >
                                                            View current
                                                        </a>
                                                    )}
                                                <input
                                                    ref={(el) => {
                                                        docInputs.current[
                                                            item.id
                                                        ] = el
                                                    }}
                                                    type="file"
                                                    accept="application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                    onChange={(e) => {
                                                        const f =
                                                            e.target.files?.[0]
                                                        if (!f) return
                                                        setPendingDocs((p) => ({
                                                            ...p,
                                                            [item.id]: f,
                                                        }))
                                                        setClearDocs((p) => ({
                                                            ...p,
                                                            [item.id]: false,
                                                        }))
                                                    }}
                                                    className="text-sm"
                                                />
                                                {(item.document_url ||
                                                    pendingDocs[item.id]) && (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            setPendingDocs(
                                                                (p) => {
                                                                    const next =
                                                                        { ...p }
                                                                    delete next[
                                                                        item.id
                                                                    ]
                                                                    return next
                                                                },
                                                            )
                                                            setClearDocs(
                                                                (p) => ({
                                                                    ...p,
                                                                    [item.id]:
                                                                        true,
                                                                }),
                                                            )
                                                            if (
                                                                docInputs
                                                                    .current[
                                                                    item.id
                                                                ]
                                                            )
                                                                docInputs.current[
                                                                    item.id
                                                                ]!.value = ''
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                            {pendingDocs[item.id] && (
                                                <p className="text-[10px] text-muted-foreground">
                                                    Selected:{' '}
                                                    {pendingDocs[item.id].name} (
                                                    {(
                                                        pendingDocs[item.id]
                                                            .size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(1)}{' '}
                                                    MB)
                                                </p>
                                            )}
                                            <p className="text-[10px] text-muted-foreground">
                                                PDF, DOC/DOCX, XLS/XLSX or
                                                PPT/PPTX, up to 50 MB. Click
                                                "Save" to upload.
                                            </p>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Card position &amp; size</Label>
                                            <div className="grid gap-3 sm:grid-cols-3">
                                                <div className="flex items-center gap-2">
                                                    <Label className="w-12 text-xs">
                                                        Scale
                                                    </Label>
                                                    <input
                                                        type="range"
                                                        min={25}
                                                        max={300}
                                                        step={5}
                                                        value={
                                                            item.size_scale ??
                                                            100
                                                        }
                                                        onChange={(e) =>
                                                            update(item.id, {
                                                                size_scale:
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    ) || 100,
                                                            })
                                                        }
                                                        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                                    />
                                                    <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                                        {item.size_scale ?? 100}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Label className="w-12 text-xs">
                                                        X
                                                    </Label>
                                                    <input
                                                        type="range"
                                                        min={-200}
                                                        max={200}
                                                        step={1}
                                                        value={item.offset_x ?? 0}
                                                        onChange={(e) =>
                                                            update(item.id, {
                                                                offset_x:
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    ) || 0,
                                                            })
                                                        }
                                                        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                                    />
                                                    <Input
                                                        type="number"
                                                        min={-500}
                                                        max={500}
                                                        value={item.offset_x ?? 0}
                                                        onChange={(e) =>
                                                            update(item.id, {
                                                                offset_x:
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    ) || 0,
                                                            })
                                                        }
                                                        className="h-8 w-16 text-xs"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Label className="w-12 text-xs">
                                                        Y
                                                    </Label>
                                                    <input
                                                        type="range"
                                                        min={-200}
                                                        max={200}
                                                        step={1}
                                                        value={item.offset_y ?? 0}
                                                        onChange={(e) =>
                                                            update(item.id, {
                                                                offset_y:
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    ) || 0,
                                                            })
                                                        }
                                                        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                                    />
                                                    <Input
                                                        type="number"
                                                        min={-500}
                                                        max={500}
                                                        value={item.offset_y ?? 0}
                                                        onChange={(e) =>
                                                            update(item.id, {
                                                                offset_y:
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    ) || 0,
                                                            })
                                                        }
                                                        className="h-8 w-16 text-xs"
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">
                                                Live preview applies to the card
                                                shown on the public Resilience
                                                page. Scale 100% = original; X/Y
                                                shift the image in pixels.
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
