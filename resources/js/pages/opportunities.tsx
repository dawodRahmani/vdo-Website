import PhotoStrip from '@/components/photo-strip'
import SiteLayout from '@/layouts/site-layout'
import { Link } from '@inertiajs/react'
import {
    Briefcase,
    CalendarClock,
    ChevronRight,
    Gavel,
    HandHeart,
    Handshake,
    MapPin,
    type LucideIcon,
} from 'lucide-react'

interface HeroPhoto {
    src?: string
    url?: string
    alt?: string | null
}

interface Category {
    id: number
    slug: string
    title: string
    body: string
    icon_url: string | null
}

interface Listing {
    id: number
    slug: string | null
    category_slug: string | null
    category_title: string | null
    title: string
    ref: string | null
    summary: string
    employment_type: string | null
    experience_level: string | null
    location: string | null
    deadline: string | null
    posted_at: string | null
    deadline_at: string | null
}

const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    contract: 'Contract',
    volunteer: 'Volunteer',
    internship: 'Internship',
    consultancy: 'Consultancy',
}

const EXPERIENCE_LEVEL_LABEL: Record<string, string> = {
    entry: 'Entry level',
    mid: 'Mid level',
    senior: 'Senior',
}

interface PageProps {
    heroPhotos?: HeroPhoto[]
    categories?: Category[]
    listings?: Listing[]
}

const defaultPhotos: HeroPhoto[] = [
    { src: '/Header and Gallary Photos/16.jpg', alt: 'Career opportunities' },
    { src: '/Header and Gallary Photos/22.jpg', alt: 'Volunteers in action' },
    { src: '/Header and Gallary Photos/24.jpg', alt: 'Community participation' },
]

const categoryMeta: Record<
    string,
    { icon: LucideIcon; bg: string; fg: string; label: string }
> = {
    jobs: {
        icon: Briefcase,
        bg: 'rgba(62,64,149,0.1)',
        fg: 'rgb(62,64,149)',
        label: 'Job',
    },
    bids: {
        icon: Gavel,
        bg: 'rgba(0,175,239,0.12)',
        fg: 'rgb(0,140,200)',
        label: 'Bid',
    },
    volunteer: {
        icon: HandHeart,
        bg: 'rgba(231,76,60,0.1)',
        fg: 'rgb(192,57,43)',
        label: 'Volunteer',
    },
    participation: {
        icon: Handshake,
        bg: 'rgba(39,174,96,0.1)',
        fg: 'rgb(39,142,80)',
        label: 'Participation',
    },
}

const fallbackMeta = {
    icon: Briefcase,
    bg: 'rgba(100,100,100,0.1)',
    fg: 'rgb(80,80,80)',
    label: 'Opportunity',
}

function photoSrc(p: HeroPhoto): string {
    return p.src ?? p.url ?? ''
}

export default function Opportunities({
    heroPhotos,
    categories,
    listings,
}: PageProps) {
    const photos =
        heroPhotos && heroPhotos.length > 0
            ? heroPhotos.map((p) => ({ src: photoSrc(p), alt: p.alt ?? '' }))
            : defaultPhotos.map((p) => ({
                  src: photoSrc(p),
                  alt: p.alt ?? '',
              }))

    const cats = categories ?? []
    const items = listings ?? []

    return (
        <SiteLayout title="Opportunities">
            <PhotoStrip photos={photos} />

            {/* Categories grid */}
            {cats.length > 0 && (
                <section className="bg-[rgb(245,245,245)] py-10">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <div className="grid gap-8 md:grid-cols-3">
                            {cats.map((cat) => (
                                <article
                                    key={cat.id}
                                    id={cat.slug}
                                    className={`scroll-mt-24 ${
                                        cat.slug === 'participation'
                                            ? 'md:col-span-3'
                                            : ''
                                    }`}
                                >
                                    {cat.icon_url && (
                                        <div className="mb-3 flex h-14 w-14 items-center justify-center">
                                            <img
                                                src={cat.icon_url}
                                                alt={`${cat.title} icon`}
                                                className="h-14 w-14"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <h2 className="mb-3 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                                        {cat.title}
                                    </h2>
                                    <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                        {cat.body}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Current listings */}
            {items.length > 0 && (
                <section className="bg-[rgb(245,245,245)] pb-14">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h3 className="mb-4 text-base font-bold text-[rgb(62,64,149)]">
                            Current Listings
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => {
                                const meta =
                                    (item.category_slug &&
                                        categoryMeta[item.category_slug]) ||
                                    fallbackMeta
                                const CatIcon = meta.icon
                                const label =
                                    item.category_title ?? meta.label
                                const empLabel =
                                    item.employment_type &&
                                    EMPLOYMENT_TYPE_LABEL[item.employment_type]
                                const expLabel =
                                    item.experience_level &&
                                    EXPERIENCE_LEVEL_LABEL[
                                        item.experience_level
                                    ]
                                const deadlineText =
                                    item.deadline_at ?? item.deadline
                                return (
                                    <Link
                                        key={item.id}
                                        href={
                                            item.slug
                                                ? `/opportunities/${item.slug}`
                                                : '#'
                                        }
                                        className="group flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[rgb(0,175,239)]/40 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase"
                                                style={{
                                                    backgroundColor: meta.bg,
                                                    color: meta.fg,
                                                }}
                                            >
                                                <CatIcon className="h-3.5 w-3.5" />
                                                {label}
                                            </span>
                                            {item.ref && (
                                                <span className="text-[11px] text-gray-500">
                                                    Ref: {item.ref}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-sm font-semibold text-[rgb(62,64,149)] group-hover:underline md:text-base">
                                            {item.title}
                                        </h4>
                                        {(empLabel || expLabel) && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {empLabel && (
                                                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                                                        {empLabel}
                                                    </span>
                                                )}
                                                {expLabel && (
                                                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                                                        {expLabel}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <p className="line-clamp-3 text-xs leading-relaxed text-gray-600 md:text-sm">
                                            {item.summary}
                                        </p>
                                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-600">
                                            {item.location && (
                                                <span className="inline-flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5 text-[rgb(0,175,239)]" />
                                                    {item.location}
                                                </span>
                                            )}
                                            {deadlineText && (
                                                <span className="inline-flex items-center gap-1">
                                                    <CalendarClock className="h-3.5 w-3.5 text-[rgb(0,175,239)]" />
                                                    {deadlineText}
                                                </span>
                                            )}
                                            <span className="ml-auto inline-flex items-center gap-0.5 text-[rgb(0,175,239)] transition-transform group-hover:translate-x-0.5">
                                                View details
                                                <ChevronRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    )
}
