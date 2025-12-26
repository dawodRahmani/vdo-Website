export default function ImpactStats() {
    const impactData = [
        {
            id: 1,
            title: 'Education',
            value: '320,000',
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
            value: '760 Families',
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
            value: '218 Areas',
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
            value: '18,000',
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
            value: '135,400',
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
            value: '45,200',
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
        <section
            className="relative overflow-hidden bg-gradient-to-br from-[#23369C] via-[#23369C]/90 to-[#23369C]/80 py-20"
            style={{
                backgroundImage: 'url(/images/1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
            }}
        >
            {/* Overlay for better card visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#23369C]/90 via-[#23369C]/85 to-[#23369C]/80" />

            {/* Scattered background images (decorative) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-[10%] top-[15%] h-32 w-32 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="/images/2.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute right-[15%] top-[10%] h-24 w-24 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="/images/3.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute bottom-[20%] left-[20%] h-28 w-28 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="/images/1.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute bottom-[15%] right-[10%] h-32 w-32 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="/images/2.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <h2 className="mb-16 text-center text-4xl font-bold text-white">
                    Our Impact in Numbers
                </h2>

                {/* Impact Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {impactData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`group relative transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${
                                index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8'
                            }`}
                        >
                            <div className="h-full rounded-2xl bg-gradient-to-br from-[#00B7EC] to-[#00B7EC]/80 p-8 shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/50">
                                {/* Icon */}
                                <div className="mb-6 flex justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                                        {item.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="mb-4 text-center text-xl font-bold text-white">
                                    {item.title}
                                </h3>

                                {/* Value */}
                                <p className="text-center text-3xl font-extrabold text-white">
                                    {item.value}
                                </p>

                                {/* Decorative element */}
                                <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                                <div className="absolute -bottom-2 -left-2 h-20 w-20 rounded-full bg-white/10 blur-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
