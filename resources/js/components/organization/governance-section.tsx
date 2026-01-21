import { Building2, Users, FileCheck, Eye, Scale, Shield } from 'lucide-react'

const governanceElements = [
    {
        icon: Building2,
        title: 'Board of Directors',
        description:
            'Strategic oversight and governance provided by an independent Board ensuring organizational integrity and direction.',
    },
    {
        icon: Users,
        title: 'Senior Management Team',
        description:
            'Experienced leadership team responsible for operational excellence and program delivery across all regions.',
    },
    {
        icon: FileCheck,
        title: 'Audit Committee',
        description:
            'Independent oversight of financial management, internal controls, and compliance with donor requirements.',
    },
    {
        icon: Eye,
        title: 'Transparency',
        description:
            'Open reporting on activities, finances, and impact to stakeholders and the public.',
    },
    {
        icon: Scale,
        title: 'Ethical Standards',
        description:
            'Strong ethical framework guiding all organizational decisions and actions.',
    },
    {
        icon: Shield,
        title: 'Risk Oversight',
        description:
            'Board-level oversight of organizational risks including operational, financial, and reputational risks.',
    },
]

export default function GovernanceSection() {
    return (
        <section id="governance" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#23369C]/10 px-4 py-2 text-sm font-semibold text-[#23369C]">
                        Leadership & Oversight
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Governance
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        VDO maintains strong governance structures that ensure
                        strategic direction, accountability, and ethical
                        leadership across all operations.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {governanceElements.map((element, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#23369C]">
                                    <element.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                    {element.title}
                                </h3>
                                <p className="text-gray-600">
                                    {element.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Governance Statement */}
                    <div className="mt-12 rounded-xl bg-gradient-to-r from-[#23369C] to-[#1a2875] p-8 text-white">
                        <h3 className="mb-4 text-xl font-bold">
                            Our Governance Commitment
                        </h3>
                        <p className="leading-relaxed text-white/90">
                            The Governing Policy defines the roles and
                            responsibilities of VDO's Board. It ensures
                            strategic oversight, ethical leadership, and
                            accountability. Board independence and transparency
                            are emphasized. The policy supports effective
                            decision-making and strengthens institutional
                            governance and sustainability.
                        </p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <p className="text-2xl font-bold">100%</p>
                                <p className="text-sm text-white/80">
                                    Board Independence
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <p className="text-2xl font-bold">Quarterly</p>
                                <p className="text-sm text-white/80">
                                    Board Meetings
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <p className="text-2xl font-bold">Annual</p>
                                <p className="text-sm text-white/80">
                                    External Audit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
