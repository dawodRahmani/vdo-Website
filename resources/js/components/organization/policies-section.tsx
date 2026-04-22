import { useState } from 'react'
import {
    FileText,
    MessageSquare,
    Users,
    Megaphone,
    DollarSign,
    Lock,
    AlertTriangle,
    Handshake,
    BarChart3,
    Shield,
    AlertCircle,
    Bell,
    Radio,
    Baby,
    Heart,
    Scale,
    Building,
    Settings,
    Calculator,
    ClipboardCheck,
    UserCog,
    ShoppingCart,
    Monitor,
    ShieldCheck,
    Ban,
    FileCheck,
    Briefcase,
    GitBranch,
    Leaf,
    XCircle,
    ChevronDown,
    ChevronUp,
} from 'lucide-react'

const policies = [
    {
        icon: FileText,
        title: 'Program Policy',
        description:
            "VDO's Program Policy provides a comprehensive framework for planning, implementing, monitoring, and closing programs across all sectors. It ensures quality, relevance, accountability, and measurable impact throughout the project cycle.",
        category: 'Program',
    },
    {
        icon: MessageSquare,
        title: 'Feedback Response Mechanism (FRM)',
        description:
            'The FRM Policy ensures that communities can safely share feedback, concerns, and complaints. It promotes transparency, trust, and open communication with affected populations.',
        category: 'Accountability',
    },
    {
        icon: Users,
        title: 'Accountability to Affected Populations (AAP)',
        description:
            "VDO's AAP Policy commits the organization to inclusive, transparent, and participatory programming. It ensures communities are informed about project objectives, selection criteria, and entitlements.",
        category: 'Accountability',
    },
    {
        icon: Megaphone,
        title: 'Advocacy Policy',
        description:
            "The Advocacy Policy guides VDO's ethical, safe, and evidence-based advocacy work. It ensures advocacy is conflict-sensitive and aligned with humanitarian principles.",
        category: 'Program',
    },
    {
        icon: DollarSign,
        title: 'Fundraising Policy',
        description:
            "VDO's Fundraising Policy ensures ethical and transparent resource mobilization. It aligns fundraising initiatives with the organization's mission and strategic priorities.",
        category: 'Finance',
    },
    {
        icon: Lock,
        title: 'Data Privacy and Sharing Policy',
        description:
            'This policy protects personal, sensitive, and organizational data collected by VDO. It defines clear standards for data collection, storage, access, and sharing.',
        category: 'Operations',
    },
    {
        icon: AlertTriangle,
        title: 'Risk Management Policy',
        description:
            "VDO's Risk Management Policy provides a systematic approach to identifying and mitigating risks. It covers operational, financial, safeguarding, security, and contextual risks.",
        category: 'Operations',
    },
    {
        icon: Handshake,
        title: 'Partnership Policy',
        description:
            "The Partnership Policy governs VDO's collaboration with implementing and strategic partners. It ensures partnerships are transparent, accountable, and value-based.",
        category: 'Program',
    },
    {
        icon: BarChart3,
        title: 'MEAL Policy',
        description:
            "VDO's MEAL Policy ensures systematic monitoring, evaluation, accountability, and learning. It promotes evidence-based decision-making and adaptive management.",
        category: 'Program',
    },
    {
        icon: Shield,
        title: 'Safeguarding Policy',
        description:
            'The Safeguarding Policy commits VDO to preventing and responding to harm. It protects children, adults at risk, and all community members.',
        category: 'Safeguarding',
    },
    {
        icon: AlertCircle,
        title: 'Protection from Sexual Exploitation and Abuse (PSEA)',
        description:
            "VDO's PSEA Policy enforces zero tolerance for sexual exploitation and abuse. It applies to staff, partners, volunteers, and representatives.",
        category: 'Safeguarding',
    },
    {
        icon: Bell,
        title: 'Whistleblowing Policy',
        description:
            'The Whistleblowing Policy enables safe reporting of misconduct and violations. It guarantees confidentiality and protection from retaliation.',
        category: 'Accountability',
    },
    {
        icon: Radio,
        title: 'Communication Policy',
        description:
            "VDO's Communication Policy ensures accurate, ethical, and coordinated communication. It governs branding, messaging, media engagement, and visibility.",
        category: 'Operations',
    },
    {
        icon: Baby,
        title: 'Child Protection Policy',
        description:
            'The Child Protection Policy safeguards children engaged in or affected by VDO programs. It establishes strict standards for prevention and response.',
        category: 'Safeguarding',
    },
    {
        icon: Heart,
        title: 'Gender and Harassment Policy',
        description:
            'This policy promotes gender equality and a respectful working environment. It prohibits discrimination, harassment, and abuse.',
        category: 'HR',
    },
    {
        icon: Scale,
        title: 'Compliance Policy',
        description:
            "VDO's Compliance Policy ensures adherence to laws, donor rules, and internal policies. It defines compliance roles and responsibilities across the organization.",
        category: 'Operations',
    },
    {
        icon: Building,
        title: 'Governing Policy',
        description:
            "The Governing Policy defines the roles and responsibilities of VDO's Board. It ensures strategic oversight, ethical leadership, and accountability.",
        category: 'Governance',
    },
    {
        icon: Settings,
        title: 'Operations Policy',
        description:
            'The Operations Policy guides efficient and compliant organizational operations. It integrates administrative, logistical, and support functions.',
        category: 'Operations',
    },
    {
        icon: Calculator,
        title: 'Finance Policy',
        description:
            "VDO's Finance Policy governs budgeting, accounting, and financial reporting. It ensures transparency, internal controls, and donor compliance.",
        category: 'Finance',
    },
    {
        icon: ClipboardCheck,
        title: 'Audit Policy',
        description:
            'The Audit Policy establishes internal and external audit mechanisms. It promotes accountability and continuous improvement.',
        category: 'Finance',
    },
    {
        icon: UserCog,
        title: 'Human Resources (HR) Policy',
        description:
            'The HR Policy governs recruitment, performance management, and staff welfare. It promotes fairness, professionalism, and capacity development.',
        category: 'HR',
    },
    {
        icon: ShoppingCart,
        title: 'Procurement Policy',
        description:
            "VDO's Procurement Policy ensures transparent and competitive purchasing processes. It defines procurement methods, thresholds, and approvals.",
        category: 'Operations',
    },
    {
        icon: Monitor,
        title: 'IT Policy',
        description:
            'The IT Policy governs the secure use of information systems and technology. It protects data confidentiality, integrity, and availability.',
        category: 'Operations',
    },
    {
        icon: ShieldCheck,
        title: 'Safety and Security Policy',
        description:
            'This policy ensures the safety and security of staff and assets. It outlines risk assessment and incident management procedures.',
        category: 'Operations',
    },
    {
        icon: Ban,
        title: 'Anti-Fraud Policy',
        description:
            "VDO's Anti-Fraud Policy enforces zero tolerance for fraud and corruption. It defines prevention, detection, and response measures.",
        category: 'Accountability',
    },
    {
        icon: FileCheck,
        title: 'Code of Conduct',
        description:
            'The Code of Conduct sets standards for ethical behavior and professionalism. It applies to staff, partners, and representatives.',
        category: 'HR',
    },
    {
        icon: Briefcase,
        title: 'Admin Policy',
        description:
            'The Admin Policy governs office management and administrative systems. It covers assets, transport, facilities, and records management.',
        category: 'Operations',
    },
    {
        icon: GitBranch,
        title: 'Conflict of Interest Policy',
        description:
            'This policy prevents personal interests from influencing professional decisions. Disclosure of conflicts is mandatory.',
        category: 'Governance',
    },
    {
        icon: Leaf,
        title: 'Environmental Protection Policy',
        description:
            "VDO's Environmental Protection Policy promotes environmentally responsible programming. It minimizes environmental harm during implementation.",
        category: 'Program',
    },
    {
        icon: XCircle,
        title: 'Zero Tolerance Policy',
        description:
            'The Zero Tolerance Policy enforces strict accountability for serious misconduct. It covers PSEA, fraud, abuse, and ethical violations.',
        category: 'Accountability',
    },
]

