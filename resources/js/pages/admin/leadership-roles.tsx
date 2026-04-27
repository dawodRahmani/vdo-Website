import { useRef, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { LeadershipPin, type PinStyle } from '@/components/leadership-pin'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'

interface LeadershipRole {
    id: number
    title: string
    body: string
    color: string
    pin_style: PinStyle
    icon_name: string | null
    icon_image: string | null
    icon_image_url: string | null
    pos_x: number
    pos_y: number
    order: number
    is_active: boolean
}

interface AdminLeadershipRolesProps {
    roles: LeadershipRole[]
    [key: string]: unknown
}

const COLOR_PRESETS = [
    'rgb(62,64,149)',
    'rgb(0,175,239)',
    'rgb(189,191,193)',
    '#E74C3C',
    '#F1C40F',
    '#27AE60',
]

const ICON_SUGGESTIONS = [
    'Award',
    'Building2',
    'Crown',
    'Globe',
    'HeartHandshake',
    'Landmark',
    'Shield',
    'Star',
    'Target',
    'Users',
]

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Diagrams', href: '#' },
    { title: 'Leadership Roles', href: '/admin/diagrams/leadership-roles' },
]

// rgb(r,g,b) → "#rrggbb" so the native color input has something to display
function toHexForPicker(value: string): string {
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return value
    const m = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
    if (m) {
        const [r, g, b] = [m[1], m[2], m[3]].map((n) => parseInt(n, 10))
        return (
            '#' +
            [r, g, b]
                .map((n) => n.toString(16).padStart(2, '0'))
                .join('')
        )
    }
    return '#3e4095'
}

