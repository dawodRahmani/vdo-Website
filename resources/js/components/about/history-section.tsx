import { Calendar, Award, Globe, Users } from 'lucide-react'

const milestones = [
    {
        year: '2015',
        title: 'Foundation',
        description:
            'VDO was founded by a courageous Afghan woman, dedicated to education, advocacy, and empowerment for Afghanistan\'s most vulnerable communities.',
    },
    {
        year: '2015-2021',
        title: 'Building Trust',
        description:
            'Initially focused on community-based advocacy, capacity-building workshops, and awareness campaigns, VDO operated through volunteerism, building trust and credibility at the grassroots level.',
    },
    {
        year: '2022',
        title: 'First Official Grant',
        description:
            'In June 2022, the organization signed its first official grant, delivering lifesaving services in Inclusion, Protection, and Health to marginalized populations.',
    },
    {
        year: 'Present',
        title: 'Recognized NGO',
        description:
            'Today, VDO is a recognized Afghan NGO capable of operating in complex environments, navigating access challenges, and delivering results under difficult circumstances.',
    },
]

const memberships = [
    {
        icon: Award,
        title: 'ACBAR',
        description:
            'Steering Committee Member and currently Chairperson (2025–2026 term)',
    },
    {
        icon: Globe,
        title: 'UN Humanitarian Country Team (HCT)',
        description:
            'Elected member, representing national NGO voices and elected for 3 years in 3 consecutive terms',
    },
    {
        icon: Users,
        title: 'Strategic Working Groups',
        description:
            'Active participation across protection, education, and humanitarian coordination platforms',
    },
]

export default function HistorySection() {
    return (
        <section id="history" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#23369C]/10 px-4 py-2 text-sm font-semibold text-[#23369C]">
                        Our Journey
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C] md:text-4xl">
                        History
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        From humble beginnings to a recognized humanitarian
                        organization
                    </p>
                </div>

                {/* Timeline */}
                <div className="mx-auto mb-16 max-w-4xl">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-[#23369C]/20 md:left-1/2 md:-translate-x-1/2"></div>

                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative mb-8 flex ${
                                    index % 2 === 0
                                        ? 'md:flex-row'
                                        : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* Content */}
                                <div
                                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                                        index % 2 === 0
                                            ? 'md:pr-12 md:text-right'
                                            : 'md:pl-12'
                                    }`}
                                >
                                    <div className="rounded-lg bg-white p-6 shadow-lg">
                                        <span className="mb-2 inline-block rounded bg-[#00B7EC] px-3 py-1 text-sm font-bold text-white">
                                            {milestone.year}
                                        </span>
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#23369C] md:left-1/2 md:-translate-x-1/2">
                                    <Calendar className="h-4 w-4 text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
                    <p className="mb-8 text-center text-gray-700">
                        Beyond service delivery, VDO amplifies Afghan voices at
                        national and international forums, including the UN
                        Human Rights Council, the Afghanistan Coordination
                        Group, and the Senior Officials Meeting in Brussels,
                        providing evidence-based recommendations to shape
                        humanitarian and development policy.
                    </p>

                    <h3 className="mb-6 text-center text-xl font-bold text-[#23369C]">
                        Leadership & Memberships
                    </h3>
                    <p className="mb-6 text-center text-gray-600">
                        VDO's credibility is further strengthened by its active
                        membership and leadership roles in major coordination
                        bodies:
                    </p>

                    <div className="grid gap-6 md:grid-cols-3">
                        {memberships.map((membership, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-100 bg-gray-50 p-6 text-center transition-shadow hover:shadow-md"
                            >
                                <div className="mb-4 flex justify-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#23369C]">
                                        <membership.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h4 className="mb-2 font-bold text-[#23369C]">
                                    {membership.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {membership.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
