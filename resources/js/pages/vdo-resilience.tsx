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
    document: string | null
    document_url: string | null
    caption: string | null
    bullets: string[] | null
    order: number
    is_active: boolean
    size_scale?: number
    offset_x?: number
    offset_y?: number
}

interface VdoResilienceProps {
    items?: ResilienceItem[]
}

function CarouselArrowButton({
    direction,
    onClick,
    disabled = false,
}: {
    direction: 'prev' | 'next'
    onClick: () => void
    disabled?: boolean
}) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
    return (
        <button
            type="button"
            aria-label={direction === 'prev' ? 'Previous' : 'Next'}
            onClick={onClick}
            disabled={disabled}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow transition-colors hover:bg-[rgb(189,191,193)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
            <Icon className="h-5 w-5" />
        </button>
    )
}

function useHorizontalScroll() {
    const ref = useRef<HTMLDivElement>(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(false)

    const recalc = () => {
        const el = ref.current
        if (!el) return
        const maxScroll = el.scrollWidth - el.clientWidth
        setCanPrev(el.scrollLeft > 1)
        setCanNext(el.scrollLeft < maxScroll - 1)
    }

    useEffect(() => {
        const el = ref.current
        if (!el) return
        recalc()
        el.addEventListener('scroll', recalc, { passive: true })
        const ro = new ResizeObserver(recalc)
        ro.observe(el)
        for (const child of Array.from(el.children)) ro.observe(child)
        return () => {
            el.removeEventListener('scroll', recalc)
            ro.disconnect()
        }
    }, [])

    const scrollBy = (direction: 'prev' | 'next') => {
        const el = ref.current
        if (!el) return
        const firstChild = el.firstElementChild as HTMLElement | null
        if (!firstChild) {
            el.scrollBy({
                left: direction === 'next' ? el.clientWidth : -el.clientWidth,
                behavior: 'smooth',
            })
            return
        }
        const second = firstChild.nextElementSibling as HTMLElement | null
        const itemWidth = firstChild.getBoundingClientRect().width
        const gap = second
            ? second.getBoundingClientRect().left -
              firstChild.getBoundingClientRect().right
            : 8
        const step = itemWidth + Math.max(gap, 0)
        const maxScroll = el.scrollWidth - el.clientWidth
        const target =
            direction === 'next'
                ? Math.min(el.scrollLeft + step, maxScroll)
                : Math.max(el.scrollLeft - step, 0)
        el.scrollTo({ left: target, behavior: 'smooth' })
    }

    return {
        ref,
        onPrev: () => scrollBy('prev'),
        onNext: () => scrollBy('next'),
        canPrev,
        canNext,
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

            {/* Annual Organization Resilience Publication + booklets */}
            {capacities.length > 0 && (
                <section className="bg-[rgb(245,245,245)] py-8">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2
                            id="our-capacity"
                            className="mb-6 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                        >
                            Annual Organization Resilience Publication:
                        </h2>
                        <div className="flex items-center gap-3 md:gap-4">
                            <CarouselArrowButton
                                direction="prev"
                                onClick={capacity.onPrev}
                                disabled={!capacity.canPrev}
                            />
                            <div
                                ref={capacity.ref}
                                className="flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            >
                                {capacities.map((c) => {
                                    const imgUrl = c.image_url ?? ''
                                    const docUrl = c.document_url ?? ''
                                    const openUrl = docUrl || imgUrl
                                    const downloadUrl = docUrl || imgUrl
                                    const label =
                                        c.title ?? 'resilience publication'
                                    const scalePct = c.size_scale ?? 100
                                    const ox = c.offset_x ?? 0
                                    const oy = c.offset_y ?? 0
                                    const cardInner = (
                                        <div
                                            className="mx-auto transition-all duration-200"
                                            style={{
                                                width: `${scalePct}%`,
                                                transform: `translate(${ox}px, ${oy}px)`,
                                            }}
                                        >
                                            <CapacitySvg url={imgUrl} />
                                        </div>
                                    )
                                    return (
                                        <div
                                            key={c.id}
                                            className="flex w-[80%] flex-none snap-start flex-col items-center sm:w-[calc(50%-4px)] md:w-[calc(33.333%-6px)]"
                                        >
                                            {imgUrl && (
                                                openUrl ? (
                                                    <a
                                                        href={encodeURI(openUrl)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Open ${label}`}
                                                        className="block w-full cursor-pointer"
                                                    >
                                                        {cardInner}
                                                    </a>
                                                ) : (
                                                    cardInner
                                                )
                                            )}
                                            {downloadUrl && (
                                                <a
                                                    href={encodeURI(downloadUrl)}
                                                    download
                                                    aria-label={`Download ${label}`}
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
                                disabled={!capacity.canNext}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Policies grid */}
            {policies.length > 0 && (
                <section className="bg-[rgb(245,245,245)] py-8">
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
                                    {p.image_url && (
                                        <img
                                            src={encodeURI(p.image_url)}
                                            alt=""
                                            className="mb-4 h-10 w-10 object-contain"
                                            draggable={false}
                                        />
                                    )}
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
                <section className="bg-[rgb(245,245,245)] py-8">
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
                <section className="bg-[rgb(245,245,245)] py-8 pb-14">
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
