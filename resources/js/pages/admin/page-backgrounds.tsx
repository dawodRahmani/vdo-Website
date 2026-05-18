import { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'

interface PageRow {
    id: number
    page_key: string
    label: string
    background_color: string
}

interface Props {
    pages: PageRow[]
    default_color: string
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Page Colors', href: '/admin/page-backgrounds' },
]

const PRESETS = [
    'rgb(189,191,193)',
    'rgb(243,244,246)', // gray-100
    'rgb(255,255,255)', // white
    'rgb(62,64,149)',
    'rgb(0,175,239)',
    'rgb(243,232,255)', // light purple
    'rgb(254,242,242)', // light red
    'rgb(236,253,245)', // light green
]

function toHexForPicker(value: string): string {
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return value
    const m = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
    if (m) {
        const [r, g, b] = [m[1], m[2], m[3]].map((n) => parseInt(n, 10))
        return (
            '#' +
            [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')
        )
    }
    return '#bdbfc1'
}

export default function AdminPageBackgrounds() {
    const { props } = usePage<Props>()
    const [pages, setPages] = useState<PageRow[]>(props.pages)
    const [savingId, setSavingId] = useState<number | null>(null)

    const update = (id: number, color: string) =>
        setPages((xs) =>
            xs.map((x) => (x.id === id ? { ...x, background_color: color } : x)),
        )

    const save = (row: PageRow) => {
        setSavingId(row.id)
        router.patch(
            `/admin/page-backgrounds/${row.id}`,
            { background_color: row.background_color },
            {
                preserveScroll: true,
                onFinish: () => setSavingId(null),
            },
        )
    }

    const resetToDefault = (row: PageRow) => {
        update(row.id, props.default_color)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Page Colors — Admin" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            Page background colors
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Pick a background color per public page. The chosen
                            color is applied to the full page (under header and
                            footer). Default is{' '}
                            <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
                                {props.default_color}
                            </code>
                            .
                        </p>
                    </div>

                    <div className="space-y-3">
                        {pages.map((row) => (
                            <div
                                key={row.id}
                                className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-3"
                            >
                                <div
                                    className="h-12 w-12 flex-none rounded-md border border-border shadow-inner"
                                    style={{
                                        backgroundColor: row.background_color,
                                    }}
                                    aria-hidden="true"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">
                                        {row.label}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        Route: {row.page_key}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={toHexForPicker(
                                            row.background_color,
                                        )}
                                        onChange={(e) =>
                                            update(row.id, e.target.value)
                                        }
                                        className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                                        title="Pick a color"
                                    />
                                    <Input
                                        value={row.background_color}
                                        onChange={(e) =>
                                            update(row.id, e.target.value)
                                        }
                                        className="w-44 font-mono text-xs"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-1">
                                    {PRESETS.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            title={c}
                                            onClick={() => update(row.id, c)}
                                            className="h-6 w-6 rounded border border-border"
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => resetToDefault(row)}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => save(row)}
                                        disabled={savingId === row.id}
                                        className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                    >
                                        {savingId === row.id
                                            ? 'Saving…'
                                            : 'Save'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
