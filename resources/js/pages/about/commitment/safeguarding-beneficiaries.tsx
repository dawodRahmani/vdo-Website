import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Shield, UserCheck, Bell, Lock } from 'lucide-react'

export default function SafeguardingBeneficiaries() {
    const safeguardingPillars = [
        {
            id: 1,
            title: 'Prevention',
            icon: Shield,
            description:
                'Proactive measures to prevent harm before it occurs',
            measures: [
                'Rigorous staff recruitment and vetting',
                'Mandatory safeguarding training for all staff',
                'Code of conduct signed by all personnel',
                'Risk assessments for all programs',
                'Safe program design and implementation',
            ],
        },
        {
            id: 2,
            title: 'Detection',
            icon: Bell,
            description:
                'Systems to identify and respond to safeguarding concerns',
            measures: [
                'Multiple confidential reporting channels',
                'Regular monitoring and supervision',
                'Community-based monitoring mechanisms',
                'Safeguarding focal points in all locations',
                'Anonymous complaint mechanisms',
            ],
        },
        {
            id: 3,
            title: 'Response',
            icon: UserCheck,
            description:
                'Swift and appropriate action when concerns arise',
            measures: [
                'Dedicated safeguarding investigation team',
                'Survivor-centered response protocols',
                'Referral to specialized services',
                'Disciplinary action when warranted',
                'Support for affected individuals',
            ],
        },
        {
            id: 4,
            title: 'Learning',
            icon: Lock,
            description:
                'Continuous improvement of safeguarding practices',
            measures: [
                'Regular safeguarding audits',
                'Case review and analysis',
                'Policy updates based on lessons learned',
                'Sharing best practices',
                'Strengthened prevention measures',
            ],
        },
    ]

    const protectedGroups = [
        'Children and adolescents',
        'Women and girls',
        'Persons with disabilities',
        'Elderly persons',
        'Displaced populations',
        'Survivors of violence',
    ]

    return (
        <>
            <Head title="Safeguarding Beneficiaries - VDO" />
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
                                Safeguarding Beneficiaries
                            </h1>
                            <p className="text-xl text-white/90">
                                Our unwavering commitment to protecting the
                                people we serve from all forms of harm
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            {/* Introduction */}
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Safeguarding Commitment
                                </h2>
                                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                                    VDO is committed to safeguarding all
                                    beneficiaries, staff, and anyone who comes
                                    into contact with our organization from harm,
                                    abuse, neglect, and exploitation. We
                                    recognize that some groups are particularly
                                    vulnerable and require special protection. Our
                                    safeguarding framework ensures a safe
                                    environment for everyone involved in our
                                    programs.
                                </p>
                            </div>

                            {/* Four Pillars */}
                            <div className="mb-20 grid gap-8 md:grid-cols-2">
                                {safeguardingPillars.map((pillar) => (
                                    <div
                                        key={pillar.id}
                                        className="group overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-xl transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                    >
                                        {/* Header */}
                                        <div className="bg-gradient-to-br from-[#00B7EC] to-[#23369C] p-8 text-white">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                                <pillar.icon className="h-10 w-10" />
                                            </div>
                                            <h3 className="mb-2 text-2xl font-bold">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-white/90">
                                                {pillar.description}
                                            </p>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8">
                                            <h4 className="mb-4 font-semibold text-[#23369C]">
                                                Key Measures:
                                            </h4>
                                            <ul className="space-y-3">
                                                {pillar.measures.map(
                                                    (measure, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-3"
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
                                                            <span className="text-gray-700">
                                                                {measure}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Protected Groups */}
                            <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                                    Particularly Vulnerable Groups
                                </h2>
                                <p className="mb-10 text-center text-lg text-gray-700">
                                    We pay special attention to the safeguarding
                                    needs of vulnerable populations
                                </p>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {protectedGroups.map((group, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg"
                                        >
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#00B7EC] text-white">
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
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-[#23369C]">
                                                {group}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Code of Conduct */}
                            <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Our Code of Conduct
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {[
                                        'Treat all people with dignity and respect',
                                        'Never abuse power or position',
                                        'Zero tolerance for sexual exploitation and abuse',
                                        'Protect confidential information',
                                        'Report all safeguarding concerns',
                                        'Create a safe environment for all',
                                    ].map((point, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                                        >
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00B7EC]">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-white/90">
                                                {point}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Report Concerns */}
                            <div className="rounded-3xl bg-red-50 p-10">
                                <h2 className="mb-6 text-center text-3xl font-bold text-red-600">
                                    Report Safeguarding Concerns
                                </h2>
                                <p className="mb-8 text-center text-lg text-gray-700">
                                    If you have any concerns about the safety or
                                    wellbeing of beneficiaries, staff, or anyone
                                    involved with VDO, please report immediately.
                                </p>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl">📞</div>
                                        <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                            Emergency Hotline
                                        </h3>
                                        <p className="text-2xl font-bold text-red-600">
                                            +93 728777119
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Available 24/7
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl">📧</div>
                                        <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                            Confidential Email
                                        </h3>
                                        <p className="break-all text-sm font-bold text-red-600">
                                            safeguarding@vdongo.org
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Secure and private
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl">📮</div>
                                        <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                            Anonymous Reporting
                                        </h3>
                                        <p className="text-sm font-bold text-red-600">
                                            Sealed Boxes
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            At all VDO locations
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-8 text-center text-sm italic text-gray-600">
                                    All reports are treated with the utmost
                                    confidentiality and investigated promptly.
                                    Retaliation against reporters is strictly
                                    prohibited.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
