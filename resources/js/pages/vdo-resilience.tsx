import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function CapacitySvg({ url }: { url: string }) {
    const [html, setHtml] = useState('')
    const isSvg = url.toLowerCase().endsWith('.svg')

    useEffect(() => {
        if (!isSvg) return
        let cancelled = false
        fetch(encodeURI(url))
            .then((r) => r.text())
            .then((text) => {
                if (cancelled) return
                const baseDir = url.substring(0, url.lastIndexOf('/'))
                const baseDirEncoded = encodeURI(baseDir)
                const fixed = text.replace(
                    /xlink:href="([^"]+)"/g,
                    (_, raw: string) => {
                        if (raw.startsWith('#') || /^https?:\/\//.test(raw)) {
                            return `xlink:href="${raw}"`
                        }
                        const normalized = raw.replace(/\\/g, '/')
                        const absolute = `${baseDirEncoded}/${normalized
                            .split('/')
                            .map((p) => encodeURIComponent(p))
                            .join('/')}`
                        return `xlink:href="${absolute}"`
                    },
                )
                setHtml(fixed)
            })
        return () => {
            cancelled = true
        }
    }, [url, isSvg])

    if (!isSvg) {
        return (
            <img
                src={encodeURI(url)}
                alt=""
                className="h-auto w-full"
                draggable={false}
            />
        )
    }

    return (
        <div
            className="[&_svg]:h-auto [&_svg]:w-full"
            style={{ mixBlendMode: 'multiply' }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

const photos = [
    { src: '/Header and Gallary Photos/08.jpg', alt: 'Organizational capacity' },
    { src: '/Header and Gallary Photos/15.jpg', alt: 'Team collaboration' },
    { src: '/Header and Gallary Photos/21.jpg', alt: 'Field operations' },
]

interface ResilienceItem {
    id: number
    section:
        | 'capacity'
        | 'policy'
        | 'programmatic_approach'
        | 'collective_resilience'
    title: string | null
    body: string | null
    image: string | null
    image_url: string | null
    caption: string | null
    bullets: string[] | null
    order: number
    is_active: boolean
}

interface VdoResilienceProps {
    items?: ResilienceItem[]
}

function CarouselArrowButton({
    direction,
    onClick,
}: {
    direction: 'prev' | 'next'
    onClick: () => void
}) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
    return (
        <button
            type="button"
            aria-label={direction === 'prev' ? 'Previous' : 'Next'}
            onClick={onClick}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow hover:bg-gray-100"
        >
            <Icon className="h-5 w-5" />
        </button>
    )
}

function useHorizontalScroll() {
    const ref = useRef<HTMLDivElement>(null)
    const scrollBy = (direction: 'prev' | 'next') => {
        const el = ref.current
        if (!el) return
        const firstChild = el.firstElementChild as HTMLElement | null
        const step = firstChild
            ? firstChild.getBoundingClientRect().width + 24
            : el.clientWidth
        el.scrollBy({
            left: direction === 'next' ? step : -step,
            behavior: 'smooth',
        })
    }
    return {
        ref,
        onPrev: () => scrollBy('prev'),
        onNext: () => scrollBy('next'),
    }
}

export default function VdoResilience({ items = [] }: VdoResilienceProps) {
    const capacity = useHorizontalScroll()

    const capacities = items.filter((i) => i.section === 'capacity')
    const policies = items.filter((i) => i.section === 'policy')
    const programmatic = items.find((i) => i.section === 'programmatic_approach')
    const collective = items.find((i) => i.section === 'collective_resilience')

    const collectiveBodyParagraphs = (collective?.body ?? '')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    const [collectiveIntro, ...collectiveRest] = collectiveBodyParagraphs

    return (
        <SiteLayout title="VDO's Resilience">
            <PhotoStrip photos={photos} />

            {/* Our Capacity + booklets */}
            {capacities.length > 0 && (
                <section className="bg-gray-100 py-8">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2
                            id="our-capacity"
                            className="mb-6 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                        >
                            Our Capacity:
                        </h2>
                        <div className="flex items-center gap-3 md:gap-4">
                            <CarouselArrowButton
                                direction="prev"
                                onClick={capacity.onPrev}
                            />
                            <div
                                ref={capacity.ref}
                                className="flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            >
                                {capacities.map((c) => {
                                    const url = c.image_url ?? ''
                                    return (
                                        <div
                                            key={c.id}
                                            className="flex w-[90%] flex-none snap-start flex-col items-center sm:w-[calc(50%-4px)] md:w-[calc(33.333%-6px)] lg:w-[calc(25%-6px)]"
                                        >
                                            {url && <CapacitySvg url={url} />}
                                            {url && (
                                                <a
                                                    href={encodeURI(url)}
                                                    download
                                                    aria-label={`Download ${c.title ?? 'capacity booklet'}`}
                                                    className="mt-3 flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-[rgb(0,175,239)]"
                                                >
                                                    <Download
                                                        className="h-6 w-6"
                                                        strokeWidth={1.5}
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <CarouselArrowButton
                                direction="next"
                                onClick={capacity.onNext}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Policies grid */}
            {policies.length > 0 && (
                <section className="bg-gray-100 py-8">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2
                            id="policies"
                            className="mb-6 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                        >
                            Policies:
                        </h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                            {policies.map((p) => (
                                <div
                                    key={p.id}
                                    className="md:border-l-2 md:border-dotted md:border-[rgb(0,175,239)]/70 md:pl-6 md:[&:nth-child(2n+1)]:border-l-0 md:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:border-l-2 lg:[&:nth-child(2n+1)]:pl-6 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(0,175,239)] shadow-sm">
                                        {p.image_url && (
                                            <img
                                                src={encodeURI(p.image_url)}
                                                alt=""
                                                className="h-8 w-8"
                                                draggable={false}
                                            />
                                        )}
                                    </div>
                                    <h3 className="text-sm font-bold text-[rgb(62,64,149)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 text-justify text-xs leading-relaxed text-gray-700 md:text-sm">
                                        {p.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Programmatic Approach */}
            {programmatic && (
                <section className="bg-gray-100 py-8">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2
                            id="programmatic-approach"
                            className="mb-4 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                        >
                            {programmatic.title}:
                        </h2>
                        <div className="space-y-4 whitespace-pre-line text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            <p>{programmatic.body}</p>
                        </div>

                        {programmatic.image_url && (
                            <div className="mt-10">
                                <div className="mx-auto flex w-full items-center justify-center">
                                    <img
                                        src={encodeURI(programmatic.image_url)}
                                        alt={programmatic.title ?? ''}
                                        className="h-auto w-full"
                                        draggable={false}
                                    />
                                </div>
                                {programmatic.caption && (
                                    <p className="mt-6 text-sm italic text-gray-600">
                                        {programmatic.caption}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Contributing to Collective Resilience */}
            {collective && (
                <section className="bg-gray-100 py-8 pb-14">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2
                            id="collective-resilience"
                            className="mb-4 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                        >
                            {collective.title}
                        </h2>
                        {collectiveIntro && (
                            <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                {collectiveIntro}
                            </p>
                        )}
                        {collective.bullets && collective.bullets.length > 0 && (
                            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                {collective.bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        )}
                        {collectiveRest.length > 0 && (
                            <div className="mt-8 space-y-4 text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                {collectiveRest.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </SiteLayout>
    )
}
