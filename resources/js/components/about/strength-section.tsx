import {
    Heart,
    MapPin,
    Award,
    Users,
    Globe,
    Zap,
} from 'lucide-react'

const strengths = [
    {
        icon: Heart,
        title: 'Women-Led Leadership',
        description:
            'Founded and led by Afghan women, bringing unique perspectives and deep community trust to our operations.',
        color: 'bg-pink-500',
    },
    {
        icon: MapPin,
        title: 'Local Presence',
        description:
            'Deep-rooted presence across Afghanistan with strong community relationships built over years of dedicated service.',
        color: 'bg-blue-500',
    },
    {
        icon: Award,
        title: 'Proven Track Record',
        description:
            'Successfully delivering humanitarian and development programs since 2015 with measurable impact.',
        color: 'bg-yellow-500',
    },
    {
        icon: Users,
        title: 'Experienced Team',
        description:
            'Dedicated team of professionals with extensive experience in humanitarian response and development.',
        color: 'bg-green-500',
    },
    {
        icon: Globe,
        title: 'Strategic Partnerships',
        description:
            'Strong relationships with UN agencies, international donors, and local coordination bodies.',
        color: 'bg-purple-500',
    },
    {
        icon: Zap,
        title: 'Adaptive Capacity',
        description:
            'Demonstrated ability to adapt and operate effectively in complex and rapidly changing environments.',
        color: 'bg-orange-500',
    },
]

export default function StrengthSection() {
    return (
        <section id="strength" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        Why Choose VDO
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        VDO Strength
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        What sets us apart in delivering impactful humanitarian
                        assistance across Afghanistan
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {strengths.map((strength, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
                            >
                                {/* Decorative corner */}
                                <div
                                    className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${strength.color} opacity-10 transition-transform group-hover:scale-150`}
                                ></div>

                                <div
                                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${strength.color}`}
                                >
                                    <strength.icon className="h-7 w-7 text-white" />
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                    {strength.title}
                                </h3>

                                <p className="text-gray-600">
                                    {strength.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#23369C] to-[#00B7EC] p-8 text-center text-white">
                        <h3 className="mb-4 text-2xl font-bold">
                            Partner With Us
                        </h3>
                        <p className="mx-auto mb-6 max-w-2xl text-white/90">
                            Join VDO in our mission to empower communities and
                            build resilient futures in Afghanistan. Together, we
                            can make a lasting impact.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-[#23369C] transition-transform hover:scale-105"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
