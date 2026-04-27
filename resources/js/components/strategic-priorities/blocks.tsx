import { ImageIcon, type LucideIcon } from 'lucide-react'

export const photos = [
    { src: '/Header and Gallary Photos/06.jpg', alt: 'Education programs' },
    { src: '/Header and Gallary Photos/12.jpg', alt: 'Community development' },
    { src: '/Header and Gallary Photos/20.jpg', alt: 'Humanitarian response' },
]

export const crossCuttingAreas = [
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

export const primaryBeneficiaries = [
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

export function SectionHeading({
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

export function Paragraph({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <p
            className={`text-justify text-sm leading-relaxed text-gray-700 md:text-[15px] ${
                className ?? ''
            }`}
        >
            {children}
        </p>
    )
}

export function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 md:text-[15px]">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
}

export interface DonutSegment {
    label: string
    value: number
    color: string
}

export function DonutChart({
    segments,
    centerLabel,
    size = 180,
}: {
    segments: DonutSegment[]
    centerLabel?: string
    size?: number
}) {
    const stops = segments
        .reduce<{ acc: string[]; total: number }>(
            ({ acc, total }, seg) => {
                const end = total + seg.value
                acc.push(`${seg.color} ${total}% ${end}%`)
                return { acc, total: end }
            },
            { acc: [], total: 0 },
        )
        .acc.join(', ')

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

export interface BarItem {
    label: string
    value: string
    percent: number
    color?: string
    highlight?: boolean
}

export function HorizontalBars({ items }: { items: BarItem[] }) {
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

export function MapPlaceholder({
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
            {hint && <p className="text-xs italic text-gray-400">{hint}</p>}
        </div>
    )
}

export function PageSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-gray-100 pb-14">
            <div
                className="mx-auto max-w-[1240px] space-y-6 bg-center bg-no-repeat px-6 py-8 md:px-10 lg:px-14"
                style={{
                    backgroundImage: "url('/svg/Map.svg')",
                    backgroundSize: 'contain',
                }}
            >
                {children}
            </div>
        </section>
    )
}

export function WorldMapBackdrop() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 -z-10 opacity-30"
            style={{
                left: '50%',
                width: '100vw',
                transform: 'translateX(-50%)',
                backgroundImage: `url('/svg/Map.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
            }}
        />
    )
}
