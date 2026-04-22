import {
    Users,
    Building2,
    Globe,
    MessageCircle,
    Handshake,
    Target,
} from 'lucide-react'

const stakeholders = [
    {
        icon: Users,
        title: 'Communities',
        description:
            'Beneficiaries and affected populations are at the center of our work, with their voices guiding program design and implementation.',
    },
    {
        icon: Building2,
        title: 'Government & Authorities',
        description:
            'Principled engagement with relevant authorities to ensure program access and coordination.',
    },
    {
        icon: Globe,
        title: 'UN Agencies',
        description:
            'Active collaboration with UN agencies through cluster coordination and joint programming initiatives.',
    },
    {
        icon: Handshake,
        title: 'Donors & Partners',
        description:
            'Transparent relationships with funding partners built on accountability and shared impact goals.',
    },
    {
        icon: MessageCircle,
        title: 'Civil Society',
        description:
            'Partnerships with local NGOs, community organizations, and civil society groups.',
    },
    {
        icon: Target,
        title: 'Coordination Bodies',
        description:
            'Leadership roles in ACBAR, HCT, and sector working groups to shape humanitarian response.',
    },
]

export default function StakeholderEngagement() {
    return (
        <section id="stakeholder-engagement" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(0,175,239)]/10 px-4 py-2 text-sm font-semibold text-[rgb(0,175,239)]">
                        Collaborative Approach
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Stakeholder Engagement Framework
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        VDO maintains strategic relationships with diverse
                        stakeholders to ensure effective, coordinated, and
                        accountable humanitarian response.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {stakeholders.map((stakeholder, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-[rgb(62,64,149)]/20 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(62,64,149)]/10 transition-colors group-hover:bg-[rgb(62,64,149)]">
                                    <stakeholder.icon className="h-7 w-7 text-[rgb(62,64,149)] transition-colors group-hover:text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-[rgb(62,64,149)]">
                                    {stakeholder.title}
                                </h3>
                                <p className="text-gray-600">
                                    {stakeholder.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-xl bg-gray-50 p-8">
                        <h3 className="mb-4 text-center text-xl font-bold text-[rgb(62,64,149)]">
                            Our Engagement Principles
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                <p className="font-semibold text-[rgb(62,64,149)]">
                                    Transparency
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Open communication with all stakeholders
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                <p className="font-semibold text-[rgb(62,64,149)]">
                                    Accountability
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Clear roles and responsibilities
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                <p className="font-semibold text-[rgb(62,64,149)]">
                                    Mutual Respect
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Valuing diverse perspectives
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
