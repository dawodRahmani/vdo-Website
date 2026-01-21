import {
    CheckCircle,
    Users,
    Globe,
    Shield,
    Target,
    Heart,
} from 'lucide-react'

const approaches = [
    {
        icon: Users,
        title: 'Community-Led',
        description:
            'Programs prioritize localization, community leadership, and trusted access',
    },
    {
        icon: Shield,
        title: 'Safeguarding First',
        description:
            'Robust safeguarding, compliance, and accountability systems throughout',
    },
    {
        icon: Heart,
        title: 'Gender-Responsive',
        description:
            'Protecting dignity and safety of women and girls in all interventions',
    },
    {
        icon: Target,
        title: 'Evidence-Based',
        description:
            'Adapts rapidly using evidence-based decision-making and flexible models',
    },
]

const contributions = [
    'Representing more than 200 NGOs through leadership in the ACBAR Steering Committee',
    'Co-leading and actively shaping technical working groups such as the Education ALP Working Group',
    'Bringing ground-level insights into humanitarian strategy decisions',
    'Driving localization leadership and Afghan women\'s participation in policy dialogues',
]

export default function ProgrammaticApproach() {
    return (
        <section id="programmatic-approach" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        How We Work
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Programmatic Approach
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Description */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                        <p className="leading-relaxed text-gray-700">
                            Since 2021, Vision Development Organization (VDO)
                            has sustained a strong and resilient brand identity
                            by maintaining operations and a female-led workforce
                            despite severe restrictions on civic space and
                            women's participation. This resilience is grounded
                            in deep community acceptance, culturally informed
                            engagement, and a proven record of integrity and
                            responsible delivery.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-700">
                            VDO's programmatic approach is comprehensive,
                            context-responsive, and aligned with international
                            humanitarian and development standards, ensuring
                            inclusion, quality, and accountability across all
                            interventions.
                        </p>
                    </div>

                    {/* Programmatic Approach Diagram */}
                    <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/organization/programmatic-approach.png"
                            alt="VDO Programmatic Approach Framework"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Key Approaches */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {approaches.map((approach, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#23369C]">
                                    <approach.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-bold text-[#23369C]">
                                    {approach.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {approach.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Contributing to Collective Resilience */}
                    <div className="rounded-xl bg-[#23369C] p-8 text-white">
                        <div className="mb-6 flex items-center gap-3">
                            <Globe className="h-8 w-8" />
                            <h3 className="text-2xl font-bold">
                                Contributing to Collective Resilience
                            </h3>
                        </div>
                        <p className="mb-6 text-white/90">
                            VDO is not only a frontline implementer but a
                            recognized contributor to national coordination and
                            advocacy efforts:
                        </p>
                        <div className="space-y-3">
                            {contributions.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                    <p className="text-white/90">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cross-cutting priorities */}
                    <div className="mt-12">
                        <p className="text-center leading-relaxed text-gray-700">
                            By systematically integrating gender equality,
                            protection, accountability, and ethical standards
                            into every intervention, VDO ensures that assistance
                            not only reaches those most in need, but does so in
                            a manner that safeguards dignity, minimizes risk,
                            and strengthens long-term community resilience.
                        </p>

                        {/* Cross-cutting Priorities Diagram */}
                        <div className="mt-8 overflow-hidden rounded-xl shadow-lg">
                            <img
                                src="/images/organization/cross-cutting.png"
                                alt="VDO Cross-cutting Priorities"
                                className="h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
