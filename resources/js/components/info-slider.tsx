import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface InfoSlide {
    id: number
    image: string
    title: string
}

const infoSlides: InfoSlide[] = [
    {
        id: 1,
        image: '/images/1.jpg',
        title: 'Our Beneficiary',
    },
    {
        id: 2,
        image: '/images/2.jpg',
        title: 'Our Strength',
    },
    {
        id: 3,
        image: '/images/3.jpg',
        title: 'Our Impact',
    },
    {
        id: 4,
        image: '/images/map.webp',
        title: 'Our Reach',
    },
]

export default function InfoSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % infoSlides.length)
    }

    const prevSlide = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + infoSlides.length) % infoSlides.length,
        )
    }

    // Calculate which slides to show based on screen size
    const getSlidesToShow = () => {
        return infoSlides.slice(currentIndex, currentIndex + 4)
    }

    return (
        <div className="relative w-full overflow-hidden">
            {/* Desktop view - show all 4 slides */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-4">
                {infoSlides.map((slide) => (
                    <div
                        key={slide.id}
                        className="group relative h-64 overflow-hidden rounded-lg"
                    >
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />

                        {/* Title */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-center text-xl font-bold text-white drop-shadow-lg md:text-2xl">
                                {slide.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile view - slider with navigation */}
            <div className="relative md:hidden">
                <div className="relative h-64 overflow-hidden rounded-lg">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {infoSlides.map((slide) => (
                            <div
                                key={slide.id}
                                className="relative min-w-full"
                                >
                                {/* Background Image */}
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="h-64 w-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40" />

                                {/* Title */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-center text-xl font-bold text-white drop-shadow-lg">
                                        {slide.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#23369C] transition-colors hover:bg-white"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#23369C] transition-colors hover:bg-white"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots Navigation */}
                <div className="mt-4 flex justify-center gap-2">
                    {infoSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                                index === currentIndex
                                    ? 'w-8 bg-[#23369C]'
                                    : 'w-2 bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
