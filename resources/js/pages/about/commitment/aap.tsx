import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { MessageSquare, Users, TrendingUp, CheckCircle } from 'lucide-react'

export default function AAP() {
    const commitments = [
        {
            id: 1,
            title: 'Information Sharing',
            icon: MessageSquare,
            description:
                'Providing accessible, timely, and accurate information to affected populations',
            practices: [
                'Multilingual communication materials',
                'Community meetings and consultations',
                'Regular program updates and announcements',
                'Accessible formats for persons with disabilities',
            ],
        },
        {
            id: 2,
            title: 'Participation & Inclusion',
            icon: Users,
            description:
                'Ensuring affected populations participate meaningfully in program design and delivery',
            practices: [
                'Community-led needs assessments',
                'Participatory project planning',
                'Inclusion of vulnerable groups',
                'Gender and age-sensitive approaches',
            ],
        },
        {
            id: 3,
            title: 'Feedback & Complaints',
            icon: TrendingUp,
            description:
                'Establishing accessible mechanisms for feedback and complaints',
            practices: [
                'Multiple feedback channels (hotline, email, suggestion boxes)',
                'Safe and confidential complaint mechanisms',
                'Timely response to all feedback',
                'Regular feedback analysis and action',
            ],
        },
        {
            id: 4,
            title: 'Learning & Improvement',
            icon: CheckCircle,
            description:
                'Using feedback and learning to continuously improve our programs',
            practices: [
                'Regular program reviews and adjustments',
                'Incorporating community feedback',
                'Sharing lessons learned',
                'Adaptation based on changing needs',
            ],
        },
    ]

    const feedbackChannels = [
        {
            channel: 'Hotline',
            availability: '24/7',
            description: 'Call our dedicated hotline: +93 728777119',
        },
        {
            channel: 'Email',
            availability: 'Anytime',
            description: 'Send feedback to: feedback@vdongo.org',
        },
        {
            channel: 'Suggestion Boxes',
            availability: 'Always Open',
            description: 'Anonymous boxes in all program locations',
        },
        {
            channel: 'Community Meetings',
            availability: 'Monthly',
            description: 'Regular forums with communities',
        },
        {
            channel: 'SMS',
            availability: '24/7',
            description: 'Text your feedback to our number',
        },
        {
            channel: 'In-Person',
            availability: 'Office Hours',
            description: 'Visit any VDO office',
        },
    ]

    return (
        <>
            <Head title="Accountability to Affected Population (AAP) - VDO" />
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
                                Accountability to Affected Population
                            </h1>
                            <p className="text-xl text-white/90">
                                Putting communities at the center of everything
                                we do
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
                                    Our AAP Commitment
                                </h2>
                                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                                    VDO is committed to being accountable to the
                                    people we serve. We believe that affected
                                    populations have the right to participate in
                                    decisions that affect their lives, to receive
                                    information about our programs, to provide
                                    feedback, and to seek redress when things go
                                    wrong. Our Accountability to Affected
                                    Population (AAP) framework ensures we remain
                                    responsive to community needs and
                                    continuously improve our services.
                                </p>
                            </div>

                            {/* Four Commitments */}
                            <div className="mb-20 grid gap-8 lg:grid-cols-2">
                                {commitments.map((commitment) => (
                                    <div
                                        key={commitment.id}
                                        className="group rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                    >
                                        {/* Icon & Title */}
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B7EC] to-[#23369C] shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                <commitment.icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#23369C]">
                                                {commitment.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="mb-6 text-gray-600">
                                            {commitment.description}
                                        </p>

                                        {/* Practices */}
                                        <div className="space-y-2">
                                            {commitment.practices.map(
                                                (practice, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm"
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
                                                            {practice}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Feedback Channels */}
                            <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Share Your Feedback
                                </h2>
                                <p className="mb-10 text-center text-lg text-white/90">
                                    We value your input and welcome all feedback,
                                    suggestions, and complaints. Choose the
                                    channel that works best for you.
                                </p>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {feedbackChannels.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                                        >
                                            <h3 className="mb-2 text-xl font-bold">
                                                {item.channel}
                                            </h3>
                                            <p className="mb-3 text-sm text-[#00B7EC]">
                                                {item.availability}
                                            </p>
                                            <p className="text-sm text-white/80">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Response Process */}
                            <div>
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Our Response Process
                                </h2>
                                <div className="grid gap-8 md:grid-cols-4">
                                    {[
                                        {
                                            step: '1',
                                            title: 'Receive',
                                            desc: 'Feedback logged within 24 hours',
                                        },
                                        {
                                            step: '2',
                                            title: 'Acknowledge',
                                            desc: 'Confirmation sent to provider',
                                        },
                                        {
                                            step: '3',
                                            title: 'Investigate',
                                            desc: 'Review and action within 7 days',
                                        },
                                        {
                                            step: '4',
                                            title: 'Respond',
                                            desc: 'Outcome communicated back',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.step}
                                            className="text-center"
                                        >
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00B7EC] to-[#23369C] text-2xl font-bold text-white shadow-xl">
                                                {item.step}
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Commitments Box */}
                            <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                                    Our Promises to You
                                </h2>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            100%
                                        </div>
                                        <p className="text-gray-700">
                                            All feedback will be reviewed and
                                            responded to
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            Safe
                                        </div>
                                        <p className="text-gray-700">
                                            Confidential and secure feedback
                                            channels
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-4 text-4xl font-bold text-[#00B7EC]">
                                            Action
                                        </div>
                                        <p className="text-gray-700">
                                            Your feedback drives program
                                            improvements
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
