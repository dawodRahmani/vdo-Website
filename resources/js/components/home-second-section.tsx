import HomeAfghanistanMap from '@/components/home-afghanistan-map'

interface PriorityArea {
    title: string
    svg: string
}

const priorityAreas: PriorityArea[] = [
    { title: 'Education — 320,000', svg: '/svg/Home Page/09.svg' },
    { title: 'Economic Growth — 760 Families', svg: '/svg/Home Page/10.svg' },
    { title: 'Rural Development — 218 Areas', svg: '/svg/Home Page/11.svg' },
    { title: 'Health and Nutrition — 18,000', svg: '/svg/Home Page/12.svg' },
    { title: 'Emergency Response — 135,400', svg: '/svg/Home Page/13.svg' },
]

const regionRows = [
    { region: 'Central Region:', province: 'Kabul (main office)', dotColor: '#3E4095' },
    { region: 'Northeastern Region:', province: 'Badakhshan', dotColor: '#F58634' },
    { region: 'Northern Region:', province: 'Kunduz', dotColor: '#A53692' },
    { region: 'Northwestern Region:', province: 'Faryab', dotColor: '#84716B' },
    { region: 'Eastern Region:', province: 'Jalalabad', dotColor: '#A8CF45' },
    { region: 'Western Region:', province: 'Herat', dotColor: '#00A859' },
    { region: 'Southern Region:', province: 'Qandahar', dotColor: '#FFCC29' },
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

export default function HomeSecondSection() {
    return (
        <section
            className="relative bg-gray-100 pb-10 pt-2 md:pb-14 md:pt-4"
            style={{
                backgroundImage: 'url(/svg/Map.svg)',
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
                        <div className="mx-auto">
                            <HomeAfghanistanMap />
                        </div>
                    </div>

                    {/* Row 1 — Right: Strategic Priority Areas */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                            Strategic Priority Areas:
                        </h2>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                            {priorityAreas.map((area, index) => {
                                const cardSpanClass =
                                    index < 3
                                        ? 'col-span-1 md:col-span-2'
                                        : 'col-span-1 md:col-span-3'
                                return (
                                    <div
                                        key={area.title}
                                        className={`${cardSpanClass} overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md`}
                                    >
                                        <img
                                            src={area.svg}
                                            alt={area.title}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Row 2 — Left: Regions + Provinces */}
                    <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[rgb(0,175,239)]">
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
                                <div className="flex items-center gap-2 text-[rgb(0,175,239)]">
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