export default function AdminLeadershipRoles() {
    const { props } = usePage<AdminLeadershipRolesProps>()
    const [roles, setRoles] = useState<LeadershipRole[]>(props.roles)
    const [savingId, setSavingId] = useState<number | null>(null)
    const [pendingFiles, setPendingFiles] = useState<Record<number, File>>({})
    const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

    const update = (id: number, patch: Partial<LeadershipRole>) => {
        setRoles((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    }

    const save = (role: LeadershipRole) => {
        setSavingId(role.id)
        const payload: Record<string, string | number | File> = {
            _method: 'patch',
            title: role.title,
            body: role.body,
            color: role.color,
            pin_style: role.pin_style,
            icon_name: role.icon_name ?? '',
            pos_x: role.pos_x,
            pos_y: role.pos_y,
            order: role.order,
            is_active: role.is_active ? 1 : 0,
        }
        const file = pendingFiles[role.id]
        if (file) payload.icon_image_file = file

        router.post(`/admin/diagrams/leadership-roles/${role.id}`, payload, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPendingFiles((p) => {
                    const next = { ...p }
                    delete next[role.id]
                    return next
                })
                if (fileInputs.current[role.id]) {
                    fileInputs.current[role.id]!.value = ''
                }
            },
            onFinish: () => setSavingId(null),
        })
    }

    const clearImage = (role: LeadershipRole) => {
        setSavingId(role.id)
        router.post(
            `/admin/diagrams/leadership-roles/${role.id}`,
            {
                _method: 'patch',
                title: role.title,
                body: role.body,
                color: role.color,
                pin_style: role.pin_style,
                icon_name: role.icon_name ?? '',
                pos_x: role.pos_x,
                pos_y: role.pos_y,
                order: role.order,
                is_active: role.is_active ? 1 : 0,
                clear_icon_image: 1,
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onFinish: () => setSavingId(null),
            },
        )
    }

    const remove = (role: LeadershipRole) => {
        if (!confirm(`Delete "${role.title}"?`)) return
        router.delete(`/admin/diagrams/leadership-roles/${role.id}`, {
            preserveScroll: true,
        })
    }

    const add = () => {
        router.post(
            '/admin/diagrams/leadership-roles',
            {
                title: 'New role',
                body: 'Describe this leadership role.',
                color: 'rgb(62,64,149)',
                pin_style: 'balloon',
                icon_name: '',
                pos_x: 50,
                pos_y: 50,
                order: roles.length + 1,
                is_active: true,
            },
            { preserveScroll: true },
        )
    }

    const activeRoles = roles
        .filter((r) => r.is_active)
        .sort((a, b) => a.order - b.order)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leadership Roles — Diagram" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Live preview */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <h2 className="mb-1 text-lg font-semibold">Live preview</h2>
                    <p className="mb-4 text-xs text-muted-foreground">
                        How this diagram appears on the About page (desktop
                        view). The pin's tip anchors at the (X, Y) coordinates.
                    </p>
                    <div className="rounded-lg bg-gray-100 p-6 dark:bg-neutral-900">
                        {activeRoles.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No active roles to preview.
                            </p>
                        ) : (
                            <div className="relative min-h-[320px]">
                                <div className="absolute left-[16%] right-[16%] top-1/2 border-t border-dotted border-gray-400" />
                                {activeRoles.map((role) => (
                                    <div
                                        key={role.id}
                                        className="absolute flex w-[200px] flex-col items-center"
                                        style={{
                                            left: `${role.pos_x}%`,
                                            top: `${role.pos_y}%`,
                                            transform: `translate(-50%, -86px)`,
                                        }}
                                    >
                                        <LeadershipPin
                                            color={role.color}
                                            pinStyle={role.pin_style}
                                            iconName={role.icon_name}
                                            iconImageUrl={
                                                pendingFiles[role.id]
                                                    ? URL.createObjectURL(
                                                          pendingFiles[role.id],
                                                      )
                                                    : role.icon_image_url
                                            }
                                        />
                                        <p className="mt-4 text-center text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                            {role.title} – {role.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                        Edits update the preview instantly. Click "Save" on a
                        row to persist (and to upload selected images).
                    </p>
                </section>

                {/* Roles editor */}
                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Roles ({roles.length})
                        </h2>
                        <Button
                            size="sm"
                            onClick={add}
                            className="bg-[rgb(0,175,239)] text-white hover:bg-[rgb(0,175,239)]/90"
                        >
                            + Add role
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {roles.map((role) => {
                            const previewImg =
                                pendingFiles[role.id]
                                    ? URL.createObjectURL(pendingFiles[role.id])
                                    : role.icon_image_url
                            return (
                                <div
                                    key={role.id}
                                    className="rounded-lg border border-border bg-background p-4"
                                >
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="scale-75">
                                                <LeadershipPin
                                                    color={role.color}
                                                    pinStyle={role.pin_style}
                                                    iconName={role.icon_name}
                                                    iconImageUrl={previewImg}
                                                />
                                            </div>
                                            <h3 className="font-semibold">
                                                {role.title || 'Untitled'}
                                            </h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => remove(role)}
                                                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => save(role)}
                                                disabled={savingId === role.id}
                                                className="bg-[rgb(62,64,149)] text-white hover:bg-[rgb(62,64,149)]/90"
                                            >
                                                {savingId === role.id
                                                    ? 'Saving…'
                                                    : 'Save'}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="space-y-1 md:col-span-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={role.title}
                                                onChange={(e) =>
                                                    update(role.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <Label>Body</Label>
                                            <textarea
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                value={role.body}
                                                onChange={(e) =>
                                                    update(role.id, {
                                                        body: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Color</Label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={toHexForPicker(
                                                        role.color,
                                                    )}
                                                    onChange={(e) =>
                                                        update(role.id, {
                                                            color: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                                                    title="Pick color"
                                                />
                                                <Input
                                                    value={role.color}
                                                    onChange={(e) =>
                                                        update(role.id, {
                                                            color: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-1 pt-1">
                                                {COLOR_PRESETS.map((c) => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        title={c}
                                                        onClick={() =>
                                                            update(role.id, {
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
                                                value={role.order}
                                                onChange={(e) =>
                                                    update(role.id, {
                                                        order:
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 0,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Position X (%)</Label>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                step={0.5}
                                                value={role.pos_x}
                                                onChange={(e) =>
                                                    update(role.id, {
                                                        pos_x:
                                                            parseFloat(
                                                                e.target.value,
                                                            ) || 0,
                                                    })
                                                }
                                            />
                                            <p className="text-[10px] text-muted-foreground">
                                                0 = far left, 100 = far right.
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label>Position Y (%)</Label>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                step={0.5}
                                                value={role.pos_y}
                                                onChange={(e) =>
                                                    update(role.id, {
                                                        pos_y:
                                                            parseFloat(
                                                                e.target.value,
                                                            ) || 0,
                                                    })
                                                }
                                            />
                                            <p className="text-[10px] text-muted-foreground">
                                                50 sits on the dotted line.
                                            </p>
                                        </div>

                                        <div className="space-y-1 md:col-span-2">
                                            <Label>Pin style</Label>
                                            <div className="flex flex-wrap gap-4">
                                                <label className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="radio"
                                                        name={`style-${role.id}`}
                                                        checked={
                                                            role.pin_style ===
                                                            'balloon'
                                                        }
                                                        onChange={() =>
                                                            update(role.id, {
                                                                pin_style:
                                                                    'balloon',
                                                            })
                                                        }
                                                    />
                                                    Balloon (default)
                                                </label>
                                                <label className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="radio"
                                                        name={`style-${role.id}`}
                                                        checked={
                                                            role.pin_style ===
                                                            'icon'
                                                        }
                                                        onChange={() =>
                                                            update(role.id, {
                                                                pin_style:
                                                                    'icon',
                                                            })
                                                        }
                                                    />
                                                    Lucide icon
                                                </label>
                                                <label className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="radio"
                                                        name={`style-${role.id}`}
                                                        checked={
                                                            role.pin_style ===
                                                            'image'
                                                        }
                                                        onChange={() =>
                                                            update(role.id, {
                                                                pin_style:
                                                                    'image',
                                                            })
                                                        }
                                                    />
                                                    Uploaded image
                                                </label>
                                            </div>
                                        </div>

                                        {role.pin_style === 'icon' && (
                                            <div className="space-y-1 md:col-span-2">
                                                <Label>Icon name</Label>
                                                <Input
                                                    value={role.icon_name ?? ''}
                                                    onChange={(e) =>
                                                        update(role.id, {
                                                            icon_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="e.g. Award, Shield, Globe"
                                                />
                                                <p className="text-[10px] text-muted-foreground">
                                                    Any lucide-react icon name
                                                    (PascalCase). Browse at
                                                    lucide.dev/icons.
                                                </p>
                                                <div className="flex flex-wrap gap-1 pt-1">
                                                    {ICON_SUGGESTIONS.map(
                                                        (n) => (
                                                            <button
                                                                key={n}
                                                                type="button"
                                                                onClick={() =>
                                                                    update(
                                                                        role.id,
                                                                        {
                                                                            icon_name:
                                                                                n,
                                                                        },
                                                                    )
                                                                }
                                                                className="rounded border border-border px-2 py-0.5 text-[11px] hover:bg-accent"
                                                            >
                                                                {n}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {role.pin_style === 'image' && (
                                            <div className="space-y-2 md:col-span-2">
                                                <Label>Icon image</Label>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    {previewImg && (
                                                        <img
                                                            src={previewImg}
                                                            alt=""
                                                            className="h-16 w-16 rounded-full border border-border object-cover"
                                                        />
                                                    )}
                                                    <input
                                                        ref={(el) => {
                                                            fileInputs.current[
                                                                role.id
                                                            ] = el
                                                        }}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const f =
                                                                e.target
                                                                    .files?.[0]
                                                            if (!f) return
                                                            setPendingFiles(
                                                                (p) => ({
                                                                    ...p,
                                                                    [role.id]: f,
                                                                }),
                                                            )
                                                            update(role.id, {
                                                                pin_style:
                                                                    'image',
                                                            })
                                                        }}
                                                        className="text-sm"
                                                    />
                                                    {role.icon_image && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                clearImage(role)
                                                            }
                                                            disabled={
                                                                savingId ===
                                                                role.id
                                                            }
                                                        >
                                                            Remove image
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-muted-foreground">
                                                    PNG/JPG/SVG up to 2 MB. Use
                                                    a square image (transparent
                                                    PNG works best). Click
                                                    "Save" to upload.
                                                </p>
                                            </div>
                                        )}

                                        <div className="md:col-span-2">
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    checked={role.is_active}
                                                    onCheckedChange={(v) =>
                                                        update(role.id, {
                                                            is_active: !!v,
                                                        })
                                                    }
                                                />
                                                Active (show on About page)
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
