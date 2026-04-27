import { useEffect, useRef, useState } from 'react'
import { MapPin, Region } from '@/types'
import { cn } from '@/lib/utils'

interface AfghanistanMapProps {
    regions?: Region[]
    pins?: MapPin[]
    className?: string
}

// Fallback colors for any province that isn't mapped to a region
const unmappedColors = ['rgb(0,175,239)', 'rgb(62,64,149)', 'rgb(189,191,193)']

// Mapping of province codes (as they appear in af.svg) to region slugs
const provinceToRegion: Record<string, string> = {
    AFBDS: 'north-eastern',
    AFTAK: 'northern',
    AFKDZ: 'northern',
    AFBAL: 'northern',
    AFSAM: 'northern',
    AFSAR: 'northern',
    AFBGL: 'northern',
    AFHER: 'western',
    AFBDG: 'western',
    AFGHO: 'western',
    AFFYB: 'western',
    AFJOW: 'western',
    AFKAB: 'central',
    AFKAP: 'central',
    AFPAR: 'central',
    AFPAN: 'central',
    AFWAR: 'central',
    AFLOG: 'central',
    AFNAN: 'eastern',
    AFKNR: 'eastern',
    AFLAG: 'eastern',
    AFNUR: 'eastern',
    AFBAM: 'central-highland',
    AFDAY: 'central-highland',
    AFPKA: 'south-eastern',
    AFPIA: 'south-eastern',
    AFKHO: 'south-eastern',
    AFGHA: 'south-eastern',
    AFKAN: 'southern',
    AFHEL: 'southern',
    AFNIM: 'southern',
    AFZAB: 'southern',
    AFURU: 'southern',
    AFFRA: 'southern',
}

