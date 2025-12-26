import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Shield, Eye, FileCheck, AlertTriangle } from 'lucide-react'

export default function AidDiversion() {
    const measures = [
        {
            id: 1,
            title: 'Rigorous Verification',
            icon: Eye,
            description:
                'Multi-layered verification processes to ensure aid reaches intended beneficiaries',
            actions: [
                'Beneficiary registration and verification',
                'Community-based targeting mechanisms',
                'Third-party monitoring and verification',
                'Regular field visits and spot checks',
            ],
        },
        {
            id: 2,
            title: 'Transparent Documentation',
            icon: FileCheck,
            description:
                'Comprehensive documentation and tracking of all assistance provided',
            actions: [
                'Digital beneficiary databases',
                'Distribution tracking systems',
                'Photo and video documentation',
                'Signed acknowledgment receipts',
            ],
        },
        {
            id: 3,
            title: 'Risk Assessment',
            icon: AlertTriangle,
            description:
                'Continuous risk assessment and mitigation strategies',
            actions: [
                'Context and conflict analysis',
                'Regular risk mapping exercises',
                'Early warning systems',
                'Contingency planning',
            ],
        },
        {
            id: 4,
            title: 'Strong Safeguards',
            icon: Shield,
            description:
                'Robust internal controls and safeguarding mechanisms',
            actions: [
                'Segregation of duties',
                'Independent internal audits',
                'Anonymous reporting channels',
                'Zero tolerance for fraud',
            ],
        },
    ]

    const reportingChannels = [
        {
            title: 'Hotline',
            detail: '+93 728777119',
            description: 'Call our dedicated reporting hotline',
        },
        {
            title: 'Email',
            detail: 'report@vdongo.org',
            description: 'Send confidential reports via email',
        },
        {
            title: 'In-Person',
            detail: 'VDO Office',
            description: 'Visit any VDO office to report concerns',
        },
        {
            title: 'Community Box',
            detail: 'Suggestion Boxes',
            description: 'Anonymous submissions in communities',
        },
    ]

    return (
        <>
            <Head title="Prevention from Aid Diversion - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/2.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Prevention from Aid Diversion
                            </h1>
                            <p className="text-xl text-white/90">
                                Ensuring humanitarian assistance reaches those
                                who need it most
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            {/* Introduction */}
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Commitment
                                </h2>
                                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
                                    VDO is committed to preventing the diversion
                                    of humanitarian assistance. We implement
                                    comprehensive measures to ensure that aid
                                    reaches its intended beneficiaries and is
                                    used for its intended purpose. Our
                                    multi-layered approach combines rigorous
                                    verification, transparent documentation,
                                    continuous monitoring, and strong internal
                                    controls.
                                </p>
                            </div>

                            {/* Prevention Measures */}
                            <div className="mb-20 grid gap-8 md:grid-cols-2">
                                {measures.map((measure) => (
                                    <div
                                        key={measure.id}
                                        className="group rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                    >
                                        {/* Icon */}
                                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00B7EC] to-[#00B7EC]/80 shadow-xl transition-transform duration-300 group-hover:scale-110">
                                            <measure.icon className="h-10 w-10 text-white" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="mb-3 text-2xl font-bold text-[#23369C]">
                                            {measure.title}
                                        </h3>
                                        <p className="mb-6 text-gray-600">
                                            {measure.description}
                                        </p>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            {measure.actions.map(
                                                (action, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-3 rounded-lg bg-gray-50 p-3"
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
                                                            {action}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reporting Mechanism */}
                            <div className="rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                                    Report Aid Diversion
                                </h2>
                                <p className="mb-10 text-center text-lg text-gray-700">
                                    We encourage communities, staff, and partners
                                    to report any suspected cases of aid
                                    diversion. All reports are treated
                                    confidentially and investigated thoroughly.
                                </p>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    {reportingChannels.map((channel, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-white p-6 text-center shadow-lg"
                                        >
                                            <div className="mb-4 flex items-center justify-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                                    <svg
                                                        className="h-8 w-8"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                                {channel.title}
                                            </h3>
                                            <p className="mb-2 text-sm font-semibold text-[#00B7EC]">
                                                {channel.detail}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {channel.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Investigation Process */}
                            <div className="mt-20">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Investigation Process
                                </h2>
                                <div className="relative">
                                    {/* Timeline */}
                                    <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-[#00B7EC]/20" />

                                    <div className="space-y-12">
                                        {[
                                            {
                                                step: '1',
                                                title: 'Report Received',
                                                desc: 'All reports are logged and acknowledged within 24 hours',
                                            },
                                            {
                                                step: '2',
                                                title: 'Initial Assessment',
                                                desc: 'Independent team conducts preliminary assessment',
                                            },
                                            {
                                                step: '3',
                                                title: 'Full Investigation',
                                                desc: 'Comprehensive investigation with evidence collection',
                                            },
                                            {
                                                step: '4',
                                                title: 'Action Taken',
                                                desc: 'Appropriate corrective and disciplinary actions implemented',
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-8 ${
                                                    idx % 2 === 0
                                                        ? 'flex-row'
                                                        : 'flex-row-reverse'
                                                }`}
                                            >
                                                <div
                                                    className={`flex-1 ${
                                                        idx % 2 === 0
                                                            ? 'text-right'
                                                            : 'text-left'
                                                    }`}
                                                >
                                                    <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                                <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#00B7EC] text-2xl font-bold text-white shadow-xl">
                                                    {item.step}
                                                </div>
                                                <div className="flex-1" />
                                            </div>
                                        ))}
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
