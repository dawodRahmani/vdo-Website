import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ShieldAlert, XCircle, AlertOctagon, Scale } from 'lucide-react'

export default function ZeroTolerancePSEAH() {
    const pseahCommitments = [
        {
            id: 1,
            title: 'Zero Tolerance',
            icon: XCircle,
            description:
                'Absolute zero tolerance for sexual exploitation, abuse, and harassment',
            commitments: [
                'No second chances for perpetrators',
                'Immediate suspension pending investigation',
                'Swift disciplinary action',
                'Termination for proven cases',
                'Referral to law enforcement when appropriate',
            ],
        },
        {
            id: 2,
            title: 'Prevention',
            icon: ShieldAlert,
            description:
                'Proactive measures to prevent PSEAH before it occurs',
            commitments: [
                'Mandatory pre-employment background checks',
                'Regular PSEAH training for all staff',
                'Clear code of conduct',
                'Power dynamics awareness',
                'Safe recruitment practices',
            ],
        },
        {
            id: 3,
            title: 'Survivor-Centered Response',
            icon: Scale,
            description:
                'Putting survivors at the center of our response',
            commitments: [
                'Confidential and safe reporting',
                'Medical and psychosocial support',
                'Informed consent at every step',
                'Referral to specialized services',
                'Protection from retaliation',
            ],
        },
        {
            id: 4,
            title: 'Accountability',
            icon: AlertOctagon,
            description:
                'Holding ourselves and partners accountable',
            commitments: [
                'Independent investigations',
                'Transparent reporting',
                'Regular audits and reviews',
                'Inter-agency cooperation',
                'Learning from incidents',
            ],
        },
    ]

    const prohibitedBehaviors = [
        'Sexual activity with anyone under 18',
        'Exchange of money, goods, services, or favors for sexual activity',
        'Sexual relationships between staff and beneficiaries',
        'Unwanted sexual advances or requests',
        'Harassment or intimidation of a sexual nature',
        'Exploitation of vulnerability or trust',
    ]

    return (
        <>
            <Head title="Zero Tolerance and PSEAH - VDO" />
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
                                Zero Tolerance & PSEAH
                            </h1>
                            <p className="text-xl text-white/90">
                                Our commitment to preventing and responding to
                                sexual exploitation, abuse, and harassment
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
                                    What is PSEAH?
                                </h2>
                                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                                    PSEAH stands for <strong>Protection from
                                    Sexual Exploitation, Abuse, and
                                    Harassment</strong>. VDO maintains a zero
                                    tolerance policy on PSEAH. We are committed
                                    to preventing sexual exploitation, abuse, and
                                    harassment in all our operations and by all
                                    personnel, partners, and visitors. Sexual
                                    exploitation and abuse violate human rights
                                    and undermine the core humanitarian
                                    principles we uphold.
                                </p>
                            </div>

                            {/* Four Commitments */}
                            <div className="mb-20 grid gap-8 md:grid-cols-2">
                                {pseahCommitments.map((commitment) => (
                                    <div
                                        key={commitment.id}
                                        className="group rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                    >
                                        {/* Icon & Title */}
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                <commitment.icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-red-600">
                                                {commitment.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="mb-6 text-gray-700">
                                            {commitment.description}
                                        </p>

                                        {/* Commitments */}
                                        <ul className="space-y-3">
                                            {commitment.commitments.map(
                                                (item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm"
                                                    >
                                                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
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
                                                            {item}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Prohibited Behaviors */}
                            <div className="mb-20 rounded-3xl bg-red-600 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Strictly Prohibited Behaviors
                                </h2>
                                <p className="mb-10 text-center text-lg text-white/90">
                                    The following behaviors are absolutely
                                    prohibited and will result in immediate
                                    disciplinary action:
                                </p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {prohibitedBehaviors.map((behavior, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                                        >
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
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
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-white/90">
                                                {behavior}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Training & Awareness */}
                            <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                                    Training & Awareness
                                </h2>
                                <div className="grid gap-8 md:grid-cols-3">
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            100%
                                        </div>
                                        <h3 className="mb-2 font-bold text-[#23369C]">
                                            Staff Training
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            All staff receive mandatory PSEAH
                                            training upon joining and annually
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            Safe
                                        </div>
                                        <h3 className="mb-2 font-bold text-[#23369C]">
                                            Reporting Channels
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Multiple confidential and safe ways
                                            to report concerns
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            24/7
                                        </div>
                                        <h3 className="mb-2 font-bold text-[#23369C]">
                                            Support Available
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Round-the-clock support and referral
                                            services for survivors
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Report PSEAH */}
                            <div className="rounded-3xl border-4 border-red-600 bg-red-50 p-10">
                                <h2 className="mb-6 text-center text-3xl font-bold text-red-600">
                                    Report PSEAH Incidents
                                </h2>
                                <p className="mb-8 text-center text-lg text-gray-700">
                                    If you have experienced or witnessed sexual
                                    exploitation, abuse, or harassment by VDO
                                    staff or partners, please report immediately.
                                    Your safety and confidentiality are our
                                    priority.
                                </p>

                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                                        <div className="mb-4 text-5xl">🔒</div>
                                        <h3 className="mb-2 text-lg font-bold text-red-600">
                                            Confidential Hotline
                                        </h3>
                                        <p className="text-2xl font-bold text-[#23369C]">
                                            +93 728777119
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Available 24/7 - Completely
                                            confidential
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                                        <div className="mb-4 text-5xl">✉️</div>
                                        <h3 className="mb-2 text-lg font-bold text-red-600">
                                            Secure Email
                                        </h3>
                                        <p className="break-all text-sm font-bold text-[#23369C]">
                                            pseah@vdongo.org
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Encrypted and confidential
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                                        <div className="mb-4 text-5xl">🎯</div>
                                        <h3 className="mb-2 text-lg font-bold text-red-600">
                                            PSEAH Focal Point
                                        </h3>
                                        <p className="text-sm font-bold text-[#23369C]">
                                            Dedicated trained staff
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            At every VDO location
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">
                                    <h4 className="mb-4 text-center font-bold text-[#23369C]">
                                        You have the right to:
                                    </h4>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {[
                                            'Be treated with dignity and respect',
                                            'Report safely and confidentially',
                                            'Receive immediate support',
                                            'Be protected from retaliation',
                                            'Access medical and psychosocial services',
                                            'Know the outcome of your report',
                                        ].map((right, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                                                    <svg
                                                        className="h-3 w-3 text-white"
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
                                                <span className="text-sm text-gray-700">
                                                    {right}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="mt-6 text-center text-sm font-semibold italic text-red-600">
                                    It is NEVER your fault. We believe you and
                                    we are here to support you.
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
