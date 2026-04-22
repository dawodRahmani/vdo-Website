import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ChevronDown, Menu, Search, User, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavChild {
    title: string
    href: string
}

interface NavItem {
    title: string
    href: string
    items?: NavChild[]
}

const navItems: NavItem[] = [
    { title: 'About Us', href: '/about' },
    {
        title: 'Strategic Priorities',
        href: '/strategic-priorities',
        items: [
            { title: 'Education', href: '/strategic-priorities/education' },
            {
                title: 'Economic Growth',
                href: '/strategic-priorities/economic-growth',
            },
            {
                title: 'Rural Development',
                href: '/strategic-priorities/rural-development',
            },
            {
                title: 'Health and Nutrition',
                href: '/strategic-priorities/health-and-nutrition',
            },
            {
                title: 'Emergency Response',
                href: '/strategic-priorities/emergency-response',
            },
            {
                title: "VDO's Cross Cutting Areas",
                href: '/strategic-priorities/cross-cutting-areas',
            },
            {
                title: 'Target Group',
                href: '/strategic-priorities/target-group',
            },
            {
                title: "VDO's Secondary Beneficiaries",
                href: '/strategic-priorities/secondary-beneficiaries',
            },
            {
                title: 'Tertiary Audience',
                href: '/strategic-priorities/tertiary-audience',
            },
            {
                title: "VDO's Contribution Project",
                href: '/strategic-priorities/contribution-project',
            },
        ],
    },
    {
        title: 'Where We Work',
        href: '/where-we-work',
        items: [
            { title: 'Central Region', href: '/where-we-work#central' },
            {
                title: 'Northeastern Region',
                href: '/where-we-work#northeastern',
            },
            { title: 'Eastern Region', href: '/where-we-work#eastern' },
            { title: 'Western Region', href: '/where-we-work#western' },
            { title: 'Southern Region', href: '/where-we-work#southern' },
            {
                title: 'Northwestern Region',
                href: '/where-we-work#northwestern',
            },
        ],
    },
    { title: 'Our Commitment', href: '/our-commitment' },
    {
        title: "VDO's Resilience",
        href: '/vdo-resilience',
        items: [
            { title: "VDO's Strategy", href: '/vdo-resilience#our-capacity' },
            { title: 'Policies', href: '/vdo-resilience#policies' },
            {
                title: 'Localization Framework',
                href: '/vdo-resilience#our-capacity',
            },
            {
                title: 'Stakeholder Engagement Framework',
                href: '/vdo-resilience#our-capacity',
            },
            { title: 'Governance', href: '/vdo-resilience#our-capacity' },
            {
                title: "VDO's Operational Capacity",
                href: '/vdo-resilience#our-capacity',
            },
            { title: 'Compliance', href: '/vdo-resilience#policies' },
            {
                title: 'Risk management framework',
                href: '/vdo-resilience#policies',
            },
            {
                title: 'Inclusion',
                href: '/vdo-resilience#programmatic-approach',
            },
            {
                title: 'Impact-oriented programming approach',
                href: '/vdo-resilience#programmatic-approach',
            },
            { title: "VDO's Team", href: '/vdo-resilience#our-capacity' },
            {
                title: 'Contributing to Collective Resilience',
                href: '/vdo-resilience#collective-resilience',
            },
            {
                title: "VDO's memberships",
                href: '/vdo-resilience#collective-resilience',
            },
            {
                title: "Organization's Contribution",
                href: '/vdo-resilience#collective-resilience',
            },
        ],
    },
    { title: 'Opportunities', href: '/opportunities' },
    { title: 'Media', href: '/media' },
]

