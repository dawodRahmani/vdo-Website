import {
    Activity,
    Award,
    Briefcase,
    ClipboardCheck,
    Heart,
    Map,
    type LucideIcon,
} from 'lucide-react'

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

const stats: { value: string; label: string; icon: LucideIcon }[] = [
    { value: '4+', label: 'Regions', icon: Map },
    { value: '12+M', label: 'Live Impact', icon: Activity },
    { value: '17+', label: 'Implemented Projects', icon: ClipboardCheck },
    { value: '4+', label: 'Active Projects', icon: Briefcase },
    { value: '10+', label: 'Years of Experience', icon: Award },
]

export default function HeroFirstSection() {
    return (
        <section className="bg-gray-100 pb-10 pt-6">
            <div className="container mx-auto px-4">
                {/* 3-image strip */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                    {photos.map((photo) => (
                        <div
                            key={photo.src}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[5/3]"
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
                <div className="mt-6 rounded-2xl bg-gray-200/70 p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h2 className="mb-5 text-lg font-bold text-[#23369C] md:text-xl">
                                Key Impact Numbers:
                            </h2>

                            <ul className="flex flex-wrap items-start gap-x-6 gap-y-4 md:gap-x-8">
                                {stats.map((stat) => {
                                    const Icon = stat.icon
                                    return (
                                        <li
                                            key={stat.label}
                                            className="flex flex-col items-center text-center"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(0,175,239)] text-white shadow-sm">
                                                    <Icon className="h-5 w-5" />
                                                </span>
                                                <span className="text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                                                    {stat.value}
                                                </span>
                                            </div>
                                            <span className="mt-1.5 text-xs font-medium text-gray-700 md:text-sm">
                                                {stat.label}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="flex-shrink-0 lg:pl-6">
                            <a
                                href="/donate"
                                className="inline-flex min-w-[260px] items-center justify-center gap-2 rounded-md border-2 border-[rgb(0,175,239)] bg-gray-400 px-10 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-500"
                            >
                                Donate
                                <Heart className="h-4 w-4 fill-white text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
