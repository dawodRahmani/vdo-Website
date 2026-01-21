import { Head, Link } from '@inertiajs/react'
import { useState, useMemo, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
    Search,
    Filter,
    Briefcase,
    FileText,
    Heart,
    Users,
    MapPin,
    Clock,
    Calendar,
    ChevronRight,
    X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type OpportunityItemType = 'jobs' | 'bids' | 'volunteer' | 'participation'
type OpportunityFilterType = 'all' | OpportunityItemType

interface Opportunity {
    id: number
    type: OpportunityItemType
    title: string
    description: string
    location?: string
    deadline?: string
    category?: string
    commitment?: string
    href: string
}

// Combined placeholder data from all opportunity types
const opportunities: Opportunity[] = [
    // Jobs
    {
        id: 1,
        type: 'jobs',
        title: 'Project Manager',
        description:
            'Lead and manage development projects across multiple provinces.',
        location: 'Kabul, Afghanistan',
        deadline: 'January 15, 2025',
        category: 'Operations',
        href: '/opportunities/jobs',
    },
    {
        id: 2,
        type: 'jobs',
        title: 'Finance Officer',
        description:
            'Manage financial operations and reporting for humanitarian programs.',
        location: 'Herat, Afghanistan',
        deadline: 'January 20, 2025',
        category: 'Finance',
        href: '/opportunities/jobs',
    },
    {
        id: 3,
        type: 'jobs',
        title: 'M&E Specialist',
        description:
            'Design and implement monitoring and evaluation frameworks.',
        location: 'Mazar-i-Sharif, Afghanistan',
        deadline: 'January 25, 2025',
        category: 'Programs',
        href: '/opportunities/jobs',
    },
    // Bids
    {
        id: 4,
        type: 'bids',
        title: 'Supply of Office Equipment',
        description:
            'Procurement of office equipment for VDO headquarters and regional offices.',
        location: 'Kabul, Afghanistan',
        deadline: 'January 15, 2025',
        category: 'Procurement',
        href: '/opportunities/bids',
    },
    {
        id: 5,
        type: 'bids',
        title: 'Construction of Community Center',
        description:
            'Construction project for a new community center in Herat province.',
        location: 'Herat, Afghanistan',
        deadline: 'January 20, 2025',
        category: 'Construction',
        href: '/opportunities/bids',
    },
    {
        id: 6,
        type: 'bids',
        title: 'IT Infrastructure Services',
        description:
            'Provision of IT infrastructure and maintenance services.',
        location: 'Multiple Locations',
        deadline: 'January 25, 2025',
        category: 'Services',
        href: '/opportunities/bids',
    },
    // Volunteer
    {
        id: 7,
        type: 'volunteer',
        title: 'Education Support Volunteer',
        description:
            'Help with teaching, tutoring, and educational program development.',
        commitment: '10-15 hours/week',
        category: 'Education',
        href: '/opportunities/volunteers',
    },
    {
        id: 8,
        type: 'volunteer',
        title: 'Health Outreach Volunteer',
        description:
            'Support health awareness campaigns and community health initiatives.',
        commitment: '8-12 hours/week',
        category: 'Health',
        href: '/opportunities/volunteers',
    },
    {
        id: 9,
        type: 'volunteer',
        title: 'Community Development Volunteer',
        description:
            'Assist in community mobilization and development projects.',
        commitment: '10-20 hours/week',
        category: 'Community',
        href: '/opportunities/volunteers',
    },
    // Participation
    {
        id: 10,
        type: 'participation',
        title: 'Community Programs',
        description:
            'Join our community-based programs and contribute to local development initiatives.',
        category: 'Programs',
        href: '/opportunities/participation',
    },
    {
        id: 11,
        type: 'participation',
        title: 'Awareness Campaigns',
        description:
            'Help spread awareness about important social issues affecting Afghan communities.',
        category: 'Outreach',
        href: '/opportunities/participation',
    },
    {
        id: 12,
        type: 'participation',
        title: 'Training & Workshops',
        description:
            'Attend or facilitate training sessions and workshops on various topics.',
        category: 'Training',
        href: '/opportunities/participation',
    },
]

const typeConfig = {
    jobs: {
        label: 'Jobs',
        icon: Briefcase,
        color: 'bg-blue-500',
        bgLight: 'bg-blue-50',
        textColor: 'text-blue-600',
    },
    bids: {
        label: 'Bids',
        icon: FileText,
        color: 'bg-green-500',
        bgLight: 'bg-green-50',
        textColor: 'text-green-600',
    },
    volunteer: {
        label: 'Volunteer',
        icon: Heart,
        color: 'bg-pink-500',
        bgLight: 'bg-pink-50',
        textColor: 'text-pink-600',
    },
    participation: {
        label: 'Participation',
        icon: Users,
        color: 'bg-purple-500',
        bgLight: 'bg-purple-50',
        textColor: 'text-purple-600',
    },
}

interface OpportunitiesProps {
    scrollTo?: string
}

export default function Opportunities({ scrollTo }: OpportunitiesProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState<OpportunityFilterType>('all')

    useEffect(() => {
        if (scrollTo) {
            setSelectedType(scrollTo as OpportunityFilterType)
        }
    }, [scrollTo])

    const filteredOpportunities = useMemo(() => {
        return opportunities.filter((opportunity) => {
            const matchesSearch =
                opportunity.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                opportunity.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (opportunity.location?.toLowerCase() || '').includes(
                    searchQuery.toLowerCase(),
                ) ||
                (opportunity.category?.toLowerCase() || '').includes(
                    searchQuery.toLowerCase(),
                )

            const matchesType =
                selectedType === 'all' || opportunity.type === selectedType

            return matchesSearch && matchesType
        })
    }, [searchQuery, selectedType])

    const typeCounts = useMemo(() => {
        return {
            all: opportunities.length,
            jobs: opportunities.filter((o) => o.type === 'jobs').length,
            bids: opportunities.filter((o) => o.type === 'bids').length,
            volunteer: opportunities.filter((o) => o.type === 'volunteer')
                .length,
            participation: opportunities.filter(
                (o) => o.type === 'participation',
            ).length,
        }
    }, [])

    const getTypeIcon = (type: OpportunityFilterType) => {
        if (type === 'all') return null
        const config = typeConfig[type]
        return config.icon
    }

    return (
        <>
            <Head title="Opportunities - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Opportunities
                            </h1>
                            <p className="text-xl text-white/90">
                                Explore ways to engage with VDO through career
                                opportunities, bids, volunteering, and
                                community participation
                            </p>
                        </div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <p className="text-lg text-gray-700">
                                VDO is committed to transparent and competitive
                                processes that ensure fairness, accountability,
                                and value. We offer meaningful opportunities for
                                individuals and organizations passionate about
                                making a difference in Afghan communities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filter and Search Section */}
                <section className="sticky top-[97px] z-40 border-b bg-white py-6 shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search opportunities by title, location, or category..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="h-12 pl-12 pr-12 text-base"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter:</span>
                                </div>
                                <button
                                    onClick={() => setSelectedType('all')}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                        selectedType === 'all'
                                            ? 'bg-[#23369C] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    All ({typeCounts.all})
                                </button>
                                {(
                                    Object.keys(typeConfig) as Array<
                                        keyof typeof typeConfig
                                    >
                                ).map((type) => {
                                    const config = typeConfig[type]
                                    const Icon = config.icon
                                    return (
                                        <button
                                            key={type}
                                            onClick={() =>
                                                setSelectedType(type)
                                            }
                                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                selectedType === type
                                                    ? `${config.color} text-white`
                                                    : `${config.bgLight} ${config.textColor} hover:opacity-80`
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {config.label} ({typeCounts[type]})
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Links */}
                <section className="bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <Link
                                    href="/opportunities/bids"
                                    className="group rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                                        <FileText className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                        Bids & Tenders
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Explore procurement and bidding
                                        opportunities
                                    </p>
                                </Link>

                                <Link
                                    href="/opportunities/jobs"
                                    className="group rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                        <Briefcase className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                        Jobs
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Join our team and make a difference
                                    </p>
                                </Link>

                                <Link
                                    href="/opportunities/volunteers"
                                    className="group rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-600 group-hover:text-white">
                                        <Heart className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                        Volunteer
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Dedicate your time to humanitarian work
                                    </p>
                                </Link>

                                <Link
                                    href="/opportunities/participation"
                                    className="group rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                                        <Users className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                        Participation
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Engage in workshops and programs
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Opportunities List */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-[#23369C]">
                                    {selectedType === 'all'
                                        ? 'All Opportunities'
                                        : typeConfig[selectedType].label}
                                </h2>
                                <p className="text-gray-600">
                                    {filteredOpportunities.length}{' '}
                                    {filteredOpportunities.length === 1
                                        ? 'opportunity'
                                        : 'opportunities'}{' '}
                                    found
                                </p>
                            </div>

                            {filteredOpportunities.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredOpportunities.map((opportunity) => {
                                        const config =
                                            typeConfig[opportunity.type]
                                        const Icon = config.icon
                                        return (
                                            <div
                                                key={opportunity.id}
                                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                            >
                                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                                            <span
                                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.bgLight} ${config.textColor}`}
                                                            >
                                                                <Icon className="h-3 w-3" />
                                                                {config.label}
                                                            </span>
                                                            {opportunity.category && (
                                                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                                    {
                                                                        opportunity.category
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                                            {opportunity.title}
                                                        </h3>
                                                        <p className="mb-3 text-gray-600">
                                                            {
                                                                opportunity.description
                                                            }
                                                        </p>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                            {opportunity.location && (
                                                                <span className="flex items-center gap-1">
                                                                    <MapPin className="h-4 w-4 text-[#00B7EC]" />
                                                                    {
                                                                        opportunity.location
                                                                    }
                                                                </span>
                                                            )}
                                                            {opportunity.deadline && (
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-4 w-4 text-[#00B7EC]" />
                                                                    Deadline:{' '}
                                                                    {
                                                                        opportunity.deadline
                                                                    }
                                                                </span>
                                                            )}
                                                            {opportunity.commitment && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-4 w-4 text-[#00B7EC]" />
                                                                    {
                                                                        opportunity.commitment
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={opportunity.href}
                                                    >
                                                        <Button className="gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90">
                                                            View Details
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="rounded-xl bg-gray-50 p-12 text-center">
                                    <Search className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                    <h3 className="mb-2 text-xl font-semibold text-gray-600">
                                        No Opportunities Found
                                    </h3>
                                    <p className="text-gray-500">
                                        Try adjusting your search or filter
                                        criteria
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setSearchQuery('')
                                            setSelectedType('all')
                                        }}
                                        variant="outline"
                                        className="mt-4"
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Have Questions?
                            </h2>
                            <p className="mb-6 text-gray-700">
                                For any inquiries regarding opportunities at
                                VDO, please don't hesitate to contact us.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="mailto:opportunities@vdongo.org"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#23369C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#23369C]/90"
                                >
                                    Contact Us
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
