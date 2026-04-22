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

const regionRows = [
    { region: 'Central Region:', province: 'Kabul (main office)', dotColor: '#E74C3C' },
    { region: 'Northeastern Region:', province: 'Badakhshan', dotColor: '#E74C3C' },
    { region: 'Northern Region:', province: 'Kunduz', dotColor: '#E74C3C' },
    { region: 'Northwestern Region:', province: 'Faryab', dotColor: '#E74C3C' },
    { region: 'Eastern Region:', province: 'Jalalabad', dotColor: '#E74C3C' },
    { region: 'Western Region:', province: 'Herat', dotColor: '#E74C3C' },
    { region: 'Southern Region:', province: 'Qandahar', dotColor: '#F1C40F' },
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
            className="relative bg-gray-100 pb-10 pt-2 md:pb-14 md:pt-4"
            style={{
                backgroundImage: 'url(/images/map.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-gray-100/58" />

            <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Row 1 — Left: Map */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                            Where We Work:
                        </h2>
                        <AfghanistanMap regions={regions} />
                    </div>

                    {/* Row 1 — Right: Strategic Priority Areas */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[rgb(62,64,149)] md:text-xl">
                            Strategic Priority Areas:
                        </h2>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                            {priorityAreas.map((area, index) => {
                                const Icon = area.icon
                                const cardSpanClass =
                                    index < 3
                                        ? 'col-span-1 md:col-span-2'
                                        : 'col-span-1 md:col-span-3'
                                return (
                                    <div
                                        key={area.title}
                                        className={`${cardSpanClass} rounded-xl border border-white/70 bg-white/75 p-5 shadow-sm transition-shadow hover:shadow-md`}
                                    >
                                        <div className="mb-4 flex justify-center">
                                            <Icon className="h-12 w-12 text-gray-300" />
                                        </div>
                                        <p className="font-['Times_New_Roman',serif] text-center text-[15px] leading-tight font-medium text-[rgb(62,64,149)] md:text-[15px]">
                                            {area.title}
                                        </p>
                                        <p className="mt-1 text-center text-[20px] leading-none font-bold text-[rgb(62,64,149)] md:text-[20px]">
                                            {area.value}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Row 2 — Left: Regions + Provinces */}
                    <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[rgb(62,64,149)]">
                            Regions
                        </h3>
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[rgb(0,175,239)]">
                            Provinces
                        </h3>
                        {regionRows.map((row) => (
                            <div
                                key={row.region}
                                className="contents"
                            >
                                <div className="flex items-center gap-2 text-[rgb(62,64,149)]">
                                    <span
                                        className="h-2 w-2 flex-shrink-0 rounded-full"
                                        style={{ backgroundColor: row.dotColor }}
                                    />
                                    {row.region}
                                </div>
                                <div className="font-semibold text-[rgb(0,175,239)]">
                                    {row.province}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Row 2 — Right: Latest News & Announcements */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[rgb(62,64,149)] md:text-xl">
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
                                        <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-[rgb(62,64,149)] group-hover:text-[rgb(0,175,239)]">
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
