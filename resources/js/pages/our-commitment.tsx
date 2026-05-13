import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Paperclip } from 'lucide-react'

const publications = [
    { title: 'Project Final Report', cover: '/Header and Gallary Photos/P1.jpg' },
    { title: 'Guide Book', cover: '/Header and Gallary Photos/P2.jpg' },
    { title: 'Project Conclusion Report', cover: '/Header and Gallary Photos/P3.jpg' },
    { title: 'Annual Booklet 2023', cover: '/Header and Gallary Photos/P4.jpg' },
]

const photos = [
    { src: '/Header and Gallary Photos/07.jpg', alt: 'Inclusive programs' },
    { src: '/Header and Gallary Photos/13.jpg', alt: 'Community accountability' },
    { src: '/Header and Gallary Photos/19.jpg', alt: 'Safeguarding and dignity' },
]

interface CommitmentItem {
    id: string
    title: string
    body: string[]
}

const commitments: CommitmentItem[] = [
    {
        id: 'gender-equality',
        title: "Gender Equality & Women's Empowerment",
        body: [
            'VDO promotes equal opportunities, leadership, participation, and access to services for women and girls across all programs and operations.',
            'We prioritize women-led approaches that strengthen dignity, resilience, economic participation, and decision-making power within communities.',
        ],
    },
    {
        id: 'safeguarding-pseah',
        title: 'Safeguarding, PSEAH & Child Protection',
        body: [
            'VDO maintains a zero-tolerance approach toward sexual exploitation, abuse, harassment, and all forms of violence against children and vulnerable individuals.',
            'Safeguarding principles are integrated across all activities to ensure safe, respectful, and accountable humanitarian and development programming.',
        ],
    },
    {
        id: 'aap',
        title: 'Accountability to Affected People (AAP)',
        body: [
            'VDO ensures that communities are informed, consulted, and actively engaged throughout the project cycle.',
            'Feedback and complaint mechanisms are established to strengthen transparency, participation, and community trust.',
        ],
    },
    {
        id: 'do-no-harm',
        title: 'Do No Harm & Conflict Sensitivity',
        body: [
            'VDO designs and implements programs in ways that minimize risks, avoid unintended harm, and strengthen social cohesion.',
            'We apply conflict-sensitive approaches that respect local dynamics, cultural contexts, and community relationships.',
        ],
    },
    {
        id: 'protection-mainstreaming',
        title: 'Protection Mainstreaming',
        body: [
            'Protection considerations are integrated across all sectors to ensure safe, dignified, and equitable access to assistance and services.',
            'Special attention is given to vulnerable groups facing heightened risks, exclusion, or protection concerns.',
        ],
    },
    {
        id: 'inclusion-pwd',
        title: 'Inclusion of Persons with Disabilities',
        body: [
            'VDO promotes disability-inclusive programming by reducing barriers to participation, access, and representation.',
            'We work to ensure that persons with disabilities can safely and meaningfully engage in all interventions and community processes.',
        ],
    },
    {
        id: 'environmental-sustainability',
        title: 'Environmental Sustainability & Climate Sensitivity',
        body: [
            'VDO integrates environmentally responsible and climate-resilient approaches across humanitarian and development programming.',
            'We promote sustainable resource management, climate adaptation, and community resilience to environmental shocks.',
        ],
    },
    {
        id: 'localization',
        title: 'Localization & Community Ownership',
        body: [
            'VDO believes that sustainable change is achieved through locally led and community-driven approaches.',
            'We strengthen local capacities, partnerships, and participation to ensure long-term ownership and impact.',
        ],
    },
    {
        id: 'data-protection',
        title: 'Data Protection & Ethical Information Management',
        body: [
            'VDO is committed to the safe, confidential, and ethical management of personal and organizational data.',
            'Data collection, storage, sharing, and reporting processes follow protection, privacy, and accountability principles.',
        ],
    },
    {
        id: 'anti-fraud',
        title: 'Anti-Fraud, Anti-Corruption & Aid Diversion Protection',
        body: [
            'VDO applies strong compliance, financial control, and risk management systems to prevent fraud, corruption, and aid diversion.',
            'Transparency, accountability, and ethical conduct are enforced across all organizational operations and partnerships.',
        ],
    },
    {
        id: 'meal',
        title: 'MEAL & Evidence-Based Programming',
        body: [
            'VDO promotes Monitoring, Evaluation, Accountability, and Learning (MEAL) systems to improve program quality and effectiveness.',
            'Evidence, community feedback, and lessons learned are used to guide adaptive and impact-driven programming.',
        ],
    },
    {
        id: 'edi',
        title: 'Equity, Diversity & Inclusion (EDI)',
        body: [
            'VDO values diversity and promotes equitable participation regardless of gender, age, disability, ethnicity, or background.',
            'We foster inclusive environments that respect dignity, representation, and equal opportunity for all.',
        ],
    },
]

