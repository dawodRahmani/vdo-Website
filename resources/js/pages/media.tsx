import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import DocumentReaderModal from '@/components/document-reader-modal'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Download, Play } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface HeroPhoto {
    src?: string
    url?: string
    alt?: string | null
}

const defaultPhotos: HeroPhoto[] = [
    { src: '/Header and Gallary Photos/05.jpg', alt: 'Food distribution' },
    { src: '/Header and Gallary Photos/11.jpg', alt: 'Community outreach' },
    { src: '/Header and Gallary Photos/23.jpg', alt: 'Health services' },
]

function photoSrc(p: HeroPhoto): string {
    return p.src ?? p.url ?? ''
}

function youtubeId(url: string): string | null {
    const m =
        url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
        ) || url.match(/^([\w-]{11})$/)
    return m ? m[1] : null
}

function youtubeEmbedUrl(url: string): string | null {
    const id = youtubeId(url)
    return id ? `https://www.youtube.com/embed/${id}` : null
}

function youtubeThumbnailUrl(url: string): string | null {
    const id = youtubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}

interface MediaItem {
    id: number
    kind: 'documentary' | 'photo' | 'publication'
    title: string | null
    image: string | null
    image_url: string | null
    video_url: string | null
    video_path: string | null
    video_file_url: string | null
    document_path: string | null
    document_url: string | null
    order: number
    is_active: boolean
    size_scale?: number
}

interface MediaProps {
    heroPhotos?: HeroPhoto[]
    items?: MediaItem[]
}

const photoMosaicPositions = [
    'col-start-1 row-start-1 row-span-2',
    'col-start-2 col-span-2 row-start-1',
    'col-start-2 row-start-2',
    'col-start-3 row-start-2 row-span-2',
    'col-start-1 row-start-3',
    'col-start-2 row-start-3',
]
const PHOTOS_PER_PAGE = 6

function PhotoTile({
    src,
    delay,
    position,
    fromX,
    fromY,
    animKey,
    tileRef,
}: {
    src: string
    delay: number
    position: string
    fromX: number
    fromY: number
    animKey: string | number
    tileRef?: (el: HTMLDivElement | null) => void
}) {
    return (
        <div
            ref={tileRef}
            className={`group relative overflow-hidden rounded-md bg-gray-200 shadow-sm ${position}`}
        >
            <div
                key={animKey}
                className="photo-fly-from-icon absolute inset-0"
                style={
                    {
                        '--from-x': `${fromX}px`,
                        '--from-y': `${fromY}px`,
                        animationDelay: `${delay}ms`,
                    } as React.CSSProperties
                }
            >
                <img
                    src={encodeURI(src)}
                    alt="VDO photograph"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
    )
}

