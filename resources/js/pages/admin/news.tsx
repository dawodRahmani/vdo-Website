import { useRef, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Plus, Trash2, Upload } from 'lucide-react'

interface NewsPost {
    id: number
    title: string
    slug: string
    category: string | null
    body: string | null
    image_url: string
    published_at: string | null
    is_published: boolean
}

interface PageProps {
    posts: NewsPost[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'News & Announcements', href: '/admin/news' },
]

function PostEditor({ post, onDelete }: { post: NewsPost; onDelete: () => void }) {
    const [title, setTitle] = useState(post.title)
    const [category, setCategory] = useState(post.category ?? '')
    const [body, setBody] = useState(post.body ?? '')
    const [publishedAt, setPublishedAt] = useState(post.published_at ?? '')
    const [isPublished, setIsPublished] = useState(post.is_published)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const fileRef = useRef<HTMLInputElement | null>(null)

    const pick = (f: File | null) => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(f ? URL.createObjectURL(f) : null)
        setFile(f)
    }

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            title,
            category,
            body,
            published_at: publishedAt,
            is_published: isPublished ? 1 : 0,
        }
        if (file) payload.image_file = file

        router.post(`/admin/news/${post.id}`, payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setFile(null)
                setPreview(null)
            },
        })
    }

    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">
                <div className="space-y-2">
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-gray-100">
                        {(preview ?? post.image_url) ? (
                            <img
                                src={preview ?? post.image_url}
                                alt={title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                (no image)
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => pick(e.target.files?.[0] ?? null)}
                    />
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Upload className="mr-1 h-3.5 w-3.5" />
                            {file ? 'Change' : 'Upload'}
                        </Button>
                        {file && (
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => pick(null)}
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Label className="text-xs">Category</Label>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g. Health"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Publish date</Label>
                            <Input
                                type="date"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Body</Label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={4}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                            <Checkbox
                                checked={isPublished}
                                onCheckedChange={(v) => setIsPublished(!!v)}
                            />
                            Published
                        </label>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={onDelete}
                            >
                                <Trash2 className="mr-1 h-3.5 w-3.5" />
                                Delete
                            </Button>
                            <Button onClick={save} disabled={saving}>
                                {saving ? 'Saving…' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NewPostForm({ onCreated }: { onCreated: () => void }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 10))
    const [isPublished, setIsPublished] = useState(true)
    const [file, setFile] = useState<File | null>(null)
    const [saving, setSaving] = useState(false)
    const fileRef = useRef<HTMLInputElement | null>(null)

    const submit = () => {
        if (!title.trim()) return
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            title,
            category,
            body,
            published_at: publishedAt,
            is_published: isPublished ? 1 : 0,
        }
        if (file) payload.image_file = file

        router.post('/admin/news', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setTitle('')
                setCategory('')
                setBody('')
                setFile(null)
                setIsPublished(true)
                setOpen(false)
                onCreated()
            },
        })
    }

    if (!open) {
        return (
            <Button onClick={() => setOpen(true)} className="self-start">
                <Plus className="mr-1 h-4 w-4" />
                New post
            </Button>
        )
    }

    return (
        <div className="rounded-xl border border-dashed border-border bg-card p-5">
            <h2 className="mb-3 text-lg font-semibold">New post</h2>
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label className="text-xs">Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                        <Label className="text-xs">Category</Label>
                        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Publish date</Label>
                        <Input
                            type="date"
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Body</Label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => fileRef.current?.click()}
                    >
                        <Upload className="mr-1 h-3.5 w-3.5" />
                        {file ? file.name : 'Upload image'}
                    </Button>
                    <label className="ml-4 flex items-center gap-2 text-sm">
                        <Checkbox
                            checked={isPublished}
                            onCheckedChange={(v) => setIsPublished(!!v)}
                        />
                        Published
                    </label>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={submit} disabled={saving}>
                        {saving ? 'Saving…' : 'Create'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function AdminNews({ posts }: PageProps) {
    const remove = (post: NewsPost) => {
        if (!confirm(`Delete "${post.title}"?`)) return
        router.delete(`/admin/news/${post.id}`, { preserveScroll: true })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News & Announcements" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">News & Announcements</h1>
                        <p className="text-sm text-muted-foreground">
                            Posts shown here drive the home page&apos;s &ldquo;Latest News&rdquo; section.
                            The two most recent published posts appear.
                        </p>
                    </div>
                </div>

                <NewPostForm onCreated={() => router.reload({ only: ['posts'] })} />

                <div className="space-y-4">
                    {posts.map((p) => (
                        <PostEditor key={p.id} post={p} onDelete={() => remove(p)} />
                    ))}
                    {posts.length === 0 && (
                        <p className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
                            No posts yet. Create one to populate the home page.
                        </p>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
