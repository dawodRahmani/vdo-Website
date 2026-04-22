import { Shield, Baby, Users, AlertTriangle, FileCheck, Heart } from 'lucide-react'

const elements = [
    {
        icon: Shield,
        title: 'Prevention',
        description: 'Clear mechanisms to prevent harm before it occurs',
    },
    {
        icon: AlertTriangle,
        title: 'Reporting',
        description: 'Accessible and confidential reporting channels',
    },
    {
        icon: FileCheck,
        title: 'Response',
        description: 'Swift and appropriate response to all concerns',
    },
    {
        icon: Users,
        title: 'Training',
        description: 'Staff and partners trained on ethical standards',
    },
]

export default function SafeguardingSection() {
    return (
        <section id="safeguarding" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(0,175,239)]/10 px-4 py-2 text-sm font-semibold text-[rgb(0,175,239)]">
                        Protection
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Safeguarding
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Content */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[rgb(62,64,149)]/5 to-[rgb(0,175,239)]/5 p-8">
                        <p className="leading-relaxed text-gray-700">
                            VDO is fully committed to preventing and responding
                            to harm through its Safeguarding Policy, which
                            protects children, adults at risk, and all community
                            members. The organization has established clear
                            prevention, reporting, and response mechanisms,
                            ensuring that safeguarding responsibilities apply to
                            all staff, volunteers, and partners.
                        </p>
                    </div>

                    {/* Protected Groups */}
                    <div className="mb-12 flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 rounded-full bg-[rgb(62,64,149)] px-5 py-3 text-white">
                            <Baby className="h-5 w-5" />
                            <span>Children</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-[rgb(62,64,149)] px-5 py-3 text-white">
                            <Users className="h-5 w-5" />
                            <span>Adults at Risk</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-[rgb(62,64,149)] px-5 py-3 text-white">
                            <Heart className="h-5 w-5" />
                            <span>Community Members</span>
                        </div>
                    </div>

                    {/* Key Elements */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {elements.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md"
                            >
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(62,64,149)]">
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

                    {/* Closing Statement */}
                    <div className="rounded-xl bg-[rgb(62,64,149)] p-8 text-white">
                        <p className="leading-relaxed text-white/90">
                            Safeguarding is central to VDO's work, ensuring that
                            all beneficiaries—especially women, children, and
                            vulnerable individuals—are treated with dignity,
                            protected from risk, and empowered to raise their
                            voices without fear. These measures underpin safe
                            and dignified programming across all of VDO's
                            initiatives, reinforcing the organization's
                            commitment to integrity, care, and accountability in
                            every interaction.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
