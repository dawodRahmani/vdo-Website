import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ChevronDown, Menu, Search, User, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { login } from '@/routes'

interface NavChild {
    title: string
    href: string
}

interface NavItem {
    title: string
    href?: string
    items?: NavChild[]
}

const navItems: NavItem[] = [
    { title: 'About Us', href: '/about' },
    {
        title: 'Strategic Priorities',
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
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerExpanded, setDrawerExpanded] = useState<string | null>(null)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const isActive = useIsActive()

    const closeDrawer = () => {
        setDrawerOpen(false)
        setDrawerExpanded(null)
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-100 py-3">
            <div className="mx-auto flex w-full max-w-[1360px] items-start gap-4 px-4 md:px-6 lg:px-8">
                {/* Logo sits outside nav container */}
                <Link href="/" className="flex-shrink-0">
                    <img
                        src="/svg/logo.png"
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
                                        const active = item.href
                                            ? isActive(item.href)
                                            : false
                                        const hasChildren = !!item.items?.length
                                        const triggerClass = cn(
                                            'relative flex items-center gap-1 px-2 py-1 text-xs font-medium text-white transition-colors hover:text-white/90 xl:px-3',
                                            active &&
                                                "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-[rgb(0,175,239)] after:content-['']",
                                        )
                                        const isOpen = openMenu === item.title
                                        return (
                                            <li
                                                key={item.title}
                                                className="group relative"
                                                onMouseLeave={() =>
                                                    setOpenMenu((m) =>
                                                        m === item.title
                                                            ? null
                                                            : m,
                                                    )
                                                }
                                            >
                                                {item.href ? (
                                                    <Link
                                                        href={item.href}
                                                        className={triggerClass}
                                                    >
                                                        {item.title}
                                                        {hasChildren && (
                                                            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                                                        )}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenMenu((m) =>
                                                                m === item.title
                                                                    ? null
                                                                    : item.title,
                                                            )
                                                        }
                                                        aria-expanded={isOpen}
                                                        className={triggerClass}
                                                    >
                                                        {item.title}
                                                        {hasChildren && (
                                                            <ChevronDown
                                                                className={cn(
                                                                    'h-3.5 w-3.5 transition-transform group-hover:rotate-180',
                                                                    isOpen &&
                                                                        'rotate-180',
                                                                )}
                                                            />
                                                        )}
                                                    </button>
                                                )}
                                                {active && (
                                                    <span
                                                        aria-hidden
                                                        className="absolute -bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[rgb(0,175,239)]"
                                                    />
                                                )}

                                                {hasChildren && (
                                                    <div
                                                        className={cn(
                                                            'invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100',
                                                            isOpen &&
                                                                'visible opacity-100',
                                                        )}
                                                    >
                                                        <ul className="min-w-[260px] overflow-hidden rounded-md bg-[rgba(0,175,239,0.92)] text-sm text-white shadow-xl backdrop-blur-sm">
                                                            {item.items!.map(
                                                                (sub) => (
                                                                    <li
                                                                        key={
                                                                            sub.title
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                sub.href
                                                                            }
                                                                            onClick={() =>
                                                                                setOpenMenu(
                                                                                    null,
                                                                                )
                                                                            }
                                                                            className="block px-4 py-2 transition-colors hover:bg-white/15"
                                                                        >
                                                                            {
                                                                                sub.title
                                                                            }
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

                            {/* Right icons — utility icons on lg+, hamburger on smaller screens */}
                            <div className="ml-auto flex items-center gap-0.5">
                                <Link
                                    href={login().url}
                                    aria-label="Account / Login"
                                    className="hidden h-7 w-7 items-center justify-center rounded text-white transition-colors hover:bg-white/10 md:h-8 md:w-8 lg:inline-flex"
                                >
                                    <User className="h-4 w-4" />
                                </Link>
                                <button
                                    type="button"
                                    aria-label={
                                        searchOpen ? 'Close search' : 'Search'
                                    }
                                    aria-expanded={searchOpen}
                                    onClick={() => setSearchOpen((v) => !v)}
                                    className={cn(
                                        'hidden h-7 w-7 items-center justify-center rounded text-white transition-colors hover:bg-white/10 md:h-8 md:w-8 lg:inline-flex',
                                        searchOpen && 'bg-white/15',
                                    )}
                                >
                                    {searchOpen ? (
                                        <X className="h-4 w-4" />
                                    ) : (
                                        <Search className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    aria-label="Open menu"
                                    onClick={() => setDrawerOpen(true)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded text-white transition-colors hover:bg-white/10 md:h-8 md:w-8 lg:hidden"
                                >
                                    <Menu className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Search bar (toggled by search icon) */}
                        {searchOpen && (
                            <div className="mt-2 rounded-md bg-white p-2 shadow-sm ring-1 ring-gray-200">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        // Search submission handled later.
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                    <input
                                        type="search"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search the site…"
                                        className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            aria-label="Clear search"
                                            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Drawer (slides in from the left, all screen sizes) */}
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetContent
                    side="left"
                    className="w-[88vw] max-w-sm overflow-y-auto border-r-0 bg-[rgb(62,64,149)] p-0 text-white sm:max-w-md"
                >
                    <SheetHeader className="border-b border-white/10 p-4">
                        <SheetTitle className="text-white">Menu</SheetTitle>
                    </SheetHeader>

                    <nav className="px-2 py-3">
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const active = item.href
                                    ? isActive(item.href)
                                    : false
                                const hasChildren = !!item.items?.length
                                const expanded = drawerExpanded === item.title
                                const itemClass = cn(
                                    'flex-1 rounded px-3 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-white/10',
                                    active &&
                                        'border-l-2 border-[rgb(0,175,239)] bg-white/10',
                                )
                                return (
                                    <li key={item.title}>
                                        <div className="flex items-center">
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className={itemClass}
                                                    onClick={closeDrawer}
                                                >
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDrawerExpanded(
                                                            expanded
                                                                ? null
                                                                : item.title,
                                                        )
                                                    }
                                                    aria-expanded={expanded}
                                                    className={itemClass}
                                                >
                                                    {item.title}
                                                </button>
                                            )}
                                            {hasChildren && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDrawerExpanded(
                                                            expanded
                                                                ? null
                                                                : item.title,
                                                        )
                                                    }
                                                    aria-label="Expand submenu"
                                                    aria-expanded={expanded}
                                                    className="rounded p-2 text-white transition-colors hover:bg-white/10"
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
                                                            className="block rounded px-3 py-1.5 text-xs text-white/90 transition-colors hover:bg-white/10"
                                                            onClick={closeDrawer}
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
                </SheetContent>
            </Sheet>
        </header>
    )
}
