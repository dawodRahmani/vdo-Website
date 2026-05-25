import PhotoStrip from '@/components/photo-strip'
import SiteLayout from '@/layouts/site-layout'
import { Link } from '@inertiajs/react'
import {
    ArrowLeft,
    Briefcase,
    CalendarClock,
    CalendarDays,
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

interface Listing {
    id: number
    slug: string
    category_slug: string | null
    category_title: string | null
    category_icon_url: string | null
    title: string
    ref: string | null
    summary: string
    description: string | null
    responsibilities: string | null
    requirements: string | null
    employment_type: string | null
    experience_level: string | null
    location: string | null
    deadline: string | null
    posted_at: string | null
    deadline_at: string | null
}

interface PageProps {
    heroPhotos?: HeroPhoto[]
    listing: Listing
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

function photoSrc(p: HeroPhoto): string {
    return p.src ?? p.url ?? ''
}

function formatDate(d: string | null): string | null {
    if (!d) return null
    const parsed = new Date(d)
    if (Number.isNaN(parsed.getTime())) return d
    return parsed.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export default function OpportunityShow({ heroPhotos, listing }: PageProps) {
    const photos =
        heroPhotos && heroPhotos.length > 0
            ? heroPhotos.map((p) => ({ src: photoSrc(p), alt: p.alt ?? '' }))
            : defaultPhotos.map((p) => ({
                  src: photoSrc(p),
                  alt: p.alt ?? '',
              }))

    const meta =
        (listing.category_slug && categoryMeta[listing.category_slug]) ||
        categoryMeta.jobs
    const CatIcon = meta.icon
    const empLabel =
        listing.employment_type &&
        EMPLOYMENT_TYPE_LABEL[listing.employment_type]
    const expLabel =
        listing.experience_level &&
        EXPERIENCE_LEVEL_LABEL[listing.experience_level]

    const postedDisplay = formatDate(listing.posted_at)
    const deadlineDisplay = listing.deadline_at
        ? formatDate(listing.deadline_at)
        : listing.deadline

    return (
        <SiteLayout title={listing.title}>
            <PhotoStrip photos={photos} />

            <section className="bg-[rgb(245,245,245)] py-10">
                <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-14">
                    {/* Back link */}
                    <Link
                        href="/opportunities"
                        className="mb-6 inline-flex items-center gap-1 text-sm text-[rgb(0,175,239)] hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to opportunities
                    </Link>

                    {/* Header card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                                style={{
                                    backgroundColor: meta.bg,
                                    color: meta.fg,
                                }}
                            >
                                <CatIcon className="h-3.5 w-3.5" />
                                {listing.category_title ?? meta.label}
                            </span>
                            {listing.ref && (
                                <span className="text-xs text-gray-500">
                                    Ref: {listing.ref}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-3 text-2xl font-bold text-[rgb(62,64,149)] md:text-3xl">
                            {listing.title}
                        </h1>

                        {listing.summary && (
                            <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
                                {listing.summary}
                            </p>
                        )}

                        <div className="mt-5 grid gap-x-6 gap-y-3 text-sm text-gray-700 md:grid-cols-2 lg:grid-cols-3">
                            {empLabel && (
                                <DetailRow
                                    icon={Briefcase}
                                    label="Employment"
                                    value={empLabel}
                                />
                            )}
                            {expLabel && (
                                <DetailRow
                                    icon={Briefcase}
                                    label="Level"
                                    value={expLabel}
                                />
                            )}
                            {listing.location && (
                                <DetailRow
                                    icon={MapPin}
                                    label="Location"
                                    value={listing.location}
                                />
                            )}
                            {postedDisplay && (
                                <DetailRow
                                    icon={CalendarDays}
                                    label="Posted"
                                    value={postedDisplay}
                                />
                            )}
                            {deadlineDisplay && (
                                <DetailRow
                                    icon={CalendarClock}
                                    label="Deadline"
                                    value={deadlineDisplay}
                                />
                            )}
                        </div>
                    </div>

                    {/* Body sections */}
                    <div className="mt-6 space-y-6">
                        {listing.description && (
                            <Section title="Description" html={listing.description} />
                        )}
                        {listing.responsibilities && (
                            <Section
                                title="Responsibilities"
                                html={listing.responsibilities}
                            />
                        )}
                        {listing.requirements && (
                            <Section
                                title="Requirements"
                                html={listing.requirements}
                            />
                        )}
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}

function DetailRow({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-2">
            <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[rgb(0,175,239)]" />
            <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-500">
                    {label}
                </p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
        </div>
    )
}

function Section({ title, html }: { title: string; html: string }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-3 text-lg font-semibold text-[rgb(62,64,149)] md:text-xl">
                {title}
            </h2>
            <div
                className="prose prose-sm max-w-none text-gray-700 prose-headings:text-[rgb(62,64,149)] prose-a:text-[rgb(0,175,239)] md:prose-base"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}
