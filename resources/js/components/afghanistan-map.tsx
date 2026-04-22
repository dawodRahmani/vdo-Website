import { useEffect, useRef, useState } from 'react'
import { Region } from '@/types'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface AfghanistanMapProps {
    regions?: Region[]
    className?: string
}

// Pin locations for major cities (percentage-based, SVG viewBox 1000x762)
const PIN_RED = '#E74C3C'
const PIN_YELLOW = '#F1C40F'

// Region label positions (centroid of region's provinces, % of 1000x762 viewBox)
const regionLabels: { name: string; x: number; y: number; twoLine?: boolean }[] = [
    { name: 'North\nEastern', x: 72, y: 22, twoLine: true },
    { name: 'Northern', x: 52, y: 31 },
    { name: 'Western', x: 24, y: 47 },
    { name: 'Central Highland', x: 43, y: 47 },
    { name: 'Central', x: 59, y: 46 },
    { name: 'Eastern', x: 67, y: 46 },
    { name: 'South\nEastern', x: 57, y: 61, twoLine: true },
    { name: 'Southern', x: 33, y: 73 },
]

const cityPins = [
    {
        id: 'kabul',
        name: 'Kabul',
        region: 'Central Region',
        description: 'Head Office',
        stats: '150,000+ beneficiaries',
        x: 59.2,
        y: 44.6,
        pinColor: PIN_RED,
    },
    {
        id: 'badakhshan',
        name: 'Badakhshan',
        region: 'North Eastern Region',
        description: 'Regional Office',
        stats: '60,000+ beneficiaries',
        x: 69.6, // SVG cx=695.9 / 1000
        y: 21.4, // SVG cy=163.4 / 762
        pinColor: PIN_RED,
    },
    {
        id: 'kunduz',
        name: 'Kunduz',
        region: 'Northern Region',
        description: 'Regional Office',
        stats: '120,000+ beneficiaries',
        x: 56.7, // SVG cx=567.3 / 1000
        y: 21.2, // SVG cy=161.4 / 762
        pinColor: PIN_RED,
    },
    {
        id: 'faryab',
        name: 'Faryab',
        region: 'North Western Region',
        description: 'Field Office',
        stats: '40,000+ beneficiaries',
        x: 30.8,
        y: 32.3,
        pinColor: PIN_RED,
    },
    {
        id: 'jalalabad',
        name: 'Jalalabad',
        region: 'Eastern Region',
        description: 'Regional Office',
        stats: '85,000+ beneficiaries',
        x: 67.5,
        y: 48.1,
        pinColor: PIN_RED,
    },
    {
        id: 'herat',
        name: 'Herat',
        region: 'Western Region',
        description: 'Regional Office',
        stats: '95,000+ beneficiaries',
        x: 13.7,
        y: 47.1,
        pinColor: PIN_RED,
    },
    {
        id: 'kandahar',
        name: 'Kandahar',
        region: 'Southern Region',
        description: 'Regional Office',
        stats: '50,000+ beneficiaries',
        x: 36.5,
        y: 79.1,
        pinColor: PIN_YELLOW,
    },
]

// Colors for unmapped provinces (brand palette)
const unmappedColors = ['rgb(0,175,239)', 'rgb(62,64,149)', 'rgb(189,191,193)']

