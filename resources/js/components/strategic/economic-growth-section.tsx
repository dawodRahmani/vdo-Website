import { TrendingUp, Briefcase, DollarSign, Users, CheckCircle } from 'lucide-react'

const services = [
    {
        icon: Briefcase,
        title: 'Skills Training',
        description: 'TVET and market-aligned skills training programs',
    },
    {
        icon: DollarSign,
        title: 'Startup Support',
        description: 'Startup kits, small business grants, and financial literacy',
    },
    {
        icon: Users,
        title: 'Mentorship',
        description: 'Entrepreneurship support, mentorship, and coaching',
    },
    {
        icon: TrendingUp,
        title: 'Career Services',
        description: 'WAQAR Career Center for job placement and guidance',
    },
]

const regions = ['Kabul', 'Northern Regions', 'Western Regions', 'Eastern Regions']

const achievements = [
    'Multiple women-owned small businesses launched and sustained',
    'Youth employed through career placement support',
    'Women with disabilities supported through home-based livelihoods',
    'Income improvement validated by post-training assessments',
]

export default function EconomicGrowthSection() {
    return (
        <section id="economic-growth" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(62,64,149)]/10 px-4 py-2 text-sm font-semibold text-[rgb(62,64,149)]">
                        SDG 1 & SDG 8
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Economic Growth
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO advances economic growth by equipping
                        individuals—especially women and youth—with sustainable
                        livelihood opportunities.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Services Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(62,64,149)]">
                                    <service.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-bold text-[rgb(62,64,149)]">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Geographic Coverage */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[rgb(62,64,149)] to-[rgb(0,175,239)] p-8 text-white">
                        <h3 className="mb-4 text-xl font-bold">
                            Geographic Coverage
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {regions.map((region, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium"
                                >
                                    {region}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/strategic/image2.png"
                            alt="VDO Economic Growth Initiatives"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Key Achievements */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                        <h3 className="mb-6 text-xl font-bold text-[rgb(62,64,149)]">
                            Key Achievements
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {achievements.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
