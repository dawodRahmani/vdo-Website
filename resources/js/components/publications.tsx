import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'

const publications = [
    {
        id: 1,
        title: 'Project Final Report',
        image: '/images/1.jpg',
        link: '/publications/project-final-report',
    },
    {
        id: 2,
        title: 'Guide Book 2023',
        image: '/images/2.jpg',
        link: '/publications/guide-book-2023',
    },
    {
        id: 3,
        title: 'Annual Report',
        image: '/images/3.jpg',
        link: '/publications/annual-report',
    },
    {
        id: 4,
        title: 'Annual Booklet',
        image: '/images/1.jpg',
        link: '/publications/annual-booklet',
    },
    {
        id: 5,
        title: 'Impact Assessment',
        image: '/images/2.jpg',
        link: '/publications/impact-assessment',
    },
    {
        id: 6,
        title: 'Community Guidelines',
        image: '/images/3.jpg',
        link: '/publications/community-guidelines',
    },
    {
        id: 7,
        title: 'Strategic Plan 2024',
        image: '/images/1.jpg',
        link: '/publications/strategic-plan-2024',
    },
    {
        id: 8,
        title: 'Quarterly Newsletter',
        image: '/images/2.jpg',
        link: '/publications/quarterly-newsletter',
    },
]

export default function Publications() {
    const sliderRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 300
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
            setTimeout(checkScroll, 300)
        }
    }

    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 flex flex-col items-center gap-6">
                    <h2 className="text-2xl font-bold text-[#23369C] md:text-3xl">
                        Publications
                    </h2>

                    {/* Navigation and View All */}
                    <div className="flex items-center gap-4">
                        <div className="hidden items-center gap-2 sm:flex">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#00B7EC] hover:text-[#00B7EC] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#00B7EC] hover:text-[#00B7EC] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                        <a
                            href="/publications"
                            className="rounded-lg bg-[#23369C] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#23369C]/90"
                        >
                            View All
                        </a>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    <div
                        ref={sliderRef}
                        onScroll={checkScroll}
                        className="scrollbar-hide flex gap-4 overflow-x-auto pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {publications.map((publication) => (
                            <div
                                key={publication.id}
                                className="group flex-shrink-0"
                                style={{ width: 'calc((100% - 64px) / 5)' }}
                            >
                                <div className="relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    {/* Image */}
                                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                                        <img
                                            src={publication.image}
                                            alt={publication.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Icon */}
                                        <div className="absolute right-3 top-3 rounded-lg bg-[#00B7EC] p-1.5">
                                            <FileText className="h-4 w-4 text-white" />
                                        </div>

                                        {/* Title and Read More */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="mb-2 text-sm font-bold text-white line-clamp-2">
                                                {publication.title}
                                            </h3>
                                            <a
                                                href={publication.link}
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00B7EC] transition-colors hover:text-white"
                                            >
                                                Read More
                                                <ChevronRight className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile scroll indicator */}
                    <div className="mt-4 flex justify-center gap-1 sm:hidden">
                        {publications.map((_, index) => (
                            <div
                                key={index}
                                className="h-1.5 w-1.5 rounded-full bg-gray-300"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Hide scrollbar styles */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
