import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    AlertTriangle,
    BookOpen,
    Building2,
    CheckCircle2,
    HeartPulse,
    ImageIcon,
    Layers,
    type LucideIcon,
    Target,
    TrendingUp,
    Users,
    UsersRound,
} from 'lucide-react'

const photos = [
    { src: '/Header and Gallary Photos/06.jpg', alt: 'Education programs' },
    { src: '/Header and Gallary Photos/12.jpg', alt: 'Community development' },
    { src: '/Header and Gallary Photos/20.jpg', alt: 'Humanitarian response' },
]

function SectionHeading({
    icon: Icon,
    title,
}: {
    icon: LucideIcon
    title: string
}) {
    return (
        <div className="mb-4 flex items-center gap-3">
            <Icon className="h-8 w-8 text-[rgb(0,175,239)]" />
            <h2 className="text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                {title}
            </h2>
        </div>
    )
}

function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
            {children}
        </p>
    )
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 md:text-[15px]">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
}

// --- Chart primitives ---

interface DonutSegment {
    label: string
    value: number // percentage (0-100)
    color: string
}

function DonutChart({
    segments,
    centerLabel,
    size = 180,
}: {
    segments: DonutSegment[]
    centerLabel?: string
    size?: number
}) {
    let cumulative = 0
    const stops = segments
        .map((seg) => {
            const start = cumulative
            cumulative += seg.value
            return `${seg.color} ${start}% ${cumulative}%`
        })
        .join(', ')

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="relative rounded-full shadow-inner"
                style={{
                    width: size,
                    height: size,
                    background: `conic-gradient(${stops})`,
                }}
            >
                <div className="absolute inset-[22%] flex items-center justify-center rounded-full bg-gray-100">
                    {centerLabel && (
                        <span className="text-center text-base font-bold text-[rgb(62,64,149)]">
                            {centerLabel}
                        </span>
                    )}
                </div>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
                {segments.map((seg) => (
                    <li key={seg.label} className="flex items-center gap-1.5">
                        <span
                            className="inline-block h-3 w-3 rounded-sm"
                            style={{ backgroundColor: seg.color }}
                        />
                        <span className="text-gray-700">
                            {seg.label}{' '}
                            <span className="font-semibold text-[rgb(62,64,149)]">
                                {seg.value}%
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

interface BarItem {
    label: string
    value: string
    percent: number
    color?: string
    highlight?: boolean
}

function HorizontalBars({ items }: { items: BarItem[] }) {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="grid grid-cols-[110px_1fr_auto_auto] items-center gap-3 text-sm"
                >
                    <span
                        className={`font-medium ${
                            item.highlight
                                ? 'text-[rgb(62,64,149)]'
                                : 'text-gray-700'
                        }`}
                    >
                        {item.label}
                    </span>
                    <div className="relative h-3 rounded-full bg-gray-200">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                                width: `${item.percent}%`,
                                backgroundColor:
                                    item.color || 'rgb(0,175,239)',
                            }}
                        />
                    </div>
                    <span className="min-w-[70px] text-right font-semibold text-[rgb(62,64,149)]">
                        {item.value}
                    </span>
                    <span className="min-w-[40px] text-right text-xs text-gray-500">
                        {item.percent}%
                    </span>
                </div>
            ))}
        </div>
    )
}

function MapPlaceholder({
    label,
    hint,
}: {
    label: string
    hint?: string
}) {
    return (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white/60 p-6 text-center">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <p className="text-sm font-semibold text-gray-500">{label}</p>
            {hint && (
                <p className="text-xs italic text-gray-400">{hint}</p>
            )}
        </div>
    )
}

// --- Static data ---

const crossCuttingAreas = [
    "Gender equality & Women's empowerment",
    'Safeguarding, PSEAH & Child protection',
    'Accountability to affected people (AAP)',
    'Do no harm & conflict sensitivity',
    'Protection mainstreaming',
    'Inclusion of persons with disabilities',
    'Environmental sustainability & Climate sensitivity',
    'Localization & Community ownership',
    'Data protection & Ethical information management',
    'Anti-fraud, anti-corruption & Aid diversion protection',
    'MEAL & Evidence-based programming',
    'Equity, diversity & Inclusion (EDI)',
]

