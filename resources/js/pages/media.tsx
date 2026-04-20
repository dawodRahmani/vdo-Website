import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { ChevronLeft, ChevronRight, FileText, Play } from 'lucide-react'

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
]

const galleryPhotos = [
    '/Header and Gallary Photos/G1.jpg',
    '/Header and Gallary Photos/G2.jpg',
    '/Header and Gallary Photos/G3.jpg',
    '/Header and Gallary Photos/G10.jpg',
    '/Header and Gallary Photos/G11.jpg',
    '/Header and Gallary Photos/G12.jpg',
    '/Header and Gallary Photos/02.jpg',
]

const publications = [
    { title: 'Project Final Report', year: '' },
    { title: 'Inside Book', year: '' },
    { title: 'Field Report', year: '' },
    { title: 'Annual Booklet', year: '2023' },
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

function CarouselArrows() {
    return (
        <>
            <button
                type="button"
                aria-label="Previous"
                className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow hover:bg-gray-100 md:-left-4"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                type="button"
                aria-label="Next"
                className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow hover:bg-gray-100 md:-right-4"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </>
    )
}

export default function Media() {
    return (
        <SiteLayout title="Media">
            <PhotoStrip photos={photos} />

            {/* Documentaries */}
            <section id="documentaries" className="bg-gray-100 py-8 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-xl font-semibold text-[#23369C] md:text-2xl">
                        Documentaries:
                    </h2>
                    <div className="relative">
                        <CarouselArrows />
                        <div className="grid gap-6 md:grid-cols-2">
                            {documentaries.map((d) => (
                                <VideoCard key={d.title} title={d.title} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Photographs */}
            <section id="photographs" className="bg-gray-100 py-8 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-xl font-semibold text-[#23369C] md:text-2xl">
                        Photographs:
                    </h2>
                    <div className="relative">
                        <CarouselArrows />
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {galleryPhotos.slice(0, 7).map((src, i) => (
                                <div
                                    key={src}
                                    className={`relative overflow-hidden rounded-md bg-gray-200 ${
                                        i === 0 || i === 1
                                            ? 'row-span-2 aspect-[3/4]'
                                            : 'aspect-[4/3]'
                                    }`}
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
                    </div>
                </div>
            </section>

            {/* Publications */}
            <section id="publications" className="bg-gray-100 pb-14 pt-8 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-xl font-semibold text-[#23369C] md:text-2xl">
                        Publications:
                    </h2>
                    <div className="relative">
                        <CarouselArrows />
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {publications.map((pub) => (
                                <div
                                    key={pub.title}
                                    className="flex aspect-[3/4] flex-col items-center justify-between rounded-md border border-gray-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex flex-1 flex-col items-center justify-center">
                                        <FileText className="mb-3 h-12 w-12 text-[rgb(0,175,239)]" />
                                        <h3 className="text-sm font-bold text-[#23369C]">
                                            {pub.title}
                                        </h3>
                                        {pub.year && (
                                            <p className="mt-1 text-xs font-semibold text-[rgb(0,175,239)]">
                                                {pub.year}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Download"
                                        className="mt-2 h-5 w-5 border border-gray-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}
