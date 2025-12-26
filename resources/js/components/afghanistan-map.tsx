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
    regions: Region[]
    className?: string
}

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
    const regionMap = regions.reduce(
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
                            'transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100',
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
                                p.setAttribute('class', 'transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100')
                            })
                        })

                        path.addEventListener('mousemove', (e) => {
                            const event = e as MouseEvent
                            setTooltipPosition({ x: event.clientX, y: event.clientY })
                        })
                    } else {
                        // Province not mapped to any region - use a default gray color
                        path.setAttribute('fill', '#e0e0e0')
                        path.setAttribute('stroke', '#ffffff')
                        path.setAttribute('stroke-width', '0.8')
                        path.setAttribute('class', 'opacity-50')
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
    }, [regions, regionMap])

    return (
        <div className={cn('w-full', className)}>
            {isLoading && (
                <div className="flex items-center justify-center min-h-[400px] text-gray-500">
                    Loading map...
                </div>
            )}
            <div
                ref={svgContainerRef}
                className={cn(
                    'relative w-full overflow-visible',
                    isLoading && 'hidden',
                )}
            />

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