export default function AfghanistanMap({
    regions,
    pins,
    className,
}: AfghanistanMapProps) {
    const svgContainerRef = useRef<HTMLDivElement>(null)
    const [tooltipContent, setTooltipContent] = useState<{
        name: string
        description: string
    } | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
    const [isLoading, setIsLoading] = useState(true)

    const regionMap = (regions || []).reduce(
        (acc, region) => {
            acc[region.slug] = region
            return acc
        },
        {} as Record<string, Region>,
    )

    const labeledRegions = (regions || []).filter(
        (r) => r.label && r.label.trim().length > 0,
    )

    useEffect(() => {
        const container = svgContainerRef.current
        if (!container) return

        let isMounted = true

        fetch('/images/af.svg')
            .then((response) => response.text())
            .then((svgText) => {
                if (!isMounted) return

                const parser = new DOMParser()
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
                const svgElement = svgDoc.querySelector('svg')
                if (!svgElement) return

                svgElement.removeAttribute('width')
                svgElement.removeAttribute('height')

                const viewBox =
                    svgElement.getAttribute('viewbox') ||
                    svgElement.getAttribute('viewBox')
                if (viewBox) svgElement.setAttribute('viewBox', viewBox)

                svgElement.setAttribute('class', 'w-full h-auto max-w-full')
                svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet')
                svgElement.style.display = 'block'

                const paths = svgElement.querySelectorAll('path[id^="AF"]')
                let unmappedIndex = 0

                const baseClass = 'transition-all duration-300 cursor-pointer'
                const hoverClass =
                    'transition-all duration-300 cursor-pointer drop-shadow-lg'

                paths.forEach((path) => {
                    const provinceCode = path.getAttribute('id')
                    if (!provinceCode) return

                    const regionSlug = provinceToRegion[provinceCode]
                    const region = regionSlug ? regionMap[regionSlug] : null

                    path.setAttribute('stroke', '#ffffff')
                    path.setAttribute('stroke-width', '0.8')

                    if (region) {
                        path.setAttribute('fill', region.color)
                        path.setAttribute('class', baseClass)
                        path.setAttribute('data-region-slug', regionSlug)

                        path.addEventListener('mouseenter', (e) => {
                            setTooltipContent({
                                name: region.name,
                                description: region.description,
                            })
                            const event = e as MouseEvent
                            setTooltipPosition({
                                x: event.clientX,
                                y: event.clientY,
                            })
                            paths.forEach((p) => {
                                if (
                                    p.getAttribute('data-region-slug') ===
                                    regionSlug
                                ) {
                                    p.setAttribute('class', hoverClass)
                                }
                            })
                        })

                        path.addEventListener('mouseleave', () => {
                            setTooltipContent(null)
                            paths.forEach((p) => {
                                if (p.getAttribute('data-region-slug')) {
                                    p.setAttribute('class', baseClass)
                                }
                            })
                        })

                        path.addEventListener('mousemove', (e) => {
                            const event = e as MouseEvent
                            setTooltipPosition({
                                x: event.clientX,
                                y: event.clientY,
                            })
                        })
                    } else {
                        const color =
                            unmappedColors[
                                unmappedIndex % unmappedColors.length
                            ]
                        unmappedIndex++
                        path.setAttribute('fill', color)
                        path.setAttribute('class', baseClass)
                    }
                })

                if (container.firstChild) {
                    container.replaceChild(svgElement, container.firstChild)
                } else {
                    container.appendChild(svgElement)
                }

                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error loading Afghanistan SVG:', error)
                setIsLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [regions])

    return (
        <div className={cn('w-full', className)}>
            {isLoading && (
                <div className="flex min-h-[400px] items-center justify-center text-gray-500">
                    Loading map...
                </div>
            )}
            <div className="relative">
                <div
                    ref={svgContainerRef}
                    className={cn(
                        'relative w-full overflow-visible',
                        isLoading && 'hidden',
                    )}
                />

                {/* Region name labels */}
                {!isLoading && (
                    <div className="pointer-events-none absolute inset-0">
                        {labeledRegions.map((region) => {
                            const text = region.label || ''
                            return (
                                <div
                                    key={region.id}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[9px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] md:text-[10px]"
                                    style={{
                                        left: `${region.label_x}%`,
                                        top: `${region.label_y}%`,
                                    }}
                                >
                                    {region.label_two_line
                                        ? text.split('\n').map((line) => (
                                              <div key={line}>{line}</div>
                                          ))
                                        : text}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* City pin markers */}
                {!isLoading && (
                    <div className="pointer-events-none absolute inset-0">
                        {(pins || []).map((pin) => (
                            <div
                                key={pin.id}
                                className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-full transform cursor-pointer"
                                style={{
                                    left: `${pin.x}%`,
                                    top: `${pin.y}%`,
                                }}
                            >
                                <svg
                                    width="22"
                                    height="29"
                                    viewBox="0 0 24 32"
                                    className="drop-shadow-lg transition-transform group-hover:-translate-y-0.5 group-hover:scale-110"
                                >
                                    <path
                                        d="M12 0C5.373 0 0 5.373 0 12c0 7.5 12 20 12 20s12-12.5 12-20c0-6.627-5.373-12-12-12z"
                                        fill={pin.color}
                                    />
                                    <circle
                                        cx="12"
                                        cy="11"
                                        r="4"
                                        fill="#ffffff"
                                        fillOpacity="0.35"
                                    />
                                </svg>
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 min-w-[180px] -translate-x-1/2 rounded-lg border border-gray-100 bg-white px-4 py-3 opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100">
                                    <div className="text-center">
                                        <h4 className="mb-1 text-sm font-bold text-[rgb(62,64,149)]">
                                            {pin.name}
                                        </h4>
                                        <p className="mb-2 text-xs text-gray-500">
                                            {pin.region_label}
                                        </p>
                                        {pin.description && (
                                            <div className="mb-2 inline-block rounded-full bg-[rgb(62,64,149)]/10 px-2 py-0.5 text-xs font-medium text-[rgb(62,64,149)]">
                                                {pin.description}
                                            </div>
                                        )}
                                        {pin.stats && (
                                            <p className="text-xs font-semibold text-[rgb(0,175,239)]">
                                                {pin.stats}
                                            </p>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {tooltipContent && (
                <div
                    className="pointer-events-none fixed z-50 max-w-xs rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg"
                    style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y + 10}px`,
                    }}
                >
                    <h4 className="mb-1 text-sm font-bold">
                        {tooltipContent.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                        {tooltipContent.description}
                    </p>
                </div>
            )}
        </div>
    )
}