// Mapping of province codes (as they appear in af.svg) to region slugs
const provinceToRegion: Record<string, string> = {
    // North Eastern Region
    AFBDS: 'north-eastern', // Badakhshan

    // Northern Region
    AFTAK: 'northern', // Takhar
    AFKDZ: 'northern', // Kunduz
    AFBAL: 'northern', // Balkh
    AFSAM: 'northern', // Samangan
    AFSAR: 'northern', // Sar-e Pol
    AFBGL: 'northern', // Baghlan

    // Western Region
    AFHER: 'western', // Herat
    AFBDG: 'western', // Badghis
    AFGHO: 'western', // Ghor
    AFFYB: 'western', // Faryab
    AFJOW: 'western', // Jawzjan

    // Central Region
    AFKAB: 'central', // Kabul
    AFKAP: 'central', // Kapisa
    AFPAR: 'central', // Parwan
    AFPAN: 'central', // Panjshir
    AFWAR: 'central', // Wardak
    AFLOG: 'central', // Logar

    // Eastern Region
    AFNAN: 'eastern', // Nangarhar
    AFKNR: 'eastern', // Kunar
    AFLAG: 'eastern', // Laghman
    AFNUR: 'eastern', // Nuristan

    // Central Highland Region
    AFBAM: 'central-highland', // Bamyan
    AFDAY: 'central-highland', // Daikundi

    // South Eastern Region
    AFPKA: 'south-eastern', // Paktia
    AFPIA: 'south-eastern', // Paktika
    AFKHO: 'south-eastern', // Khost
    AFGHA: 'south-eastern', // Ghazni

    // Southern Region
    AFKAN: 'southern', // Kandahar
    AFHEL: 'southern', // Helmand
    AFNIM: 'southern', // Nimroz
    AFZAB: 'southern', // Zabul
    AFURU: 'southern', // Uruzgan
    AFFRA: 'southern', // Farah
}

