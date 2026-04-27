import { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import AfghanistanMap from '@/components/afghanistan-map'
import { dashboard } from '@/routes'
import { map as adminMap } from '@/routes/admin'
import { BreadcrumbItem, MapPin, Region } from '@/types'

interface AdminMapProps {
    regions: Region[]
    mapPins: MapPin[]
    [key: string]: unknown
}

const PIN_PRESETS = ['#E74C3C', '#F1C40F', 'rgb(0,175,239)', 'rgb(62,64,149)']
const REGION_PRESETS = [
    'rgb(0,175,239)',
    'rgb(62,64,149)',
    'rgb(189,191,193)',
]

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Map Configuration', href: adminMap().url },
]

export default function AdminMap() {
    const { props } = usePage<AdminMapProps>()
    const [regions, setRegions] = useState<Region[]>(props.regions)
    const [pins, setPins] = useState<MapPin[]>(props.mapPins)
    const [savingRegion, setSavingRegion] = useState<number | null>(null)
    const [savingPin, setSavingPin] = useState<number | null>(null)

    const updateRegion = (id: number, patch: Partial<Region>) => {
        setRegions((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    }

    const saveRegion = (region: Region) => {
        setSavingRegion(region.id)
        router.patch(
            `/admin/map/regions/${region.id}`,
            {
                label: region.label ?? '',
                color: region.color,
                label_x: region.label_x,
                label_y: region.label_y,
                label_two_line: region.label_two_line,
                is_active: region.is_active,
            },
            {
                preserveScroll: true,
                onFinish: () => setSavingRegion(null),
            },
        )
    }

    const updatePin = (id: number, patch: Partial<MapPin>) => {
        setPins((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)))
    }

    const savePin = (pin: MapPin) => {
        setSavingPin(pin.id)
        router.patch(
            `/admin/map/pins/${pin.id}`,
            {
                name: pin.name,
                region_label: pin.region_label,
                description: pin.description ?? '',
                stats: pin.stats ?? '',
                x: pin.x,
                y: pin.y,
                color: pin.color,
                order: pin.order,
                is_active: pin.is_active,
            },
            {
                preserveScroll: true,
                onFinish: () => setSavingPin(null),
            },
        )
    }

    const deletePin = (pin: MapPin) => {
        if (!confirm(`Delete pin "${pin.name}"?`)) return
        router.delete(`/admin/map/pins/${pin.id}`, { preserveScroll: true })
    }

    const addPin = () => {
        router.post(
            '/admin/map/pins',
            {
                name: 'New Pin',
                region_label: 'Region',
                description: '',
                stats: '',
                x: 50,
                y: 50,
                color: '#E74C3C',
                order: pins.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Map Configuration" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Live preview */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Live preview</h2>
                    <div className="mx-auto max-w-2xl rounded-lg bg-gray-100 p-4 dark:bg-neutral-900">
                        <AfghanistanMap regions={regions} pins={pins} />
                    </div>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                        Edits below update the preview instantly. Click "Save"
                        to persist.
                    </p>
                </section>

                {/* Regions */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">
                        Regions ({regions.length})
                    </h2>
                    <div className="space-y-4">
                        {regions.map((region) => (
                            <div
                                key={region.id}
                                className="rounded-lg border border-border bg-background p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            {region.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            slug: {region.slug}
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => saveRegion(region)}
                                        disabled={savingRegion === region.id}
                                        className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                    >
                                        {savingRegion === region.id
                                            ? 'Saving…'
                                            : 'Save'}
                                    </Button>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="space-y-1">
                                        <Label>Label text</Label>
                                        <Input
                                            value={region.label ?? ''}
                                            onChange={(e) =>
                                                updateRegion(region.id, {
                                                    label: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. Northern"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Use \n in DB for two-line text
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Color</Label>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-9 w-9 flex-shrink-0 rounded border border-border"
                                                style={{
                                                    backgroundColor:
                                                        region.color,
                                                }}
                                            />
                                            <Input
                                                value={region.color}
                                                onChange={(e) =>
                                                    updateRegion(region.id, {
                                                        color: e.target.value,
                                                    })
                                                }
                                                placeholder="rgb(0,175,239)"
                                            />
                                        </div>
                                        <div className="flex gap-1 pt-1">
                                            {REGION_PRESETS.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    title={c}
                                                    onClick={() =>
                                                        updateRegion(
                                                            region.id,
                                                            { color: c },
                                                        )
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
                                        <Label>Label X (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.5}
                                            value={region.label_x}
                                            onChange={(e) =>
                                                updateRegion(region.id, {
                                                    label_x:
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Label Y (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.5}
                                            value={region.label_y}
                                            onChange={(e) =>
                                                updateRegion(region.id, {
                                                    label_y:
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-6">
                                    <label className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            checked={region.label_two_line}
                                            onCheckedChange={(v) =>
                                                updateRegion(region.id, {
                                                    label_two_line: !!v,
                                                })
                                            }
                                        />
                                        Two-line label (split on \n)
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            checked={region.is_active}
                                            onCheckedChange={(v) =>
                                                updateRegion(region.id, {
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

                {/* Pins */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Map Pins ({pins.length})
                        </h2>
                        <Button
                            size="sm"
                            onClick={addPin}
                            className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                        >
                            + Add pin
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {pins.map((pin) => (
                            <div
                                key={pin.id}
                                className="rounded-lg border border-border bg-background p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold">
                                        {pin.name || 'Unnamed pin'}
                                    </h3>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => deletePin(pin)}
                                            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => savePin(pin)}
                                            disabled={savingPin === pin.id}
                                            className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                        >
                                            {savingPin === pin.id
                                                ? 'Saving…'
                                                : 'Save'}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-1">
                                        <Label>Name</Label>
                                        <Input
                                            value={pin.name}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Region label</Label>
                                        <Input
                                            value={pin.region_label}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    region_label:
                                                        e.target.value,
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
                                                    backgroundColor: pin.color,
                                                }}
                                            />
                                            <Input
                                                value={pin.color}
                                                onChange={(e) =>
                                                    updatePin(pin.id, {
                                                        color: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex gap-1 pt-1">
                                            {PIN_PRESETS.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    title={c}
                                                    onClick={() =>
                                                        updatePin(pin.id, {
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
                                        <Label>X (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.1}
                                            value={pin.x}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    x:
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Y (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.1}
                                            value={pin.y}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    y:
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Order</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={pin.order}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    order:
                                                        parseInt(
                                                            e.target.value,
                                                            10,
                                                        ) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <Label>Description</Label>
                                        <Input
                                            value={pin.description ?? ''}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    description: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. Head Office"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Stats</Label>
                                        <Input
                                            value={pin.stats ?? ''}
                                            onChange={(e) =>
                                                updatePin(pin.id, {
                                                    stats: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. 150,000+ beneficiaries"
                                        />
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <label className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            checked={pin.is_active}
                                            onCheckedChange={(v) =>
                                                updatePin(pin.id, {
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
