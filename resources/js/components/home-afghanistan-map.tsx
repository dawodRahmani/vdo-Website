import { useEffect, useRef, useState } from 'react'
import { router } from '@inertiajs/react'

const SVG_URL = '/svg/Home Page/07.svg'

const REGION_FILL_CLASSES = [
    'fil5',
    'fil6',
    'fil7',
    'fil8',
    'fil9',
    'fil10',
    'fil11',
    'fil12',
]

const REGION_BY_FILL: Record<string, { name: string; href: string }> = {
    fil5: { name: 'Region (red)', href: '/where-we-work' },
    fil6: { name: 'Region (navy)', href: '/where-we-work' },
    fil7: { name: 'Region (green)', href: '/where-we-work' },
    fil8: { name: 'Region (yellow)', href: '/where-we-work' },
    fil9: { name: 'Region (dark green)', href: '/where-we-work' },
    fil10: { name: 'Region (brown)', href: '/where-we-work' },
    fil11: { name: 'Region (purple)', href: '/where-we-work' },
    fil12: { name: 'Region (orange)', href: '/where-we-work' },
}

export default function HomeAfghanistanMap() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [svgHtml, setSvgHtml] = useState<string>('')
    const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        fetch(SVG_URL)
            .then((r) => r.text())
            .then((text) => {
                if (!cancelled) setSvgHtml(text)
            })
        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        const root = wrapperRef.current
        if (!root || !svgHtml) return

        const svg = root.querySelector('svg')
        if (!svg) return

        svg.setAttribute('width', '100%')
        svg.setAttribute('height', '100%')
        svg.style.maxWidth = '100%'
        svg.style.height = 'auto'

        const handleEnter = (event: Event) => {
            const target = event.currentTarget as SVGElement
            const fillClass = REGION_FILL_CLASSES.find((c) =>
                target.classList.contains(c),
            )
            if (!fillClass) return
            const region = REGION_BY_FILL[fillClass]
            if (region) setHoveredLabel(region.name)
        }
        const handleLeave = () => setHoveredLabel(null)
        const handleClick = (event: Event) => {
            const target = event.currentTarget as SVGElement
            const fillClass = REGION_FILL_CLASSES.find((c) =>
                target.classList.contains(c),
            )
            if (!fillClass) return
            const region = REGION_BY_FILL[fillClass]
            if (region?.href) router.visit(region.href)
        }

        const interactive: Element[] = []
        REGION_FILL_CLASSES.forEach((fillClass) => {
            svg.querySelectorAll(`.${fillClass}`).forEach((el) => {
                interactive.push(el)
                ;(el as SVGElement).style.cursor = 'pointer'
                ;(el as SVGElement).style.transition =
                    'filter 0.18s ease, opacity 0.18s ease'
                el.addEventListener('mouseenter', handleEnter)
                el.addEventListener('mouseleave', handleLeave)
                el.addEventListener('click', handleClick)
            })
        })

        return () => {
            interactive.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter)
                el.removeEventListener('mouseleave', handleLeave)
                el.removeEventListener('click', handleClick)
            })
        }
    }, [svgHtml])

    return (
        <div className="home-afghanistan-map relative w-full max-w-[520px]">
            <style>{`
                .home-afghanistan-map svg .${REGION_FILL_CLASSES.join(':hover, .home-afghanistan-map svg .')}:hover {
                    filter: brightness(1.12);
                }
            `}</style>
            <div
                ref={wrapperRef}
                aria-label="Afghanistan regions map"
                className="w-full"
                dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
            {hoveredLabel && (
                <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-[rgb(62,64,149)] shadow-sm ring-1 ring-black/5">
                    {hoveredLabel}
                </div>
            )}
        </div>
    )
}
