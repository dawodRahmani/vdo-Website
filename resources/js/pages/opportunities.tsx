import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    Briefcase,
    Gavel,
    HandHeart,
    Handshake,
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
    icon: LucideIcon
    body: string
}

const opportunities: Opportunity[] = [
    {
        id: 'jobs',
        title: 'Jobs',
        icon: Briefcase,
        body: 'VDO offers meaningful career opportunities for individuals who are passionate about making a difference. This section provides information on current vacancies, including roles across program management, technical support, and operational functions. We encourage qualified candidates to apply and join us in delivering sustainable impact and empowering communities.',
    },
    {
        id: 'bids',
        title: 'Bids',
        icon: Gavel,
        body: 'VDO is committed to transparent and competitive procurement processes that ensure fairness, accountability, and value for money. The organization regularly invites qualified suppliers, service providers, and contractors to participate in bidding opportunities for goods, services, and project implementation. All bids are evaluated based on clear criteria, and VDO adheres to strict ethical and procurement standards to maintain integrity throughout the process. By fostering an open and competitive environment, VDO ensures that its projects are supported by reliable partners, delivering quality outcomes for the communities it serves.',
    },
    {
        id: 'volunteer',
        title: 'Volunteer',
        icon: HandHeart,
        body: 'VDO welcomes passionate individuals who want to make a difference through volunteer work. By joining our team as a volunteer, you can contribute your time, skills, and energy to support our programs and help empower communities. Volunteering with VDO is a meaningful way to create positive change while gaining valuable experience and connecting with like-minded people.',
    },
    {
        id: 'participation',
        title: 'Participation',
        icon: Handshake,
        body: "This section provides opportunities to engage in workshops, awareness campaigns, and community programs, allowing individuals to contribute their ideas, skills, and energy. By participating, you can play a direct role in creating positive change and supporting VDO's mission to empower communities.",
    },
]

export default function Opportunities() {
    return (
        <SiteLayout title="Opportunities">
            <PhotoStrip photos={photos} />

            {/* Categories grid */}
            <section className="bg-gray-100 py-10">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-3">
                        {opportunities.map((op) => {
                            const Icon = op.icon
                            return (
                                <article
                                    key={op.id}
                                    id={op.id}
                                    className="scroll-mt-24"
                                >
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(0,175,239)] text-white shadow-md">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h2 className="mb-3 text-xl font-semibold text-[#23369C] md:text-2xl">
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

            {/* Current listings placeholder */}
            <section className="bg-gray-100 pb-14">
                <div className="container mx-auto px-4">
                    <h3 className="mb-4 text-base font-bold text-[#23369C]">
                        Current Listings
                    </h3>
                    <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, row) => (
                            <div
                                key={row}
                                className="grid grid-cols-1 gap-2 md:grid-cols-3"
                            >
                                {Array.from({ length: 3 }).map((_, col) => (
                                    <div
                                        key={col}
                                        className="h-8 rounded-md border border-dashed border-gray-300 bg-white/60"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-xs italic text-gray-500">
                        Live job postings, bid announcements, and volunteer
                        opportunities will appear here once connected to the
                        data source.
                    </p>
                </div>
            </section>
        </SiteLayout>
    )
}
