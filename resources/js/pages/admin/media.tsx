import { useMemo, useRef, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Plus, Search, X } from 'lucide-react'

type Kind = 'documentary' | 'photo' | 'publication'

interface MediaItem {
    id: number
    kind: Kind
    title: string | null
    image: string | null
    image_url: string | null
    video_url: string | null
    video_path: string | null
    video_file_url: string | null
    document_path: string | null
    document_url: string | null
    order: number
    is_active: boolean
    size_scale: number
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
    const [pendingVideoFiles, setPendingVideoFiles] = useState<
        Record<number, File>
    >({})
    const [pendingDocumentFiles, setPendingDocumentFiles] = useState<
        Record<number, File>
    >({})
    const [search, setSearch] = useState('')
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const videoInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const documentInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const update = (id: number, patch: Partial<MediaItem>) => {
        setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))
    }

    const save = (item: MediaItem) => {
        setSavingId(item.id)
        const payload: Record<string, string | number | File> = {
            kind: item.kind,
            title: item.title ?? '',
            video_url: item.video_url ?? '',
            order: item.order,
            is_active: item.is_active ? 1 : 0,
            size_scale: item.size_scale ?? 100,
        }
        const file = pendingFiles[item.id]
        if (file) payload.image_file = file
        const vfile = pendingVideoFiles[item.id]
        if (vfile) payload.video_file = vfile
        const dfile = pendingDocumentFiles[item.id]
        if (dfile) payload.document_file = dfile

        router.post(`/admin/media/${item.id}`, payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPendingFiles((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                setPendingVideoFiles((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                setPendingDocumentFiles((p) => {
                    const next = { ...p }
                    delete next[item.id]
                    return next
                })
                if (fileInputs.current[item.id]) {
                    fileInputs.current[item.id]!.value = ''
                }
                if (videoInputs.current[item.id]) {
                    videoInputs.current[item.id]!.value = ''
                }
                if (documentInputs.current[item.id]) {
                    documentInputs.current[item.id]!.value = ''
                }
            },
            onFinish: () => setSavingId(null),
        })
    }

    const clearDocument = (item: MediaItem) => {
        setSavingId(item.id)
        router.post(
            `/admin/media/${item.id}`,
            {
                kind: item.kind,
                title: item.title ?? '',
                video_url: item.video_url ?? '',
                order: item.order,
                is_active: item.is_active ? 1 : 0,
                size_scale: item.size_scale ?? 100,
                clear_document: 1,
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setPendingDocumentFiles((p) => {
                        const next = { ...p }
                        delete next[item.id]
                        return next
                    })
                    if (documentInputs.current[item.id]) {
                        documentInputs.current[item.id]!.value = ''
                    }
                },
                onFinish: () => setSavingId(null),
            },
        )
    }

    const clearVideo = (item: MediaItem) => {
        setSavingId(item.id)
        router.post(
            `/admin/media/${item.id}`,
            {
                    kind: item.kind,
                title: item.title ?? '',
                video_url: item.video_url ?? '',
                order: item.order,
                is_active: item.is_active ? 1 : 0,
                size_scale: item.size_scale ?? 100,
                clear_video: 1,
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setPendingVideoFiles((p) => {
                        const next = { ...p }
                        delete next[item.id]
                        return next
                    })
                    if (videoInputs.current[item.id]) {
                        videoInputs.current[item.id]!.value = ''
                    }
                },
                onFinish: () => setSavingId(null),
            },
        )
    }

    const clearImage = (item: MediaItem) => {
        setSavingId(item.id)
        router.post(
            `/admin/media/${item.id}`,
            {
                    kind: item.kind,
                title: item.title ?? '',
                video_url: item.video_url ?? '',
                order: item.order,
                is_active: item.is_active ? 1 : 0,
                size_scale: item.size_scale ?? 100,
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
                size_scale: 100,
            },
            { preserveScroll: true },
        )
    }

    const addDocumentary = (
        title: string,
        videoUrl: string,
        imageFile: File | null,
        onDone: () => void,
    ) => {
        const docs = items.filter((i) => i.kind === 'documentary')
        const payload: Record<string, string | number | File> = {
            kind: 'documentary',
            title,
            video_url: videoUrl,
            order: docs.length + 1,
            is_active: 1,
            size_scale: 100,
        }
        if (imageFile) payload.image_file = imageFile

        router.post('/admin/media', payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: onDone,
        })
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

                {!searchActive && (
                    <AddDocumentaryForm onSubmit={addDocumentary} />
                )}

                <MediaListSection
                    title="Documentaries"
                    description="Paste a YouTube URL OR upload a video file (mp4/webm/mov, max 100 MB). Add a thumbnail to show on the card. Clicking the card opens the video in a player on the site."
                    kind="documentary"
                    items={documentaries}
                    onAdd={() => add('documentary')}
                    hideAddButton
                    onChange={update}
                    onSave={save}
                    onDelete={remove}
                    onPickFile={(id, file) =>
                        setPendingFiles((p) => ({ ...p, [id]: file }))
                    }
                    onClearImage={clearImage}
                    onPickVideo={(id, file) =>
                        setPendingVideoFiles((p) => ({ ...p, [id]: file }))
                    }
                    onClearVideo={clearVideo}
                    pendingFiles={pendingFiles}
                    pendingVideoFiles={pendingVideoFiles}
                    fileInputs={fileInputs}
                    videoInputs={videoInputs}
                    savingId={savingId}
                    searchActive={searchActive}
                    showImage={true}
                    showVideoUrl={true}
                    showVideoUpload={true}
                    imageLabelOverride="Thumbnail (shown on the card)"
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
                    description="Each card has a cover image and an attached document (PDF preferred). Visitors click the cover to read inline, or use the download button."
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
                    onPickDocument={(id, file) =>
                        setPendingDocumentFiles((p) => ({ ...p, [id]: file }))
                    }
                    onClearDocument={clearDocument}
                    pendingFiles={pendingFiles}
                    pendingDocumentFiles={pendingDocumentFiles}
                    fileInputs={fileInputs}
                    documentInputs={documentInputs}
                    savingId={savingId}
                    searchActive={searchActive}
                    showImage={true}
                    showVideoUrl={false}
                    showDocument={true}
                    showSize={true}
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
    onPickVideo,
    onClearVideo,
    onPickDocument,
    onClearDocument,
    pendingFiles,
    pendingVideoFiles,
    pendingDocumentFiles,
    fileInputs,
    videoInputs,
    documentInputs,
    savingId,
    searchActive,
    showImage,
    showVideoUrl,
    showVideoUpload = false,
    showDocument = false,
    showSize = false,
    hideTitle = false,
    hideAddButton = false,
    imageLabelOverride,
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
    onPickVideo?: (id: number, file: File) => void
    onClearVideo?: (item: MediaItem) => void
    onPickDocument?: (id: number, file: File) => void
    onClearDocument?: (item: MediaItem) => void
    pendingFiles: Record<number, File>
    pendingVideoFiles?: Record<number, File>
    pendingDocumentFiles?: Record<number, File>
    fileInputs: React.MutableRefObject<Record<number, HTMLInputElement | null>>
    videoInputs?: React.MutableRefObject<
        Record<number, HTMLInputElement | null>
    >
    documentInputs?: React.MutableRefObject<
        Record<number, HTMLInputElement | null>
    >
    savingId: number | null
    searchActive: boolean
    showImage: boolean
    showVideoUrl: boolean
    showVideoUpload?: boolean
    showDocument?: boolean
    showSize?: boolean
    hideTitle?: boolean
    hideAddButton?: boolean
    imageLabelOverride?: string
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
                {!searchActive && !hideAddButton && (
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
                    const ytId = item.video_url
                        ? youtubeIdFromUrl(item.video_url)
                        : null
                    const ytAutoThumb = ytId
                        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                        : null
                    const previewImg = pendingFiles[item.id]
                        ? URL.createObjectURL(pendingFiles[item.id])
                        : item.image_url ?? ytAutoThumb

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
                                            {imageLabelOverride ??
                                                (kind === 'publication'
                                                    ? 'Cover image'
                                                    : 'Image')}
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

                                {showDocument && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>
                                            Publication file (PDF preferred)
                                        </Label>
                                        <div className="flex flex-wrap items-center gap-3">
                                            {item.document_url && (
                                                <a
                                                    href={item.document_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent"
                                                >
                                                    View current file
                                                </a>
                                            )}
                                            <input
                                                ref={(el) => {
                                                    if (documentInputs) {
                                                        documentInputs.current[
                                                            item.id
                                                        ] = el
                                                    }
                                                }}
                                                type="file"
                                                accept="application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                onChange={(e) => {
                                                    const f =
                                                        e.target.files?.[0]
                                                    if (!f || !onPickDocument)
                                                        return
                                                    onPickDocument(item.id, f)
                                                }}
                                                className="text-sm"
                                            />
                                            {item.document_path &&
                                                onClearDocument && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            onClearDocument(
                                                                item,
                                                            )
                                                        }
                                                        disabled={
                                                            savingId ===
                                                            item.id
                                                        }
                                                    >
                                                        Remove file
                                                    </Button>
                                                )}
                                        </div>
                                        {pendingDocumentFiles?.[item.id] && (
                                            <p className="text-xs text-muted-foreground">
                                                Selected:{' '}
                                                {
                                                    pendingDocumentFiles[
                                                        item.id
                                                    ].name
                                                }{' '}
                                                (
                                                {(
                                                    pendingDocumentFiles[
                                                        item.id
                                                    ].size /
                                                    1024 /
                                                    1024
                                                ).toFixed(1)}{' '}
                                                MB)
                                            </p>
                                        )}
                                        <p className="text-[10px] text-muted-foreground">
                                            PDF / DOC / XLS / PPT up to 50 MB.
                                            Visitors will read it inline or
                                            download.
                                        </p>
                                    </div>
                                )}

                                {showVideoUpload && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>
                                            Upload video file (alternative to
                                            YouTube URL)
                                        </Label>
                                        <div className="flex flex-wrap items-center gap-3">
                                            {item.video_file_url && (
                                                <video
                                                    src={item.video_file_url}
                                                    className="h-20 w-32 rounded border border-border bg-black object-cover"
                                                    muted
                                                />
                                            )}
                                            <input
                                                ref={(el) => {
                                                    if (videoInputs) {
                                                        videoInputs.current[
                                                            item.id
                                                        ] = el
                                                    }
                                                }}
                                                type="file"
                                                accept="video/mp4,video/webm,video/quicktime,video/ogg"
                                                onChange={(e) => {
                                                    const f =
                                                        e.target.files?.[0]
                                                    if (!f || !onPickVideo)
                                                        return
                                                    onPickVideo(item.id, f)
                                                }}
                                                className="text-sm"
                                            />
                                            {item.video_path && onClearVideo && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        onClearVideo(item)
                                                    }
                                                    disabled={
                                                        savingId === item.id
                                                    }
                                                >
                                                    Remove video file
                                                </Button>
                                            )}
                                        </div>
                                        {pendingVideoFiles?.[item.id] && (
                                            <p className="text-xs text-muted-foreground">
                                                Selected:{' '}
                                                {pendingVideoFiles[item.id]
                                                    .name}{' '}
                                                (
                                                {(
                                                    pendingVideoFiles[item.id]
                                                        .size /
                                                    1024 /
                                                    1024
                                                ).toFixed(1)}{' '}
                                                MB)
                                            </p>
                                        )}
                                        <p className="text-[10px] text-muted-foreground">
                                            MP4 / WebM / MOV up to 100 MB. If an
                                            uploaded file is present, it
                                            overrides the YouTube URL.
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

                                {showSize && (
                                    <div className="space-y-1 md:col-span-2">
                                        <Label>
                                            Card size: {item.size_scale ?? 100}%
                                        </Label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="range"
                                                min={40}
                                                max={150}
                                                value={item.size_scale ?? 100}
                                                onChange={(e) =>
                                                    onChange(item.id, {
                                                        size_scale:
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 100,
                                                    })
                                                }
                                                className="h-2 flex-1 cursor-pointer"
                                            />
                                            <Input
                                                type="number"
                                                min={40}
                                                max={150}
                                                value={item.size_scale ?? 100}
                                                onChange={(e) => {
                                                    const v = parseInt(
                                                        e.target.value,
                                                        10,
                                                    )
                                                    if (Number.isNaN(v)) {
                                                        onChange(item.id, {
                                                            size_scale: 100,
                                                        })
                                                    } else {
                                                        onChange(item.id, {
                                                            size_scale:
                                                                Math.min(
                                                                    150,
                                                                    Math.max(
                                                                        40,
                                                                        v,
                                                                    ),
                                                                ),
                                                        })
                                                    }
                                                }}
                                                className="w-20"
                                            />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">
                                            40–150%. Default 100. Click "Save"
                                            to apply.
                                        </p>
                                    </div>
                                )}

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

