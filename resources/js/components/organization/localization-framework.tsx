import { MapPin, Users, Handshake, TrendingUp, Heart, Shield } from 'lucide-react'

const principles = [
    {
        icon: MapPin,
        title: 'Local Leadership',
        description:
            'Afghan-led decision making at all levels of program design and implementation',
    },
    {
        icon: Users,
        title: 'Community Ownership',
        description:
            'Building sustainable programs through genuine community participation and ownership',
    },
    {
        icon: Handshake,
        title: 'Partnership Model',
        description:
            'Equitable partnerships with local organizations, civil society, and community groups',
    },
    {
        icon: TrendingUp,
        title: 'Capacity Strengthening',
        description:
            'Investing in local capacity building for long-term sustainability',
    },
    {
        icon: Heart,
        title: 'Cultural Sensitivity',
        description:
            'Culturally informed approaches that respect local values and traditions',
    },
    {
        icon: Shield,
        title: 'Risk Sharing',
        description:
            'Transparent risk sharing and joint accountability with local partners',
    },
]

export default function LocalizationFramework() {
    return (
        <section id="localization-framework" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#23369C]/10 px-4 py-2 text-sm font-semibold text-[#23369C]">
                        Afghan-Led Development
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Localization Framework
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        VDO champions localization as a core organizational
                        principle, ensuring that Afghan voices lead humanitarian
                        and development responses.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {principles.map((principle, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#23369C] to-[#00B7EC]">
                                    <principle.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-[#23369C]">
                                    {principle.title}
                                </h3>
                                <p className="text-gray-600">
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-xl bg-gradient-to-r from-[#23369C] to-[#00B7EC] p-8 text-white">
                        <h3 className="mb-4 text-xl font-bold">
                            Our Commitment to Localization
                        </h3>
                        <p className="leading-relaxed text-white/90">
                            As a woman-led national NGO, VDO stands as a symbol
                            of Afghan women's leadership, the power of
                            localization, and the trust placed in national
                            actors to respond effectively to evolving community
                            needs. We advocate for increased direct funding to
                            local organizations and meaningful participation in
                            coordination mechanisms.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
