import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
    Users,
    Building,
    MapPin,
    Award,
    Briefcase,
    TrendingUp,
} from 'lucide-react'

export default function Capacity() {
    const capacityAreas = [
        {
            id: 1,
            title: 'Human Resources',
            description: 'Skilled team of over 500 professionals',
            icon: Users,
            stats: [
                '500+ Staff Members',
                '150+ Field Workers',
                '50+ Technical Experts',
            ],
        },
        {
            id: 2,
            title: 'Geographic Reach',
            description: 'Operating across 25+ provinces',
            icon: MapPin,
            stats: [
                '25+ Provinces',
                '100+ Districts',
                '300+ Communities',
            ],
        },
        {
            id: 3,
            title: 'Infrastructure',
            description: 'Well-equipped offices and facilities',
            icon: Building,
            stats: [
                '15 Field Offices',
                '5 Regional Hubs',
                'Modern Equipment',
            ],
        },
        {
            id: 4,
            title: 'Program Experience',
            description: 'Decades of development expertise',
            icon: Briefcase,
            stats: [
                '200+ Projects',
                '15+ Sectors',
                '20+ Years Experience',
            ],
        },
        {
            id: 5,
            title: 'Certifications',
            description: 'Recognized quality standards',
            icon: Award,
            stats: [
                'ISO Certified',
                'HAP Verified',
                'Donor Approved',
            ],
        },
        {
            id: 6,
            title: 'Financial Capacity',
            description: 'Strong financial management',
            icon: TrendingUp,
            stats: [
                '$10M+ Annual Budget',
                'Multi-Donor Portfolio',
                'Transparent Reporting',
            ],
        },
    ]

    const technicalCapacity = [
        'Project Management & Implementation',
        'Monitoring, Evaluation, Accountability & Learning (MEAL)',
        'Community Mobilization & Engagement',
        'Capacity Building & Training',
        'Research & Assessment',
        'Emergency Response & Humanitarian Aid',
        'Advocacy & Policy Influence',
        'Partnership Management',
    ]

    return (
        <>
            <Head title="VDO's Capacity - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/3.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                VDO's Capacity
                            </h1>
                            <p className="text-xl text-white/90">
                                Equipped with resources, expertise, and
                                infrastructure to deliver impactful development
                                solutions
                            </p>
                        </div>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Organizational Capacity
                                </h2>
                                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
                                    VDO has built strong organizational capacity
                                    through years of experience, strategic
                                    investments, and continuous learning. Our
                                    capacity enables us to implement complex
                                    development programs while maintaining
                                    quality, accountability, and sustainability.
                                </p>
                            </div>

                            {/* Capacity Areas Grid */}
                            <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {capacityAreas.map((area) => (
                                    <div
                                        key={area.id}
                                        className="group rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                    >
                                        {/* Icon */}
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B7EC] to-[#00B7EC]/80 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                                            <area.icon className="h-8 w-8" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            {area.title}
                                        </h3>
                                        <p className="mb-4 text-sm text-gray-600">
                                            {area.description}
                                        </p>

                                        {/* Stats */}
                                        <ul className="space-y-2">
                                            {area.stats.map((stat, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm text-gray-700"
                                                >
                                                    <div className="h-1.5 w-1.5 rounded-full bg-[#00B7EC]" />
                                                    {stat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Technical Capacity */}
                            <div className="rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                                    Technical Expertise
                                </h2>
                                <p className="mb-10 text-center text-lg text-gray-700">
                                    Our team brings a diverse set of technical
                                    skills and specialized knowledge across
                                    multiple development sectors
                                </p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {technicalCapacity.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#00B7EC] text-white">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-[#23369C]">
                                                {skill}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Partnerships Section */}
                            <div className="mt-20">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Strategic Partnerships
                                </h2>
                                <div className="grid gap-8 md:grid-cols-3">
                                    <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            25+
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                            International Partners
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Collaborations with leading global
                                            organizations
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            50+
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                            Local Partnerships
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Strong ties with community
                                            organizations
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            15+
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                            Government Agencies
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Coordination with public
                                            institutions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
