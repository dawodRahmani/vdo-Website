import { GraduationCap, Users, Heart, Target, CheckCircle } from 'lucide-react'

const targetGroups = [
    { label: 'Girls', icon: Heart },
    { label: 'Adolescents', icon: Users },
    { label: 'Out-of-school Children', icon: Target },
    { label: 'Children with Disabilities', icon: Heart },
    { label: 'Youth without Education', icon: GraduationCap },
]

const achievements = [
    'Implementing Community Based Education (CBE) and Accelerated Learning Programs (ALP)',
    'Teacher training in multiple provinces using VDO-developed GBV-safe schooling guides',
    'Improved school safety awareness and retention of girls in education',
    'Field-tested community engagement models increasing access and acceptance for girl\'s learning',
    'Demonstrated successful transition of community schools to formal education systems',
]

export default function EducationSection() {
    return (
        <section id="education" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-4 py-2 text-sm font-semibold text-[#00B7EC]">
                        SDG 4 & SDG 5
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        Education
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO is dedicated to improving quality education through
                        a strong focus on access, equity, safety, and inclusion
                        in Afghanistan's most underserved communities.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Main Content */}
                    <div className="mb-12 rounded-xl bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                        <p className="leading-relaxed text-gray-700">
                            By working in the country's most underserved
                            communities, VDO strives to ensure that every
                            child—regardless of gender, ability, or
                            background—has the opportunity to learn in a safe
                            and supportive environment. VDO works closely with
                            caregivers and community education structures to
                            strengthen local support systems, while empowering
                            government and community-based teachers with the
                            tools and training they need to deliver quality,
                            inclusive education.
                        </p>
                    </div>

                    {/* Target Groups */}
                    <div className="mb-12">
                        <h3 className="mb-6 text-center text-xl font-bold text-[#23369C]">
                            Priority Target Groups
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {targetGroups.map((group, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-full bg-[#23369C] px-4 py-2 text-white"
                                >
                                    <group.icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">
                                        {group.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/strategic/image1.png"
                            alt="VDO Education Initiatives"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Key Achievements */}
                    <div className="rounded-xl bg-[#23369C] p-8 text-white">
                        <h3 className="mb-6 text-xl font-bold">
                            Key Achievements
                        </h3>
                        <div className="space-y-3">
                            {achievements.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                    <p className="text-white/90">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
