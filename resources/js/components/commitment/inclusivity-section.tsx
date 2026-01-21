import { Users, Heart, Accessibility, UserCheck, Globe } from 'lucide-react'

const groups = [
    { icon: Heart, label: 'Women and Girls' },
    { icon: Accessibility, label: 'People with Disabilities' },
    { icon: Users, label: 'Youth' },
    { icon: UserCheck, label: 'Underserved Populations' },
]

export default function InclusivitySection() {
    return (
        <section id="inclusivity" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        Leave No One Behind
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Promoting Inclusivity
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                        <p className="mb-6 leading-relaxed text-gray-700">
                            VDO is committed to fostering inclusive development
                            that leaves no one behind. The organization ensures
                            that all programs consider the needs of marginalized
                            and vulnerable groups, including women, girls,
                            people with disabilities, youth, and other
                            underserved populations.
                        </p>
                        <p className="leading-relaxed text-gray-700">
                            By promoting equal access to education, economic
                            opportunities, health services, and safe community
                            spaces, VDO empowers every individual to participate
                            fully in social, economic, and civic life, creating
                            more equitable and resilient communities.
                        </p>
                    </div>

                    {/* Target Groups */}
                    <div className="mb-12 flex flex-wrap justify-center gap-4">
                        {groups.map((group, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-full bg-[#23369C] px-5 py-3 text-white"
                            >
                                <group.icon className="h-5 w-5" />
                                <span className="font-medium">{group.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Key Points */}
                    <div className="rounded-xl bg-[#23369C] p-8 text-white">
                        <div className="mb-4 flex items-center gap-3">
                            <Globe className="h-6 w-6" />
                            <h3 className="text-xl font-bold">
                                Inclusivity in Practice
                            </h3>
                        </div>
                        <p className="leading-relaxed text-white/90">
                            Inclusivity is embedded in every aspect of VDO's
                            work—from program design and implementation to
                            monitoring and evaluation—ensuring that
                            interventions are accessible, culturally sensitive,
                            and responsive to the unique needs of diverse
                            communities. VDO actively engages community members
                            in decision-making processes, encourages their
                            voices to be heard, and works to break down barriers
                            to participation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