export default function AfghanistanMap({
    regions,
    className,
}: AfghanistanMapProps) {
    const svgContainerRef = useRef<HTMLDivElement>(null)
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
    const [tooltipContent, setTooltipContent] = useState<{
        name: string
        description: string
    } | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
    const [isLoading, setIsLoading] = useState(true)

    // Create a map of slug to region for easy lookup
    const regionMap = (regions || []).reduce(
        (acc, region) => {
            acc[region.slug] = region
            return acc
        },
        {} as Record<string, Region>,
    )

    useEffect(() => {
        const container = svgContainerRef.current
        if (!container) return

        let isMounted = true

        // Load the SVG file
        fetch('/images/af.svg')
            .then((response) => response.text())
            .then((svgText) => {
                if (!isMounted) return

                // Parse the SVG
                const parser = new DOMParser()
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
                const svgElement = svgDoc.querySelector('svg')

                if (!svgElement) return

                // Make SVG responsive while preserving aspect ratio
                svgElement.removeAttribute('width')
                svgElement.removeAttribute('height')

                // Ensure viewBox is set (case-sensitive)
                const viewBox = svgElement.getAttribute('viewbox') || svgElement.getAttribute('viewBox')
                if (viewBox) {
                    svgElement.setAttribute('viewBox', viewBox)
                }

                svgElement.setAttribute('class', 'w-full h-auto max-w-full')
                svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet')
                svgElement.style.display = 'block'

                // Find all province paths
                const paths = svgElement.querySelectorAll('path[id^="AF"]')
                let unmappedIndex = 0

                paths.forEach((path) => {
                    const provinceCode = path.getAttribute('id')
                    const provinceName = path.getAttribute('name')

                    if (!provinceCode) return

                    const regionSlug = provinceToRegion[provinceCode]
                    const region = regionSlug ? regionMap[regionSlug] : null

                    const baseClass =
                        'transition-all duration-300 cursor-pointer'
                    const hoverClass =
                        'transition-all duration-300 cursor-pointer drop-shadow-lg'

                    if (region) {
                        path.setAttribute('fill', region.color)
                        path.setAttribute('stroke', '#ffffff')
                        path.setAttribute('stroke-width', '0.8')
                        path.setAttribute('class', baseClass)
                        path.setAttribute('data-region-slug', regionSlug)
                        path.setAttribute('data-province-name', provinceName || '')

                        path.addEventListener('mouseenter', (e) => {
                            setHoveredRegion(regionSlug)
                            setTooltipContent({
                                name: region.name,
                                description: region.description,
                            })
                            const event = e as MouseEvent
                            setTooltipPosition({ x: event.clientX, y: event.clientY })
                            paths.forEach((p) => {
                                if (p.getAttribute('data-region-slug') === regionSlug) {
                                    p.setAttribute('class', hoverClass)
                                }
                            })
                        })

                        path.addEventListener('mouseleave', () => {
                            setHoveredRegion(null)
                            setTooltipContent(null)
                            paths.forEach((p) => {
                                if (p.getAttribute('data-region-slug')) {
                                    p.setAttribute('class', baseClass)
                                }
                            })
                        })

                        path.addEventListener('mousemove', (e) => {
                            const event = e as MouseEvent
                            setTooltipPosition({ x: event.clientX, y: event.clientY })
                        })
                    } else {
                        // Fallback for any unmapped province — still palette-aligned
                        const color = unmappedColors[unmappedIndex % unmappedColors.length]
                        unmappedIndex++
                        path.setAttribute('fill', color)
                        path.setAttribute('stroke', '#ffffff')
                        path.setAttribute('stroke-width', '0.8')
                        path.setAttribute('class', baseClass)
                    }
                })

                // Append SVG (container should be empty since we hide loading separately)
                if (container.firstChild) {
                    container.replaceChild(svgElement, container.firstChild)
                } else {
                    container.appendChild(svgElement)
                }

                // Hide loading message
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error loading Afghanistan SVG:', error)
                setIsLoading(false)
            })

        // Cleanup function
        return () => {
            isMounted = false
        }
    }, [regions])

    return (
        <div className={cn('w-full', className)}>
            {isLoading && (
                <div className="flex items-center justify-center min-h-[400px] text-gray-500">
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
                        {regionLabels.map((label) => (
                            <div
                                key={label.name}
                                className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[9px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] md:text-[10px]"
                                style={{ left: `${label.x}%`, top: `${label.y}%` }}
                            >
                                {label.twoLine
                                    ? label.name.split('\n').map((line) => (
                                          <div key={line}>{line}</div>
                                      ))
                                    : label.name}
                            </div>
                        ))}
                    </div>
                )}

                {/* City Pin Markers */}
                {!isLoading && (
                    <div className="absolute inset-0 pointer-events-none">
                        {cityPins.map((pin) => (
                            <div
                                key={pin.id}
                                className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto cursor-pointer group"
                                style={{
                                    left: `${pin.x}%`,
                                    top: `${pin.y}%`,
                                }}
                            >
                                {/* Pin SVG */}
                                <svg
                                    width="22"
                                    height="29"
                                    viewBox="0 0 24 32"
                                    className="drop-shadow-lg transition-transform group-hover:scale-110 group-hover:-translate-y-0.5"
                                >
                                    <path
                                        d="M12 0C5.373 0 0 5.373 0 12c0 7.5 12 20 12 20s12-12.5 12-20c0-6.627-5.373-12-12-12z"
                                        fill={pin.pinColor}
                                    />
                                    <circle
                                        cx="12"
                                        cy="11"
                                        r="4"
                                        fill="#ffffff"
                                        fillOpacity="0.35"
                                    />
                                </svg>
                                {/* Detailed Tooltip on hover */}
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-100 min-w-[180px] pointer-events-none z-50">
                                    <div className="text-center">
                                        <h4 className="font-bold text-sm text-[rgb(62,64,149)] mb-1">
                                            {pin.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {pin.region}
                                        </p>
                                        <div className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 bg-[rgb(62,64,149)]/10 text-[rgb(62,64,149)]">
                                            {pin.description}
                                        </div>
                                        <p className="text-xs font-semibold text-[rgb(0,175,239)]">
                                            {pin.stats}
                                        </p>
                                    </div>
                                    {/* Tooltip arrow */}
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom tooltip */}
            {tooltipContent && (
                <div
                    className="fixed z-50 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs pointer-events-none"
                    style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y + 10}px`,
                    }}
                >
                    <h4 className="font-bold text-sm mb-1">
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