const primaryBeneficiaries = [
    {
        title: 'Women and Girls',
        body: 'Female-headed households, GBV survivors, Adolescent girls, Women entrepreneurs.',
    },
    {
        title: 'Youth',
        body: 'Young men and women needing skills, internships, employment, civic engagement.',
    },
    {
        title: 'Out-of-school children',
        body: 'Conflict affected, displaced or poverty-impacted children needing protection or alternative education.',
    },
    {
        title: 'Persons with disabilities and caregivers',
        body: 'Inclusive education training, livelihood services.',
    },
    {
        title: 'Crisis-affected communities',
        body: 'IDPs, returnees, and disaster-affected households receiving WASH, health, and food support.',
    },
]

export default function StrategicPriorities() {
    return (
        <SiteLayout title="Strategic Priorities">
            <PhotoStrip photos={photos} />

            <section className="bg-gray-100 pb-14">
                <div className="container mx-auto space-y-14 px-4 py-8">
                    {/* Education */}
                    <article id="education">
                        <SectionHeading icon={BookOpen} title="Education:" />
                        <div className="space-y-4">
                            <Paragraph>
                                VDO is a development organization in Afghanistan
                                dedicated to improving quality education through
                                a strong focus on access, equity, safety, and
                                inclusion. By working in the country's most
                                underserved communities, VDO strives to ensure
                                that every child—regardless of gender, ability,
                                or background—has the opportunity to learn in a
                                safe and supportive environment.
                            </Paragraph>
                            <Paragraph>
                                VDO's education initiatives prioritize the most
                                vulnerable and underserved populations, focusing
                                on five key target groups:
                            </Paragraph>
                        </div>

                        {/* 5 target groups with dotted timeline */}
                        <div className="mt-8">
                            <div className="relative grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-0">
                                {[
                                    'Girls',
                                    'Adolescents',
                                    'Out-of-school Children',
                                    'Children with Disabilities',
                                    'Youth without Education or Skills Pathways',
                                ].map((tg) => (
                                    <div
                                        key={tg}
                                        className="flex flex-col items-center px-2 text-center"
                                    >
                                        <span className="h-3 w-3 rounded-full bg-[rgb(0,175,239)]" />
                                        <p className="mt-3 text-xs font-semibold text-[rgb(62,64,149)] md:text-sm">
                                            {tg}
                                        </p>
                                    </div>
                                ))}
                                {/* Dotted connector line behind dots */}
                                <div className="absolute left-[10%] right-[10%] top-[6px] -z-10 hidden border-t-2 border-dotted border-[rgb(0,175,239)] md:block" />
                            </div>
                        </div>

                        <p className="mt-10 text-sm font-semibold text-[rgb(62,64,149)]">
                            To date, the following percentages of beneficiaries
                            have been reached across education coverage areas:
                        </p>

                        <h3 className="mt-8 text-base font-bold text-[rgb(62,64,149)]">
                            Coverage Areas in Education:
                        </h3>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                            {/* Map + legend */}
                            <div>
                                <MapPlaceholder
                                    label="Afghanistan — Education Coverage"
                                    hint="Kabul · Northeastern · Emergency-affected districts"
                                />
                                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[rgb(0,175,239)]" />
                                        <span>
                                            <strong>Kabul</strong> — Urban
                                            expansion and increased schooling
                                            access
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[rgb(62,64,149)]" />
                                        <span>
                                            <strong>
                                                Northeastern Regions
                                            </strong>{' '}
                                            — Reaching underserved rural
                                            communities
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[rgb(0,175,239)]" />
                                        <span>
                                            <strong>
                                                Emergency-affected districts
                                            </strong>{' '}
                                            — Education support in crisis
                                            affected areas
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Donut chart */}
                            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6">
                                <DonutChart
                                    centerLabel="100%"
                                    segments={[
                                        {
                                            label: 'Girls',
                                            value: 30,
                                            color: 'rgb(62,64,149)',
                                        },
                                        {
                                            label: 'Adolescents',
                                            value: 25,
                                            color: 'rgb(0,175,239)',
                                        },
                                        {
                                            label: 'Out-of-school Children',
                                            value: 20,
                                            color: '#7AC4E8',
                                        },
                                        {
                                            label: 'Children with Disabilities',
                                            value: 10,
                                            color: '#a8dcf0',
                                        },
                                        {
                                            label: 'Youth without Education',
                                            value: 15,
                                            color: '#cdeaf7',
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <Paragraph>
                                In addition, VDO works closely with caregivers
                                and community education structures to strengthen
                                local support systems, while also empowering
                                government and community-based teachers with
                                the tools and training they need to deliver
                                quality, inclusive education.
                            </Paragraph>
                            <Paragraph>
                                By constructing schools, distributing learning
                                materials, and supporting adolescent girls'
                                education, VDO contributes directly to{' '}
                                <strong className="text-[rgb(62,64,149)]">SDG 4</strong>{' '}
                                (Quality Education) and{' '}
                                <strong className="text-[rgb(62,64,149)]">SDG 5</strong>{' '}
                                (Gender Equality). Our work ensures that
                                education remains a right, not a privilege, even
                                for those in the most remote and
                                displacement-affected communities.
                            </Paragraph>
                        </div>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            Number of Beneficiaries Reached:
                        </h3>
                        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
                            <HorizontalBars
                                items={[
                                    {
                                        label: 'Female',
                                        value: '166,920',
                                        percent: 48,
                                        color: 'rgb(0,175,239)',
                                    },
                                    {
                                        label: 'Male',
                                        value: '153,080',
                                        percent: 52,
                                        color: 'rgb(62,64,149)',
                                    },
                                    {
                                        label: 'Total',
                                        value: '321,000',
                                        percent: 100,
                                        color: '#7AC4E8',
                                        highlight: true,
                                    },
                                ]}
                            />
                        </div>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            Key Achievements:
                        </h3>
                        <Bullets
                            items={[
                                'Implementing Community Based Education (CBE), Accelerate Learning Programs (ALP), Teacher training in multiple provinces using VDO-developed GBV-safe schooling guides.',
                                'Improved school safety awareness and retention of girls in education.',
                                "Field-tested community engagement models increasing access and acceptance for girls' learning.",
                                'Demonstrated successful transition of community schools to formal education systems.',
                            ]}
                        />
                    </article>

                    {/* Economic Growth */}
                    <article id="economic-growth">
                        <SectionHeading
                            icon={TrendingUp}
                            title="Economic Growth:"
                        />
                        <div className="space-y-4">
                            <Paragraph>
                                VDO has advanced economic growth by equipping
                                individuals—especially women and youth—with
                                startup kits, small business grants, and
                                financial literacy skills, enabling them to
                                build sustainable livelihoods. The organization
                                provides TVET and market-aligned skills
                                training, coupled with entrepreneurship support,
                                mentorship, and coaching to help participants
                                successfully launch or expand their businesses.
                                Through start-up toolkits and seed grants, VDO
                                has strengthened numerous women-led enterprises
                                and promoted financial independence. Its WAQAR
                                Career Center initiative offers career guidance
                                and job placement services, linking jobseekers
                                to meaningful employment.
                            </Paragraph>
                            <Paragraph>
                                As a frontline defender of humanitarian
                                principles, VDO engages in policy dialogues on
                                resilience and inclusive growth. Linking
                                grassroots practices with national frameworks,
                                we contribute to{' '}
                                <strong className="text-[rgb(62,64,149)]">SDG 1</strong>{' '}
                                (No Poverty) and{' '}
                                <strong className="text-[rgb(62,64,149)]">SDG 8</strong>{' '}
                                (Decent Work & Economic Growth). Our integrated
                                approach helps displaced and marginalized
                                households secure food, income, and dignity.
                            </Paragraph>
                        </div>

                        <h3 className="mt-8 text-base font-bold text-[rgb(62,64,149)]">
                            Geographic Coverage of Economic Growth Initiatives:
                        </h3>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                            <MapPlaceholder
                                label="Afghanistan Regional Map"
                                hint="Kabul · Northern · Western · Eastern regions"
                            />
                            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6">
                                <DonutChart
                                    centerLabel="81,000"
                                    segments={[
                                        {
                                            label: 'Women',
                                            value: 45,
                                            color: 'rgb(0,175,239)',
                                        },
                                        {
                                            label: 'Men',
                                            value: 40,
                                            color: 'rgb(62,64,149)',
                                        },
                                        {
                                            label: 'Children / Youth',
                                            value: 15,
                                            color: '#7AC4E8',
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            Number of Beneficiaries Reached:
                        </h3>
                        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
                            <HorizontalBars
                                items={[
                                    {
                                        label: 'Women',
                                        value: '36,450',
                                        percent: 45,
                                        color: 'rgb(0,175,239)',
                                    },
                                    {
                                        label: 'Men',
                                        value: '32,400',
                                        percent: 40,
                                        color: 'rgb(62,64,149)',
                                    },
                                    {
                                        label: 'Children / Youth',
                                        value: '12,150',
                                        percent: 15,
                                        color: '#7AC4E8',
                                    },
                                    {
                                        label: 'Total',
                                        value: '81,000',
                                        percent: 100,
                                        color: '#a8dcf0',
                                        highlight: true,
                                    },
                                ]}
                            />
                        </div>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            Key Achievements:
                        </h3>
                        <Bullets
                            items={[
                                'Multiple women-owned small businesses launched and sustained.',
                                'Youth employed through career placement support.',
                                'Women with disabilities supported through home-based livelihoods.',
                                'Increased income improvement validated by post-training assessments.',
                            ]}
                        />
                    </article>

                    {/* Urban / Rural Development */}
                    <article id="rural-development">
                        <SectionHeading
                            icon={Building2}
                            title="Urban Development:"
                        />
                        <div className="space-y-4">
                            <Paragraph>
                                VDO's Urban Development work promotes
                                sustainable, climate-resilient, and inclusive
                                cities by integrating environmental protection,
                                community-driven planning, and risk-reduction
                                measures across all programs. With a commitment
                                to strengthening the resilience of Afghanistan's
                                most vulnerable populations—including rural
                                farming families affected by droughts and
                                floods, women and girls facing livelihood and
                                water insecurity, internally displaced people
                                (IDPs), and disaster-affected communities,
                                people with disabilities and vulnerable
                                households, youth engaged in local climate
                                action, community resilience and water
                                management groups.
                            </Paragraph>
                        </div>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            Our interventions include:
                        </h3>
                        <Bullets
                            items={[
                                'Urban reforestation and greenbelt development to reduce heat islands, prevent erosion, and restore ecological balance.',
                                'Promotion of clean and renewable energy sources, including household and community-level solar solutions.',
                                'Climate-smart agriculture models, tailored for peri-urban households and small-scale farmers, to improve food security and reduce pressure on degraded land.',
                                'Community-led environmental stewardship, including awareness campaigns on waste reduction, recycling, water conservation, and disaster preparedness.',
                                'Urban water management through improved drainage, flood prevention measures, and protection of natural water sources.',
                            ]}
                        />

                        <Paragraph>
                            <span className="mt-4 block">
                                These efforts aim to safeguard lives,
                                livelihoods, water security, and food systems,
                                while promoting healthier ecosystems and
                                long-term sustainability. As a national advocate
                                for climate resilience, VDO bridges local
                                adaptation practices with global sustainability
                                frameworks, contributing directly to{' '}
                                <strong className="text-[rgb(62,64,149)]">
                                    SDG 11
                                </strong>{' '}
                                (Sustainable Cities and Communities),{' '}
                                <strong className="text-[rgb(62,64,149)]">
                                    SDG 13
                                </strong>{' '}
                                (Climate Action), and{' '}
                                <strong className="text-[rgb(62,64,149)]">
                                    SDG 15
                                </strong>{' '}
                                (Life on Land).
                            </span>
                        </Paragraph>

                        <h3 className="mt-8 text-base font-bold text-[rgb(62,64,149)]">
                            Geographic Coverage of Urban Development
                            Initiatives:
                        </h3>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                            <MapPlaceholder
                                label="Afghanistan Regional Map"
                                hint="Drought- and flood-affected regions"
                            />
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {[
                                    {
                                        region: 'Northern drought-prone provinces',
                                        pct: '30%',
                                        num: '14,640',
                                    },
                                    {
                                        region: 'Eastern flood-affected communities',
                                        pct: '25%',
                                        num: '12,200',
                                    },
                                    {
                                        region: 'Western drought-prone provinces',
                                        pct: '25%',
                                        num: '12,200',
                                    },
                                    {
                                        region: 'Central flood-affected communities',
                                        pct: '20%',
                                        num: '9,760',
                                    },
                                ].map((r) => (
                                    <div
                                        key={r.region}
                                        className="rounded-lg border border-gray-200 bg-white p-4"
                                    >
                                        <p className="text-xs font-medium text-gray-700">
                                            {r.region}
                                        </p>
                                        <p className="mt-1 text-lg font-bold text-[rgb(62,64,149)]">
                                            {r.num}
                                        </p>
                                        <p className="text-xs font-semibold text-[rgb(0,175,239)]">
                                            {r.pct}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            The below number of beneficiaries reached through
                            Urban Development initiatives:
                        </h3>
                        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
                            <HorizontalBars
                                items={[
                                    {
                                        label: 'Farmers',
                                        value: '19,520',
                                        percent: 40,
                                        color: 'rgb(0,175,239)',
                                    },
                                    {
                                        label: 'Women',
                                        value: '17,080',
                                        percent: 35,
                                        color: 'rgb(62,64,149)',
                                    },
                                    {
                                        label: 'IDPs',
                                        value: '7,320',
                                        percent: 15,
                                        color: '#7AC4E8',
                                    },
                                    {
                                        label: 'People with Disabilities',
                                        value: '4,880',
                                        percent: 10,
                                        color: '#a8dcf0',
                                    },
                                    {
                                        label: 'Total',
                                        value: '48,800',
                                        percent: 100,
                                        color: '#cdeaf7',
                                        highlight: true,
                                    },
                                ]}
                            />
                        </div>
                    </article>

                    {/* Health and Nutrition */}
                    <article id="health-and-nutrition">
                        <SectionHeading
                            icon={HeartPulse}
                            title="Health and Nutrition:"
                        />
                        <Paragraph>
                            VDO advances equitable access to essential and
                            life-saving primary healthcare and nutrition
                            services for women, children, and crisis-affected
                            communities, ensuring dignity, safety, and stronger
                            foundations for long-term well-being, through
                            community health centers, mobile health and
                            nutrition teams, and emergency response approaches.
                        </Paragraph>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            VDO's interventions in Health sector include:
                        </h3>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6">
                                <DonutChart
                                    centerLabel="Health Interventions"
                                    segments={[
                                        {
                                            label: 'Community health awareness',
                                            value: 35,
                                            color: 'rgb(0,175,239)',
                                        },
                                        {
                                            label: 'Nutrition for children & pregnant women',
                                            value: 30,
                                            color: 'rgb(62,64,149)',
                                        },
                                        {
                                            label: 'Nutrition assistance to households',
                                            value: 20,
                                            color: '#7AC4E8',
                                        },
                                        {
                                            label: 'Support & referral for women / GBV survivors',
                                            value: 15,
                                            color: '#a8dcf0',
                                        },
                                    ]}
                                />
                            </div>
                            <MapPlaceholder
                                label="Health and Nutrition Geographic Presence"
                                hint="Central · Northeastern · West · Eastern regions"
                            />
                        </div>

                        <Paragraph>
                            <span className="mt-6 block">
                                VDO, as an active member of the Health and WASH
                                Clusters, ensures alignment with global
                                humanitarian standards. Our focus on training
                                health workers and deploying mobile services
                                reflects Afghanistan's urgent need for equitable
                                healthcare access, advancing{' '}
                                <strong className="text-[rgb(62,64,149)]">SDG 3</strong>{' '}
                                (Good Health & Wellbeing) and reducing
                                inequalities for the most at-risk.
                            </span>
                        </Paragraph>

                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            Number of Beneficiaries Reached:
                        </h3>
                        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
                            <HorizontalBars
                                items={[
                                    {
                                        label: 'Children',
                                        value: '390,000',
                                        percent: 50,
                                        color: 'rgb(0,175,239)',
                                    },
                                    {
                                        label: 'Women',
                                        value: '234,000',
                                        percent: 30,
                                        color: 'rgb(62,64,149)',
                                    },
                                    {
                                        label: 'Others',
                                        value: '156,000',
                                        percent: 20,
                                        color: '#7AC4E8',
                                    },
                                    {
                                        label: 'Total',
                                        value: '780,000',
                                        percent: 100,
                                        color: '#a8dcf0',
                                        highlight: true,
                                    },
                                ]}
                            />
                        </div>
                    </article>

                    {/* Emergency Response */}
                    <article id="emergency-response">
                        <SectionHeading
                            icon={AlertTriangle}
                            title="Emergency Response:"
                        />
                        <Paragraph>
                            VDO delivers rapid, community-centered emergency
                            assistance to households affected by crises, natural
                            disasters, and conflict across Afghanistan. Our
                            approach focuses on meeting urgent needs while
                            protecting the dignity and resilience of affected
                            families. Through coordinated humanitarian
                            interventions—including emergency cash assistance,
                            distribution of essential non-food items, nutrition
                            support, and access to lifesaving information and
                            referrals—we ensure that vulnerable women, children,
                            and marginalized groups receive timely and equitable
                            support. Guided by local knowledge and rooted in
                            strong community networks, VDO's emergency response
                            programs are designed to save lives, reduce
                            suffering, and help communities recover with
                            strength and hope.
                        </Paragraph>
                    </article>

                    {/* Cross Cutting Areas */}
                    <article id="cross-cutting-areas">
                        <SectionHeading
                            icon={Layers}
                            title="VDO's Cross Cutting Areas:"
                        />
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {crossCuttingAreas.map((area, i) => (
                                <div
                                    key={area}
                                    className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3"
                                >
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(0,175,239)] text-xs font-bold text-white">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="text-sm font-medium text-gray-700">
                                        {area}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* Target Groups */}
                    <article id="target-group">
                        <SectionHeading icon={Target} title="Target Groups:" />
                        <Paragraph>
                            VDO's beneficiaries include vulnerable and
                            underserved groups across Afghanistan who directly
                            and indirectly receive support through its programs:
                        </Paragraph>
                        <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                            VDO's Primary Beneficiaries
                        </h3>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            {primaryBeneficiaries.map((p, i) => (
                                <div
                                    key={p.title}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(62,64,149)] text-xs font-bold text-white">
                                        {i + 1}
                                    </span>
                                    <h4 className="text-sm font-bold text-[rgb(62,64,149)]">
                                        {p.title}
                                    </h4>
                                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                                        {p.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* Secondary Beneficiaries */}
                    <article id="secondary-beneficiaries">
                        <SectionHeading
                            icon={UsersRound}
                            title="VDO's Secondary Beneficiaries:"
                        />
                        <Bullets
                            items={[
                                'Community Leaders & Influencers: Elders and religious figures supporting safe participation and positive social norms.',
                                'Local Civil Society Organizations: Women- and youth-led groups benefiting from capacity-building, collaboration, advocacy (e.g., Change Drive Network).',
                                'Private Sector & Employers: Access to skilled jobseekers, apprenticeships, internships, inclusive employment.',
                                'Government Bodies & Local Authorities: Facilitating policy alignment, approvals, and safe community access.',
                            ]}
                        />
                    </article>

                    {/* Tertiary Audience */}
                    <article id="tertiary-audience">
                        <SectionHeading
                            icon={Users}
                            title="Tertiary Audience (Influencers & Advocates):"
                        />
                        <Paragraph>
                            The tertiary audience contributes through funding,
                            advocacy, and technical collaboration, while Afghan
                            diaspora leaders and regional/global networks
                            amplify the voices of women and youth, and
                            researchers, academics, and storytelling partners
                            support evidence-based policy and highlight local
                            success stories.
                        </Paragraph>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {[
                                'International NGOs, UN Agencies & Donors',
                                'Diaspora & Global Network',
                                'Media & Research Institutions',
                            ].map((t) => (
                                <div
                                    key={t}
                                    className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700"
                                >
                                    {t}
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* VDO Contribution Project */}
                    <article id="contribution-project">
                        <SectionHeading
                            icon={CheckCircle2}
                            title="VDO Contribution Project:"
                        />
                        <Bullets
                            items={[
                                'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management in the North.',
                                'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS.',
                                'Conduct 30 awareness-raising sessions on available nutrition services and provide training to nutrition partners on conducting safety audits.',
                                'Distribute dignity kits to vulnerable women and girls and establish women- and girls-friendly spaces near health centres for recreational activities and GBV awareness.',
                                'Through the Integrated Health–Nutrition–Immunization Project, VDO addressed vaccine misconceptions and promoted positive health behaviors, leading caregivers to better understand and accept immunization and nutrition services, improving child health outcomes in the East.',
                            ]}
                        />
                    </article>
                </div>
            </section>
        </SiteLayout>
    )
}
