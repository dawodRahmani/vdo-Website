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

// Pin locations for major cities (percentage-based positioning based on SVG viewBox 1000x762)
const cityPins = [
    {
        id: 'kabul',
        name: 'Kabul',
        region: 'Central Region',
        description: 'Head Office',
        stats: '150,000+ beneficiaries',
        x: 59.2, // SVG cx=591.7 / 1000
        y: 44.6, // SVG cy=339.5 / 762
        pinColor: '#23369C',
        dotColor: '#E74C3C',
    },
    {
        id: 'mazar',
        name: 'Mazar-e-Sharif',
        region: 'Northern Region',
        description: 'Regional Office',
        stats: '120,000+ beneficiaries',
        x: 45.8, // SVG cx=458.3 / 1000 (Balkh province)
        y: 22.2, // SVG cy=169.1 / 762
        pinColor: '#FF6B35',
        dotColor: '#FF6B35',
    },
    {
        id: 'jalalabad',
        name: 'Jalalabad',
        region: 'Eastern Region',
        description: 'Regional Office',
        stats: '85,000+ beneficiaries',
        x: 67.5, // SVG cx=675.4 / 1000 (Nangarhar province)
        y: 48.1, // SVG cy=366.7 / 762
        pinColor: '#E74C3C',
        dotColor: '#2ECC71',
    },
    {
        id: 'herat',
        name: 'Herat',
        region: 'Western Region',
        description: 'Regional Office',
        stats: '95,000+ beneficiaries',
        x: 13.7, // SVG cx=136.6 / 1000
        y: 47.1, // SVG cy=359.1 / 762
        pinColor: '#E74C3C',
        dotColor: '#2ECC71',
    },
    {
        id: 'kandahar',
        name: 'Kandahar',
        region: 'Southern Region',
        description: 'Regional Office',
        stats: '50,000+ beneficiaries',
        x: 36.5, // SVG cx=364.8 / 1000
        y: 79.1, // SVG cy=602.4 / 762
        pinColor: '#E74C3C',
        dotColor: '#F1C40F',
    },
    {
        id: 'faryab',
        name: 'Faryab',
        region: 'North-Western Region',
        description: 'Field Office',
        stats: '40,000+ beneficiaries',
        x: 30.8, // SVG cx=307.6 / 1000
        y: 32.3, // SVG cy=245.8 / 762
        pinColor: '#9B59B6',
        dotColor: '#9B59B6',
    },
]

// Colors for unmapped provinces (brand palette)
const unmappedColors = ['#00B7EC', '#23369C', '#BDBFC1']

// Mapping of province codes to region slugs
const provinceToRegion: Record<string, string> = {
    // North Eastern Region
    AFBDS: 'north-eastern', // Badakhshan

    // Northern Region
    AFTAK: 'northern', // Takhar
    AFKDZ: 'northern', // Kunduz
    AFBAL: 'northern', // Balkh
    AFSMN: 'northern', // Samangan
    AFSAR: 'northern', // Sar-e Pol

    // Western Region
    AFHRH: 'western', // Herat
    AFBDG: 'western', // Badghis
    AFGHR: 'western', // Ghor
    AFFYB: 'western', // Faryab
    AFJOW: 'western', // Jawzjan

    // Central Region
    AFKBL: 'central', // Kabul
    AFKAP: 'central', // Kapisa
    AFPRW: 'central', // Parwan
    AFPAN: 'central', // Panjshir
    AFWDM: 'central', // Wardak
    AFLOG: 'central', // Logar

    // Eastern Region
    AFNGR: 'eastern', // Nangarhar
    AFKNT: 'eastern', // Kunar
    AFLAG: 'eastern', // Laghman
    AFNRH: 'eastern', // Nuristan

    // Central Highland Region
    AFBMN: 'central-highland', // Bamyan
    AFDGH: 'central-highland', // Daikundi

    // South Eastern Region
    AFPAK: 'south-eastern', // Paktia
    AFPKI: 'south-eastern', // Paktika
    AFKST: 'south-eastern', // Khost
    AFGHZ: 'south-eastern', // Ghazni

    // Southern Region
    AFKHD: 'southern', // Kandahar
    AFHMD: 'southern', // Helmand
    AFNMR: 'southern', // Nimroz
    AFZBL: 'southern', // Zabul
    AFRGH: 'southern', // Uruzgan
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

                    if (region) {
                        // Apply region color
                        path.setAttribute('fill', region.color)
                        path.setAttribute('stroke', '#ffffff')
                        path.setAttribute('stroke-width', '0.8')
                        path.setAttribute(
                            'class',
                            'transition-all duration-300 cursor-pointer opacity-90 hover:opacity-100',
                        )
                        path.setAttribute('data-region-slug', regionSlug)
                        path.setAttribute('data-province-name', provinceName || '')

                        // Add hover effects
                        path.addEventListener('mouseenter', (e) => {
                            setHoveredRegion(regionSlug)
                            setTooltipContent({
                                name: region.name,
                                description: region.description,
                            })

                            // Get cursor position
                            const event = e as MouseEvent
                            setTooltipPosition({ x: event.clientX, y: event.clientY })

                            // Highlight all provinces in the same region
                            paths.forEach((p) => {
                                if (p.getAttribute('data-region-slug') === regionSlug) {
                                    p.setAttribute('class', 'transition-all duration-300 cursor-pointer opacity-100 drop-shadow-lg')
                                }
                            })
                        })

                        path.addEventListener('mouseleave', () => {
                            setHoveredRegion(null)
                            setTooltipContent(null)

                            // Reset all provinces
                            paths.forEach((p) => {
                                const slug = p.getAttribute('data-region-slug')
                                if (slug) {
                                    p.setAttribute('class', 'transition-all duration-300 cursor-pointer opacity-90 hover:opacity-100')
                                }
                            })
                        })

                        path.addEventListener('mousemove', (e) => {
                            const event = e as MouseEvent
                            setTooltipPosition({ x: event.clientX, y: event.clientY })
                        })
                    } else {
                        // Province not mapped to any region - use brand colors
                        const color = unmappedColors[unmappedIndex % unmappedColors.length]
                        unmappedIndex++
                        path.setAttribute('fill', color)
                        path.setAttribute('stroke', '#ffffff')
                        path.setAttribute('stroke-width', '0.8')
                        path.setAttribute('class', 'transition-all duration-300 opacity-70 hover:opacity-85')
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
                                    width="28"
                                    height="36"
                                    viewBox="0 0 24 32"
                                    className="drop-shadow-lg transition-transform group-hover:scale-125 group-hover:-translate-y-1"
                                >
                                    {/* Pin body */}
                                    <path
                                        d="M12 0C5.373 0 0 5.373 0 12c0 7.5 12 20 12 20s12-12.5 12-20c0-6.627-5.373-12-12-12z"
                                        fill={pin.pinColor}
                                    />
                                    {/* Inner dot */}
                                    <circle
                                        cx="12"
                                        cy="11"
                                        r="5"
                                        fill={pin.dotColor}
                                    />
                                </svg>
                                {/* Detailed Tooltip on hover */}
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-100 min-w-[180px] pointer-events-none z-50">
                                    <div className="text-center">
                                        <h4 className="font-bold text-sm text-[#23369C] mb-1">
                                            {pin.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {pin.region}
                                        </p>
                                        <div className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2" style={{ backgroundColor: `${pin.pinColor}20`, color: pin.pinColor }}>
                                            {pin.description}
                                        </div>
                                        <p className="text-xs font-semibold text-[#00B7EC]">
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