function VideoCard({
    item,
    onPlay,
}: {
    item: MediaItem
    onPlay: (item: MediaItem) => void
}) {
    const title = item.title ?? ''
    const youtubeThumb = item.video_url ? youtubeThumbnailUrl(item.video_url) : null
    const thumb = item.image_url ?? youtubeThumb
    const hasPlayable = !!item.video_file_url || !!item.video_url

    return (
        <button
            type="button"
            onClick={() => hasPlayable && onPlay(item)}
            disabled={!hasPlayable}
            aria-label={hasPlayable ? `Play ${title || 'video'}` : 'No video available'}
            className="group block w-full text-left disabled:cursor-not-allowed"
        >
            <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200/70 shadow-sm">
                {thumb ? (
                    <img
                        src={thumb}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : null}
                <div
                    className={`absolute inset-0 transition-opacity ${
                        thumb
                            ? 'bg-black/30 opacity-100 group-hover:bg-black/40'
                            : ''
                    }`}
                />
                <span
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-md text-white shadow-md transition-transform ${
                        hasPlayable
                            ? 'bg-red-600 group-hover:scale-105'
                            : 'bg-red-600/60'
                    }`}
                >
                    <Play className="h-7 w-7 fill-current" />
                </span>
            </div>
            <p
                className={`mt-3 text-sm font-medium ${
                    hasPlayable
                        ? 'text-[rgb(0,175,239)] group-hover:underline'
                        : 'text-gray-400'
                }`}
            >
                {title}
            </p>
        </button>
    )
}

function VideoPlayerModal({
    item,
    onClose,
}: {
    item: MediaItem | null
    onClose: () => void
}) {
    if (!item) return null

    const embed = item.video_url ? youtubeEmbedUrl(item.video_url) : null
    const fileUrl = item.video_file_url
    const fallbackUrl = item.video_url

    return (
        <Dialog open={!!item} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-3xl overflow-hidden p-0 sm:max-w-4xl">
                <DialogHeader className="sr-only">
                    <DialogTitle>{item.title ?? 'Video'}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full bg-black">
                    {fileUrl ? (
                        <video
                            key={fileUrl}
                            src={fileUrl}
                            controls
                            autoPlay
                            className="h-full w-full"
                            poster={item.image_url ?? undefined}
                        >
                            Sorry, your browser doesn't support embedded video.
                        </video>
                    ) : embed ? (
                        <iframe
                            key={embed}
                            src={`${embed}?autoplay=1`}
                            title={item.title ?? 'Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            className="h-full w-full"
                        />
                    ) : fallbackUrl ? (
                        <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-white">
                            <a
                                href={fallbackUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Open video in a new tab
                            </a>
                        </div>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
                            No video source.
                        </div>
                    )}
                </div>
                {item.title && (
                    <div className="px-5 py-3 text-sm font-medium text-[rgb(62,64,149)]">
                        {item.title}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
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
        const styles = getComputedStyle(el)
        const gap =
            parseFloat(styles.columnGap || styles.gap || '0') || 0
        const step = firstChild
            ? firstChild.getBoundingClientRect().width + gap
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

export default function Media({ heroPhotos, items = [] }: MediaProps) {
    const docs = useHorizontalScroll()
    const pubs = useHorizontalScroll()
    const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null)
    const [activeDocument, setActiveDocument] = useState<MediaItem | null>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const tileRefs = useRef<(HTMLDivElement | null)[]>([])
    const [tileOffsets, setTileOffsets] = useState<
        { x: number; y: number }[]
    >([])

    const photos =
        heroPhotos && heroPhotos.length > 0
            ? heroPhotos.map((p) => ({ src: photoSrc(p), alt: p.alt ?? '' }))
            : defaultPhotos.map((p) => ({
                  src: photoSrc(p),
                  alt: p.alt ?? '',
              }))

    const documentaries = items.filter((i) => i.kind === 'documentary')
    const galleryPhotos = items
        .filter((i) => i.kind === 'photo' && i.image_url)
        .map((i) => i.image_url as string)
    const publications = items.filter((i) => i.kind === 'publication')

    const totalPhotoPages = Math.max(
        1,
        Math.ceil(galleryPhotos.length / PHOTOS_PER_PAGE),
    )
    const [photoPage, setPhotoPage] = useState(0)
    const [photoDirection, setPhotoDirection] = useState<'next' | 'prev'>('next')
    const visiblePhotos = galleryPhotos.slice(
        photoPage * PHOTOS_PER_PAGE,
        photoPage * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE,
    )

    const goToPrevPhotoPage = () => {
        setPhotoDirection('prev')
        setPhotoPage((p) => (p === 0 ? totalPhotoPages - 1 : p - 1))
    }
    const goToNextPhotoPage = () => {
        setPhotoDirection('next')
        setPhotoPage((p) => (p + 1) % totalPhotoPages)
    }

    const nextPhotoPage = (photoPage + 1) % totalPhotoPages
    const nextVisiblePhotos = galleryPhotos.slice(
        nextPhotoPage * PHOTOS_PER_PAGE,
        nextPhotoPage * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE,
    )

    useLayoutEffect(() => {
        const measure = () => {
            const icon = iconRef.current
            if (!icon) return
            const iconRect = icon.getBoundingClientRect()
            const iconCenter = {
                x: iconRect.left + iconRect.width / 2,
                y: iconRect.top + iconRect.height / 2,
            }
            const next = tileRefs.current.map((tile) => {
                if (!tile) return { x: 0, y: 0 }
                const r = tile.getBoundingClientRect()
                return {
                    x: iconCenter.x - (r.left + r.width / 2),
                    y: iconCenter.y - (r.top + r.height / 2),
                }
            })
            setTileOffsets(next)
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [visiblePhotos.length])

    return (
        <SiteLayout title="Media">
            <PhotoStrip photos={photos} />

            {/* Documentaries */}
            <section id="documentaries" className="bg-[rgb(245,245,245)] py-8 scroll-mt-24">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                        Documentaries:
                    </h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <CarouselArrowButton direction="prev" onClick={docs.onPrev} />
                        <div
                            ref={docs.ref}
                            className="flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {documentaries.map((d) => (
                                <div
                                    key={d.id}
                                    className="w-full flex-none snap-start md:w-[calc(50%-12px)]"
                                >
                                    <VideoCard item={d} onPlay={setActiveVideo} />
                                </div>
                            ))}
                        </div>
                        <CarouselArrowButton direction="next" onClick={docs.onNext} />
                    </div>
                </div>
            </section>

            {/* Photographs */}
            <section
                id="photographs"
                className="relative bg-[rgb(245,245,245)] py-8 scroll-mt-24"
                style={{
                    backgroundImage: 'url(/svg/Map.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-[rgb(245,245,245)]/70" />
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                        Program Snapshots:
                    </h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <CarouselArrowButton
                            direction="prev"
                            onClick={goToPrevPhotoPage}
                        />
                        <div className="grid flex-1 grid-cols-3 gap-3 auto-rows-[100px] md:gap-4 md:auto-rows-[150px] lg:auto-rows-[175px]">
                            {visiblePhotos.map((src, i) => {
                                const offset = tileOffsets[i] ?? {
                                    x: 600,
                                    y: 0,
                                }
                                return (
                                    <PhotoTile
                                        key={i}
                                        src={src}
                                        delay={i * 120}
                                        position={photoMosaicPositions[i]}
                                        fromX={offset.x}
                                        fromY={offset.y}
                                        animKey={`${photoPage}-${photoDirection}-${i}`}
                                        tileRef={(el) => {
                                            tileRefs.current[i] = el
                                        }}
                                    />
                                )
                            })}
                        </div>
                        <CarouselArrowButton
                            direction="next"
                            onClick={goToNextPhotoPage}
                        />
                        <div
                            ref={iconRef}
                            aria-hidden="true"
                            title="Next page preview"
                            className="ml-2 hidden aspect-[3/2] h-12 flex-shrink-0 select-none opacity-90 md:block lg:h-14"
                        >
                            {nextVisiblePhotos.length > 0 ? (
                                <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-[2px] overflow-hidden rounded-sm bg-white/40 p-[2px] shadow-sm ring-1 ring-black/10 transition-transform hover:scale-105">
                                    {nextVisiblePhotos.map((src, i) => (
                                        <img
                                            key={`${nextPhotoPage}-${i}`}
                                            src={encodeURI(src)}
                                            alt=""
                                            aria-hidden="true"
                                            className="h-full w-full rounded-[1px] object-cover"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <img
                                    src="/svg/Missed%20Icons/Media/01.svg"
                                    alt=""
                                    aria-hidden="true"
                                    className="h-full w-auto"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications */}
            <section id="publications" className="bg-[rgb(245,245,245)] pb-14 pt-8 scroll-mt-24">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                        Publications:
                    </h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <CarouselArrowButton direction="prev" onClick={pubs.onPrev} />
                        <div
                            ref={pubs.ref}
                            className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {publications.map((pub) => {
                                const cover = pub.image_url ?? ''
                                const doc = pub.document_url
                                const scale = (pub.size_scale ?? 100) / 100
                                const canOpen = !!doc
                                return (
                                    <div
                                        key={pub.id}
                                        className="flex w-[calc(25%-12px)] flex-none snap-start flex-col items-center"
                                        style={{
                                            transform: `scale(${scale})`,
                                            transformOrigin: 'top center',
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                canOpen && setActiveDocument(pub)
                                            }
                                            disabled={!canOpen}
                                            aria-label={
                                                canOpen
                                                    ? `Read ${pub.title ?? 'publication'}`
                                                    : pub.title ?? ''
                                            }
                                            className="group w-full rounded-sm border border-dashed border-gray-400 bg-white p-2 text-left shadow-sm transition-shadow hover:shadow-md disabled:cursor-default"
                                        >
                                            <div className="aspect-[3/4] w-full overflow-hidden bg-white">
                                                {cover && (
                                                    <img
                                                        src={encodeURI(cover)}
                                                        alt={pub.title ?? ''}
                                                        className="h-full w-full object-contain transition-transform duration-500 group-enabled:group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>
                                        </button>
                                        {doc ? (
                                            <a
                                                href={doc}
                                                download
                                                aria-label={`Download ${pub.title ?? ''}`}
                                                className="mt-3 flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-[rgb(0,175,239)]"
                                            >
                                                <Download
                                                    className="h-6 w-6"
                                                    strokeWidth={1.5}
                                                />
                                            </a>
                                        ) : cover ? (
                                            <a
                                                href={encodeURI(cover)}
                                                download
                                                aria-label={`Download cover for ${pub.title ?? ''}`}
                                                className="mt-3 flex h-8 w-8 items-center justify-center rounded text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                                title="No document uploaded — downloads cover image"
                                            >
                                                <Download
                                                    className="h-6 w-6"
                                                    strokeWidth={1.5}
                                                />
                                            </a>
                                        ) : null}
                                    </div>
                                )
                            })}
                        </div>
                        <CarouselArrowButton direction="next" onClick={pubs.onNext} />
                    </div>
                </div>
            </section>

            <VideoPlayerModal
                item={activeVideo}
                onClose={() => setActiveVideo(null)}
            />
            <DocumentReaderModal
                open={!!activeDocument}
                onClose={() => setActiveDocument(null)}
                title={activeDocument?.title ?? null}
                documentUrl={activeDocument?.document_url ?? null}
            />
        </SiteLayout>
    )
}
