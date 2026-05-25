import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router } from '@inertiajs/react'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

interface SettingsPayload {
    logo_url: string | null
    logo_path: string | null
    logo_height: number | null
    logo_offset_x: number | null
    logo_offset_y: number | null
}

const DEFAULT_LOGO_HEIGHT = 72
const MIN_LOGO_HEIGHT = 24
const MAX_LOGO_HEIGHT = 200

const MIN_OFFSET_X = -200
const MAX_OFFSET_X = 400
const MIN_OFFSET_Y = -100
const MAX_OFFSET_Y = 200

interface PageProps {
    settings: SettingsPayload
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Header & Footer', href: '#' },
    { title: 'Header', href: '/admin/site/header' },
]

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

export default function AdminSiteHeader({ settings }: PageProps) {
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [clearLogo, setClearLogo] = useState(false)
    const [saving, setSaving] = useState(false)
    const [logoHeight, setLogoHeight] = useState<number>(
        settings.logo_height ?? DEFAULT_LOGO_HEIGHT,
    )
    const [offsetX, setOffsetX] = useState<number>(settings.logo_offset_x ?? 0)
    const [offsetY, setOffsetY] = useState<number>(settings.logo_offset_y ?? 0)
    const fileInput = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        if (logoPreview) URL.revokeObjectURL(logoPreview)
        setLogoFile(file)
        setLogoPreview(file ? URL.createObjectURL(file) : null)
        if (file) setClearLogo(false)
    }

    const handleClearLogo = () => {
        if (logoPreview) URL.revokeObjectURL(logoPreview)
        setLogoFile(null)
        setLogoPreview(null)
        setClearLogo(true)
        if (fileInput.current) fileInput.current.value = ''
    }

    const handleSave = () => {
        setSaving(true)
        const payload: Record<string, string | File | number> = {
            clear_logo: clearLogo ? 1 : 0,
            logo_height: logoHeight,
            logo_offset_x: offsetX,
            logo_offset_y: offsetY,
        }
        if (logoFile) payload.logo_file = logoFile

        router.post('/admin/site/header', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setLogoFile(null)
                if (logoPreview) URL.revokeObjectURL(logoPreview)
                setLogoPreview(null)
                setClearLogo(false)
                if (fileInput.current) fileInput.current.value = ''
            },
        })
    }

    const handleResetOffsets = () => {
        setOffsetX(0)
        setOffsetY(0)
    }

    const shownLogo = logoPreview ?? (clearLogo ? null : settings.logo_url)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Header" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Site Header</h1>
                    <p className="text-muted-foreground text-sm">
                        Edit the logo and its position in the site header.
                    </p>
                </div>

                <div className="border-border bg-card max-w-3xl space-y-6 rounded-xl border p-5 shadow-sm">
                    <div className="space-y-2">
                        <Label>Logo</Label>
                        <div className="flex items-start gap-4">
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border bg-gray-50">
                                {shownLogo ? (
                                    <img
                                        src={shownLogo}
                                        alt="Logo"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        (no logo)
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    ref={fileInput}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => fileInput.current?.click()}
                                    >
                                        <Upload className="mr-1 h-3.5 w-3.5" />
                                        {logoFile ? 'Change' : 'Upload'}
                                    </Button>
                                    {(settings.logo_url || logoFile) && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleClearLogo}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                {logoFile && (
                                    <p className="text-muted-foreground truncate text-xs">
                                        {logoFile.name}
                                    </p>
                                )}
                                <p className="text-muted-foreground text-xs">
                                    PNG, JPG, or SVG. Max 4 MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Logo height */}
                    <div className="space-y-2">
                        <Label htmlFor="logo-height">Logo height (px)</Label>
                        <div className="flex items-center gap-4">
                            <input
                                id="logo-height-range"
                                type="range"
                                min={MIN_LOGO_HEIGHT}
                                max={MAX_LOGO_HEIGHT}
                                value={logoHeight}
                                onChange={(e) =>
                                    setLogoHeight(parseInt(e.target.value))
                                }
                                className="h-2 flex-1 cursor-pointer"
                            />
                            <Input
                                id="logo-height"
                                type="number"
                                min={MIN_LOGO_HEIGHT}
                                max={MAX_LOGO_HEIGHT}
                                value={logoHeight}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value)
                                    if (Number.isNaN(v)) {
                                        setLogoHeight(DEFAULT_LOGO_HEIGHT)
                                    } else {
                                        setLogoHeight(
                                            clamp(
                                                v,
                                                MIN_LOGO_HEIGHT,
                                                MAX_LOGO_HEIGHT,
                                            ),
                                        )
                                    }
                                }}
                                className="w-24"
                            />
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Between {MIN_LOGO_HEIGHT} and {MAX_LOGO_HEIGHT} px.
                            Default {DEFAULT_LOGO_HEIGHT}.
                        </p>
                    </div>

                    {/* Logo X offset */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="logo-offset-x">
                                Horizontal offset (px)
                            </Label>
                            <button
                                type="button"
                                onClick={handleResetOffsets}
                                className="text-muted-foreground text-xs underline hover:text-foreground"
                            >
                                Reset position
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                id="logo-offset-x-range"
                                type="range"
                                min={MIN_OFFSET_X}
                                max={MAX_OFFSET_X}
                                value={offsetX}
                                onChange={(e) =>
                                    setOffsetX(parseInt(e.target.value))
                                }
                                className="h-2 flex-1 cursor-pointer"
                            />
                            <Input
                                id="logo-offset-x"
                                type="number"
                                min={MIN_OFFSET_X}
                                max={MAX_OFFSET_X}
                                value={offsetX}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value)
                                    setOffsetX(
                                        Number.isNaN(v)
                                            ? 0
                                            : clamp(
                                                  v,
                                                  MIN_OFFSET_X,
                                                  MAX_OFFSET_X,
                                              ),
                                    )
                                }}
                                className="w-24"
                            />
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Negative moves left, positive moves right.
                        </p>
                    </div>

                    {/* Logo Y offset */}
                    <div className="space-y-2">
                        <Label htmlFor="logo-offset-y">
                            Vertical offset (px)
                        </Label>
                        <div className="flex items-center gap-4">
                            <input
                                id="logo-offset-y-range"
                                type="range"
                                min={MIN_OFFSET_Y}
                                max={MAX_OFFSET_Y}
                                value={offsetY}
                                onChange={(e) =>
                                    setOffsetY(parseInt(e.target.value))
                                }
                                className="h-2 flex-1 cursor-pointer"
                            />
                            <Input
                                id="logo-offset-y"
                                type="number"
                                min={MIN_OFFSET_Y}
                                max={MAX_OFFSET_Y}
                                value={offsetY}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value)
                                    setOffsetY(
                                        Number.isNaN(v)
                                            ? 0
                                            : clamp(
                                                  v,
                                                  MIN_OFFSET_Y,
                                                  MAX_OFFSET_Y,
                                              ),
                                    )
                                }}
                                className="w-24"
                            />
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Negative moves up, positive moves down.
                        </p>
                    </div>

                    {/* Live header preview */}
                    <div className="space-y-2">
                        <Label>Live preview</Label>
                        <div className="overflow-hidden rounded-md border bg-[rgb(245,245,245)]">
                            <div
                                className="relative mx-auto w-full px-4 py-3"
                                style={{
                                    minHeight: `${Math.max(80, logoHeight + 24)}px`,
                                }}
                            >
                                <div className="flex items-start gap-4">
                                    {shownLogo && (
                                        <div
                                            className="relative z-10 flex-shrink-0"
                                            style={{
                                                width: `${Math.round(logoHeight * 1.4)}px`,
                                                height: `${logoHeight}px`,
                                            }}
                                        >
                                            <img
                                                src={shownLogo}
                                                alt="Logo preview"
                                                style={{
                                                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                                                    height: `${logoHeight}px`,
                                                    width: 'auto',
                                                }}
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="mt-2 flex h-10 items-center justify-end gap-3 bg-[rgb(62,64,149)] px-3 text-xs text-white">
                                            <span>About Us</span>
                                            <span>Strategic Priorities</span>
                                            <span>Where We Work</span>
                                            <span>Media</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-xs">
                            This preview mirrors the public header layout. The
                            logo sits in a slot to the left of the navigation;
                            the offsets nudge it within that area.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving…' : 'Save changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