function useIsActive() {
    const { url } = usePage()
    return (href: string) => url === href || url.startsWith(`${href}/`)
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
    const isActive = useIsActive()

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-100 py-3">
            <div className="mx-auto flex w-full max-w-[1360px] items-start gap-4 px-4 md:px-6 lg:px-8">
                {/* Logo sits outside nav container */}
                <Link href="/" className="flex-shrink-0">
                    <img
                        src="/images/logo.png"
                        alt="VDO Vision"
                        className="h-16 w-auto object-contain md:h-[72px]"
                    />
                </Link>

                <div className="min-w-0 flex-1">
                    <div className="mx-auto max-w-[1240px]">
                        {/* Blue bar */}
                        <div className="mt-2 flex h-8 w-full items-center justify-between gap-4 bg-[rgb(62,64,149)] px-3 shadow-sm md:h-10">
                        {/* Desktop nav */}
                        <nav className="hidden lg:flex">
                            <ul className="flex items-center gap-1 xl:gap-2">
                                {navItems.map((item) => {
                                    const active = isActive(item.href)
                                    const hasChildren = !!item.items?.length
                                    return (
                                        <li
                                            key={item.title}
                                            className="group relative"
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'relative flex items-center gap-1 px-2 py-1 text-xs font-medium text-white transition-colors hover:text-white/90 xl:px-3',
                                                    active &&
                                                        "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-[rgb(0,175,239)] after:content-['']",
                                                )}
                                            >
                                                {item.title}
                                                {hasChildren && (
                                                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                                                )}
                                            </Link>
                                            {active && (
                                                <span
                                                    aria-hidden
                                                    className="absolute -bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[rgb(0,175,239)]"
                                                />
                                            )}

                                            {/* Dropdown */}
                                            {hasChildren && (
                                                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                                                    <ul className="min-w-[260px] overflow-hidden rounded-md bg-[rgba(0,175,239,0.92)] text-sm text-white shadow-xl backdrop-blur-sm">
                                                        {item.items!.map(
                                                            (sub) => (
                                                                <li key={sub.title}>
                                                                    <Link
                                                                        href={
                                                                            sub.href
                                                                        }
                                                                        className="block px-4 py-2 transition-colors hover:bg-white/15"
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                            {/* Right icons */}
                            <div className="flex items-center gap-0.5">
                            <button
                                aria-label="Account"
                                className="hidden h-7 w-7 items-center justify-center text-white transition-colors hover:bg-white/10 md:inline-flex"
                            >
                                <User className="h-4 w-4" />
                            </button>
                            <button
                                aria-label="Menu"
                                className="hidden h-7 w-7 items-center justify-center text-white transition-colors hover:bg-white/10 md:inline-flex"
                            >
                                <Menu className="h-4 w-4" />
                            </button>
                            <button
                                aria-label="Search"
                                className="hidden h-7 w-7 items-center justify-center text-white transition-colors hover:bg-white/10 md:inline-flex"
                            >
                                <Search className="h-4 w-4" />
                            </button>

                                {/* Mobile toggle */}
                                <button
                                    aria-label="Toggle navigation"
                                    onClick={() => setMobileOpen((v) => !v)}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
                                >
                                    {mobileOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Mobile nav */}
                    {mobileOpen && (
                        <nav className="mt-2 rounded-md bg-[rgb(62,64,149)] py-2 lg:hidden">
                            <ul className="flex flex-col gap-1 px-2">
                                {navItems.map((item) => {
                                    const active = isActive(item.href)
                                    const hasChildren = !!item.items?.length
                                    const expanded = mobileExpanded === item.title
                                    return (
                                        <li key={item.title}>
                                            <div className="flex items-center">
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        'flex-1 rounded px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10',
                                                        active &&
                                                            'bg-white/10 border-l-2 border-[rgb(0,175,239)]',
                                                    )}
                                                    onClick={() =>
                                                        setMobileOpen(false)
                                                    }
                                                >
                                                    {item.title}
                                                </Link>
                                                {hasChildren && (
                                                    <button
                                                        onClick={() =>
                                                            setMobileExpanded(
                                                                expanded
                                                                    ? null
                                                                    : item.title,
                                                            )
                                                        }
                                                        aria-label="Expand submenu"
                                                        className="p-2 text-white"
                                                    >
                                                        <ChevronDown
                                                            className={cn(
                                                                'h-4 w-4 transition-transform',
                                                                expanded &&
                                                                    'rotate-180',
                                                            )}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                            {hasChildren && expanded && (
                                                <ul className="ml-4 border-l border-white/20 pl-2">
                                                    {item.items!.map((sub) => (
                                                        <li key={sub.title}>
                                                            <Link
                                                                href={sub.href}
                                                                className="block rounded px-3 py-1.5 text-xs text-white/90 hover:bg-white/10"
                                                                onClick={() =>
                                                                    setMobileOpen(
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                {sub.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    )
}
