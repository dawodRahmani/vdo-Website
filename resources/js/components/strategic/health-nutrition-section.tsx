import { Heart, Activity, Users, Ambulance, CheckCircle } from 'lucide-react'

const services = [
    {
        icon: Heart,
        title: 'Primary Healthcare',
        description: 'Essential and life-saving healthcare services',
    },
    {
        icon: Activity,
        title: 'Nutrition Services',
        description: 'Community health centers and nutrition support',
    },
    {
        icon: Users,
        title: 'Mobile Teams',
        description: 'Mobile health and nutrition teams for remote areas',
    },
    {
        icon: Ambulance,
        title: 'Emergency Response',
        description: 'Rapid response approach for crisis situations',
    },
]

const regions = [
    'Central Region',
    'Northern Region',
    'Western Region',
    'Eastern Region',
]

const achievements = [
    'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management',
    'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS',
    'Conducted 30 awareness-raising sessions on available nutrition services',
    'Training to nutrition partners on conducting safety audits',
    'Distributed dignity kits to vulnerable women and girls',
    'Established women- and girls-friendly spaces near health centres',
    'Addressed vaccine misconceptions and promoted positive health behaviors through Integrated Health-Nutrition-Immunization Project',
]

export default function HealthNutritionSection() {
    return (
        <section id="health-nutrition" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(62,64,149)]/10 px-4 py-2 text-sm font-semibold text-[rgb(62,64,149)]">
                        SDG 3
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Health and Nutrition
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO advances equitable access to essential and
                        life-saving primary healthcare and nutrition services
                        for women, children, and crisis-affected communities.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Services Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500">
                                    <service.icon className="h-7 w-7 text-white" />
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

                    {/* Geographic Presence */}
                    <div className="mb-12 rounded-xl bg-[rgb(62,64,149)] p-8 text-white">
                        <h3 className="mb-4 text-xl font-bold">
                            Health and Nutrition Geographic Presence
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
                        <p className="mt-4 text-sm text-white/80">
                            VDO is an active member of the Health and WASH
                            Clusters, ensuring alignment with global
                            humanitarian standards.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/strategic/image4.png"
                            alt="VDO Health and Nutrition Programs"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Key Achievements */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                        <h3 className="mb-6 text-xl font-bold text-[rgb(62,64,149)]">
                            Key Achievements
                        </h3>
                        <div className="space-y-3">
                            {achievements.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
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
