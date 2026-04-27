const photos = [
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

const stats: { svg: string; label: string }[] = [
    { svg: '/svg/Home Page/01.svg', label: 'Regions' },
    { svg: '/svg/Home Page/02.svg', label: 'Live Impact' },
    { svg: '/svg/Home Page/03.svg', label: 'Implemented Projects' },
    { svg: '/svg/Home Page/04.svg', label: 'Active Projects' },
    { svg: '/svg/Home Page/05.svg', label: 'Years of Experience' },
]

export default function HeroFirstSection() {
    return (
        <section className="bg-gray-100 pb-6 pt-3 md:pb-8">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                {/* 3-image strip */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-1">
                    {photos.map((photo) => (
                        <div
                            key={photo.src}
                            className="relative aspect-[16/10] overflow-hidden md:aspect-[16/9]"
                        >
                            <img
                                src={encodeURI(photo.src)}
                                alt={photo.alt}
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>
                    ))}
                </div>

                {/* Key Impact Numbers card */}
                <div className="mt-6 rounded-2xl bg-[rgb(189,191,193)]/50 p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h2 className="mb-5 text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                                Key Impact Numbers:
                            </h2>

                            <ul className="flex flex-nowrap items-start gap-x-3 sm:gap-x-4 md:gap-x-6">
                                {stats.map((stat) => (
                                    <li
                                        key={stat.label}
                                        className="flex min-w-0 flex-1 flex-col items-center text-center"
                                    >
                                        <img
                                            src={stat.svg}
                                            alt={stat.label}
                                            className="h-9 w-auto md:h-11"
                                        />
                                        <span className="mt-1.5 text-[11px] font-medium leading-tight text-[rgb(0,175,239)] md:text-xs">
                                            {stat.label}
                                        </span>
                                    </li>
                                ))}
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
        </section>
    )
}
