import {
    ShieldCheck,
    CheckCircle,
    MapPin,
    CreditCard,
    Eye,
    AlertTriangle,
    Users,
    FileCheck,
} from 'lucide-react'

const safeguards = [
    {
        icon: Users,
        title: 'Transparent Targeting',
        description: 'Clear beneficiary selection criteria',
    },
    {
        icon: CreditCard,
        title: 'Secure Controls',
        description: 'Cash, voucher, and verification systems',
    },
    {
        icon: MapPin,
        title: 'GPS Monitoring',
        description: 'Distribution oversight and spot checks',
    },
    {
        icon: AlertTriangle,
        title: 'Anti-fraud Measures',
        description: 'Whistleblowing and CFRM systems',
    },
    {
        icon: FileCheck,
        title: 'Due Diligence',
        description: 'Rigorous supplier and partner vetting',
    },
    {
        icon: Eye,
        title: 'Segregation of Duties',
        description: 'Clear separation across core functions',
    },
]

export default function AidDiversionSection() {
    return (
        <section id="aid-diversion" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                        Integrity
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Prevention from Aid Diversion
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Statement */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                        <div className="mb-4 flex items-center gap-3">
                            <ShieldCheck className="h-8 w-8" />
                            <h3 className="text-xl font-bold">
                                Ensuring Aid Reaches Those in Need
                            </h3>
                        </div>
                        <p className="leading-relaxed text-white/90">
                            Vision Development Organization (VDO) is dedicated
                            to ensuring that all humanitarian and development
                            assistance reaches the intended individuals fairly
                            and transparently. Aid diversion in any form
                            undermines community trust and harms the vulnerable
                            populations we serve.
                        </p>
                    </div>

                    {/* Safeguards Grid */}
                    <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {safeguards.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
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

                    {/* Zero Tolerance Statement */}
                    <div className="mb-8 rounded-xl bg-[#23369C] p-8 text-white">
                        <p className="leading-relaxed text-white/90">
                            VDO upholds a{' '}
                            <span className="font-bold">
                                strict zero-tolerance policy
                            </span>{' '}
                            for aid diversion. Any misuse, manipulation, or
                            interference triggers immediate investigation and
                            corrective action. Through robust controls and
                            ethical leadership, we ensure that every resource
                            entrusted to VDO reaches those who need it most.
                        </p>
                    </div>

                    {/* Reporting CTA */}
                    <div className="rounded-xl border-2 border-dashed border-[#23369C]/30 bg-white p-8 text-center">
                        <p className="mb-4 text-gray-700">
                            In case of any suspected diversion or misuse of aid,
                            please use our confidential reporting channels or
                            contact our designated hotline.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block rounded-lg bg-[#23369C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#23369C]/90"
                        >
                            Report a Concern
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
