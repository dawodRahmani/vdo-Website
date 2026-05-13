import HomeAfghanistanMap from '@/components/home-afghanistan-map';
import { Link } from '@inertiajs/react';

interface PriorityArea {
    title: string;
    svg: string;
    href: string;
}

const priorityAreas: PriorityArea[] = [
    {
        title: 'Education — 610,000 Community Members',
        svg: '/Home Page/06.svg',
        href: '/strategic-priorities/education',
    },
    {
        title: 'Economic Growth — 760 Family & Businesses',
        svg: '/Home Page/07.svg',
        href: '/strategic-priorities/economic-growth',
    },
    {
        title: 'Rural Development — 32,100',
        svg: '/Home Page/08.svg',
        href: '/strategic-priorities/rural-development',
    },
    {
        title: 'Health and Nutrition — 960,515 Individuals',
        svg: '/Home Page/09.svg',
        href: '/strategic-priorities/health-and-nutrition',
    },
    {
        title: 'Emergency Response — 418,400 Individuals',
        svg: '/Home Page/10.svg',
        href: '/strategic-priorities/emergency-response',
    },
];

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
];

export default function HomeSecondSection() {
    return (
        <section
            className="relative bg-gray-100 pt-2 pb-10 md:pt-4 md:pb-14"
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
                        <h2 className="mb-4 text-xl font-extrabold whitespace-nowrap text-[rgb(0,175,239)] md:text-2xl">
                            Strategic Priority Areas &amp; Reached
                            Beneficiaries:
                        </h2>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                            {priorityAreas.map((area, index) => {
                                const cardSpanClass =
                                    index < 3
                                        ? 'col-span-1 md:col-span-2'
                                        : 'col-span-1 md:col-span-3';
                                return (
                                    <Link
                                        key={area.title}
                                        href={area.href}
                                        prefetch
                                        className={`${cardSpanClass} block overflow-hidden rounded-xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                                    >
                                        <img
                                            src={encodeURI(area.svg)}
                                            alt={area.title}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 2 — Left: Regions + Provinces */}
                    <div>
                        <img
                            src="/Home Page/11.svg"
                            alt="Regions and Provinces: Central (Kabul main office), Northeastern (Badakhshan), Northern (Kunduz), Northwestern (Faryab), Eastern (Jalalabad), Western (Herat), Southern (Qandahar)"
                            className="h-auto w-full"
                            loading="lazy"
                        />
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
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h4 className="line-clamp-2 text-xs leading-snug font-semibold text-[rgb(62,64,149)] group-hover:text-[rgb(0,175,239)]">
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
    );
}
