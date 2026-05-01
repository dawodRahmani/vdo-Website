import { Calendar } from 'lucide-react'

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
        title: 'UN Humanitarian Country Team (HCT)',
        description:
            'Elected member, representing national NGO voices and elected for 3 years in 3 consecutive terms.',
        gradient: { from: '#3e4095', to: '#9395c4' },
    },
    {
        title: 'ACBAR',
        description:
            'Steering Committee Member and currently Chairperson (2025–2026 term).',
        gradient: { from: '#00afef', to: '#7fd6f6' },
    },
    {
        title: 'Strategic Working Groups',
        description:
            'Active participation across protection, education, and humanitarian coordination platforms.',
        gradient: { from: '#5cc8f3', to: '#bce6fa' },
    },
]

export default function HistorySection() {
    return (
        <section id="history" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(62,64,149)]/10 px-4 py-2 text-sm font-semibold text-[rgb(62,64,149)]">
                        Our Journey
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
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
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-[rgb(62,64,149)]/20 md:left-1/2 md:-translate-x-1/2"></div>

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
                                        <span className="mb-2 inline-block rounded bg-[rgb(0,175,239)] px-3 py-1 text-sm font-bold text-white">
                                            {milestone.year}
                                        </span>
                                        <h3 className="mb-2 text-xl font-bold text-[rgb(62,64,149)]">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(62,64,149)] md:left-1/2 md:-translate-x-1/2">
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

                    <h3 className="mb-6 text-center text-xl font-bold text-[rgb(62,64,149)]">
                        Leadership & Memberships
                    </h3>
                    <p className="mb-6 text-center text-gray-600">
                        VDO's credibility is further strengthened by its active
                        membership and leadership roles in major coordination
                        bodies:
                    </p>

                    <div className="relative pt-2">
                        {/* Horizontal dotted line connecting the pins (md+ only) */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[66px] hidden border-t-2 border-dotted border-gray-300 md:block"
                        />

                        <div className="grid gap-y-14 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
                            {memberships.map((m, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center text-center"
                                >
                                    {/* Balloon pin */}
                                    <svg
                                        width="40"
                                        height="56"
                                        viewBox="0 0 40 56"
                                        className="block drop-shadow-sm"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient
                                                id={`pin-grad-${i}`}
                                                x1="0%"
                                                y1="0%"
                                                x2="0%"
                                                y2="100%"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor={m.gradient.from}
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor={m.gradient.to}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M20 0 C 32 0, 40 9, 40 20 C 40 31, 32 42, 22 50 L 20 52 L 18 50 C 8 42, 0 31, 0 20 C 0 9, 8 0, 20 0 Z"
                                            fill={`url(#pin-grad-${i})`}
                                        />
                                    </svg>

                                    {/* Dot sitting on the dotted line */}
                                    <div className="relative z-10 mt-1 h-3 w-3 rounded-full border-2 border-gray-400 bg-white" />

                                    {/* Text — block centered under the pin, lines centered inside */}
                                    <p className="mx-auto mt-4 max-w-[240px] text-center text-sm leading-relaxed text-gray-700">
                                        {m.title} – {m.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
