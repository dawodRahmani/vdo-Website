import { Target, TrendingUp, BarChart3, Users, Zap, RefreshCw } from 'lucide-react'

const elements = [
    {
        icon: Target,
        title: 'Careful Planning',
        description: 'Strategic approach to program design',
    },
    {
        icon: BarChart3,
        title: 'Evidence-Based',
        description: 'Data-driven decision making',
    },
    {
        icon: RefreshCw,
        title: 'Continuous M&E',
        description: 'Ongoing monitoring and evaluation',
    },
    {
        icon: TrendingUp,
        title: 'Results-Driven',
        description: 'Focus on measurable outcomes',
    },
    {
        icon: Zap,
        title: 'Adaptive Management',
        description: 'Flexible response to changing needs',
    },
    {
        icon: Users,
        title: 'Collaboration',
        description: 'Partnership with communities',
    },
]

export default function EffectivenessSection() {
    return (
        <section id="effectiveness" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#23369C]/10 px-4 py-2 text-sm font-semibold text-[#23369C]">
                        Performance
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Effectiveness & Efficiency
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Statement */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C] to-[#00B7EC] p-8 text-white">
                        <p className="text-lg leading-relaxed">
                            VDO is committed to delivering programs that are
                            both effective and efficient, ensuring that
                            resources are used responsibly to achieve meaningful
                            impact.
                        </p>
                    </div>

                    {/* Elements Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {elements.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#23369C] to-[#00B7EC]">
                                    <item.icon className="h-6 w-6 text-white" />
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
                            Through careful planning, evidence-based approaches,
                            and continuous monitoring and evaluation, VDO
                            maximizes the outcomes of its interventions while
                            minimizing waste and duplication. By combining
                            strategic planning, operational excellence, and
                            accountability, VDO strengthens its ability to
                            respond to community needs, improve livelihoods, and
                            create sustainable, lasting change.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
