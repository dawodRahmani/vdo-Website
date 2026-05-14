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
    caption: string | null
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
        title: 'Programmatic Approach',
        href: '/admin/resilience/programmatic-approach',
    },
]

export default function AdminProgrammaticApproach() {
    const { props } = usePage<Props>()
    const [item, setItem] = useState<ResilienceItem>(props.item)
    const [saving, setSaving] = useState(false)
    const [pendingFile, setPendingFile] = useState<File | null>(null)
    const fileInput = useRef<HTMLInputElement | null>(null)

    const update = (patch: Partial<ResilienceItem>) =>
        setItem((x) => ({ ...x, ...patch }))

    const save = () => {
        setSaving(true)
        const payload: Record<string, string | number | File> = {
            _method: 'patch',
            section: 'programmatic_approach',
            title: item.title ?? '',
            body: item.body ?? '',
            caption: item.caption ?? '',
            order: item.order,
            is_active: item.is_active ? 1 : 0,
        }
        if (pendingFile) payload.image_file = pendingFile

        router.post(`/admin/resilience/${item.id}`, payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPendingFile(null)
                if (fileInput.current) fileInput.current.value = ''
            },
            onFinish: () => setSaving(false),
        })
    }

    const clearImage = () => {
        setSaving(true)
        router.post(
            `/admin/resilience/${item.id}`,
            {
                _method: 'patch',
                section: 'programmatic_approach',
                title: item.title ?? '',
                body: item.body ?? '',
                caption: item.caption ?? '',
                order: item.order,
                is_active: item.is_active ? 1 : 0,
                clear_image: 1,
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onFinish: () => setSaving(false),
            },
        )
    }

    const previewImg = pendingFile
        ? URL.createObjectURL(pendingFile)
        : item.image_url

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programmatic Approach — Admin" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Programmatic Approach
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                The heading, paragraph, four-pillars diagram,
                                and caption shown in the "Programmatic Approach"
                                section.
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
                            <Label>Body paragraph</Label>
                            <textarea
                                className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={item.body ?? ''}
                                onChange={(e) =>
                                    update({ body: e.target.value })
                                }
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Use blank lines to split into multiple
                                paragraphs.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Diagram image (four pillars)</Label>
                            <div className="flex flex-wrap items-center gap-3">
                                {previewImg && (
                                    <img
                                        src={previewImg}
                                        alt=""
                                        className="h-28 w-auto rounded border border-border bg-gray-50 object-contain"
                                    />
                                )}
                                <input
                                    ref={fileInput}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0]
                                        if (f) setPendingFile(f)
                                    }}
                                    className="text-sm"
                                />
                                {item.image && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={clearImage}
                                        disabled={saving}
                                    >
                                        Remove image
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label>Caption under image</Label>
                            <Input
                                value={item.caption ?? ''}
                                onChange={(e) =>
                                    update({ caption: e.target.value })
                                }
                            />
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
