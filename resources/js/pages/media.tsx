import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { ChevronLeft, ChevronRight, Download, Play } from 'lucide-react'
import { useRef, useState } from 'react'

const photos = [
    { src: '/Header and Gallary Photos/05.jpg', alt: 'Food distribution' },
    { src: '/Header and Gallary Photos/11.jpg', alt: 'Community outreach' },
    { src: '/Header and Gallary Photos/23.jpg', alt: 'Health services' },
]

const documentaries = [
    {
        title: 'Integrated Health Service Program for Improved Community Well-...',
    },
    {
        title: 'Strengthening Food Security Through Food Distribution Pro...',
    },
    {
        title: 'Empowering Rural Women Through Vocational Training Initiat...',
    },
    {
        title: 'Clean Water Access for Remote Villages in Northern Afghan...',
    },
    {
        title: 'Education for All: Building Schools in Underserved Comm...',
    },
    {
        title: 'Emergency Response and Disaster Relief Operations Doc...',
    },
]

const galleryPhotos = [
    '/Header and Gallary Photos/G1.jpg',
    '/Header and Gallary Photos/G2.jpg',
    '/Header and Gallary Photos/G3.jpg',
    '/Header and Gallary Photos/G4.jpg',
    '/Header and Gallary Photos/G5.jpg',
    '/Header and Gallary Photos/G6.jpg',
    '/Header and Gallary Photos/G7.jpg',
    '/Header and Gallary Photos/G8.jpg',
    '/Header and Gallary Photos/G9.jpg',
    '/Header and Gallary Photos/G10.jpg',
    '/Header and Gallary Photos/G11.jpg',
    '/Header and Gallary Photos/G12.jpg',
]

const photoMosaicPositions = [
    'col-start-1 row-start-1 row-span-2',
    'col-start-2 col-span-2 row-start-1',
    'col-start-2 row-start-2',
    'col-start-3 row-start-2 row-span-2',
    'col-start-1 row-start-3',
    'col-start-2 row-start-3',
]
const PHOTOS_PER_PAGE = 6

const publications = [
    {
        title: 'Project Final Report',
        cover: '/Header and Gallary Photos/P1.jpg',
    },
    {
        title: 'Guide Book',
        cover: '/Header and Gallary Photos/P2.jpg',
    },
    {
        title: 'Project Conclusion Report',
        cover: '/Header and Gallary Photos/P3.jpg',
    },
    {
        title: 'Annual Booklet 2023',
        cover: '/Header and Gallary Photos/P4.jpg',
    },
    {
        title: 'Health Program Report',
        cover: '/Header and Gallary Photos/P1.jpg',
    },
    {
        title: 'Education Impact Study',
        cover: '/Header and Gallary Photos/P2.jpg',
    },
    {
        title: 'Annual Booklet 2022',
        cover: '/Header and Gallary Photos/P3.jpg',
    },
    {
        title: 'Field Operations Brief',
        cover: '/Header and Gallary Photos/P4.jpg',
    },
    {
        title: 'Annual Booklet 2021',
        cover: '/Header and Gallary Photos/P1.jpg',
    },
    {
        title: 'Community Outreach Report',
        cover: '/Header and Gallary Photos/P2.jpg',
    },
]

function VideoCard({ title }: { title: string }) {
    return (
        <div>
            <div className="flex aspect-video items-center justify-center rounded-lg border border-gray-300 bg-gray-200/70 shadow-sm">
                <button
                    type="button"
                    aria-label="Play video"
                    className="flex h-16 w-16 items-center justify-center rounded-md bg-red-600 text-white shadow-md transition-transform hover:scale-105"
                >
                    <Play className="h-7 w-7 fill-current" />
                </button>
            </div>
            <p className="mt-3 text-sm font-medium text-[rgb(0,175,239)] hover:underline">
                {title}
            </p>
        </div>
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

export default function Media() {
    const docs = useHorizontalScroll()
    const pubs = useHorizontalScroll()
    const totalPhotoPages = Math.ceil(galleryPhotos.length / PHOTOS_PER_PAGE)
    const [photoPage, setPhotoPage] = useState(0)
    const visiblePhotos = galleryPhotos.slice(
        photoPage * PHOTOS_PER_PAGE,
        photoPage * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE,
    )

    return (
        <SiteLayout title="Media">
            <PhotoStrip photos={photos} />

            {/* Documentaries */}
            <section id="documentaries" className="bg-gray-100 py-8 scroll-mt-24">
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
                                    key={d.title}
                                    className="w-full flex-none snap-start md:w-[calc(50%-12px)]"
                                >
                                    <VideoCard title={d.title} />
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
                className="relative bg-gray-100 py-8 scroll-mt-24"
                style={{
                    backgroundImage: 'url(/svg/Map.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-gray-100/70" />
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                        Photographs:
                    </h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <CarouselArrowButton
                            direction="prev"
                            onClick={() =>
                                setPhotoPage((p) =>
                                    p === 0 ? totalPhotoPages - 1 : p - 1,
                                )
                            }
                        />
                        <div
                            key={photoPage}
                            className="grid flex-1 grid-cols-3 grid-rows-3 gap-3 auto-rows-[120px] animate-in fade-in duration-500 md:gap-4 md:auto-rows-[180px] lg:auto-rows-[210px]"
                        >
                            {visiblePhotos.map((src, i) => (
                                <div
                                    key={`${photoPage}-${src}`}
                                    className={`relative overflow-hidden rounded-md bg-gray-200 shadow-sm ${photoMosaicPositions[i]}`}
                                >
                                    <img
                                        src={encodeURI(src)}
                                        alt="VDO photograph"
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        <CarouselArrowButton
                            direction="next"
                            onClick={() =>
                                setPhotoPage((p) => (p + 1) % totalPhotoPages)
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Publications */}
            <section id="publications" className="bg-gray-100 pb-14 pt-8 scroll-mt-24">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                        Publications:
                    </h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <CarouselArrowButton direction="prev" onClick={pubs.onPrev} />
                        <div
                            ref={pubs.ref}
                            className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
                        >
                            {publications.map((pub) => (
                                <div
                                    key={pub.title}
                                    className="flex w-[55%] flex-none snap-start flex-col items-center sm:w-[32%] md:w-[calc(20%-19.2px)] lg:w-[calc(16.6666%-20px)]"
                                >
                                    <div className="w-full rounded-sm border border-dashed border-gray-400 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
                                        <div className="aspect-[3/4] w-full overflow-hidden bg-white">
                                            <img
                                                src={encodeURI(pub.cover)}
                                                alt={pub.title}
                                                className="h-full w-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                    <a
                                        href={encodeURI(pub.cover)}
                                        download
                                        aria-label={`Download ${pub.title}`}
                                        className="mt-3 flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-[rgb(0,175,239)]"
                                    >
                                        <Download className="h-6 w-6" strokeWidth={1.5} />
                                    </a>
                                </div>
                            ))}
                        </div>
                        <CarouselArrowButton direction="next" onClick={pubs.onNext} />
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}
