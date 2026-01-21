import {
    Shield,
    Users,
    FileCheck,
    Scale,
    Lock,
    BarChart3,
    Handshake,
    AlertCircle,
} from 'lucide-react'

const practices = [
    {
        icon: Shield,
        title: 'Safeguarding',
        description:
            'Comprehensive safeguarding policies to protect all beneficiaries, especially vulnerable populations.',
    },
    {
        icon: Users,
        title: 'PSEAH',
        description:
            'Zero tolerance for Sexual Exploitation, Abuse, and Harassment with robust reporting mechanisms.',
    },
    {
        icon: FileCheck,
        title: 'Compliance',
        description:
            'Full compliance with international donor standards and humanitarian principles.',
    },
    {
        icon: Scale,
        title: 'Anti-Corruption',
        description:
            'Strong anti-corruption measures ensuring transparent and accountable operations.',
    },
    {
        icon: Lock,
        title: 'Data Protection',
        description:
            'Rigorous data protection protocols safeguarding sensitive beneficiary information.',
    },
    {
        icon: BarChart3,
        title: 'Risk Management',
        description:
            'Proactive risk identification, assessment, and mitigation strategies.',
    },
    {
        icon: Handshake,
        title: 'Accountability',
        description:
            'Strong accountability to affected populations through feedback mechanisms.',
    },
    {
        icon: AlertCircle,
        title: 'Aid Diversion Prevention',
        description:
            'Robust systems to prevent any form of aid diversion or misuse.',
    },
]

export default function BestPractices() {
    return (
        <section id="best-practices" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#23369C]/10 px-4 py-2 text-sm font-semibold text-[#23369C]">
                        Our Standards
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        VDO Best Practices
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Strong governance, compliance, and institutional systems
                        underpin VDO's impact. These systems are actively
                        implemented, monitored, and continuously strengthened.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {practices.map((practice, index) => (
                            <div
                                key={index}
                                className="group rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#23369C]/10 transition-colors group-hover:bg-[#23369C]">
                                    <practice.icon className="h-6 w-6 text-[#23369C] transition-colors group-hover:text-white" />
                                </div>
                                <h3 className="mb-2 font-bold text-[#23369C]">
                                    {practice.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {practice.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
