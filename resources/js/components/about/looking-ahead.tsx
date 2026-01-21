import { TrendingUp, AlertTriangle, Lightbulb, Heart } from 'lucide-react'

const challenges = [
    {
        icon: AlertTriangle,
        title: 'Humanitarian Challenges',
        description:
            'Afghanistan faces a fragile humanitarian landscape, widespread poverty, and restrictions on the rights of women and girls.',
    },
    {
        icon: TrendingUp,
        title: 'Economic Constraints',
        description:
            'Limited international aid and a weakened financial system have strained services and community resilience.',
    },
]

const opportunities = [
    {
        icon: Lightbulb,
        title: 'Innovative Solutions',
        description:
            'Opportunities exist for innovative, community-driven solutions in areas like climate adaptation, food security, livelihoods, and youth empowerment.',
    },
    {
        icon: Heart,
        title: 'Woman-Led Impact',
        description:
            "As a woman-led national NGO with deep local networks, VDO is uniquely positioned to navigate these challenges.",
    },
]

export default function LookingAhead() {
    return (
        <section id="looking-ahead" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        Future Outlook
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Looking Ahead: Crisis and Possibility
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Challenges and Opportunities Grid */}
                    <div className="mb-12 grid gap-8 md:grid-cols-2">
                        {/* Challenges */}
                        <div>
                            <h3 className="mb-6 text-xl font-bold text-gray-800">
                                Current Challenges
                            </h3>
                            <div className="space-y-4">
                                {challenges.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 rounded-lg border border-red-100 bg-red-50 p-4"
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                            <item.icon className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Opportunities */}
                        <div>
                            <h3 className="mb-6 text-xl font-bold text-gray-800">
                                Opportunities
                            </h3>
                            <div className="space-y-4">
                                {opportunities.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 rounded-lg border border-green-100 bg-green-50 p-4"
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <item.icon className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Strategic Focus */}
                    <div className="rounded-2xl bg-gradient-to-r from-[#23369C] to-[#00B7EC] p-8 text-white shadow-xl">
                        <h3 className="mb-4 text-2xl font-bold">
                            Our Strategic Focus
                        </h3>
                        <p className="mb-6 leading-relaxed text-white/90">
                            Our strategy focuses on long-term community
                            resilience, skills development, and safe spaces for
                            dialogue, empowering Afghan women and youth to
                            actively shape their futures. Over the next five
                            years, VDO will leverage its expertise and
                            partnerships to protect lives, uphold dignity, and
                            advance equity and sustainable development in
                            Afghanistan.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <p className="text-2xl font-bold">5+</p>
                                <p className="text-sm text-white/80">
                                    Years of Growth Planned
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <p className="text-2xl font-bold">34</p>
                                <p className="text-sm text-white/80">
                                    Provinces Targeted
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center">
                                <p className="text-2xl font-bold">100%</p>
                                <p className="text-sm text-white/80">
                                    Commitment to Excellence
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
