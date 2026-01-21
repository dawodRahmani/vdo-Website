import { CheckCircle, MessageCircle, Users, Shield, Heart } from 'lucide-react'

const commitments = [
    {
        icon: MessageCircle,
        title: 'Transparent Information',
        description: 'Sharing on services, criteria, and entitlements',
    },
    {
        icon: Users,
        title: 'Community Participation',
        description: 'Meaningful engagement throughout the program cycle',
    },
    {
        icon: Shield,
        title: 'Safe Feedback Channels',
        description: 'Confidential and accessible complaint mechanisms',
    },
    {
        icon: CheckCircle,
        title: 'Timely Response',
        description: 'Resolution of all feedback and complaints',
    },
    {
        icon: Heart,
        title: 'Protection',
        description: 'Of complainants with strict non-retaliation policy',
    },
    {
        icon: Users,
        title: 'Inclusive Engagement',
        description: 'Of women, persons with disabilities, and marginalized groups',
    },
]

export default function AapSection() {
    return (
        <section id="aap" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#23369C]/10 px-4 py-2 text-sm font-semibold text-[#23369C]">
                        AAP
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Accountability to Affected Populations
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO is committed to ensuring that crisis-affected people
                        are informed, heard, included, and respected.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Main Statement */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C] to-[#00B7EC] p-8 text-center text-white">
                        <p className="text-lg leading-relaxed">
                            Accountability to Affected Populations is central to
                            our mandate and guides how communities shape our
                            programs and decisions.
                        </p>
                    </div>

                    {/* Commitments Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {commitments.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#23369C]/10">
                                    <item.icon className="h-6 w-6 text-[#23369C]" />
                                </div>
                                <h3 className="mb-2 font-bold text-[#23369C]">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Closing Statement */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-md">
                        <p className="leading-relaxed text-gray-700">
                            For VDO, AAP is both a{' '}
                            <span className="font-semibold text-[#23369C]">
                                responsibility
                            </span>{' '}
                            and a{' '}
                            <span className="font-semibold text-[#23369C]">
                                moral obligation
                            </span>
                            . We strive to build trust-based relationships and
                            ensure our assistance is relevant, safe, dignified,
                            and accountable to the people we serve.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
