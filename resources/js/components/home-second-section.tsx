import { useState } from 'react';
import HomeAfghanistanMap from '@/components/home-afghanistan-map';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';

export interface PriorityArea {
    id?: number;
    title: string;
    svg?: string;
    svg_url?: string;
    href: string;
    size_scale?: number;
}

export interface LatestNewsItem {
    id?: number;
    title: string;
    slug?: string;
    category?: string | null;
    body?: string | null;
    image_url?: string;
    image?: string;
    published_at?: string | null;
    date?: string;
}

function formatNewsDate(item: LatestNewsItem): string {
    const raw = item.published_at ?? item.date;
    if (!raw) return '';
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const defaultPriorityAreas: PriorityArea[] = [
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

const defaultNews: LatestNewsItem[] = [
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

function priorityImg(p: PriorityArea): string {
    return p.svg_url || p.svg || '';
}

function newsImg(n: LatestNewsItem): string {
    return n.image_url || n.image || '';
}

export interface RegionsImage {
    src: string;
    alt: string;
    max_width?: number | null;
}

interface Props {
    priorityAreas?: PriorityArea[];
    latestNews?: LatestNewsItem[];
    regionsImage?: RegionsImage;
}

const defaultRegionsImage: RegionsImage = {
    src: '/Home Page/11.svg',
    alt: 'Regions and Provinces: Central (Kabul main office), Northeastern (Badakhshan), Northern (Kunduz), Northwestern (Faryab), Eastern (Jalalabad), Western (Herat), Southern (Qandahar)',
};

export default function HomeSecondSection({ priorityAreas, latestNews, regionsImage }: Props) {
    const priorities =
        priorityAreas && priorityAreas.length > 0 ? priorityAreas : defaultPriorityAreas;
    const news = latestNews && latestNews.length > 0 ? latestNews : defaultNews;
    const regions = regionsImage && regionsImage.src ? regionsImage : defaultRegionsImage;
    const [activeNews, setActiveNews] = useState<LatestNewsItem | null>(null);

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
                <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Row 1 — Left: Map */}
                    <div className="flex flex-col">
                        <h2 className="mb-4 text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                            Where We Work:
                        </h2>
                        <div className="flex flex-1 items-center justify-center">
                            <HomeAfghanistanMap />
                        </div>
                    </div>

                    {/* Row 1 — Right: Strategic Priority Areas */}
                    <div className="flex flex-col">
                        <h2 className="mb-4 text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                            Strategic Priority Areas &amp; Reached
                            Beneficiaries:
                        </h2>
                        <div className="grid flex-1 auto-rows-fr grid-cols-1 gap-3 md:grid-cols-6">
                            {priorities.map((area, index) => {
                                const cardSpanClass =
                                    index < 3
                                        ? 'col-span-1 md:col-span-2'
                                        : 'col-span-1 md:col-span-3';
                                const scale = (area.size_scale ?? 100) / 100;
                                return (
                                    <Link
                                        key={area.id ?? area.title}
                                        href={area.href}
                                        prefetch
                                        className={`${cardSpanClass} flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                                    >
                                        <img
                                            src={encodeURI(priorityImg(area))}
                                            alt={area.title}
                                            className="h-full max-h-full w-full object-contain transition-transform duration-200"
                                            style={{ transform: `scale(${scale})` }}
                                            loading="lazy"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 2 — Left: Regions + Provinces */}
                    <div className="flex items-start justify-center">
                        <img
                            src={encodeURI(regions.src)}
                            alt={regions.alt}
                            className="h-auto w-full"
                            style={{
                                maxWidth:
                                    regions.max_width != null
                                        ? `${regions.max_width}%`
                                        : undefined,
                            }}
                            loading="lazy"
                        />
                    </div>

                    {/* Row 2 — Right: Latest News & Announcements */}
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-[rgb(62,64,149)] md:text-xl">
                            Latest News &amp; Announcements:
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {news.map((item) => (
                                <button
                                    key={item.id ?? item.title}
                                    type="button"
                                    onClick={() => setActiveNews(item)}
                                    className="group block w-full overflow-hidden rounded-lg bg-white text-left shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,175,239)]"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={encodeURI(newsImg(item))}
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
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={activeNews !== null}
                onOpenChange={(open) => {
                    if (!open) setActiveNews(null);
                }}
            >
                <DialogContent className="max-w-2xl overflow-hidden p-0 sm:max-w-3xl">
                    {activeNews && (
                        <div className="flex max-h-[85vh] flex-col">
                            {newsImg(activeNews) && (
                                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={encodeURI(newsImg(activeNews))}
                                        alt={activeNews.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="overflow-y-auto px-6 py-5">
                                <DialogHeader className="space-y-2 text-left">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-[rgb(0,175,239)]">
                                        {activeNews.category && (
                                            <span className="font-semibold">
                                                {activeNews.category}
                                            </span>
                                        )}
                                        {formatNewsDate(activeNews) && (
                                            <>
                                                {activeNews.category && (
                                                    <span className="text-gray-300">·</span>
                                                )}
                                                <span className="font-medium text-gray-500">
                                                    {formatNewsDate(activeNews)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <DialogTitle className="text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                                        {activeNews.title}
                                    </DialogTitle>
                                </DialogHeader>
                                {activeNews.body && (
                                    <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                        {activeNews.body}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
