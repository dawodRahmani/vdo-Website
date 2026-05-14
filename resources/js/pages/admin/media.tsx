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

type Kind = 'documentary' | 'photo' | 'publication'

interface MediaItem {
    id: number
    kind: Kind
    title: string | null
    image: string | null
    image_url: string | null
    video_url: string | null
    order: number
    is_active: boolean
}

interface AdminMediaProps {
    items: MediaItem[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Media', href: '/admin/media' },
]

const KIND_LABEL: Record<Kind, string> = {
    documentary: 'documentary',
    photo: 'photo',
    publication: 'publication',
}

export default function AdminMedia() {
    const { props } = usePage<AdminMediaProps>()
    const [items, setItems] = useState<MediaItem[]>(props.items)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [pendingFiles, setPendingFiles] = useState<Record<number, File>>({})
    const [search, setSearch] = useState('')
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const update = (id: number, patch: Partial<MediaItem>) => {
        setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))
    }

    const save = (item: MediaItem) => {
        setSavingId(item.id)
        const payload: Record<string, string | number | File> = {
            _method: 'patch',
            kind: item.kind,
            title: item.title ?? '',
            video_url: item.video_url ?? '',
            order: item.order,
            is_active: item.is_active ? 1 : 0,
        }
        const file = pendingFiles[item.id]
        if (file) payload.image_file = file

        router.post(`/admin/media/${item.id}`, payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPendingFiles((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                if (fileInputs.current[item.id]) {
                    fileInputs.current[item.id]!.value = ''
                }
            },
            onFinish: () => setSavingId(null),
        })
    }

    const clearImage = (item: MediaItem) => {
        setSavingId(item.id)
        router.post(
            `/admin/media/${item.id}`,
            {
                _method: 'patch',
                kind: item.kind,
                title: item.title ?? '',
                video_url: item.video_url ?? '',
                order: item.order,
                is_active: item.is_active ? 1 : 0,
                clear_image: 1,
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onFinish: () => setSavingId(null),
            },
        )
    }

    const remove = (item: MediaItem) => {
        if (!confirm(`Delete "${item.title ?? 'this item'}"?`)) return
        router.delete(`/admin/media/${item.id}`, { preserveScroll: true })
    }

    const add = (kind: Kind) => {
        const sameKind = items.filter((i) => i.kind === kind)
        router.post(
            '/admin/media',
            {
                kind,
                title:
                    kind === 'documentary'
                        ? 'New documentary'
                        : kind === 'publication'
                          ? 'New publication'
                          : '',
                video_url: '',
                order: sameKind.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    const matches = (i: MediaItem) => {
        const q = search.trim().toLowerCase()
        if (!q) return true
        return (
            (i.title ?? '').toLowerCase().includes(q) ||
            (i.video_url ?? '').toLowerCase().includes(q) ||
            (i.image ?? '').toLowerCase().includes(q)
        )
    }

    const documentaries = useMemo(
        () =>
            items
                .filter((i) => i.kind === 'documentary')
                .filter(matches)
                .sort((a, b) => a.order - b.order),
        [items, search],
    )
    const photos = useMemo(
        () =>
            items
                .filter((i) => i.kind === 'photo')
                .filter(matches)
                .sort((a, b) => a.order - b.order),
        [items, search],
    )
    const publications = useMemo(
        () =>
            items
                .filter((i) => i.kind === 'publication')
                .filter(matches)
                .sort((a, b) => a.order - b.order),
        [items, search],
    )

    const totalMatches =
        documentaries.length + photos.length + publications.length
    const searchActive = !!search.trim()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Media — Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
                    <Label
                        htmlFor="media-search"
                        className="mb-2 block text-xs font-medium text-muted-foreground"
                    >
                        Find media to edit
                    </Label>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="media-search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, video URL, or filename…"
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

                <MediaListSection
                    title="Documentaries"
                    description="Each card shows a play button and a title on the documentaries carousel."
                    kind="documentary"
                    items={documentaries}
                    onAdd={() => add('documentary')}
                    onChange={update}
                    onSave={save}
                    onDelete={remove}
                    onPickFile={(id, file) =>
                        setPendingFiles((p) => ({ ...p, [id]: file }))
                    }
                    onClearImage={clearImage}
                    pendingFiles={pendingFiles}
                    fileInputs={fileInputs}
                    savingId={savingId}
                    searchActive={searchActive}
                    showImage={false}
                    showVideoUrl={true}
                />

                <MediaListSection
                    title="Program Snapshots (Photos)"
                    description="Photos shown in the mosaic gallery. Order controls which page they appear on."
                    kind="photo"
                    items={photos}
                    onAdd={() => add('photo')}
                    onChange={update}
                    onSave={save}
                    onDelete={remove}
                    onPickFile={(id, file) =>
                        setPendingFiles((p) => ({ ...p, [id]: file }))
                    }
                    onClearImage={clearImage}
                    pendingFiles={pendingFiles}
                    fileInputs={fileInputs}
                    savingId={savingId}
                    searchActive={searchActive}
                    showImage={true}
                    showVideoUrl={false}
                    hideTitle={true}
                />

                <MediaListSection
                    title="Publications"
                    description="Each card has a cover image (which is also used as the download)."
                    kind="publication"
                    items={publications}
                    onAdd={() => add('publication')}
                    onChange={update}
                    onSave={save}
                    onDelete={remove}
                    onPickFile={(id, file) =>
                        setPendingFiles((p) => ({ ...p, [id]: file }))
                    }
                    onClearImage={clearImage}
                    pendingFiles={pendingFiles}
                    fileInputs={fileInputs}
                    savingId={savingId}
                    searchActive={searchActive}
                    showImage={true}
                    showVideoUrl={false}
                />
            </div>
        </AppLayout>
    )
}

function MediaListSection({
    title,
    description,
    kind,
    items,
    onAdd,
    onChange,
    onSave,
    onDelete,
    onPickFile,
    onClearImage,
    pendingFiles,
    fileInputs,
    savingId,
    searchActive,
    showImage,
    showVideoUrl,
    hideTitle = false,
}: {
    title: string
    description: string
    kind: Kind
    items: MediaItem[]
    onAdd: () => void
    onChange: (id: number, patch: Partial<MediaItem>) => void
    onSave: (item: MediaItem) => void
    onDelete: (item: MediaItem) => void
    onPickFile: (id: number, file: File) => void
    onClearImage: (item: MediaItem) => void
    pendingFiles: Record<number, File>
    fileInputs: React.MutableRefObject<Record<number, HTMLInputElement | null>>
    savingId: number | null
    searchActive: boolean
    showImage: boolean
    showVideoUrl: boolean
    hideTitle?: boolean
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
                        + Add {KIND_LABEL[kind]}
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {items.length === 0 && !searchActive && (
                    <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        No entries yet. Click "Add" to create one.
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
                                    {item.title ||
                                        (hideTitle
                                            ? `Photo #${item.order}`
                                            : 'Untitled')}
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
                                        {savingId === item.id
                                            ? 'Saving…'
                                            : 'Save'}
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                {!hideTitle && (
                                    <div className="space-y-1 md:col-span-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={item.title ?? ''}
                                            onChange={(e) =>
                                                onChange(item.id, {
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                {showVideoUrl && (
                                    <div className="space-y-1 md:col-span-2">
                                        <Label>Video URL (optional)</Label>
                                        <Input
                                            value={item.video_url ?? ''}
                                            onChange={(e) =>
                                                onChange(item.id, {
                                                    video_url: e.target.value,
                                                })
                                            }
                                            placeholder="https://youtube.com/watch?v=…"
                                        />
                                    </div>
                                )}

                                {showImage && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>
                                            {kind === 'publication'
                                                ? 'Cover image'
                                                : 'Image'}
                                        </Label>
                                        <div className="flex flex-wrap items-center gap-3">
                                            {previewImg && (
                                                <img
                                                    src={previewImg}
                                                    alt=""
                                                    className="h-20 w-20 rounded border border-border object-cover"
                                                />
                                            )}
                                            <input
                                                ref={(el) => {
                                                    fileInputs.current[item.id] = el
                                                }}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const f =
                                                        e.target.files?.[0]
                                                    if (!f) return
                                                    onPickFile(item.id, f)
                                                }}
                                                className="text-sm"
                                            />
                                            {item.image && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        onClearImage(item)
                                                    }
                                                    disabled={
                                                        savingId === item.id
                                                    }
                                                >
                                                    Remove image
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">
                                            PNG/JPG up to 5 MB. Click "Save" to
                                            upload.
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <Label>Order</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={item.order}
                                        onChange={(e) =>
                                            onChange(item.id, {
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
                                                onChange(item.id, {
                                                    is_active: !!v,
                                                })
                                            }
                                        />
                                        Active (show on media page)
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
