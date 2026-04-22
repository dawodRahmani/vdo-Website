import { ShieldAlert, CheckCircle, FileCheck, Lock, Users, Eye } from 'lucide-react'

const commitments = [
    'Mandatory PSEA training for all personnel',
    'Signed Codes of Conduct and PSEA declarations',
    'Safe, confidential, and accessible reporting channels',
    'Survivor-centered response and protection',
    'Rigorous vetting of staff and partners',
    'Continuous monitoring of PSEA risks',
]

export default function PseahSection() {
    return (
        <section id="pseah" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Zero Tolerance
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        PSEA Commitment
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        Protection from Sexual Exploitation, Abuse, and
                        Harassment
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Zero Tolerance Banner */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 p-8 text-white">
                        <div className="mb-4 flex items-center gap-3">
                            <ShieldAlert className="h-8 w-8" />
                            <h3 className="text-2xl font-bold">
                                Zero Tolerance Policy
                            </h3>
                        </div>
                        <p className="leading-relaxed text-white/90">
                            VDO upholds a strict Zero Tolerance Policy toward
                            Sexual Exploitation, Abuse, and Sexual Harassment
                            (PSEAH). Protecting the dignity, rights, and safety
                            of all individuals—especially those in vulnerable
                            contexts—is central to our mission.
                        </p>
                    </div>

                    {/* Requirements */}
                    <div className="mb-12 rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                        <p className="mb-6 text-gray-700">
                            VDO requires all staff, volunteers, contractors, and
                            partners to adhere to the highest standards of
                            conduct. Any form of exploitation, abuse, or
                            harassment is prohibited and will result in
                            immediate investigation and appropriate disciplinary
                            or legal action.
                        </p>

                        <h4 className="mb-4 font-bold text-[rgb(62,64,149)]">
                            Our Commitments Include:
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {commitments.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leadership Commitment */}
                    <div className="rounded-xl bg-[rgb(62,64,149)] p-8 text-center text-white">
                        <p className="leading-relaxed text-white/90">
                            VDO's leadership is dedicated to maintaining a safe,
                            respectful, and accountable environment, ensuring
                            that zero tolerance is upheld in both{' '}
                            <span className="font-semibold">policy</span> and{' '}
                            <span className="font-semibold">practice</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
