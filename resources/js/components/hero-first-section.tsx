import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePage } from '@inertiajs/react'

export interface HeroPhoto {
    src: string
    alt: string
}

export interface HeroSlidePhoto {
    url: string
    alt: string
    path?: string | null
}

export interface HeroSlide {
    id: number
    order: number
    is_active: boolean
    photo: HeroSlidePhoto
}

export interface ImpactStat {
    id?: number
    label: string
    svg_url?: string
    svg?: string
    size_scale?: number
}

const defaultPhotos: HeroPhoto[] = [
    {
        src: '/Header and Gallary Photos/01.jpg',
        alt: 'Health and nutrition program',
    },
    {
        src: '/Header and Gallary Photos/02.jpg',
        alt: 'Agriculture and livelihoods',
    },
    {
        src: '/Header and Gallary Photos/03.jpg',
        alt: 'Education for all',
    },
]

const defaultStats: ImpactStat[] = [
    { svg: '/Home Page/01.svg', label: 'Regions' },
    { svg: '/Home Page/02.svg', label: 'Lives Impact' },
    { svg: '/Home Page/03.svg', label: 'Implemented Projects' },
    { svg: '/Home Page/04.svg', label: 'Active Projects' },
    { svg: '/Home Page/05.svg', label: 'Years of Service' },
]

function statSrc(s: ImpactStat): string {
    return s.svg_url || s.svg || ''
}

const AUTO_ADVANCE_MS = 6000

interface Props {
    heroPhotos?: HeroPhoto[]
    heroSlides?: HeroSlide[]
    impactStats?: ImpactStat[]
}

// Each slide is now a single photo; the carousel cycles between slides.
// Falls back to the static defaults (one per slide) when no DB slides exist.
function buildSlides(
    heroSlides: HeroSlide[] | undefined,
    heroPhotos: HeroPhoto[] | undefined,
): HeroPhoto[] {
    if (heroSlides && heroSlides.length > 0) {
        const fromDb = heroSlides
            .filter((s) => s.is_active !== false)
            .map((s) => ({
                src: s.photo?.url || '',
                alt: s.photo?.alt || '',
            }))
            .filter((p) => p.src)
        if (fromDb.length > 0) return fromDb
    }
    const fallback =
        heroPhotos && heroPhotos.length > 0 && heroPhotos.some((p) => p.src)
            ? heroPhotos.filter((p) => p.src)
            : defaultPhotos
    return fallback
}

export default function HeroFirstSection({
    heroPhotos,
    heroSlides,
    impactStats,
}: Props) {
    const slides = buildSlides(heroSlides, heroPhotos)
    const stats = impactStats && impactStats.length > 0 ? impactStats : defaultStats
    const { heroBackground } = usePage().props as { heroBackground?: string | null }

    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const hasMultiple = slides.length > 1
    const safeIndex = Math.min(index, Math.max(slides.length - 1, 0))
    const current: HeroPhoto | undefined = slides[safeIndex] ?? slides[0]

    const goTo = (next: number) => {
        if (!slides.length) return
        const wrapped = (next + slides.length) % slides.length
        setIndex(wrapped)
    }
    const goPrev = () => goTo(safeIndex - 1)
    const goNext = () => goTo(safeIndex + 1)

    useEffect(() => {
        if (!hasMultiple || paused) return
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length)
        }, AUTO_ADVANCE_MS)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [hasMultiple, paused, slides.length])

    return (
        <section
            className="pb-6 pt-3 md:pb-8"
            style={{ backgroundColor: heroBackground ?? 'rgb(245,245,245)' }}
        >
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                {/* Hero slider — 3-image window, advances one slide at a time */}
                <div
                    className="relative"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div
                        className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-1"
                        key={`window-${safeIndex}`}
                    >
                        {Array.from({ length: Math.min(3, slides.length || 1) }).map(
                            (_, offset) => {
                                const photo =
                                    slides.length > 0
                                        ? slides[(safeIndex + offset) % slides.length]
                                        : null
                                return (
                                    <div
                                        key={`${safeIndex}-${offset}`}
                                        className="hero-strip-fade relative aspect-[16/10] overflow-hidden md:aspect-[16/9]"
                                        style={{ animationDelay: `${offset * 80}ms` }}
                                    >
                                        {photo?.src ? (
                                            <img
                                                src={encodeURI(photo.src)}
                                                alt={photo.alt}
                                                className="h-full w-full object-cover"
                                                loading="eager"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gray-200" />
                                        )}
                                    </div>
                                )
                            },
                        )}
                    </div>

                    {hasMultiple && (
                        <>
                            <button
                                type="button"
                                aria-label="Previous slide"
                                onClick={goPrev}
                                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-700 shadow transition-colors hover:bg-white md:left-3 md:h-10 md:w-10"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next slide"
                                onClick={goNext}
                                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-700 shadow transition-colors hover:bg-white md:right-3 md:h-10 md:w-10"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>

                            <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        aria-label={`Go to slide ${i + 1}`}
                                        onClick={() => goTo(i)}
                                        className={`pointer-events-auto h-1.5 rounded-full transition-all ${
                                            i === safeIndex
                                                ? 'w-6 bg-white shadow'
                                                : 'w-1.5 bg-white/60 hover:bg-white/90'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Key Impact Numbers card */}
                <div className="mt-6 rounded-2xl bg-[rgb(189,191,193)]/50 p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h2 className="mb-5 text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                                Key Impact Numbers:
                            </h2>

                            <ul className="flex flex-nowrap items-center gap-x-3 [--stat-h:3.5rem] sm:gap-x-4 md:gap-x-6 md:[--stat-h:4rem] lg:[--stat-h:5rem]">
                                {stats.map((stat) => {
                                    const scale = (stat.size_scale ?? 100) / 100
                                    return (
                                        <li
                                            key={stat.id ?? stat.label}
                                            className="flex min-w-0 flex-1 flex-col items-center text-center"
                                        >
                                            <img
                                                src={statSrc(stat)}
                                                alt={stat.label}
                                                className="w-auto"
                                                style={{
                                                    height: `calc(var(--stat-h) * ${scale})`,
                                                }}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="flex-shrink-0 lg:pl-6">
                            <a
                                href="/donate"
                                aria-label="Donate"
                                className="group inline-block transition-all duration-200 hover:-translate-y-0.5 hover:drop-shadow-[0_4px_10px_rgba(0,175,239,0.45)]"
                            >
                                <img
                                    src="/svg/Home Page/06.svg"
                                    alt="Donate"
                                    className="h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.04] md:h-8"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes hero-strip-fade-in {
                    from { opacity: 0; transform: scale(1.02); }
                    to { opacity: 1; transform: scale(1); }
                }
                .hero-strip-fade {
                    animation: hero-strip-fade-in 600ms ease-out both;
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-strip-fade { animation: none; }
                }
            `}</style>
        </section>
    )
}