const cards = commitments.map((c, i) => ({
    id: c.id,
    title: c.title,
    svg: `/svg/Our Commitment/C${i + 1}.svg`,
}))

export default function OurCommitmentPage() {
    return (
        <SiteLayout title="Our Commitment">
            <PhotoStrip photos={photos} />

            <div
                className="bg-gray-100"
                style={{
                    backgroundImage: 'url(/svg/Map.svg)',
                    backgroundSize: '100% auto',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >

            {/* Commitments + Form / Publications */}
            <section className="pb-4 pt-6">
                <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-2 lg:gap-12 lg:px-14">
                    {/* Left: Commitments grid + Make a Report form */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-[rgb(62,64,149)] md:text-xl">
                            Commitments:
                        </h2>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
                            {cards.map((card) => (
                                <a
                                    key={card.id}
                                    href={`#${card.id}`}
                                    aria-label={card.title}
                                    className="block transition-transform hover:-translate-y-0.5"
                                >
                                    <img
                                        src={card.svg}
                                        alt={card.title}
                                        className="mx-auto h-auto w-full max-w-[150px] object-contain"
                                        draggable={false}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* Make a Report form */}
                        <div className="mt-8">
                            <h3 className="mb-3 text-base font-semibold text-[rgb(62,64,149)] md:text-lg">
                                Make a Report:
                            </h3>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="space-y-3"
                            >
                                <div className="flex items-center gap-3">
                                    <label
                                        htmlFor="report-subject"
                                        className="w-20 text-sm text-gray-700"
                                    >
                                        Subject:
                                    </label>
                                    <input
                                        id="report-subject"
                                        type="text"
                                        className="flex-1 rounded border-0 bg-[rgb(189,191,193)]/40 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,175,239)]/40"
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <label
                                        htmlFor="report-comment"
                                        className="w-20 pt-1.5 text-sm text-gray-700"
                                    >
                                        Comment:
                                    </label>
                                    <textarea
                                        id="report-comment"
                                        rows={5}
                                        className="flex-1 resize-none rounded border-0 bg-[rgb(189,191,193)]/40 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,175,239)]/40"
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-3 pl-20">
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded border-0 bg-[rgb(189,191,193)]/40 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-[rgb(189,191,193)]/60"
                                    >
                                        Attachment
                                        <Paperclip className="h-4 w-4 text-[rgb(0,175,239)]" />
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded border-0 bg-[rgb(189,191,193)]/40 px-6 py-1.5 text-sm text-gray-700 transition-colors hover:bg-[rgb(189,191,193)]/60"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Publications (title aligned with Commitments, images end at form) */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-[rgb(62,64,149)] md:text-xl">
                            Publications:
                        </h2>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {publications.map((pub) => (
                                <div
                                    key={pub.title}
                                    className="mx-auto w-full max-w-[180px] rounded-sm border border-dashed border-gray-400 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-white">
                                        <img
                                            src={encodeURI(pub.cover)}
                                            alt={pub.title}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed sections */}
            <section className="pb-14">
                <div className="mx-auto max-w-[1240px] px-6 py-8 md:px-10 lg:px-14">
                    {commitments.map((c, i) => (
                        <div key={c.id}>
                            <div
                                id={c.id}
                                className="scroll-mt-24 pt-2"
                            >
                                <h2 className="text-base font-semibold text-[rgb(62,64,149)] md:text-lg">
                                    {c.title}:
                                </h2>
                                <div className="mt-2 space-y-1">
                                    {c.body.map((line, j) => (
                                        <p
                                            key={j}
                                            className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]"
                                        >
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            {i < commitments.length - 1 && (
                                <hr className="my-6 border-0 border-t border-dashed border-[rgb(0,175,239)]" />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            </div>
        </SiteLayout>
    )
}
