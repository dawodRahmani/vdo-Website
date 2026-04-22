import { Users, MapPin, Building2, Award } from 'lucide-react'

const capacityStats = [
    {
        icon: Users,
        value: '200+',
        label: 'Staff Members',
        description: 'Dedicated professionals across Afghanistan',
    },
    {
        icon: MapPin,
        value: '34',
        label: 'Provinces',
        description: 'Operational presence nationwide',
    },
    {
        icon: Building2,
        value: '5',
        label: 'Regional Offices',
        description: 'Strategic locations for effective delivery',
    },
    {
        icon: Award,
        value: '10+',
        label: 'Years Experience',
        description: 'Building trust since 2015',
    },
]

export default function OurCapacity() {
    return (
        <section id="our-capacity" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(0,175,239)]/10 px-4 py-2 text-sm font-semibold text-[rgb(0,175,239)]">
                        Our Strength
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Our Capacity
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        VDO has built robust organizational capacity to deliver
                        high-quality humanitarian and development programs
                        across Afghanistan.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {capacityStats.map((stat, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(62,64,149)]/10 transition-colors group-hover:bg-[rgb(62,64,149)]">
                                    <stat.icon className="h-7 w-7 text-[rgb(62,64,149)] transition-colors group-hover:text-white" />
                                </div>
                                <p className="mb-1 text-3xl font-bold text-[rgb(62,64,149)]">
                                    {stat.value}
                                </p>
                                <p className="mb-2 font-semibold text-gray-800">
                                    {stat.label}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 rounded-xl bg-gradient-to-r from-[rgb(62,64,149)]/5 to-[rgb(0,175,239)]/5 p-8">
                        <p className="text-center leading-relaxed text-gray-700">
                            Our organizational capacity is continuously
                            strengthened through staff development, systems
                            enhancement, and strategic partnerships. VDO invests
                            in building a skilled, motivated, and diverse
                            workforce capable of responding to Afghanistan's
                            evolving needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
