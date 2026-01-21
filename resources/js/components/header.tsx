import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import {
    Facebook,
    Linkedin,
    Youtube,
    Search,
    Menu,
    ChevronDown,
    ChevronRight,
    Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

interface MenuItem {
    title: string
    href?: string
    items?: MenuItem[]
}

interface NavigationItem {
    title: string
    items: MenuItem[]
}

// Custom NavLink component that handles hash-based navigation
function NavLink({
    href,
    className,
    children,
    onClick,
}: {
    href: string
    className?: string
    children: React.ReactNode
    onClick?: () => void
}) {
    const hasHash = href.includes('#')

    const handleClick = (e: React.MouseEvent) => {
        if (hasHash) {
            e.preventDefault()
            const [path, hash] = href.split('#')

            // Check if we're already on the target page
            if (window.location.pathname === path || path === '') {
                // Same page, just scroll to the element
                const element = document.getElementById(hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            } else {
                // Different page, navigate first then scroll
                router.visit(path, {
                    onSuccess: () => {
                        setTimeout(() => {
                            const element = document.getElementById(hash)
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' })
                            }
                        }, 100)
                    },
                })
            }
            onClick?.()
        } else {
            onClick?.()
        }
    }

    if (hasHash) {
        return (
            <a href={href} className={className} onClick={handleClick}>
                {children}
            </a>
        )
    }

    return (
        <Link href={href} className={className} onClick={onClick}>
            {children}
        </Link>
    )
}

const navigationItems: NavigationItem[] = [
    {
        title: 'About Us',
        items: [
            { title: 'Executive Summary', href: '/about#executive-summary' },
            { title: 'History', href: '/about#history' },
            { title: 'Looking Ahead', href: '/about#looking-ahead' },
            { title: 'VDO Best Practices', href: '/about#best-practices' },
            { title: 'VDO Strength', href: '/about#strength' },
        ],
    },
    {
        title: 'Organization Capacity',
        items: [
            { title: 'Our Capacity', href: '/organization-capacity#our-capacity' },
            { title: 'Policies', href: '/organization-capacity#policies' },
            { title: 'Programmatic Approach', href: '/organization-capacity#programmatic-approach' },
            { title: 'Localization Framework', href: '/organization-capacity#localization-framework' },
            { title: 'Stakeholder Engagement', href: '/organization-capacity#stakeholder-engagement' },
            { title: 'Governance', href: '/organization-capacity#governance' },
        ],
    },
    {
        title: 'Strategic Priorities',
        items: [
            { title: 'Education', href: '/strategic-priorities#education' },
            { title: 'Health and Nutrition', href: '/strategic-priorities#health-nutrition' },
            { title: 'Economic Growth', href: '/strategic-priorities#economic-growth' },
            { title: 'Urban Development', href: '/strategic-priorities#urban-development' },
            { title: 'Emergency Response', href: '/strategic-priorities#emergency-response' },
            { title: 'Target Groups', href: '/strategic-priorities#target-groups' },
            { title: 'VDO Contribution', href: '/strategic-priorities#vdo-contribution' },
        ],
    },
    {
        title: 'Where We Work',
        items: [
            { title: 'Overview', href: '/where-we-work' },
            { title: 'Map', href: '/where-we-work/map' },
            { title: 'Area-Based Information', href: '/where-we-work/area-based' },
            { title: 'Central Region', href: '/where-we-work/central' },
            { title: 'Northern Region', href: '/where-we-work/northern' },
            { title: 'Eastern Region', href: '/where-we-work/eastern' },
            { title: 'Western Region', href: '/where-we-work/western' },
            { title: 'Southern Region', href: '/where-we-work/southern' },
            { title: 'North-Western Region', href: '/where-we-work/northwestern' },
            { title: 'Our Offices', href: '/where-we-work/offices' },
        ],
    },
    {
        title: 'Our Commitment',
        items: [
            { title: 'Inclusivity', href: '/our-commitment#inclusivity' },
            { title: 'Accountability to Affected Population (AAP)', href: '/our-commitment#aap' },
            { title: 'Safeguarding', href: '/our-commitment#safeguarding' },
            { title: 'PSEAH', href: '/our-commitment#pseah' },
            { title: 'Anti-fraud and Transparency', href: '/our-commitment#anti-fraud' },
            { title: 'Effectiveness and Efficiency', href: '/our-commitment#effectiveness' },
            { title: 'Impact and Sustainability', href: '/our-commitment#impact' },
            { title: 'Prevention from Aid Diversion', href: '/our-commitment#aid-diversion' },
            { title: 'Humanitarian Principles', href: '/our-commitment#humanitarian-principles' },
        ],
    },
    {
        title: 'Media',
        items: [
            { title: 'Publications', href: '/media/publications' },
            { title: 'News', href: '/media/news' },
            { title: 'Documentary', href: '/media/documentary' },
            { title: 'Success Story', href: '/media/success-story' },
            { title: 'Project Snapshot', href: '/media/project-snapshot' },
            { title: 'Press Release', href: '/media/press-release' },
        ],
    },
    {
        title: 'Opportunities',
        items: [
            { title: 'All Opportunities', href: '/opportunities' },
            { title: 'Bids', href: '/opportunities/bids' },
            { title: 'Jobs', href: '/opportunities/jobs' },
            { title: 'Volunteer', href: '/opportunities/volunteers' },
            { title: 'Participation', href: '/opportunities/participation' },
        ],
    },
]

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
        null,
    )
    const [expandedMobileSubmenu, setExpandedMobileSubmenu] = useState<
        string | null
    >(null)

    const TwitterIcon = () => (
        <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-24 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <img
                            src="/images/logo.png"
                            alt="Vision Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:items-center lg:gap-8">
                        <div className="flex items-center gap-6">
                            {navigationItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="group relative"
                                >
                                    <button className="flex items-center gap-1 text-[#23369C] transition-colors hover:text-[#23369C]/80">
                                        {item.title}
                                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="invisible absolute left-0 top-full z-50 mt-2 w-[350px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                        <div className="rounded-md border bg-white p-2 shadow-lg">
                                            <ul className="space-y-1">
                                                {item.items.map((subItem) => (
                                                    <li
                                                        key={subItem.title}
                                                        className="group/item relative"
                                                    >
                                                        {subItem.items ? (
                                                            // Nested dropdown item
                                                            <>
                                                                <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm leading-relaxed text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#23369C]">
                                                                    <span>
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </span>
                                                                    <ChevronRight className="h-4 w-4" />
                                                                </div>

                                                                {/* Nested submenu */}
                                                                <div className="invisible absolute left-full top-0 z-[60] ml-1 w-[350px] opacity-0 transition-all duration-200 group-hover/item:visible group-hover/item:opacity-100">
                                                                    <div className="rounded-md border bg-white p-2 shadow-lg">
                                                                        <ul className="space-y-1">
                                                                            {subItem.items.map(
                                                                                (
                                                                                    nestedItem,
                                                                                ) => (
                                                                                    <li
                                                                                        key={
                                                                                            nestedItem.title
                                                                                        }
                                                                                    >
                                                                                        <NavLink
                                                                                            href={
                                                                                                nestedItem.href!
                                                                                            }
                                                                                            className="block rounded-md px-3 py-2 text-sm leading-relaxed text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#23369C]"
                                                                                        >
                                                                                            {
                                                                                                nestedItem.title
                                                                                            }
                                                                                        </NavLink>
                                                                                    </li>
                                                                                ),
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            // Regular link
                                                            <NavLink
                                                                href={
                                                                    subItem.href!
                                                                }
                                                                className="block rounded-md px-3 py-2 text-sm leading-relaxed text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#23369C]"
                                                            >
                                                                {subItem.title}
                                                            </NavLink>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* Right Section - Social Icons, Search, Donate */}
                    <div className="flex items-center gap-4">
                        {/* Social Icons - Hidden on mobile */}
                        <div className="hidden items-center gap-3 md:flex">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 transition-colors hover:text-[#1e3a8a]"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                            <a
                                href="#"
                                className="text-gray-600 transition-colors hover:text-[#1e3a8a]"
                                aria-label="Twitter/X"
                            >
                                <TwitterIcon />
                            </a>
                        </div>

                        {/* Search Icon */}
                        <button
                            className="hidden text-gray-600 transition-colors hover:text-[#1e3a8a] md:block"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Donate Button */}
                        <Link href="/donate">
                            <Button className="hidden gap-2 bg-[#00B7EC] px-6 hover:bg-[#00B7EC]/90 md:inline-flex">
                                <span>Donate</span>
                                <Heart className="h-4 w-4" />
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <Sheet
                            open={mobileMenuOpen}
                            onOpenChange={setMobileMenuOpen}
                        >
                            <SheetTrigger asChild className="lg:hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-6 w-6 text-[#23369C]" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[300px] overflow-y-auto bg-white p-6 sm:w-[400px]"
                            >
                                <SheetHeader className="mb-6">
                                    <SheetTitle>
                                        <img
                                            src="/images/logo.png"
                                            alt="Vision Logo"
                                            className="h-20 w-auto object-contain"
                                        />
                                    </SheetTitle>
                                </SheetHeader>

                                <nav className="flex flex-col gap-4">
                                    {navigationItems.map((item) => (
                                        <div
                                            key={item.title}
                                            className="border-b pb-2"
                                        >
                                            <button
                                                onClick={() =>
                                                    setExpandedMobileMenu(
                                                        expandedMobileMenu ===
                                                            item.title
                                                            ? null
                                                            : item.title,
                                                    )
                                                }
                                                className="flex w-full items-center justify-between py-2 text-left font-medium text-[#23369C]"
                                            >
                                                {item.title}
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${
                                                        expandedMobileMenu ===
                                                        item.title
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                />
                                            </button>
                                            {expandedMobileMenu ===
                                                item.title && (
                                                <div className="ml-4 mt-2 flex flex-col gap-2">
                                                    {item.items.map(
                                                        (subItem) => (
                                                            <div
                                                                key={
                                                                    subItem.title
                                                                }
                                                            >
                                                                {subItem.items ? (
                                                                    // Nested submenu
                                                                    <>
                                                                        <button
                                                                            onClick={() =>
                                                                                setExpandedMobileSubmenu(
                                                                                    expandedMobileSubmenu ===
                                                                                        subItem.title
                                                                                        ? null
                                                                                        : subItem.title,
                                                                                )
                                                                            }
                                                                            className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-gray-700 hover:text-[#23369C]"
                                                                        >
                                                                            {
                                                                                subItem.title
                                                                            }
                                                                            <ChevronDown
                                                                                className={`h-3 w-3 transition-transform ${
                                                                                    expandedMobileSubmenu ===
                                                                                    subItem.title
                                                                                        ? 'rotate-180'
                                                                                        : ''
                                                                                }`}
                                                                            />
                                                                        </button>
                                                                        {expandedMobileSubmenu ===
                                                                            subItem.title && (
                                                                            <div className="ml-4 mt-1 flex flex-col gap-1">
                                                                                {subItem.items.map(
                                                                                    (
                                                                                        nestedItem,
                                                                                    ) => (
                                                                                        <NavLink
                                                                                            key={
                                                                                                nestedItem.title
                                                                                            }
                                                                                            href={
                                                                                                nestedItem.href!
                                                                                            }
                                                                                            className="py-2 text-sm text-gray-600 hover:text-[#23369C]"
                                                                                            onClick={() =>
                                                                                                setMobileMenuOpen(
                                                                                                    false,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                nestedItem.title
                                                                                            }
                                                                                        </NavLink>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    // Regular link
                                                                    <NavLink
                                                                        href={
                                                                            subItem.href!
                                                                        }
                                                                        className="py-2 text-sm text-gray-600 hover:text-[#23369C]"
                                                                        onClick={() =>
                                                                            setMobileMenuOpen(
                                                                                false,
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </NavLink>
                                                                )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Mobile Donate Button */}
                                    <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="mt-4 w-full gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90">
                                            <span>Donate</span>
                                            <Heart className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    {/* Mobile Social Icons */}
                                    <div className="mt-6 flex items-center gap-4 border-t pt-6">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 transition-colors hover:text-[#23369C]"
                                                aria-label={social.label}
                                            >
                                                <social.icon className="h-6 w-6" />
                                            </a>
                                        ))}
                                        <a
                                            href="#"
                                            className="text-gray-600 transition-colors hover:text-[#1e3a8a]"
                                            aria-label="Twitter/X"
                                        >
                                            <TwitterIcon />
                                        </a>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* Bottom gray bar */}
            <div className="h-1 bg-gray-300" />
        </header>
    )
}
