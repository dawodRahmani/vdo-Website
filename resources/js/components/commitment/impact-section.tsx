import { Leaf, Users, TrendingUp, Heart, Globe, Target } from 'lucide-react'

const pillars = [
    {
        icon: Users,
        title: 'Empowering Communities',
        description: 'Building local capacities and leadership',
    },
    {
        icon: TrendingUp,
        title: 'Resilient Systems',
        description: 'Creating structures that thrive beyond project timelines',
    },
    {
        icon: Heart,
        title: 'Community Participation',
        description: 'Ensuring interventions are relevant and owned locally',
    },
    {
        icon: Target,
        title: 'Evidence-Based Approaches',
        description: 'Using data to drive program design and improvement',
    },
]

export default function ImpactSection() {
    return (
        <section id="impact" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
                        Long-term Change
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Impact & Sustainability
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Statement */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-8 text-white">
                        <div className="mb-4 flex items-center gap-3">
                            <Leaf className="h-8 w-8" />
                            <h3 className="text-xl font-bold">
                                Creating Lasting Impact
                            </h3>
                        </div>
                        <p className="leading-relaxed text-white/90">
                            VDO is dedicated to creating lasting impact by
                            designing programs that not only address immediate
                            needs but also foster long-term, sustainable change.
                            The organization focuses on empowering communities,
                            building local capacities, and promoting resilient
                            systems that continue to thrive beyond project
                            timelines.
                        </p>
                    </div>

                    {/* Pillars */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-white p-6 shadow-md"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                                    <pillar.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-bold text-[#23369C]">
                                    {pillar.title}
                                </h3>
                                <p className="text-gray-600">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Legacy Statement */}
                    <div className="rounded-xl bg-[#23369C] p-8 text-white">
                        <div className="mb-4 flex items-center justify-center gap-3">
                            <Globe className="h-6 w-6" />
                            <h3 className="text-xl font-bold">
                                Sustainable Legacy
                            </h3>
                        </div>
                        <p className="text-center leading-relaxed text-white/90">
                            Through this commitment, VDO strengthens
                            livelihoods, enhances access to education and health
                            services, and supports inclusive development—leaving
                            a sustainable legacy of positive change in the
                            communities it serves.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
