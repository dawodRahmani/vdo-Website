import { AlertTriangle, DollarSign, Package, Apple, Info, Users } from 'lucide-react'

const interventions = [
    {
        icon: DollarSign,
        title: 'Emergency Cash Assistance',
        description: 'Rapid cash support for immediate needs',
    },
    {
        icon: Package,
        title: 'Essential NFIs',
        description: 'Distribution of essential non-food items',
    },
    {
        icon: Apple,
        title: 'Nutrition Support',
        description: 'Emergency nutrition for vulnerable groups',
    },
    {
        icon: Info,
        title: 'Information & Referrals',
        description: 'Access to lifesaving information and services',
    },
]

export default function EmergencyResponseSection() {
    return (
        <section id="emergency-response" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                        Humanitarian Response
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Emergency Response
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO delivers rapid, community-centered emergency
                        assistance to households affected by crises, natural
                        disasters, and conflict across Afghanistan.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Main Content */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                        <div className="mb-6 flex items-center gap-3">
                            <AlertTriangle className="h-8 w-8" />
                            <h3 className="text-2xl font-bold">
                                Our Approach
                            </h3>
                        </div>
                        <p className="leading-relaxed text-white/90">
                            Our approach focuses on meeting urgent needs while
                            protecting the dignity and resilience of affected
                            families. Through coordinated humanitarian
                            interventions, we ensure that vulnerable women,
                            children, and marginalized groups receive timely and
                            equitable support.
                        </p>
                    </div>

                    {/* Interventions */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {interventions.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-orange-100 bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500">
                                    <item.icon className="h-7 w-7 text-white" />
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
                            src="/images/strategic/image5.png"
                            alt="VDO Emergency Response"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Guiding Principles */}
                    <div className="rounded-xl bg-gray-50 p-8">
                        <div className="flex items-center justify-center gap-3">
                            <Users className="h-6 w-6 text-[rgb(62,64,149)]" />
                            <p className="text-center leading-relaxed text-gray-700">
                                Guided by local knowledge and rooted in strong
                                community networks, VDO's emergency response
                                programs are designed to{' '}
                                <span className="font-semibold text-[rgb(62,64,149)]">
                                    save lives
                                </span>
                                ,{' '}
                                <span className="font-semibold text-[rgb(62,64,149)]">
                                    reduce suffering
                                </span>
                                , and help communities{' '}
                                <span className="font-semibold text-[rgb(62,64,149)]">
                                    recover with strength and hope
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
