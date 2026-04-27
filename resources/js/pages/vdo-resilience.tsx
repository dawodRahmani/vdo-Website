import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const RESILIENCE_BASE = '/svg/VDO_s Resilience'
const RESILIENCE_BASE_ENCODED = encodeURI(RESILIENCE_BASE)

function CapacitySvg({ num }: { num: string }) {
    const [html, setHtml] = useState('')

    useEffect(() => {
        let cancelled = false
        fetch(`${RESILIENCE_BASE_ENCODED}/${num}.svg`)
            .then((r) => r.text())
            .then((text) => {
                if (cancelled) return
                const fixed = text.replace(
                    /xlink:href="([^"]+)"/g,
                    (_, raw: string) => {
                        if (raw.startsWith('#') || /^https?:\/\//.test(raw)) {
                            return `xlink:href="${raw}"`
                        }
                        const normalized = raw.replace(/\\/g, '/')
                        const absolute = `${RESILIENCE_BASE_ENCODED}/${normalized
                            .split('/')
                            .map((p) => encodeURIComponent(p))
                            .join('/')}`
                        return `xlink:href="${absolute}"`
                    },
                )
                setHtml(fixed)
            })
        return () => {
            cancelled = true
        }
    }, [num])

    return (
        <div
            className="[&_svg]:h-auto [&_svg]:w-full"
            style={{ mixBlendMode: 'multiply' }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

const photos = [
    { src: '/Header and Gallary Photos/08.jpg', alt: 'Organizational capacity' },
    { src: '/Header and Gallary Photos/15.jpg', alt: 'Team collaboration' },
    { src: '/Header and Gallary Photos/21.jpg', alt: 'Field operations' },
]

const capacitySlides = ['01', '02', '03', '04']

function CarouselArrowButton({
    direction,
    onClick,
}: {
    direction: 'prev' | 'next'
    onClick: () => void
}) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
    return (
        <button
            type="button"
            aria-label={direction === 'prev' ? 'Previous' : 'Next'}
            onClick={onClick}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow hover:bg-gray-100"
        >
            <Icon className="h-5 w-5" />
        </button>
    )
}

function useHorizontalScroll() {
    const ref = useRef<HTMLDivElement>(null)
    const scrollBy = (direction: 'prev' | 'next') => {
        const el = ref.current
        if (!el) return
        const firstChild = el.firstElementChild as HTMLElement | null
        const step = firstChild
            ? firstChild.getBoundingClientRect().width + 24
            : el.clientWidth
        el.scrollBy({
            left: direction === 'next' ? step : -step,
            behavior: 'smooth',
        })
    }
    return {
        ref,
        onPrev: () => scrollBy('prev'),
        onNext: () => scrollBy('next'),
    }
}

interface Policy {
    title: string
    body: string
}

const policies: Policy[] = [
    {
        title: 'Program Policy',
        body: "VDO's Program Policy provides a comprehensive framework for planning, implementing, monitoring, and closing programs across all sectors. It ensures quality, relevance, accountability, and measurable impact throughout the project cycle. The policy aligns programs with community needs, donor requirements, and national regulations. Cross-cutting priorities such as gender equality, safeguarding, and risk management are embedded. This policy ensures consistent and effective program delivery.",
    },
    {
        title: 'Feedback Response Mechanism (FRM)',
        body: 'The FRM Policy ensures that communities can safely share feedback, concerns, and complaints. It promotes transparency, trust, and open communication with affected populations. Multiple accessible and confidential reporting channels are established. Feedback is reviewed in a timely and impartial manner. Lessons learned are used to improve program quality and accountability.',
    },
    {
        title: 'Accountability to Affected Populations (AAP)',
        body: "VDO's AAP Policy commits the organization to inclusive, transparent, and participatory programming. It ensures communities are informed about project objectives, selection criteria, and entitlements. Affected populations are meaningfully engaged in decision-making processes. Feedback and complaints are actively addressed. This policy strengthens dignity, ownership, and program effectiveness.",
    },
    {
        title: 'Advocacy Policy',
        body: "The Advocacy Policy guides VDO's ethical, safe, and evidence-based advocacy work. It ensures advocacy is conflict-sensitive and aligned with humanitarian principles. The policy prioritizes the voices of women, youth, and marginalized groups. Risk mitigation measures protect staff and partners. Advocacy efforts are grounded in credible data and community realities.",
    },
    {
        title: 'Fundraising Policy',
        body: "VDO's Fundraising Policy ensures ethical and transparent resource mobilization. It aligns fundraising initiatives with the organization's mission and strategic priorities. The policy prevents conflicts of interest and reputational risks. Donor funds are managed with accountability and integrity. All fundraising complies with legal and donor requirements.",
    },
    {
        title: 'Data Privacy and Sharing Policy',
        body: 'This policy protects personal, sensitive, and organizational data collected by VDO. It defines clear standards for data collection, storage, access, and sharing. Informed consent and confidentiality are strictly maintained. Special protection is applied to vulnerable groups. Data practices comply with donor and international data protection standards.',
    },
    {
        title: 'Risk Management Policy',
        body: "VDO's Risk Management Policy provides a systematic approach to identifying and mitigating risks. It covers operational, financial, safeguarding, security, and contextual risks. Risk analysis is integrated into planning and decision-making. Mitigation measures are regularly reviewed and updated. This policy enhances organizational resilience and accountability.",
    },
    {
        title: 'Partnership Policy',
        body: "The Partnership Policy governs VDO's collaboration with implementing and strategic partners. It ensures partnerships are transparent, accountable, and value-based. Due diligence and compliance checks are mandatory. Safeguarding and zero-tolerance standards apply to all partners. The policy promotes shared responsibility and sustainable impact.",
    },
    {
        title: 'MEAL Policy',
        body: "VDO's MEAL Policy ensures systematic monitoring, evaluation, accountability, and learning. It promotes evidence-based decision-making and adaptive management. Data quality and community feedback are prioritized. Findings inform program improvements and strategic planning. This policy strengthens impact and organizational learning.",
    },
    {
        title: 'Safeguarding Policy',
        body: 'The Safeguarding Policy commits VDO to preventing and responding to harm. It protects children, adults at risk, and all community members. Clear prevention, reporting, and response mechanisms are established. Safeguarding responsibilities apply to all staff and partners. The policy ensures safe and dignified programming.',
    },
    {
        title: 'Protection from Sexual Exploitation and Abuse (PSEA) Policy',
        body: "VDO's PSEA Policy enforces zero tolerance for sexual exploitation and abuse. It applies to staff, partners, volunteers, and representatives. Safe and confidential reporting channels are provided. Survivor-centered response mechanisms are prioritized. The policy reinforces accountability and respect for dignity.",
    },
    {
        title: 'Whistleblowing Policy',
        body: 'The Whistleblowing Policy enables safe reporting of misconduct and violations. It guarantees confidentiality and protection from retaliation. Multiple secure reporting channels are available. Reports are handled impartially and promptly. This policy strengthens transparency and ethical conduct.',
    },
    {
        title: 'Communication Policy',
        body: "VDO's Communication Policy ensures accurate, ethical, and coordinated communication. It governs branding, messaging, media engagement, and visibility. The policy protects sensitive information and community dignity. Approval and documentation processes are clearly defined. All communication reflects VDO's values and credibility.",
    },
    {
        title: 'Child Protection Policy',
        body: 'The Child Protection Policy safeguards children engaged in or affected by VDO programs. It establishes strict standards for prevention and response. Child-safe recruitment and programming practices are mandatory. Reporting mechanisms are accessible and confidential. The policy upholds the best interests of the child.',
    },
    {
        title: 'Gender and Harassment Policy',
        body: "This policy promotes gender equality and a respectful working environment. It prohibits discrimination, harassment, and abuse. Clear reporting and response mechanisms are established. Women's leadership and inclusion are actively supported. The policy ensures dignity and fairness for all.",
    },
    {
        title: 'Compliance Policy',
        body: "VDO's Compliance Policy ensures adherence to laws, donor rules, and internal policies. It defines compliance roles and responsibilities across the organization. Monitoring and reporting mechanisms are established. Non-compliance is addressed through corrective actions. The policy strengthens accountability and donor confidence.",
    },
    {
        title: 'Governing Policy',
        body: "The Governing Policy defines the roles and responsibilities of VDO's Board. It ensures strategic oversight, ethical leadership, and accountability. Board independence and transparency are emphasized. The policy supports effective decision-making. It strengthens institutional governance and sustainability.",
    },
    {
        title: 'Operations Policy',
        body: 'The Operations Policy guides efficient and compliant organizational operations. It integrates administrative, logistical, and support functions. Consistency is ensured across HQ and field offices. The policy supports smooth program implementation. Operational risks are systematically managed.',
    },
    {
        title: 'Finance Policy',
        body: "VDO's Finance Policy governs budgeting, accounting, and financial reporting. It ensures transparency, internal controls, and donor compliance. Clear segregation of duties is maintained. Financial risks are actively managed. The policy safeguards financial integrity and sustainability.",
    },
    {
        title: 'Audit Policy',
        body: 'The Audit Policy establishes internal and external audit mechanisms. It promotes accountability and continuous improvement. Audit findings are documented and addressed. Corrective actions are monitored and tracked. The policy enhances transparency and donor trust.',
    },
    {
        title: 'Human Resources (HR) Policy',
        body: 'The HR Policy governs recruitment, performance management, and staff welfare. It promotes fairness, professionalism, and capacity development. Safeguarding and gender equality are integrated. Clear codes of conduct and grievance mechanisms are defined. The policy supports a motivated workforce.',
    },
    {
        title: 'Procurement Policy',
        body: "VDO's Procurement Policy ensures transparent and competitive purchasing processes. It defines procurement methods, thresholds, and approvals. Value for money and fairness are prioritized. Conflict of interest and fraud risks are controlled. The policy aligns with donor standards.",
    },
    {
        title: 'IT Policy',
        body: 'The IT Policy governs the secure use of information systems and technology. It protects data confidentiality, integrity, and availability. User access and responsibilities are clearly defined. Cybersecurity risks are managed proactively. The policy supports efficient digital operations.',
    },
    {
        title: 'Safety and Security Policy',
        body: 'This policy ensures the safety and security of staff and assets. It outlines risk assessment and incident management procedures. Context-specific security measures are applied. Staff responsibilities are clearly defined. The policy enables safe program delivery.',
    },
    {
        title: 'Anti-Fraud Policy',
        body: "VDO's Anti-Fraud Policy enforces zero tolerance for fraud and corruption. It defines prevention, detection, and response measures. All staff and partners are accountable. Reporting mechanisms are confidential and accessible. The policy protects organizational integrity.",
    },
    {
        title: 'Code of Conduct',
        body: 'The Code of Conduct sets standards for ethical behavior and professionalism. It applies to staff, partners, and representatives. Respect, integrity, and accountability are core values. Violations are addressed through disciplinary measures. The code reinforces trust and credibility.',
    },
    {
        title: 'Admin Policy',
        body: 'The Admin Policy governs office management and administrative systems. It covers assets, transport, facilities, and records management. Clear procedures ensure efficiency and accountability. Documentation and controls are mandatory. The policy supports operational effectiveness.',
    },
    {
        title: 'Conflict of Interest Policy',
        body: 'This policy prevents personal interests from influencing professional decisions. Disclosure of conflicts is mandatory. Mitigation measures are clearly defined. The policy applies to staff, board members, and committees. It ensures impartiality and transparency.',
    },
    {
        title: 'Environmental Protection Policy',
        body: "VDO's Environmental Protection Policy promotes environmentally responsible programming. It minimizes environmental harm during implementation. Environmental risks are assessed and mitigated. Climate resilience is integrated into programs. The policy supports sustainable development.",
    },
    {
        title: 'Zero Tolerance Policy',
        body: 'The Zero Tolerance Policy enforces strict accountability for serious misconduct. It covers PSEA, fraud, abuse, and ethical violations. No exceptions or compromises are permitted. Violations result in decisive action. The policy upholds VDO\'s core values and integrity.',
    },
]

export default function VdoResilience() {
    const capacity = useHorizontalScroll()

    return (
        <SiteLayout title="VDO's Resilience">
            <PhotoStrip photos={photos} />

            {/* Our Capacity + booklets */}
            <section className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2
                        id="our-capacity"
                        className="mb-6 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                    >
                        Our Capacity:
                    </h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <CarouselArrowButton
                            direction="prev"
                            onClick={capacity.onPrev}
                        />
                        <div
                            ref={capacity.ref}
                            className="flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {capacitySlides.map((num) => (
                                <div
                                    key={num}
                                    className="flex w-[90%] flex-none snap-start flex-col items-center sm:w-[calc(50%-4px)] md:w-[calc(33.333%-6px)] lg:w-[calc(25%-6px)]"
                                >
                                    <CapacitySvg num={num} />
                                    <a
                                        href={encodeURI(
                                            `${RESILIENCE_BASE}/${num}.svg`,
                                        )}
                                        download
                                        aria-label={`Download capacity booklet ${num}`}
                                        className="mt-3 flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-[rgb(0,175,239)]"
                                    >
                                        <Download
                                            className="h-6 w-6"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                        <CarouselArrowButton
                            direction="next"
                            onClick={capacity.onNext}
                        />
                    </div>
                </div>
            </section>

            {/* Policies grid */}
            <section className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2
                        id="policies"
                        className="mb-6 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                    >
                        Policies:
                    </h2>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                        {policies.map((p, i) => {
                            const iconNum = String(i + 6).padStart(2, '0')
                            return (
                                <div
                                    key={p.title}
                                    className="md:border-l-2 md:border-dotted md:border-[rgb(0,175,239)]/70 md:pl-6 md:[&:nth-child(2n+1)]:border-l-0 md:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:border-l-2 lg:[&:nth-child(2n+1)]:pl-6 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(0,175,239)] shadow-sm">
                                        <img
                                            src={`${RESILIENCE_BASE}/${iconNum}.svg`}
                                            alt=""
                                            className="h-8 w-8"
                                            draggable={false}
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-[rgb(62,64,149)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 text-justify text-xs leading-relaxed text-gray-700 md:text-sm">
                                        {p.body}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Programmatic Approach */}
            <section className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2
                        id="programmatic-approach"
                        className="mb-4 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                    >
                        Programmatic Approach:
                    </h2>
                    <div className="space-y-4 text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                        <p>
                            Since 2021, Vision Development Organization (VDO)
                            has sustained a strong and resilient brand identity
                            by maintaining operations and a female-led workforce
                            despite severe restrictions on civic space and
                            women's participation. This resilience is grounded
                            in deep community acceptance, culturally informed
                            engagement, and a proven record of integrity and
                            responsible delivery. VDO's programmatic approach is
                            comprehensive, context-responsive, and aligned with
                            international humanitarian and development
                            standards, ensuring inclusion, quality, and
                            accountability across all interventions. Led by
                            Afghan women and local experts, our programs
                            prioritize localization, community leadership, and
                            trusted access, while embedding robust safeguarding,
                            compliance, and accountability systems throughout
                            the project cycle. Through gender-responsive,
                            conflict-sensitive, and do-no-harm approaches, VDO
                            protects the dignity and safety of women and girls,
                            advances equitable access for marginalized groups,
                            and adapts rapidly to changing conditions using
                            evidence-based decision-making and flexible
                            operational models. Today, VDO stands as a symbol
                            of Afghan women's leadership, the power of
                            localization, and the trust placed in national
                            actors to respond effectively to evolving community
                            needs.
                        </p>
                    </div>

                    {/* 4 Pillars diagram */}
                    <div className="mt-10">
                        <div className="mx-auto flex w-full items-center justify-center">
                            <img
                                src={encodeURI(`${RESILIENCE_BASE}/36.svg`)}
                                alt="Afghanistan's four pillars: Negotiated Access, Female Staff Engagement, Localized Risk Management, and Rapid Pivot Capabilities"
                                className="h-auto w-full"
                                draggable={false}
                            />
                        </div>

                        <p className="mt-6 text-sm italic text-gray-600">
                            This enables VDO to reach crisis-affected
                            populations that may otherwise be left behind.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contributing to Collective Resilience */}
            <section className="bg-gray-100 py-8 pb-14">
                <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                    <h2
                        id="collective-resilience"
                        className="mb-4 scroll-mt-24 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl"
                    >
                        Contributing to Collective Resilience
                    </h2>
                    <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                        VDO is not only a frontline implementer but a recognized
                        contributor to national coordination and advocacy
                        efforts:
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 md:text-[15px]">
                        <li>
                            Representing more than 200 NGOs through leadership
                            in the ACBAR Steering Committee
                        </li>
                        <li>
                            Co-leading and actively shaping technical working
                            groups such as the Education ALP Working Group
                        </li>
                        <li>
                            Bringing ground-level insights into humanitarian
                            strategy decisions
                        </li>
                        <li>
                            Driving localization leadership and Afghan women's
                            participation in policy dialogues
                        </li>
                    </ul>

                    <div className="mt-8 space-y-4 text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                        <p>
                            Vision Development Organization (VDO) embeds a
                            comprehensive set of cross-cutting priorities across
                            all humanitarian and development programs to ensure
                            quality, safety, and inclusion in Afghanistan's
                            highly sensitive operational environment. These
                            priorities guide how programs are designed,
                            delivered, and monitored, reinforcing principled
                            action, community trust, and accountability. By
                            systematically integrating gender equality,
                            protection, accountability, and ethical standards
                            into every intervention, VDO ensures that assistance
                            not only reaches those most in need, but does so in
                            a manner that safeguards dignity, minimizes risk,
                            and strengthens long-term community resilience.
                        </p>
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}
