import { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { DonutChart } from '@/components/strategic-priorities/blocks'
import { dashboard } from '@/routes'
import { type BreadcrumbItem, type EducationDonutSegment } from '@/types'

interface AdminEducationSegmentsProps {
    segments: EducationDonutSegment[]
    [key: string]: unknown
}

const COLOR_PRESETS = [
    'rgb(62,64,149)',
    'rgb(0,175,239)',
    '#7AC4E8',
    '#a8dcf0',
    '#cdeaf7',
    '#E74C3C',
    '#F1C40F',
    '#27AE60',
]

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Diagrams', href: '#' },
    {
        title: 'Education Donut',
        href: '/admin/diagrams/education-segments',
    },
]

export default function AdminEducationSegments() {
    const { props } = usePage<AdminEducationSegmentsProps>()
    const [segments, setSegments] = useState<EducationDonutSegment[]>(
        props.segments,
    )
    const [savingId, setSavingId] = useState<number | null>(null)

    const update = (id: number, patch: Partial<EducationDonutSegment>) => {
        setSegments((segs) =>
            segs.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        )
    }

    const save = (segment: EducationDonutSegment) => {
        setSavingId(segment.id)
        router.patch(
            `/admin/diagrams/education-segments/${segment.id}`,
            {
                label: segment.label,
                percent: segment.percent,
                color: segment.color,
                order: segment.order,
                is_active: segment.is_active,
            },
            {
                preserveScroll: true,
                onFinish: () => setSavingId(null),
            },
        )
    }

    const remove = (segment: EducationDonutSegment) => {
        if (!confirm(`Delete segment "${segment.label}"?`)) return
        router.delete(
            `/admin/diagrams/education-segments/${segment.id}`,
            { preserveScroll: true },
        )
    }

    const add = () => {
        router.post(
            '/admin/diagrams/education-segments',
            {
                label: 'New segment',
                percent: 0,
                color: '#7AC4E8',
                order: segments.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    const activeSegments = segments
        .filter((s) => s.is_active)
        .sort((a, b) => a.order - b.order)

    const totalPercent = activeSegments.reduce(
        (sum, s) => sum + Number(s.percent || 0),
        0,
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Education Donut — Diagram" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Live preview */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <h2 className="mb-1 text-lg font-semibold">Live preview</h2>
                    <p className="mb-4 text-xs text-muted-foreground">
                        How the donut renders on the public Education page.
                        Active segments total{' '}
                        <strong
                            className={
                                Math.abs(totalPercent - 100) < 0.01
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-amber-600 dark:text-amber-400'
                            }
                        >
                            {totalPercent}%
                        </strong>{' '}
                        (should equal 100%).
                    </p>
                    <div className="flex justify-center rounded-lg bg-gray-100 p-6 dark:bg-neutral-900">
                        {activeSegments.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No active segments to preview.
                            </p>
                        ) : (
                            <DonutChart
                                centerLabel="100%"
                                segments={activeSegments.map((s) => ({
                                    label: s.label,
                                    value: Number(s.percent),
                                    color: s.color,
                                }))}
                            />
                        )}
                    </div>
                </section>

                {/* Editor */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Segments ({segments.length})
                        </h2>
                        <Button
                            size="sm"
                            onClick={add}
                            className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                        >
                            + Add segment
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {segments.map((segment) => (
                            <div
                                key={segment.id}
                                className="rounded-lg border border-border bg-background p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold">
                                        {segment.label || 'Unlabeled segment'}
                                    </h3>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => remove(segment)}
                                            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => save(segment)}
                                            disabled={savingId === segment.id}
                                            className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                        >
                                            {savingId === segment.id
                                                ? 'Saving…'
                                                : 'Save'}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="space-y-1">
                                        <Label>Label</Label>
                                        <Input
                                            value={segment.label}
                                            onChange={(e) =>
                                                update(segment.id, {
                                                    label: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. Girls"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Percent (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.5}
                                            value={segment.percent}
                                            onChange={(e) =>
                                                update(segment.id, {
                                                    percent:
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Color</Label>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-9 w-9 flex-shrink-0 rounded border border-border"
                                                style={{
                                                    backgroundColor:
                                                        segment.color,
                                                }}
                                            />
                                            <Input
                                                value={segment.color}
                                                onChange={(e) =>
                                                    update(segment.id, {
                                                        color: e.target.value,
                                                    })
                                                }
                                                placeholder="rgb(0,175,239)"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {COLOR_PRESETS.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    title={c}
                                                    onClick={() =>
                                                        update(segment.id, {
                                                            color: c,
                                                        })
                                                    }
                                                    className="h-5 w-5 rounded border border-border"
                                                    style={{
                                                        backgroundColor: c,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Order</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={segment.order}
                                            onChange={(e) =>
                                                update(segment.id, {
                                                    order:
                                                        parseInt(
                                                            e.target.value,
                                                            10,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <label className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            checked={segment.is_active}
                                            onCheckedChange={(v) =>
                                                update(segment.id, {
                                                    is_active: !!v,
                                                })
                                            }
                                        />
                                        Active
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
