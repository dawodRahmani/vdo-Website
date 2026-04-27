import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    Briefcase,
    CalendarClock,
    Gavel,
    HandHeart,
    Handshake,
    MapPin,
    type LucideIcon,
} from 'lucide-react'

const photos = [
    { src: '/Header and Gallary Photos/16.jpg', alt: 'Career opportunities' },
    { src: '/Header and Gallary Photos/22.jpg', alt: 'Volunteers in action' },
    { src: '/Header and Gallary Photos/24.jpg', alt: 'Community participation' },
]

interface Opportunity {
    id: string
    title: string
    icon: string
    body: string
}

const opportunities: Opportunity[] = [
    {
        id: 'jobs',
        title: 'Jobs',
        icon: '/svg/Opportunities/01.svg',
        body: 'VDO offers meaningful career opportunities for individuals who are passionate about making a difference. This section provides information on current vacancies, including roles across program management, technical support, and operational functions. We encourage qualified candidates to apply and join us in delivering sustainable impact and empowering communities.',
    },
    {
        id: 'bids',
        title: 'Bids',
        icon: '/svg/Opportunities/02.svg',
        body: 'VDO is committed to transparent and competitive procurement processes that ensure fairness, accountability, and value for money. The organization regularly invites qualified suppliers, service providers, and contractors to participate in bidding opportunities for goods, services, and project implementation. All bids are evaluated based on clear criteria, and VDO adheres to strict ethical and procurement standards to maintain integrity throughout the process. By fostering an open and competitive environment, VDO ensures that its projects are supported by reliable partners, delivering quality outcomes for the communities it serves.',
    },
    {
        id: 'volunteer',
        title: 'Volunteer',
        icon: '/svg/Opportunities/03.svg',
        body: 'VDO welcomes passionate individuals who want to make a difference through volunteer work. By joining our team as a volunteer, you can contribute your time, skills, and energy to support our programs and help empower communities. Volunteering with VDO is a meaningful way to create positive change while gaining valuable experience and connecting with like-minded people.',
    },
    {
        id: 'participation',
        title: 'Participation',
        icon: '/svg/Opportunities/04.svg',
        body: "This section provides opportunities to engage in workshops, awareness campaigns, and community programs, allowing individuals to contribute their ideas, skills, and energy. By participating, you can play a direct role in creating positive change and supporting VDO's mission to empower communities.",
    },
]

type Category = 'jobs' | 'bids' | 'volunteer' | 'participation'

const categoryMeta: Record<
    Category,
    { label: string; icon: LucideIcon; bg: string; fg: string }
> = {
    jobs: {
        label: 'Job',
        icon: Briefcase,
        bg: 'rgba(62,64,149,0.1)',
        fg: 'rgb(62,64,149)',
    },
    bids: {
        label: 'Bid',
        icon: Gavel,
        bg: 'rgba(0,175,239,0.12)',
        fg: 'rgb(0,140,200)',
    },
    volunteer: {
        label: 'Volunteer',
        icon: HandHeart,
        bg: 'rgba(231,76,60,0.1)',
        fg: 'rgb(192,57,43)',
    },
    participation: {
        label: 'Participation',
        icon: Handshake,
        bg: 'rgba(39,174,96,0.1)',
        fg: 'rgb(39,142,80)',
    },
}

interface Listing {
    id: string
    category: Category
    title: string
    ref: string
    summary: string
    location: string
    deadline: string
}

const listings: Listing[] = [
    {
        id: 'job-1',
        category: 'jobs',
        title: 'Programs Coordinator',
        ref: 'VDO-HR-2026-014',
        summary:
            'Lead day-to-day coordination of education and protection programs across central provinces, working closely with field teams and partners.',
        location: 'Kabul, Afghanistan',
        deadline: 'Closes 15 May 2026',
    },
    {
        id: 'job-2',
        category: 'jobs',
        title: 'Health & Nutrition Officer',
        ref: 'VDO-HR-2026-018',
        summary:
            'Implement community health and nutrition activities, including outreach, MUAC screening, and awareness sessions in Herat province.',
        location: 'Herat, Afghanistan',
        deadline: 'Closes 22 May 2026',
    },
    {
        id: 'bid-1',
        category: 'bids',
        title: 'Office Supplies & Stationery (Annual Framework)',
        ref: 'VDO-PROC-2026-021',
        summary:
            'Open invitation to qualified suppliers for an annual framework agreement covering office supplies and stationery for VDO offices.',
        location: 'Nationwide',
        deadline: 'Closes 8 May 2026',
    },
    {
        id: 'bid-2',
        category: 'bids',
        title: 'IT Equipment Supply (Laptops & Networking)',
        ref: 'VDO-PROC-2026-024',
        summary:
            'Sealed bids invited for the supply of laptops, networking gear, and accessories. Bid documents available on request.',
        location: 'Kabul (delivery nationwide)',
        deadline: 'Closes 18 May 2026',
    },
    {
        id: 'vol-1',
        category: 'volunteer',
        title: 'Community Education Mentor',
        ref: 'VDO-VOL-2026-007',
        summary:
            'Support after-school learning sessions for children and youth in your community. Training and materials provided.',
        location: 'Multiple regions',
        deadline: 'Rolling intake',
    },
    {
        id: 'part-1',
        category: 'participation',
        title: 'Youth Empowerment Workshop',
        ref: 'VDO-PART-2026-003',
        summary:
            'Three-day workshop on civic engagement, leadership, and project design for youth aged 18–28. Travel stipends available.',
        location: 'Mazar-e-Sharif',
        deadline: 'Apply by 30 May 2026',
    },
]

export default function Opportunities() {
    return (
        <SiteLayout title="Opportunities">
            <PhotoStrip photos={photos} />

            {/* Categories grid */}
            <section className="bg-gray-100 py-10">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <div className="grid gap-8 md:grid-cols-3">
                        {opportunities.map((op) => {
                            return (
                                <article
                                    key={op.id}
                                    id={op.id}
                                    className={`scroll-mt-24 ${
                                        op.id === 'participation'
                                            ? 'md:col-span-3'
                                            : ''
                                    }`}
                                >
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center">
                                        <img
                                            src={op.icon}
                                            alt={`${op.title} icon`}
                                            className="h-14 w-14"
                                        />
                                    </div>
                                    <h2 className="mb-3 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                                        {op.title}
                                    </h2>
                                    <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                        {op.body}
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Current listings */}
            <section className="bg-gray-100 pb-14">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h3 className="mb-4 text-base font-bold text-[rgb(62,64,149)]">
                        Current Listings
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {listings.map((item) => {
                            const cat = categoryMeta[item.category]
                            const CatIcon = cat.icon
                            return (
                                <article
                                    key={item.id}
                                    className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                                            style={{
                                                backgroundColor: cat.bg,
                                                color: cat.fg,
                                            }}
                                        >
                                            <CatIcon className="h-3.5 w-3.5" />
                                            {cat.label}
                                        </span>
                                        <span className="text-[11px] text-gray-500">
                                            Ref: {item.ref}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-[rgb(62,64,149)] md:text-base">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
                                        {item.summary}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5 text-[rgb(0,175,239)]" />
                                            {item.location}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <CalendarClock className="h-3.5 w-3.5 text-[rgb(0,175,239)]" />
                                            {item.deadline}
                                        </span>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    <p className="mt-3 text-xs italic text-gray-500">
                        Sample listings shown for preview. Live job postings,
                        bid announcements, and volunteer opportunities will
                        appear here once connected to the data source.
                    </p>
                </div>
            </section>
        </SiteLayout>
    )
}
