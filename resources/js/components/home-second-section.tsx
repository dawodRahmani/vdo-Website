import {
    AlertTriangle,
    BookOpen,
    Building2,
    HeartPulse,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react'
import AfghanistanMap from '@/components/afghanistan-map'
import { Region } from '@/types'

interface HomeSecondSectionProps {
    regions: Region[]
}

interface PriorityArea {
    title: string
    value: string
    icon: LucideIcon
}

const priorityAreas: PriorityArea[] = [
    { title: 'Education', value: '320,000', icon: BookOpen },
    { title: 'Economic Growth', value: '760 Families', icon: TrendingUp },
    { title: 'Rural Development', value: '218 Areas', icon: Building2 },
    { title: 'Health and Nutrition', value: '18,000', icon: HeartPulse },
    { title: 'Emergency Response', value: '135,400', icon: AlertTriangle },
]

const regionsList = [
    'Central Region',
    'Northeastern Region',
    'Northern Region',
    'Northwestern Region',
    'Eastern Region',
    'Western Region',
    'Southern Region',
]

const provincesList = [
    'Kabul (main office)',
    'Badakhshan',
    'Kunduz',
    'Faryab',
    'Jalalabad',
    'Herat',
    'Qandahar',
]

const newsItems = [
    {
        category: 'Food Security',
        title: 'Strengthening Food Security Through Food Distribution Program',
        date: 'Apr 12, 2026',
        image: '/Header and Gallary Photos/05.jpg',
    },
    {
        category: 'Health',
        title: 'Integrated Health Service Program for Improved Community Wellbeing',
        date: 'Apr 05, 2026',
        image: '/Header and Gallary Photos/11.jpg',
    },
]

export default function HomeSecondSection({ regions }: HomeSecondSectionProps) {
    return (
        <section
            className="relative bg-white py-10 md:py-14"
            style={{
                backgroundImage: 'url(/images/map.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-white/85" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Row 1 — Left: Map */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[#23369C] md:text-xl">
                            Where We Work:
                        </h2>
                        <AfghanistanMap regions={regions} />
                    </div>

                    {/* Row 1 — Right: Strategic Priority Areas */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[#23369C] md:text-xl">
                            Strategic Priority Areas:
                        </h2>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                            {priorityAreas.map((area) => {
                                const Icon = area.icon
                                return (
                                    <div
                                        key={area.title}
                                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <Icon className="mb-2 h-6 w-6 text-[rgb(0,175,239)]" />
                                        <p className="text-sm font-semibold text-[#23369C]">
                                            {area.title}
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-gray-700">
                                            {area.value}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Row 2 — Left: Regions + Provinces */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[rgb(0,175,239)]">
                                Regions
                            </h3>
                            <ul className="space-y-1.5 text-sm text-[rgb(0,175,239)]">
                                {regionsList.map((name, i) => (
                                    <li
                                        key={name}
                                        className="flex items-center gap-2"
                                    >
                                        <span
                                            className={`h-2 w-2 flex-shrink-0 rounded-full ${
                                                i === 0
                                                    ? 'bg-[rgb(0,175,239)]'
                                                    : 'border border-[rgb(0,175,239)]'
                                            }`}
                                        />
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[rgb(0,175,239)]">
                                Provinces
                            </h3>
                            <ul className="space-y-1.5 text-sm text-[rgb(0,175,239)]">
                                {provincesList.map((name) => (
                                    <li key={name}>{name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Row 2 — Right: Latest News & Announcements */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[#23369C] md:text-xl">
                            Latest News &amp; Announcements:
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {newsItems.map((item) => (
                                <article
                                    key={item.title}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={encodeURI(item.image)}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-[#23369C] group-hover:text-[rgb(0,175,239)]">
                                            {item.title}
                                        </h4>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
