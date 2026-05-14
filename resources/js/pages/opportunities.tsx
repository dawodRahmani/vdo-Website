import PhotoStrip from '@/components/photo-strip'
import SiteLayout from '@/layouts/site-layout'
import {
    Briefcase,
    CalendarClock,
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
    category_slug: string | null
    category_title: string | null
    title: string
    ref: string | null
    summary: string
    location: string | null
    deadline: string | null
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
                <section className="bg-gray-100 py-10">
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
                <section className="bg-gray-100 pb-14">
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
                                return (
                                    <article
                                        key={item.id}
                                        className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
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
                                        <h4 className="text-sm font-semibold text-[rgb(62,64,149)] md:text-base">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
                                            {item.summary}
                                        </p>
                                        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
                                            {item.location && (
                                                <span className="inline-flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5 text-[rgb(0,175,239)]" />
                                                    {item.location}
                                                </span>
                                            )}
                                            {item.deadline && (
                                                <span className="inline-flex items-center gap-1">
                                                    <CalendarClock className="h-3.5 w-3.5 text-[rgb(0,175,239)]" />
                                                    {item.deadline}
                                                </span>
                                            )}
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    )
}