const categories = [
    'All',
    'Program',
    'Accountability',
    'Safeguarding',
    'Operations',
    'Finance',
    'HR',
    'Governance',
]

export default function PoliciesSection() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [showAll, setShowAll] = useState(false)

    const filteredPolicies =
        activeCategory === 'All'
            ? policies
            : policies.filter((p) => p.category === activeCategory)

    const displayedPolicies = showAll
        ? filteredPolicies
        : filteredPolicies.slice(0, 12)

    return (
        <section id="policies" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(62,64,149)]/10 px-4 py-2 text-sm font-semibold text-[rgb(62,64,149)]">
                        Governance Framework
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Policies
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        VDO maintains comprehensive policies covering all
                        aspects of organizational governance, ensuring
                        accountability, transparency, and compliance with
                        international standards.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setActiveCategory(category)
                                setShowAll(false)
                            }}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                activeCategory === category
                                    ? 'bg-[rgb(62,64,149)] text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedPolicies.map((policy, index) => (
                            <div
                                key={index}
                                className="group rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="mb-3 flex items-start gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(62,64,149)]/10">
                                        <policy.icon className="h-5 w-5 text-[rgb(62,64,149)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[rgb(62,64,149)]">
                                            {policy.title}
                                        </h3>
                                        <span className="text-xs text-gray-400">
                                            {policy.category}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {policy.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {filteredPolicies.length > 12 && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[rgb(62,64,149)] px-6 py-3 font-medium text-white transition-colors hover:bg-[rgb(62,64,149)]/90"
                            >
                                {showAll ? (
                                    <>
                                        Show Less
                                        <ChevronUp className="h-4 w-4" />
                                    </>
                                ) : (
                                    <>
                                        Show All {filteredPolicies.length}{' '}
                                        Policies
                                        <ChevronDown className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
