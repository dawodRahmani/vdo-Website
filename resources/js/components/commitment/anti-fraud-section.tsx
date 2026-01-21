import { Shield, Eye, Scale, AlertTriangle, FileCheck, Users } from 'lucide-react'

const principles = [
    {
        icon: Shield,
        title: 'Zero Tolerance',
        description: 'For fraud and corruption in all operations',
    },
    {
        icon: AlertTriangle,
        title: 'Prevention',
        description: 'Clear measures to prevent fraudulent activities',
    },
    {
        icon: Eye,
        title: 'Detection',
        description: 'Robust systems to identify irregularities',
    },
    {
        icon: FileCheck,
        title: 'Response',
        description: 'Swift action when issues are identified',
    },
    {
        icon: Users,
        title: 'Accountability',
        description: 'All staff and partners held to high standards',
    },
    {
        icon: Scale,
        title: 'Confidential Reporting',
        description: 'Safe mechanisms to raise concerns',
    },
]

export default function AntiFraudSection() {
    return (
        <section id="anti-fraud" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        Integrity
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Anti-Fraud & Transparency
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Statement */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                        <p className="leading-relaxed text-gray-700">
                            VDO is fully committed to maintaining the highest
                            standards of integrity, transparency, and
                            accountability in all its operations. The
                            organization enforces a zero-tolerance policy for
                            fraud and corruption, with clear measures for
                            prevention, detection, and response.
                        </p>
                    </div>

                    {/* Principles Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {principles.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#23369C]">
                                    <item.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-bold text-[#23369C]">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Closing Statement */}
                    <div className="rounded-xl bg-[#23369C] p-8 text-white">
                        <p className="leading-relaxed text-white/90">
                            Through these policies, VDO protects its
                            organizational integrity, ensures responsible use of
                            resources, and fosters trust with beneficiaries,
                            partners, and stakeholders. Transparency and ethical
                            conduct are central to VDO's mission, reinforcing
                            its commitment to delivering programs with honesty,
                            fairness, and accountability.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
