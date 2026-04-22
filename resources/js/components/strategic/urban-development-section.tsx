import { Building2, Leaf, Sun, Droplets, Wind, Shield } from 'lucide-react'

const interventions = [
    {
        icon: Leaf,
        title: 'Urban Reforestation',
        description:
            'Greenbelt development to reduce heat islands, prevent erosion, and restore ecological balance',
    },
    {
        icon: Sun,
        title: 'Clean Energy',
        description:
            'Promotion of clean and renewable energy sources, including solar solutions',
    },
    {
        icon: Droplets,
        title: 'Water Management',
        description:
            'Improved drainage, flood prevention measures, and protection of natural water sources',
    },
    {
        icon: Wind,
        title: 'Climate-Smart Agriculture',
        description:
            'Models tailored for peri-urban households and small-scale farmers',
    },
    {
        icon: Shield,
        title: 'Community Stewardship',
        description:
            'Awareness campaigns on waste reduction, recycling, and disaster preparedness',
    },
    {
        icon: Building2,
        title: 'Sustainable Cities',
        description:
            'Climate-resilient and inclusive urban development programs',
    },
]

const targetPopulations = [
    'Rural farming families affected by droughts and floods',
    'Women and girls facing livelihood and water insecurity',
    'Internally displaced people (IDPs)',
    'Disaster-affected communities',
    'People with disabilities and vulnerable households',
    'Youth engaged in local climate action',
]

export default function UrbanDevelopmentSection() {
    return (
        <section id="urban-development" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(0,175,239)]/10 px-4 py-2 text-sm font-semibold text-[rgb(0,175,239)]">
                        SDG 11, SDG 13 & SDG 15
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Urban Development
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO promotes sustainable, climate-resilient, and
                        inclusive cities by integrating environmental
                        protection, community-driven planning, and risk-reduction
                        measures across all programs.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Interventions Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {interventions.map((item, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 transition-colors group-hover:bg-green-600">
                                    <item.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-bold text-[rgb(62,64,149)]">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/strategic/image3.png"
                            alt="VDO Urban Development Initiatives"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Target Populations */}
                    <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-8 text-white">
                        <h3 className="mb-6 text-xl font-bold">
                            Vulnerable Populations We Serve
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {targetPopulations.map((population, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3"
                                >
                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                    <span className="text-sm">{population}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact Statement */}
                    <div className="mt-12 text-center">
                        <p className="leading-relaxed text-gray-700">
                            These efforts aim to safeguard lives, livelihoods,
                            water security, and food systems, while promoting
                            healthier ecosystems and long-term sustainability.
                            By embedding climate considerations into all urban
                            programming, VDO helps secure a healthier, greener,
                            and more resilient future for Afghanistan's next
                            generations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
