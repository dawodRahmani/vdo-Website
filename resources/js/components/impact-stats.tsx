import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
    separator?: string
}

function CountUp({
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    separator = ',',
}: CountUpProps) {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true)
                }
            },
            { threshold: 0.3 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [hasStarted])

    useEffect(() => {
        if (!hasStarted) return

        let startTime: number | null = null
        const startValue = 0

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = Math.floor(
                startValue + (end - startValue) * easeOutQuart
            )

            setCount(currentCount)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [hasStarted, end, duration])

    // Format number with separator
    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    }

    return (
        <span ref={ref}>
            {prefix}
            {formatNumber(count)}
            {suffix}
        </span>
    )
}

interface ImpactItem {
    id: number
    title: string
    value: number
    suffix?: string
    prefix?: string
    icon: React.ReactNode
}

export default function ImpactStats() {
    const impactData: ImpactItem[] = [
        {
            id: 1,
            title: 'Education',
            value: 320000,
            icon: (
                <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
        },
        {
            id: 2,
            title: 'Economic Growth',
            value: 760,
            suffix: ' Families',
            icon: (
                <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                </svg>
            ),
        },
        {
            id: 3,
            title: 'Urban Development',
            value: 218,
            suffix: ' Areas',
            icon: (
                <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            ),
        },
        {
            id: 4,
            title: 'Health and Nutrition',
            value: 18000,
            icon: (
                <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            ),
        },
        {
            id: 5,
            title: 'Emergency Response',
            value: 135400,
            icon: (
                <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            ),
        },
        {
            id: 6,
            title: 'Water & Sanitation',
            value: 45200,
            icon: (
                <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                </svg>
            ),
        },
    ]

    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

                {/* Decorative circles */}
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#23369C]/5" />
                <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-[#00B7EC]/5" />
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#23369C]/3 to-[#00B7EC]/3" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#00B7EC]">
                        Making a Difference
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl lg:text-5xl">
                        Our Impact in Numbers
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Through dedication and community partnership, we've achieved remarkable milestones in transforming lives across Afghanistan
                    </p>
                </div>

                {/* Impact Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {impactData.map((item) => (
                        <div
                            key={item.id}
                            className="group relative"
                        >
                            <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                {/* Icon */}
                                <div className="mb-6 flex justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B7EC] to-[#23369C] text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                        {item.icon}
                                    </div>
                                </div>

                                {/* Value with Count Animation */}
                                <p className="mb-2 text-center text-4xl font-extrabold text-[#23369C]">
                                    <CountUp
                                        end={item.value}
                                        suffix={item.suffix}
                                        prefix={item.prefix}
                                        duration={2500}
                                    />
                                </p>

                                {/* Title */}
                                <h3 className="text-center text-lg font-semibold text-gray-700">
                                    {item.title}
                                </h3>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00B7EC] to-[#23369C] transition-all duration-300 group-hover:w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="mb-6 text-gray-600">
                        Want to be part of our journey?
                    </p>
                    <a
                        href="/donate"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00B7EC] to-[#23369C] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
                    >
                        Support Our Mission
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
