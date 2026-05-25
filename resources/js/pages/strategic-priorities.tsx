import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Link } from '@inertiajs/react'
import * as Icons from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { photos } from '@/components/strategic-priorities/blocks'

interface CardData {
    id: number
    title: string
    href: string
    icon_name: string | null
    description: string | null
    order: number
}

const fallbackIcon = Icons.CheckCircle2

function resolveIcon(name: string | null | undefined): LucideIcon {
    if (!name) return fallbackIcon
    const lookup = (Icons as unknown as Record<string, unknown>)[name]
    if (typeof lookup === 'function' || (lookup && typeof lookup === 'object')) {
        return lookup as LucideIcon
    }
    return fallbackIcon
}

interface Props {
    cards?: CardData[]
}

const defaultCards: CardData[] = [
    { id: 1, title: 'Education', href: '/strategic-priorities/education', icon_name: 'BookOpen', description: 'Quality, inclusive, and safe learning for girls, adolescents, out-of-school children, and youth.', order: 0 },
    { id: 2, title: 'Economic Growth', href: '/strategic-priorities/economic-growth', icon_name: 'TrendingUp', description: 'Livelihoods, TVET, entrepreneurship, and career placement for women and youth.', order: 1 },
    { id: 3, title: 'Rural Development', href: '/strategic-priorities/rural-development', icon_name: 'Building2', description: 'Climate-resilient communities, water security, and sustainable urban–rural development.', order: 2 },
    { id: 4, title: 'Health and Nutrition', href: '/strategic-priorities/health-and-nutrition', icon_name: 'HeartPulse', description: 'Primary healthcare, nutrition, and mobile services for women, children, and crisis-affected communities.', order: 3 },
    { id: 5, title: 'Emergency Response', href: '/strategic-priorities/emergency-response', icon_name: 'AlertTriangle', description: 'Rapid, dignified humanitarian assistance for households affected by crises and disasters.', order: 4 },
    { id: 6, title: "VDO's Cross Cutting Areas", href: '/strategic-priorities/cross-cutting-areas', icon_name: 'Layers', description: 'Gender, safeguarding, inclusion, accountability, and protection mainstreamed across programs.', order: 5 },
    { id: 7, title: 'Target Group', href: '/strategic-priorities/target-group', icon_name: 'Target', description: 'Primary beneficiaries: women, girls, youth, out-of-school children, and crisis-affected families.', order: 6 },
    { id: 8, title: "VDO's Secondary Beneficiaries", href: '/strategic-priorities/secondary-beneficiaries', icon_name: 'UsersRound', description: 'Community leaders, local CSOs, employers, and government bodies enabling program delivery.', order: 7 },
    { id: 9, title: 'Tertiary Audience', href: '/strategic-priorities/tertiary-audience', icon_name: 'Users', description: 'Donors, diaspora networks, media, and research institutions supporting advocacy and policy.', order: 8 },
    { id: 10, title: "VDO's Contribution Project", href: '/strategic-priorities/contribution-project', icon_name: 'CheckCircle2', description: 'Frontline awareness, training, dignity kits, and integrated health-nutrition-immunization work.', order: 9 },
]

export default function StrategicPriorities({ cards }: Props) {
    const priorities = cards && cards.length > 0 ? cards : defaultCards

    return (
        <SiteLayout title="Strategic Priorities">
            <PhotoStrip photos={photos} />

            <section className="bg-[rgb(245,245,245)] pb-14">
                <div className="mx-auto max-w-[1240px] px-6 py-8 md:px-10 lg:px-14">
                    <div className="mb-8 max-w-3xl">
                        <h1 className="text-3xl font-semibold text-[rgb(62,64,149)] md:text-4xl">
                            Strategic Priorities
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            VDO's work is organized around ten interconnected
                            priorities that together shape inclusive,
                            community-driven impact across Afghanistan. Select
                            an area below to explore programs, coverage, and
                            outcomes.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {priorities.map((card) => {
                            const Icon = resolveIcon(card.icon_name)
                            return (
                                <Link
                                    key={card.id}
                                    href={card.href}
                                    className="group flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[rgb(0,175,239)] hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)] transition-colors group-hover:bg-[rgb(0,175,239)] group-hover:text-white">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <h2 className="text-base font-bold text-[rgb(62,64,149)]">
                                            {card.title}
                                        </h2>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {card.description}
                                    </p>
                                    <span className="mt-4 text-xs font-semibold text-[rgb(0,175,239)] group-hover:underline">
                                        Learn more →
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}