function youtubeIdFromUrl(url: string): string | null {
    const m =
        url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
        ) || url.match(/^([\w-]{11})$/)
    return m ? m[1] : null
}

function AddDocumentaryForm({
    onSubmit,
}: {
    onSubmit: (
        title: string,
        videoUrl: string,
        imageFile: File | null,
        onDone: () => void,
    ) => void
}) {
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const fileRef = useRef<HTMLInputElement | null>(null)

    const ytId = youtubeIdFromUrl(videoUrl.trim())
    const ytThumb = ytId
        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        : null
    const localThumb = imageFile ? URL.createObjectURL(imageFile) : null
    const previewThumb = localThumb ?? ytThumb

    const reset = () => {
        setTitle('')
        setVideoUrl('')
        setImageFile(null)
        if (fileRef.current) fileRef.current.value = ''
    }

    const canSubmit =
        title.trim().length > 0 && videoUrl.trim().length > 0 && !submitting

    const handleSubmit = () => {
        if (!canSubmit) return
        setSubmitting(true)
        onSubmit(title.trim(), videoUrl.trim(), imageFile, () => {
            setSubmitting(false)
            reset()
        })
    }

    return (
        <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">
                    Add a YouTube documentary
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                    Paste a YouTube URL — the thumbnail is pulled automatically.
                    Upload a custom thumbnail only if you want to override the
                    YouTube one.
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1 md:col-span-2">
                        <Label htmlFor="new-doc-title">Title</Label>
                        <Input
                            id="new-doc-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Cash Distribution — Nangarhar"
                        />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <Label htmlFor="new-doc-url">YouTube URL</Label>
                        <Input
                            id="new-doc-url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=…"
                        />
                        {videoUrl.trim() && !ytId && (
                            <p className="text-xs text-red-600">
                                That doesn't look like a YouTube URL. It still
                                saves, but the auto-thumbnail won't appear.
                            </p>
                        )}
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <Label>Custom thumbnail (optional)</Label>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageFile(e.target.files?.[0] ?? null)
                            }
                            className="text-sm"
                        />
                        <p className="text-[10px] text-muted-foreground">
                            PNG/JPG up to 5 MB. Leave empty to use YouTube's
                            thumbnail.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3 md:w-48">
                    <div className="aspect-video w-full overflow-hidden rounded-md border border-dashed border-border bg-muted">
                        {previewThumb ? (
                            <img
                                src={previewThumb}
                                alt="Thumbnail preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                Thumbnail preview
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="w-full bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        {submitting ? 'Adding…' : 'Add documentary'}
                    </Button>
                </div>
            </div>
        </section>
    )
}
