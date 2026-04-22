import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    BookOpen,
    ClipboardCheck,
    Gauge,
    HandHeart,
    PackageOpen,
    Scale,
    Shield,
    ShieldAlert,
    Sprout,
    Users,
    type LucideIcon,
} from 'lucide-react'

const photos = [
    { src: '/Header and Gallary Photos/07.jpg', alt: 'Inclusive programs' },
    { src: '/Header and Gallary Photos/13.jpg', alt: 'Community accountability' },
    { src: '/Header and Gallary Photos/19.jpg', alt: 'Safeguarding and dignity' },
]

interface CommitmentCard {
    id: string
    title: string
    icon: LucideIcon
}

const cards: CommitmentCard[] = [
    { id: 'inclusivity', title: 'Inclusivity', icon: Users },
    {
        id: 'accountability',
        title: 'Accountability to Affected Population',
        icon: ClipboardCheck,
    },
    { id: 'safeguarding', title: 'Safeguarding', icon: Shield },
    { id: 'psea', title: 'PSEA', icon: ShieldAlert },
    {
        id: 'anti-fraud',
        title: 'Anti-Fraud Transparency',
        icon: Scale,
    },
    {
        id: 'effectiveness',
        title: 'Effectiveness and Efficiency',
        icon: Gauge,
    },
    {
        id: 'impact',
        title: 'Impact and Sustainability',
        icon: Sprout,
    },
    {
        id: 'aid-diversion',
        title: 'Prevention from Aid Diversion',
        icon: PackageOpen,
    },
    {
        id: 'humanitarian-principles',
        title: 'Humanitarian Principles',
        icon: HandHeart,
    },
]

function SectionTitle({ id, title }: { id: string; title: string }) {
    return (
        <h2
            id={id}
            className="scroll-mt-24 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl"
        >
            {title}
        </h2>
    )
}

function Body({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
            {children}
        </p>
    )
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 md:text-[15px]">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
}

function Divider() {
    return (
        <hr className="my-10 border-t border-dashed border-[rgb(0,175,239)]/40" />
    )
}

