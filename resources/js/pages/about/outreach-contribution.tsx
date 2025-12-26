import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function OutreachContribution() {
    const contributions = [
        {
            id: 1,
            sector: 'Education',
            impact: '320,000+',
            description: 'Students educated through our programs',
            achievements: [
                'Built and renovated 150+ schools',
                'Trained 2,000+ teachers',
                'Distributed learning materials to 500+ schools',
                'Established 50+ community-based education centers',
            ],
        },
        {
            id: 2,
            sector: 'Economic Growth',
            impact: '760+',
            description: 'Families supported with livelihood programs',
            achievements: [
                'Provided vocational training to 5,000+ youth',
                'Supported 300+ small businesses',
                'Created income opportunities for 1,200+ women',
                'Distributed agricultural inputs to 2,000+ farmers',
            ],
        },
        {
            id: 3,
            sector: 'Urban Development',
            impact: '218',
            description: 'Areas improved through infrastructure projects',
            achievements: [
                'Constructed 100+ km of roads',
                'Built 50+ community centers',
                'Improved waste management in 30+ communities',
                'Rehabilitated 40+ public spaces',
            ],
        },
        {
            id: 4,
            sector: 'Health & Nutrition',
            impact: '18,000+',
            description: 'Individuals reached with health services',
            achievements: [
                'Operated 25+ mobile health clinics',
                'Trained 500+ community health workers',
                'Provided nutrition support to 3,000+ children',
                'Conducted 100+ health awareness campaigns',
            ],
        },
        {
            id: 5,
            sector: 'Emergency Response',
            impact: '135,400+',
            description: 'People assisted during emergencies',
            achievements: [
                'Distributed emergency supplies to 30,000+ families',
                'Provided shelter assistance to 15,000+ IDPs',
                'Delivered food aid to 50,000+ beneficiaries',
                'Conducted rapid assessments in 100+ locations',
            ],
        },
        {
            id: 6,
            sector: 'Water & Sanitation',
            impact: '45,200+',
            description: 'People with access to clean water',
            achievements: [
                'Constructed 200+ water points',
                'Built 150+ latrines',
                'Trained 300+ WASH committees',
                'Conducted hygiene promotion in 100+ villages',
            ],
        },
    ]

    const regionalOutreach = [
        { region: 'Eastern Region', provinces: 5, beneficiaries: '125,000+' },
        { region: 'Western Region', provinces: 4, beneficiaries: '98,000+' },
        { region: 'Northern Region', provinces: 6, beneficiaries: '156,000+' },
        { region: 'Southern Region', provinces: 5, beneficiaries: '142,000+' },
        { region: 'Central Region', provinces: 5, beneficiaries: '89,000+' },
    ]

    return (
        <>
            <Head title="VDO's Outreach and Contribution - VDO" />
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
                                Our Outreach & Contribution
                            </h1>
                            <p className="text-xl text-white/90">
                                Making a lasting impact across Afghanistan
                                through dedicated service and sustainable
                                development
                            </p>
                        </div>
                    </div>
                </section>

                {/* Impact Overview */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Impact Across Sectors
                                </h2>
                                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
                                    Through strategic interventions and
                                    community-centered approaches, VDO has
                                    contributed to meaningful change in lives
                                    across Afghanistan. Our work spans multiple
                                    sectors, reaching hundreds of thousands of
                                    beneficiaries.
                                </p>
                            </div>

                            {/* Sector Contributions */}
                            <div className="space-y-8">
                                {contributions.map((contribution) => (
                                    <div
                                        key={contribution.id}
                                        className="group rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                    >
                                        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                                    {contribution.sector}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {contribution.description}
                                                </p>
                                            </div>
                                            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00B7EC] to-[#00B7EC]/80 shadow-xl">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">
                                                        {contribution.impact}
                                                    </div>
                                                    <div className="text-xs text-white/80">
                                                        Reached
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievements Grid */}
                                        <div className="grid gap-3 md:grid-cols-2">
                                            {contribution.achievements.map(
                                                (achievement, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-[#00B7EC]/5"
                                                    >
                                                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00B7EC]">
                                                            <svg
                                                                className="h-3 w-3 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        3
                                                                    }
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm text-gray-700">
                                                            {achievement}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Regional Outreach */}
                            <div className="mt-20">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Regional Outreach
                                </h2>
                                <p className="mb-12 text-center text-lg text-gray-700">
                                    VDO maintains a strong presence across
                                    Afghanistan, with operations in 25+ provinces
                                    spanning all major regions
                                </p>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {regionalOutreach.map((region, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-6 shadow-lg"
                                        >
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                                    <svg
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xl font-bold text-[#23369C]">
                                                    {region.region}
                                                </h3>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        Provinces:
                                                    </span>
                                                    <span className="font-semibold text-[#23369C]">
                                                        {region.provinces}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        Beneficiaries:
                                                    </span>
                                                    <span className="font-semibold text-[#00B7EC]">
                                                        {region.beneficiaries}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Total Summary Card */}
                                    <div className="rounded-2xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-6 text-white shadow-2xl">
                                        <div className="mb-4">
                                            <svg
                                                className="h-12 w-12"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-2xl font-bold">
                                            Nationwide Impact
                                        </h3>
                                        <div className="space-y-1">
                                            <div className="text-3xl font-bold text-[#00B7EC]">
                                                500,000+
                                            </div>
                                            <div className="text-sm text-white/80">
                                                Total beneficiaries reached
                                            </div>
                                        </div>
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
