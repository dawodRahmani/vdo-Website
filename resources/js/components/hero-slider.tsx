import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides, type HeroSlide } from '@/data/heroSlides'

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
        )
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const slide = heroSlides[currentSlide]

    return (
        <section className="relative h-[75vh] overflow-hidden">
            {/* Slides */}
            {heroSlides.map((slideItem, index) => (
                <div
                    key={slideItem.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${slideItem.image})`,
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex h-full items-center">
                        <div className="container mx-auto px-6 md:px-8 lg:px-12">
                            <div className="max-w-3xl md:ml-8 lg:ml-16">
                                <HeroSlideContent slide={slideItem} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:left-6 md:p-3 lg:left-8"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:right-6 md:p-3 lg:right-8"
                aria-label="Next slide"
            >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-8 md:gap-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all md:h-3 ${
                            index === currentSlide
                                ? 'w-8 bg-white md:w-12'
                                : 'w-2 bg-white/50 hover:bg-white/75 md:w-3'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}

// Separate component for slide content (for better organization)
function HeroSlideContent({ slide }: { slide: HeroSlide }) {
    return (
        <div className="animate-fade-in">
            {/* Content wrapper with transparent background */}
            <div className="inline-block rounded-lg bg-black/40 px-4 py-4 backdrop-blur-sm md:px-10 md:py-6 lg:px-12 lg:py-8">
                {/* Title */}
                <h1
                    className="mb-3 text-xl font-bold leading-tight text-white md:mb-4 md:text-3xl lg:text-4xl xl:text-5xl"
                    style={{
                        textShadow:
                            '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.6)',
                    }}
                >
                    {slide.title.prefix}{' '}
                    <span className="font-extrabold text-white">
                        {slide.title.highlight}
                    </span>{' '}
                    {slide.title.suffix}
                </h1>

                {/* Subtitle with highlighted parts */}
                <p
                    className="text-base font-semibold leading-relaxed text-white md:text-xl lg:text-2xl"
                    style={{
                        textShadow:
                            '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.6)',
                    }}
                >
                    {slide.subtitle.parts.map((part, index) => (
                        <span
                            key={index}
                            className={
                                part.highlight
                                    ? 'font-extrabold text-white'
                                    : 'font-normal text-white'
                            }
                        >
                            {part.text}{' '}
                        </span>
                    ))}
                </p>
            </div>

            {/* CTA Button (if exists) */}
            {slide.cta && (
                <a
                    href={slide.cta.link}
                    className="mt-6 inline-block rounded-md bg-[#00B7EC] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#00B7EC]/90 hover:shadow-lg md:mt-8 md:px-8 md:py-4 md:text-lg"
                >
                    {slide.cta.text}
                </a>
            )}
        </div>
    )
}
