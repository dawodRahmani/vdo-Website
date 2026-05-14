import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    FileText,
    Film,
    HandHeart,
    HeartPulse,
    Home,
    Images,
    Info,
    LayoutGrid,
    Map,
    MapPin,
    Newspaper,
    PenSquare,
    Plus,
    ShieldCheck,
    Target,
    type LucideIcon,
} from 'lucide-react';

interface Stats {
    news_total: number;
    news_published: number;
    news_drafts: number;
    hero_sections: number;
    strategic_pages: number;
    regions: number;
    map_pins: number;
    leadership_roles: number;
}

interface RecentNews {
    id: number;
    title: string;
    category: string | null;
    is_published: boolean;
    published_at: string | null;
    updated_at: string | null;
}

interface DashboardProps {
    stats?: Stats;
    recentNews?: RecentNews[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface StatCardProps {
    label: string;
    value: number | string;
    sub?: string;
    icon: LucideIcon;
    href: string;
    tone?: 'primary' | 'accent';
}

function StatCard({ label, value, sub, icon: Icon, href, tone = 'primary' }: StatCardProps) {
    const tint =
        tone === 'accent'
            ? 'bg-[rgb(62,64,149)]/10 text-[rgb(62,64,149)]'
            : 'bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)]';
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
        >
            <span
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${tint} transition-colors group-hover:bg-[rgb(0,175,239)] group-hover:text-white`}
            >
                <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
                <div className="text-2xl font-semibold leading-tight">{value}</div>
                <div className="text-sm font-medium">{label}</div>
                {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
            </div>
        </Link>
    );
}

interface QuickLinkProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

function QuickLink({ title, description, icon: Icon, href }: QuickLinkProps) {
    return (
        <Link
            href={href}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[rgb(0,175,239)] hover:shadow-md"
        >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)] transition-colors group-hover:bg-[rgb(0,175,239)] group-hover:text-white">
                <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
            </div>
        </Link>
    );
}

export default function Dashboard({ stats, recentNews }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.user?.role === 'admin';
    const name = auth?.user?.name ?? '';
    const firstName = name.split(' ')[0] || name;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h1 className="text-2xl font-semibold">
                        Welcome{firstName ? `, ${firstName}` : ''}.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {isAdmin
                            ? 'Manage every public page of the site from here. Use the sidebar to jump to any section.'
                            : 'Visit your profile and settings via the user menu in the sidebar.'}
                    </p>
                </div>

                {isAdmin && stats && (
                    <>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                label="News posts"
                                value={stats.news_total}
                                sub={`${stats.news_published} published · ${stats.news_drafts} draft`}
                                icon={Newspaper}
                                href="/admin/news"
                            />
                            <StatCard
                                label="Hero sections"
                                value={stats.hero_sections}
                                sub="3-image strips per page"
                                icon={Images}
                                href="/admin/hero-sections"
                            />
                            <StatCard
                                label="Strategic priority pages"
                                value={stats.strategic_pages}
                                sub="text + bullets + images"
                                icon={Target}
                                href="/admin/strategic-priorities"
                                tone="accent"
                            />
                            <StatCard
                                label="Leadership roles"
                                value={stats.leadership_roles}
                                sub="Coordination diagram"
                                icon={ShieldCheck}
                                href="/admin/diagrams/leadership-roles"
                                tone="accent"
                            />
                            <StatCard
                                label="Map regions"
                                value={stats.regions}
                                sub="Where We Work"
                                icon={Map}
                                href="/admin/map"
                            />
                            <StatCard
                                label="Map pins"
                                value={stats.map_pins}
                                sub="Country markers"
                                icon={MapPin}
                                href="/admin/map"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Recent news */}
                            <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
                                <div className="mb-3 flex items-center justify-between">
                                    <h2 className="text-base font-semibold">Recent news</h2>
                                    <Link
                                        href="/admin/news"
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[rgb(0,175,239)] hover:underline"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Add post
                                    </Link>
                                </div>
                                {recentNews && recentNews.length > 0 ? (
                                    <ul className="divide-y divide-border">
                                        {recentNews.map((p) => (
                                            <li
                                                key={p.id}
                                                className="flex items-start justify-between gap-3 py-2"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="truncate text-sm font-medium">
                                                            {p.title}
                                                        </span>
                                                        {p.is_published ? (
                                                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                                                Published
                                                            </span>
                                                        ) : (
                                                            <span className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                                                Draft
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        {p.category && <span>{p.category}</span>}
                                                        {p.published_at && (
                                                            <>
                                                                <span>·</span>
                                                                <span>{p.published_at}</span>
                                                            </>
                                                        )}
                                                        {p.updated_at && (
                                                            <>
                                                                <span>·</span>
                                                                <span>updated {p.updated_at}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <Link
                                                    href="/admin/news"
                                                    className="text-xs font-medium text-[rgb(0,175,239)] hover:underline"
                                                >
                                                    <PenSquare className="h-3.5 w-3.5" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="rounded-lg border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                                        No news yet.{' '}
                                        <Link
                                            href="/admin/news"
                                            className="font-medium text-[rgb(0,175,239)] hover:underline"
                                        >
                                            Create the first post
                                        </Link>
                                        .
                                    </p>
                                )}
                            </div>

                            {/* Quick links */}
                            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                                <h2 className="mb-3 text-base font-semibold">
                                    Quick links
                                </h2>
                                <div className="grid grid-cols-1 gap-2">
                                    <QuickLink
                                        title="Home Page"
                                        description="Hero, stats, priorities, commitments"
                                        icon={Home}
                                        href="/admin/home-page"
                                    />
                                    <QuickLink
                                        title="About Page"
                                        description="Executive, history, mission, vision"
                                        icon={Info}
                                        href="/admin/about-page"
                                    />
                                    <QuickLink
                                        title="Donate"
                                        description="Donation cards"
                                        icon={HandHeart}
                                        href="/admin/donate"
                                    />
                                    <QuickLink
                                        title="Media"
                                        description="Documentary / media items"
                                        icon={Film}
                                        href="/admin/media"
                                    />
                                    <QuickLink
                                        title="Opportunities"
                                        description="Categories + listings"
                                        icon={Briefcase}
                                        href="/admin/opportunities"
                                    />
                                    <QuickLink
                                        title="VDO Resilience"
                                        description="Sections"
                                        icon={HeartPulse}
                                        href="/admin/site/header"
                                    />
                                    <QuickLink
                                        title="Header & Footer"
                                        description="Logo, contact, socials"
                                        icon={LayoutGrid}
                                        href="/admin/site/header"
                                    />
                                    <QuickLink
                                        title="Hero Sections"
                                        description="3-image strips per page"
                                        icon={Images}
                                        href="/admin/hero-sections"
                                    />
                                    <QuickLink
                                        title="Pages overview"
                                        description="All public pages"
                                        icon={FileText}
                                        href="/admin/strategic-priorities"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