export default function OurCommitmentPage() {
    return (
        <SiteLayout title="Our Commitment">
            <PhotoStrip photos={photos} />

            {/* 9-card grid */}
            <section className="bg-gray-100 pb-4 pt-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {cards.map((card) => {
                            const Icon = card.icon
                            return (
                                <a
                                    key={card.id}
                                    href={`#${card.id}`}
                                    className="group flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(62,64,149)] text-white shadow-md">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <span className="text-sm font-semibold leading-snug text-[rgb(62,64,149)] group-hover:text-[rgb(0,175,239)] md:text-base">
                                        {card.title}
                                    </span>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Detailed sections */}
            <section className="bg-gray-100 pb-14">
                <div className="container mx-auto px-4 py-8">
                    {/* Inclusivity */}
                    <div>
                        <SectionTitle id="inclusivity" title="Inclusivity:" />
                        <h3 className="mt-2 text-sm font-bold text-gray-900 md:text-base">
                            Promoting Inclusivity
                        </h3>
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO is committed to fostering inclusive
                                development that leaves no one behind. The
                                organization ensures that all programs consider
                                the needs of marginalized and vulnerable groups,
                                including women, girls, people with
                                disabilities, youth, and other underserved
                                populations. By promoting equal access to
                                education, economic opportunities, health
                                services, and safe community spaces, VDO
                                empowers every individual to participate fully
                                in social, economic, and civic life, creating
                                more equitable and resilient communities.
                            </Body>
                            <Body>
                                Inclusivity is embedded in every aspect of VDO's
                                work—from program design and implementation to
                                monitoring and evaluation—ensuring that
                                interventions are accessible, culturally
                                sensitive, and responsive to the unique needs of
                                diverse communities. VDO actively engages
                                community members in decision-making processes,
                                encourages their voices to be heard, and works
                                to break down barriers to participation. By
                                championing inclusivity, VDO not only addresses
                                immediate inequalities but also fosters
                                long-term empowerment, social cohesion, and
                                sustainable development across all regions
                                where it operates.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Accountability */}
                    <div>
                        <SectionTitle
                            id="accountability"
                            title="Accountability to Affected Population:"
                        />
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO is committed to ensuring that crisis-affected
                                people are informed, heard, included, and
                                respected. Accountability to Affected Populations
                                is central to our mandate and guides how
                                communities shape our programs and decisions.
                            </Body>
                            <p className="text-sm font-semibold text-[rgb(62,64,149)]">
                                Our commitment includes:
                            </p>
                            <Bullets
                                items={[
                                    'Transparent information-sharing on services, criteria, and entitlements',
                                    'Meaningful community participation throughout the program cycle',
                                    'Safe, confidential, and accessible feedback and complaint channels',
                                    'Timely response and resolution of all feedback',
                                    'Protection of complainants and strict non-retaliation',
                                    'Inclusive engagement of women, persons with disabilities, minorities, and marginalized groups',
                                ]}
                            />
                            <Body>
                                For VDO, AAP is both a responsibility and a
                                moral obligation. We strive to build trust-based
                                relationships and ensure our assistance is
                                relevant, safe, dignified, and accountable to
                                the people we serve.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Safeguarding */}
                    <div>
                        <SectionTitle id="safeguarding" title="Safeguarding:" />
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO is fully committed to preventing and
                                responding to harm through its Safeguarding
                                Policy, which protects children, adults at
                                risk, and all community members. The
                                organization has established clear prevention,
                                reporting, and response mechanisms, ensuring
                                that safeguarding responsibilities apply to all
                                staff, volunteers, and partners. By enforcing
                                strict policies and providing training on
                                ethical standards, VDO prevents exploitation,
                                abuse, harassment, and any form of harm,
                                creating a safe, respectful, and protective
                                environment. Safeguarding is central to VDO's
                                work, ensuring that all beneficiaries—especially
                                women, children, and vulnerable
                                individuals—are treated with dignity, protected
                                from risk, and empowered to raise their voices
                                without fear. These measures underpin safe and
                                dignified programming across all of VDO's
                                initiatives, reinforcing the organization's
                                commitment to integrity, care, and
                                accountability in every interaction.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* PSEA */}
                    <div>
                        <SectionTitle id="psea" title="PSEA:" />
                        <h3 className="mt-2 text-sm font-bold text-gray-900 md:text-base">
                            VDO's Commitment to Zero Tolerance to PSEA
                        </h3>
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO upholds a strict Zero Tolerance Policy
                                toward Sexual Exploitation, Abuse, and Sexual
                                Harassment (PSEAH). Protecting the dignity,
                                rights, and safety of all
                                individuals—especially those in vulnerable
                                contexts—is central to our mission.
                            </Body>
                            <Body>
                                VDO requires all staff, volunteers, contractors,
                                and partners to adhere to the highest standards
                                of conduct. Any form of exploitation, abuse, or
                                harassment is prohibited and will result in
                                immediate investigation and appropriate
                                disciplinary or legal action.
                            </Body>
                            <p className="text-sm font-semibold text-[rgb(62,64,149)]">
                                Our commitments include:
                            </p>
                            <Bullets
                                items={[
                                    'Mandatory PSEA training for all personnel',
                                    'Signed Codes of Conduct and PSEA declarations',
                                    'Safe, confidential, and accessible reporting channels',
                                    'Survivor-centered response and protection',
                                    'Rigorous vetting of staff and partners',
                                    'Continuous monitoring of PSEA risks',
                                ]}
                            />
                            <Body>
                                VDO's leadership is dedicated to maintaining a
                                safe, respectful, and accountable environment,
                                ensuring that zero tolerance is upheld in both
                                policy and practice.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Anti-Fraud Transparency */}
                    <div>
                        <SectionTitle
                            id="anti-fraud"
                            title="Anti-Fraud Transparency:"
                        />
                        <h3 className="mt-2 text-sm font-bold text-gray-900 md:text-base">
                            Commitment to Anti-Fraud and Transparency
                        </h3>
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO is fully committed to maintaining the
                                highest standards of integrity, transparency,
                                and accountability in all its operations. The
                                organization enforces a zero-tolerance policy
                                for fraud and corruption, with clear measures
                                for prevention, detection, and response. All
                                staff, volunteers, and partners are accountable
                                for upholding these standards, and confidential
                                reporting mechanisms are in place to ensure
                                concerns can be raised safely and effectively.
                                Through these policies, VDO protects its
                                organizational integrity, ensures responsible
                                use of resources, and fosters trust with
                                beneficiaries, partners, and stakeholders.
                                Transparency and ethical conduct are central to
                                VDO's mission, reinforcing its commitment to
                                delivering programs with honesty, fairness, and
                                accountability.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Effectiveness and Efficiency */}
                    <div>
                        <SectionTitle
                            id="effectiveness"
                            title="Effectiveness and Efficiency:"
                        />
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO is committed to delivering programs that
                                are both effective and efficient, ensuring that
                                resources are used responsibly to achieve
                                meaningful impact. Through careful planning,
                                evidence-based approaches, and continuous
                                monitoring and evaluation, the organization
                                maximizes the outcomes of its interventions
                                while minimizing waste and duplication. VDO
                                prioritizes results-driven strategies, adaptive
                                management, and collaboration with partners and
                                communities to ensure that every initiative
                                delivers tangible benefits. By combining
                                strategic planning, operational excellence, and
                                accountability, VDO strengthens its ability to
                                respond to community needs, improve livelihoods,
                                and create sustainable, lasting change.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Impact and Sustainability */}
                    <div>
                        <SectionTitle
                            id="impact"
                            title="Impact and Sustainability:"
                        />
                        <div className="mt-3 space-y-4">
                            <Body>
                                VDO is dedicated to creating lasting impact by
                                designing programs that not only address
                                immediate needs but also foster long-term,
                                sustainable change. The organization focuses on
                                empowering communities, building local
                                capacities, and promoting resilient systems that
                                continue to thrive beyond project timelines. By
                                integrating community participation,
                                evidence-based approaches, and strategic
                                partnerships, VDO ensures that interventions
                                are relevant, scalable, and adaptable to
                                evolving challenges. Through this commitment,
                                VDO strengthens livelihoods, enhances access to
                                education and health services, and supports
                                inclusive development—leaving a sustainable
                                legacy of positive change in the communities it
                                serves.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Prevention from Aid Diversion */}
                    <div>
                        <SectionTitle
                            id="aid-diversion"
                            title="Prevention from Aid Diversion:"
                        />
                        <div className="mt-3 space-y-4">
                            <Body>
                                Vision Development Organization (VDO) is
                                dedicated to ensuring that all humanitarian and
                                development assistance reaches the intended
                                individuals fairly and transparently. Aid
                                diversion in any form undermines community
                                trust and harms the vulnerable populations we
                                serve.
                            </Body>
                            <Body>
                                To safeguard integrity across our programs, VDO
                                has established strong systems to prevent,
                                detect, and address risks of diversion,
                                including:
                            </Body>
                            <Bullets
                                items={[
                                    'Transparent targeting and beneficiary selection',
                                    'Secure cash, voucher, and verification controls',
                                    'GPS-based monitoring, distribution oversight, and spot checks',
                                    'Anti-fraud measures, whistleblowing channels, and CFRM systems',
                                    'Rigorous supplier and partner due diligence',
                                    'Clear segregation of duties across core functions',
                                ]}
                            />
                            <Body>
                                VDO upholds a strict zero-tolerance policy for
                                aid diversion. Any misuse, manipulation, or
                                interference triggers immediate investigation
                                and corrective action. Through robust controls
                                and ethical leadership, we ensure that every
                                resource entrusted to VDO reaches those who
                                need it most.
                            </Body>
                            <Body>
                                In case of any suspected diversion or misuse of
                                aid, please use the link below to confidentially
                                share information with us or contact our
                                designated hotline.
                            </Body>
                        </div>
                    </div>

                    <Divider />

                    {/* Humanitarian Principles */}
                    <div>
                        <SectionTitle
                            id="humanitarian-principles"
                            title="Humanitarian Principles:"
                        />
                        <h3 className="mt-2 text-sm font-bold text-gray-900 md:text-base">
                            1. Commitment to humanitarian principle:
                        </h3>
                        <div className="mt-3 space-y-4">
                            <Body>
                                Vision Development Organization (VDO) is firmly
                                committed to the Humanitarian Principles of{' '}
                                <strong className="text-[rgb(62,64,149)]">
                                    Humanity, Neutrality, Impartiality, and
                                    Independence
                                </strong>
                                . These principles guide every aspect of our
                                work and are essential for maintaining trust,
                                protecting humanitarian space, and ensuring
                                that assistance reaches those who need it most
                                in Afghanistan's complex context without
                                discrimination, bias, or influence from
                                political, ethnic, or social interests.
                            </Body>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {[
                                {
                                    title: 'Humanity:',
                                    body: 'VDO is dedicated to alleviating human suffering wherever it is found. We strive to protect life, uphold dignity, and ensure that our programs respond to the real needs and priorities of affected populations. Humanity is the driving force behind our mission and the cornerstone of our work.',
                                },
                                {
                                    title: 'Neutrality:',
                                    body: 'VDO does not take sides in political, ethnic, religious, or ideological conflicts. By remaining neutral, we preserve our ability to access communities impartially and deliver assistance without interference or bias. Neutrality enables VDO to maintain credibility and acceptance among all stakeholders.',
                                },
                                {
                                    title: 'Impartiality:',
                                    body: 'VDO delivers assistance based solely on assessed needs, without discrimination based on gender, ethnicity, religion, age, disability, political affiliation, or social status. We prioritize the most vulnerable and ensure that resources are distributed fairly and transparently, guided strictly by humanitarian need.',
                                },
                                {
                                    title: 'Independence:',
                                    body: 'VDO maintains full autonomy over its humanitarian objectives, ensuring that our work is not influenced by political, military, economic, or external agendas. Our decisions are driven by evidence, needs assessments, and the best interests of affected communities.',
                                },
                            ].map((p) => (
                                <div
                                    key={p.title}
                                    className="rounded-lg border border-gray-200 bg-white p-5"
                                >
                                    <div className="mb-2 flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-[rgb(0,175,239)]" />
                                        <h4 className="text-sm font-bold text-[rgb(62,64,149)]">
                                            {p.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        {p.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Body>
                            <span className="mt-6 block">
                                These principles define VDO's identity as a
                                trusted and principled organization. VDO
                                Management is committed to upholding them
                                across all programs, departments, and
                                operations to ensure ethical, transparent, and
                                effective humanitarian action.
                            </span>
                        </Body>
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}
