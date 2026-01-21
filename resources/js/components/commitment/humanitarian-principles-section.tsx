import { Heart, Scale, Users, Shield } from 'lucide-react'

const principles = [
    {
        icon: Heart,
        title: 'Humanity',
        description:
            'VDO is dedicated to alleviating human suffering wherever it is found. We strive to protect life, uphold dignity, and ensure that our programs respond to the real needs and priorities of affected populations. Humanity is the driving force behind our mission and the cornerstone of our work.',
        color: 'bg-red-500',
    },
    {
        icon: Scale,
        title: 'Neutrality',
        description:
            'VDO does not take sides in political, ethnic, religious, or ideological conflicts. By remaining neutral, we preserve our ability to access communities impartially and deliver assistance without interference or bias. Neutrality enables VDO to maintain credibility and acceptance among all stakeholders.',
        color: 'bg-blue-500',
    },
    {
        icon: Users,
        title: 'Impartiality',
        description:
            'VDO delivers assistance based solely on assessed needs, without discrimination based on gender, ethnicity, religion, age, disability, political affiliation, or social status. We prioritize the most vulnerable and ensure that resources are distributed fairly and transparently, guided strictly by humanitarian need.',
        color: 'bg-green-500',
    },
    {
        icon: Shield,
        title: 'Independence',
        description:
            'VDO maintains full autonomy over its humanitarian objectives, ensuring that our work is not influenced by political, military, economic, or external agendas. Our decisions are driven by evidence, needs assessments, and the best interests of affected communities.',
        color: 'bg-purple-500',
    },
]

export default function HumanitarianPrinciplesSection() {
    return (
        <section id="humanitarian-principles" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        Core Values
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Humanitarian Principles
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        Vision Development Organization (VDO) is firmly
                        committed to the Humanitarian Principles of Humanity,
                        Neutrality, Impartiality, and Independence.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Intro Statement */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-8 text-center">
                        <p className="leading-relaxed text-gray-700">
                            These principles guide every aspect of our work and
                            are essential for maintaining trust, protecting
                            humanitarian space, and ensuring that assistance
                            reaches those who need it most in Afghanistan's
                            complex context without discrimination, bias, or
                            influence from political, ethnic, or social
                            interests.
                        </p>
                    </div>

                    {/* Principles */}
                    <div className="mb-12 grid gap-6 md:grid-cols-2">
                        {principles.map((principle, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-lg"
                            >
                                <div
                                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${principle.color}`}
                                >
                                    <principle.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                    {principle.title}
                                </h3>
                                <p className="leading-relaxed text-gray-600">
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Closing Statement */}
                    <div className="rounded-xl bg-gradient-to-r from-[#23369C] to-[#00B7EC] p-8 text-white">
                        <p className="text-center text-lg leading-relaxed">
                            These principles define VDO's identity as a trusted
                            and principled organization. VDO Management is
                            committed to upholding them across all programs,
                            departments, and operations to ensure ethical,
                            transparent, and effective humanitarian action.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
