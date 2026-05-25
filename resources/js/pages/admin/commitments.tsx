import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

interface Commitment {
    id: number
    slug: string
    title: string
    body: string
    card_svg_path: string | null
    card_svg_url: string | null
    size_scale?: number
    offset_x?: number
    offset_y?: number
    order: number
    is_active: boolean
}

interface Publication {
    id: number
    title: string
    cover_path: string | null
    cover_url: string | null
    document_path: string | null
    document_url: string | null
    size_scale?: number
    offset_x?: number
    offset_y?: number
    order: number
    is_active: boolean
}

interface PageProps {
    commitments: Commitment[]
    publications: Publication[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Our Commitment', href: '/admin/commitments' },
]

interface CommitDraft {
    title: string
    body: string
    order: number
    is_active: boolean
    size_scale: number
    offset_x: number
    offset_y: number
    file: File | null
    preview: string | null
    clear: boolean
}

interface PubDraft {
    title: string
    order: number
    is_active: boolean
    size_scale: number
    offset_x: number
    offset_y: number
    file: File | null
    preview: string | null
    clear: boolean
    docFile: File | null
    clearDoc: boolean
}

function commitDraft(c: Commitment): CommitDraft {
    return {
        title: c.title,
        body: c.body,
        order: c.order,
        is_active: c.is_active,
        size_scale: c.size_scale ?? 100,
        offset_x: c.offset_x ?? 0,
        offset_y: c.offset_y ?? 0,
        file: null,
        preview: null,
        clear: false,
    }
}

function pubDraft(p: Publication): PubDraft {
    return {
        title: p.title,
        order: p.order,
        is_active: p.is_active,
        size_scale: p.size_scale ?? 100,
        offset_x: p.offset_x ?? 0,
        offset_y: p.offset_y ?? 0,
        file: null,
        preview: null,
        clear: false,
        docFile: null,
        clearDoc: false,
    }
}

export default function AdminCommitments() {
    const { props } = usePage<PageProps>()
    const [commitments, setCommitments] = useState<Commitment[]>(
        props.commitments,
    )
    const [publications, setPublications] = useState<Publication[]>(
        props.publications,
    )
    const [cDrafts, setCDrafts] = useState<Record<number, CommitDraft>>(() => {
        const out: Record<number, CommitDraft> = {}
        for (const c of props.commitments) out[c.id] = commitDraft(c)
        return out
    })
    const [pDrafts, setPDrafts] = useState<Record<number, PubDraft>>(() => {
        const out: Record<number, PubDraft> = {}
        for (const p of props.publications) out[p.id] = pubDraft(p)
        return out
    })
    const [savingId, setSavingId] = useState<string | null>(null)
    const [creatingCommit, setCreatingCommit] = useState(false)
    const [creatingPub, setCreatingPub] = useState(false)
    const [newCommit, setNewCommit] = useState({
        slug: '',
        title: '',
        body: '',
        order: commitments.length + 1,
        is_active: true,
        file: null as File | null,
    })
    const [newPub, setNewPub] = useState({
        title: '',
        order: publications.length + 1,
        is_active: true,
        file: null as File | null,
    })
    const cFileInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const pFileInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const pDocInputs = useRef<Record<number, HTMLInputElement | null>>({})
    const newCommitFileInput = useRef<HTMLInputElement | null>(null)
    const newPubFileInput = useRef<HTMLInputElement | null>(null)

    const updateCDraft = (id: number, patch: Partial<CommitDraft>) =>
        setCDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }))

    const updatePDraft = (id: number, patch: Partial<PubDraft>) =>
        setPDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }))

    const setCFile = (id: number, file: File | null) => {
        const prev = cDrafts[id].preview
        if (prev) URL.revokeObjectURL(prev)
        updateCDraft(id, {
            file,
            preview: file ? URL.createObjectURL(file) : null,
            clear: false,
        })
    }

    const setPFile = (id: number, file: File | null) => {
        const prev = pDrafts[id].preview
        if (prev) URL.revokeObjectURL(prev)
        updatePDraft(id, {
            file,
            preview: file ? URL.createObjectURL(file) : null,
            clear: false,
        })
    }

    const clearCFile = (id: number) => {
        const prev = cDrafts[id].preview
        if (prev) URL.revokeObjectURL(prev)
        updateCDraft(id, { file: null, preview: null, clear: true })
        if (cFileInputs.current[id]) cFileInputs.current[id]!.value = ''
    }

    const clearPFile = (id: number) => {
        const prev = pDrafts[id].preview
        if (prev) URL.revokeObjectURL(prev)
        updatePDraft(id, { file: null, preview: null, clear: true })
        if (pFileInputs.current[id]) pFileInputs.current[id]!.value = ''
    }

    const setPDocFile = (id: number, file: File | null) =>
        updatePDraft(id, { docFile: file, clearDoc: false })

    const clearPDocFile = (id: number) => {
        updatePDraft(id, { docFile: null, clearDoc: true })
        if (pDocInputs.current[id]) pDocInputs.current[id]!.value = ''
    }

    const saveCommit = (c: Commitment) => {
        const d = cDrafts[c.id]
        setSavingId(`c-${c.id}`)
        const payload: Record<string, string | number | File> = {
            title: d.title,
            body: d.body,
            order: d.order,
            is_active: d.is_active ? 1 : 0,
            size_scale: d.size_scale,
            offset_x: d.offset_x,
            offset_y: d.offset_y,
            clear_card_svg: d.clear ? 1 : 0,
        }
        if (d.file) payload.card_svg_file = d.file
        router.post(`/admin/commitments/${c.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingId(null),
            onSuccess: () => {
                if (d.preview) URL.revokeObjectURL(d.preview)
                updateCDraft(c.id, { file: null, preview: null, clear: false })
                router.reload({ only: ['commitments'] })
            },
        })
    }

    const destroyCommit = (c: Commitment) => {
        if (!confirm(`Delete commitment "${c.title}"?`)) return
        router.delete(`/admin/commitments/${c.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setCommitments((xs) => xs.filter((x) => x.id !== c.id))
                setCDrafts((d) => {
                    const next = { ...d }
                    delete next[c.id]
                    return next
                })
            },
        })
    }

    const createCommit = () => {
        setCreatingCommit(true)
        const payload: Record<string, string | number | File> = {
            slug: newCommit.slug,
            title: newCommit.title,
            body: newCommit.body,
            order: newCommit.order,
            is_active: newCommit.is_active ? 1 : 0,
        }
        if (newCommit.file) payload.card_svg_file = newCommit.file
        router.post('/admin/commitments', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setCreatingCommit(false),
            onSuccess: () => {
                setNewCommit({
                    slug: '',
                    title: '',
                    body: '',
                    order: commitments.length + 2,
                    is_active: true,
                    file: null,
                })
                if (newCommitFileInput.current)
                    newCommitFileInput.current.value = ''
                router.reload({ only: ['commitments'] })
            },
        })
    }

    const savePub = (p: Publication) => {
        const d = pDrafts[p.id]
        setSavingId(`p-${p.id}`)
        const payload: Record<string, string | number | File> = {
            title: d.title,
            order: d.order,
            is_active: d.is_active ? 1 : 0,
            size_scale: d.size_scale,
            offset_x: d.offset_x,
            offset_y: d.offset_y,
            clear_cover: d.clear ? 1 : 0,
            clear_document: d.clearDoc ? 1 : 0,
        }
        if (d.file) payload.cover_file = d.file
        if (d.docFile) payload.document_file = d.docFile
        router.post(`/admin/commitments/publications/${p.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingId(null),
            onSuccess: () => {
                if (d.preview) URL.revokeObjectURL(d.preview)
                updatePDraft(p.id, {
                    file: null,
                    preview: null,
                    clear: false,
                    docFile: null,
                    clearDoc: false,
                })
                if (pDocInputs.current[p.id]) pDocInputs.current[p.id]!.value = ''
                router.reload({ only: ['publications'] })
            },
        })
    }

    const destroyPub = (p: Publication) => {
        if (!confirm(`Delete publication "${p.title}"?`)) return
        router.delete(`/admin/commitments/publications/${p.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setPublications((xs) => xs.filter((x) => x.id !== p.id))
                setPDrafts((d) => {
                    const next = { ...d }
                    delete next[p.id]
                    return next
                })
            },
        })
    }

    const createPub = () => {
        setCreatingPub(true)
        const payload: Record<string, string | number | File> = {
            title: newPub.title,
            order: newPub.order,
            is_active: newPub.is_active ? 1 : 0,
        }
        if (newPub.file) payload.cover_file = newPub.file
        router.post('/admin/commitments/publications', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setCreatingPub(false),
            onSuccess: () => {
                setNewPub({
                    title: '',
                    order: publications.length + 2,
                    is_active: true,
                    file: null,
                })
                if (newPubFileInput.current)
                    newPubFileInput.current.value = ''
                router.reload({ only: ['publications'] })
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Our Commitment" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                {/* Commitments */}
                <section>
                    <div className="mb-3">
                        <h1 className="text-2xl font-semibold">Commitments</h1>
                        <p className="text-muted-foreground text-sm">
                            The commitment cards and detailed sections on the
                            Our Commitment page.
                        </p>
                    </div>

                    {/* New commitment form */}
                    <div className="border-border bg-card mb-4 space-y-3 rounded-xl border p-4 shadow-sm">
                        <h2 className="text-sm font-semibold">
                            Add commitment
                        </h2>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="nc-slug">
                                    Slug (URL anchor)
                                </Label>
                                <Input
                                    id="nc-slug"
                                    value={newCommit.slug}
                                    onChange={(e) =>
                                        setNewCommit((n) => ({
                                            ...n,
                                            slug: e.target.value,
                                        }))
                                    }
                                    placeholder="gender-equality"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="nc-title">Title</Label>
                                <Input
                                    id="nc-title"
                                    value={newCommit.title}
                                    onChange={(e) =>
                                        setNewCommit((n) => ({
                                            ...n,
                                            title: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="nc-order">Order</Label>
                                <Input
                                    id="nc-order"
                                    type="number"
                                    value={newCommit.order}
                                    onChange={(e) =>
                                        setNewCommit((n) => ({
                                            ...n,
                                            order:
                                                parseInt(e.target.value) || 0,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Card icon (SVG/PNG)</Label>
                                <input
                                    ref={newCommitFileInput}
                                    type="file"
                                    accept="image/svg+xml,image/png,image/jpeg,image/webp"
                                    onChange={(e) =>
                                        setNewCommit((n) => ({
                                            ...n,
                                            file: e.target.files?.[0] ?? null,
                                        }))
                                    }
                                    className="text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nc-body">
                                Body (separate paragraphs with a blank line)
                            </Label>
                            <textarea
                                id="nc-body"
                                value={newCommit.body}
                                onChange={(e) =>
                                    setNewCommit((n) => ({
                                        ...n,
                                        body: e.target.value,
                                    }))
                                }
                                rows={4}
                                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={createCommit}
                                disabled={
                                    creatingCommit ||
                                    !newCommit.slug ||
                                    !newCommit.title ||
                                    !newCommit.body
                                }
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                {creatingCommit ? 'Adding…' : 'Add commitment'}
                            </Button>
                        </div>
                    </div>

                    {/* Existing commitments */}
                    <div className="space-y-3">
                        {commitments.map((c) => {
                            const d = cDrafts[c.id] ?? commitDraft(c)
                            const shown =
                                d.preview ??
                                (d.clear ? null : c.card_svg_url)
                            const saving = savingId === `c-${c.id}`
                            return (
                                <div
                                    key={c.id}
                                    className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                                            {shown ? (
                                                <img
                                                    src={shown}
                                                    alt={c.title}
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-400">
                                                    (no icon)
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col gap-2">
                                            <p className="text-muted-foreground text-xs">
                                                Slug: {c.slug}
                                            </p>
                                            <input
                                                ref={(el) => {
                                                    cFileInputs.current[c.id] = el
                                                }}
                                                type="file"
                                                accept="image/svg+xml,image/png,image/jpeg,image/webp"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setCFile(
                                                        c.id,
                                                        e.target.files?.[0] ??
                                                            null,
                                                    )
                                                }
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        cFileInputs.current[
                                                            c.id
                                                        ]?.click()
                                                    }
                                                >
                                                    <Upload className="mr-1 h-3.5 w-3.5" />
                                                    {d.file ? 'Change' : 'Upload'}
                                                </Button>
                                                {(c.card_svg_url || d.file) && (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            clearCFile(c.id)
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor={`c-title-${c.id}`}>
                                            Title
                                        </Label>
                                        <Input
                                            id={`c-title-${c.id}`}
                                            value={d.title}
                                            onChange={(e) =>
                                                updateCDraft(c.id, {
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor={`c-body-${c.id}`}>
                                            Body (separate paragraphs with a
                                            blank line)
                                        </Label>
                                        <textarea
                                            id={`c-body-${c.id}`}
                                            value={d.body}
                                            onChange={(e) =>
                                                updateCDraft(c.id, {
                                                    body: e.target.value,
                                                })
                                            }
                                            rows={5}
                                            className="border-input bg-background min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Label className="w-10 text-xs">
                                            Size
                                        </Label>
                                        <input
                                            type="range"
                                            min={50}
                                            max={200}
                                            step={5}
                                            value={d.size_scale}
                                            onChange={(e) =>
                                                updateCDraft(c.id, {
                                                    size_scale:
                                                        parseInt(
                                                            e.target.value,
                                                            10,
                                                        ) || 100,
                                                })
                                            }
                                            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                        />
                                        <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                            {d.size_scale}%
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Label className="w-10 text-xs">X</Label>
                                        <input
                                            type="range"
                                            min={-200}
                                            max={200}
                                            value={d.offset_x}
                                            onChange={(e) =>
                                                updateCDraft(c.id, {
                                                    offset_x:
                                                        parseInt(
                                                            e.target.value,
                                                            10,
                                                        ) || 0,
                                                })
                                            }
                                            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                        />
                                        <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                            {d.offset_x}px
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Label className="w-10 text-xs">Y</Label>
                                        <input
                                            type="range"
                                            min={-200}
                                            max={200}
                                            value={d.offset_y}
                                            onChange={(e) =>
                                                updateCDraft(c.id, {
                                                    offset_y:
                                                        parseInt(
                                                            e.target.value,
                                                            10,
                                                        ) || 0,
                                                })
                                            }
                                            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                        />
                                        <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                            {d.offset_y}px
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <Label
                                                    htmlFor={`c-order-${c.id}`}
                                                    className="text-xs"
                                                >
                                                    Order
                                                </Label>
                                                <Input
                                                    id={`c-order-${c.id}`}
                                                    type="number"
                                                    value={d.order}
                                                    onChange={(e) =>
                                                        updateCDraft(c.id, {
                                                            order:
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                        })
                                                    }
                                                    className="w-20"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`c-active-${c.id}`}
                                                    checked={d.is_active}
                                                    onCheckedChange={(v) =>
                                                        updateCDraft(c.id, {
                                                            is_active: !!v,
                                                        })
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`c-active-${c.id}`}
                                                    className="text-xs"
                                                >
                                                    Active
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => destroyCommit(c)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="mr-1 h-3.5 w-3.5" />
                                                Delete
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => saveCommit(c)}
                                                disabled={saving}
                                            >
                                                {saving ? 'Saving…' : 'Save'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Publications */}
                <section>
                    <div className="mb-3">
                        <h1 className="text-2xl font-semibold">Publications</h1>
                        <p className="text-muted-foreground text-sm">
                            Cover thumbnails shown in the Publications panel.
                        </p>
                    </div>

                    {/* New publication form */}
                    <div className="border-border bg-card mb-4 space-y-3 rounded-xl border p-4 shadow-sm">
                        <h2 className="text-sm font-semibold">
                            Add publication
                        </h2>
                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="space-y-1.5 md:col-span-2">
                                <Label htmlFor="np-title">Title</Label>
                                <Input
                                    id="np-title"
                                    value={newPub.title}
                                    onChange={(e) =>
                                        setNewPub((n) => ({
                                            ...n,
                                            title: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="np-order">Order</Label>
                                <Input
                                    id="np-order"
                                    type="number"
                                    value={newPub.order}
                                    onChange={(e) =>
                                        setNewPub((n) => ({
                                            ...n,
                                            order:
                                                parseInt(e.target.value) || 0,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-3">
                                <Label>Cover image</Label>
                                <input
                                    ref={newPubFileInput}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setNewPub((n) => ({
                                            ...n,
                                            file: e.target.files?.[0] ?? null,
                                        }))
                                    }
                                    className="text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={createPub}
                                disabled={creatingPub || !newPub.title}
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                {creatingPub ? 'Adding…' : 'Add publication'}
                            </Button>
                        </div>
                    </div>

                    {/* Existing publications */}
                    <div className="grid gap-3 md:grid-cols-2">
                        {publications.map((p) => {
                            const d = pDrafts[p.id] ?? pubDraft(p)
                            const shown =
                                d.preview ?? (d.clear ? null : p.cover_url)
                            const saving = savingId === `p-${p.id}`
                            return (
                                <div
                                    key={p.id}
                                    className="border-border bg-card flex gap-3 rounded-xl border p-4 shadow-sm"
                                >
                                    <div className="flex h-32 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                                        {shown ? (
                                            <img
                                                src={shown}
                                                alt={p.title}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-[10px] text-gray-400">
                                                (no cover)
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2">
                                        <input
                                            ref={(el) => {
                                                pFileInputs.current[p.id] = el
                                            }}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                setPFile(
                                                    p.id,
                                                    e.target.files?.[0] ??
                                                        null,
                                                )
                                            }
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    pFileInputs.current[
                                                        p.id
                                                    ]?.click()
                                                }
                                            >
                                                <Upload className="mr-1 h-3.5 w-3.5" />
                                                {d.file ? 'Change' : 'Upload'}
                                            </Button>
                                            {(p.cover_url || d.file) && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        clearPFile(p.id)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs">
                                                Document (PDF preferred)
                                            </Label>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {p.document_url &&
                                                    !d.clearDoc &&
                                                    !d.docFile && (
                                                        <a
                                                            href={
                                                                p.document_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="rounded border border-border bg-muted px-2 py-1 text-[11px] text-foreground hover:bg-accent"
                                                        >
                                                            View current
                                                        </a>
                                                    )}
                                                <input
                                                    ref={(el) => {
                                                        pDocInputs.current[
                                                            p.id
                                                        ] = el
                                                    }}
                                                    type="file"
                                                    accept="application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                    onChange={(e) =>
                                                        setPDocFile(
                                                            p.id,
                                                            e.target.files?.[0] ??
                                                                null,
                                                        )
                                                    }
                                                    className="text-xs"
                                                />
                                                {(p.document_url ||
                                                    d.docFile) && (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            clearPDocFile(p.id)
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                            {d.docFile && (
                                                <p className="text-[10px] text-muted-foreground">
                                                    Selected:{' '}
                                                    {d.docFile.name} (
                                                    {(
                                                        d.docFile.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(1)}{' '}
                                                    MB)
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor={`p-title-${p.id}`}
                                                className="text-xs"
                                            >
                                                Title
                                            </Label>
                                            <Input
                                                id={`p-title-${p.id}`}
                                                value={d.title}
                                                onChange={(e) =>
                                                    updatePDraft(p.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label className="w-10 text-xs">
                                                Size
                                            </Label>
                                            <input
                                                type="range"
                                                min={50}
                                                max={200}
                                                step={5}
                                                value={d.size_scale}
                                                onChange={(e) =>
                                                    updatePDraft(p.id, {
                                                        size_scale:
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 100,
                                                    })
                                                }
                                                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                            />
                                            <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                                {d.size_scale}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label className="w-10 text-xs">X</Label>
                                            <input
                                                type="range"
                                                min={-200}
                                                max={200}
                                                value={d.offset_x}
                                                onChange={(e) =>
                                                    updatePDraft(p.id, {
                                                        offset_x:
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 0,
                                                    })
                                                }
                                                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                            />
                                            <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                                {d.offset_x}px
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label className="w-10 text-xs">Y</Label>
                                            <input
                                                type="range"
                                                min={-200}
                                                max={200}
                                                value={d.offset_y}
                                                onChange={(e) =>
                                                    updatePDraft(p.id, {
                                                        offset_y:
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 0,
                                                    })
                                                }
                                                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-[rgb(0,175,239)]"
                                            />
                                            <span className="w-12 text-right text-xs font-medium tabular-nums text-[rgb(62,64,149)]">
                                                {d.offset_y}px
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <Label
                                                    htmlFor={`p-order-${p.id}`}
                                                    className="text-xs"
                                                >
                                                    Order
                                                </Label>
                                                <Input
                                                    id={`p-order-${p.id}`}
                                                    type="number"
                                                    value={d.order}
                                                    onChange={(e) =>
                                                        updatePDraft(p.id, {
                                                            order:
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                        })
                                                    }
                                                    className="w-20"
                                                />
                                                <Checkbox
                                                    id={`p-active-${p.id}`}
                                                    checked={d.is_active}
                                                    onCheckedChange={(v) =>
                                                        updatePDraft(p.id, {
                                                            is_active: !!v,
                                                        })
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`p-active-${p.id}`}
                                                    className="text-xs"
                                                >
                                                    Active
                                                </Label>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        destroyPub(p)
                                                    }
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => savePub(p)}
                                                    disabled={saving}
                                                >
                                                    {saving
                                                        ? 'Saving…'
                                                        : 'Save'}
                                                </Button>
                                            </div>
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
