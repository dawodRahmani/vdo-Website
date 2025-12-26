import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Target, Users, TrendingUp, RefreshCw, FileText, CheckCircle } from 'lucide-react'

export default function ProgrammaticApproach() {
    const approaches = [
        {
            id: 1,
            title: 'Community-Centered',
            icon: Users,
            description:
                'Placing communities at the heart of our program design and implementation',
            principles: [
                'Participatory needs assessments',
                'Community-led planning and decision-making',
                'Local capacity building and ownership',
                'Culturally appropriate interventions',
            ],
        },
        {
            id: 2,
            title: 'Evidence-Based',
            icon: FileText,
            description:
                'Using data and evidence to inform program design and adaptation',
            principles: [
                'Comprehensive baseline assessments',
                'Regular monitoring and evaluation',
                'Research and learning activities',
                'Data-driven decision making',
            ],
        },
        {
            id: 3,
            title: 'Results-Oriented',
            icon: Target,
            description:
                'Focusing on measurable outcomes and sustainable impact',
            principles: [
                'Clear objectives and indicators',
                'Regular progress tracking',
                'Adaptive management approaches',
                'Impact measurement and reporting',
            ],
        },
        {
            id: 4,
            title: 'Integrated Approach',
            icon: TrendingUp,
            description:
                'Addressing interconnected needs through multi-sectoral programming',
            principles: [
                'Holistic assessment of community needs',
                'Cross-sectoral interventions',
                'Synergies between program activities',
                'Comprehensive support packages',
            ],
        },
        {
            id: 5,
            title: 'Sustainable Solutions',
            icon: RefreshCw,
            description:
                'Building long-term capacity and sustainable systems',
            principles: [
                'Local capacity development',
                'System strengthening',
                'Transition and exit strategies',
                'Environmental sustainability',
            ],
        },
        {
            id: 6,
            title: 'Quality Assurance',
            icon: CheckCircle,
            description:
                'Maintaining high standards of quality in all interventions',
            principles: [
                'Technical quality standards',
                'Regular quality audits',
                'Continuous improvement processes',
                'Accountability frameworks',
            ],
        },
    ]

    const programCycle = [
        {
            phase: 'Assessment',
            description: 'Comprehensive needs assessment and context analysis',
            activities: [
                'Baseline surveys',
                'Stakeholder consultations',
                'Risk and vulnerability mapping',
                'Resource assessment',
            ],
        },
        {
            phase: 'Design',
            description: 'Participatory program design and planning',
            activities: [
                'Theory of change development',
                'Intervention strategy design',
                'Budget and resource planning',
                'Risk mitigation planning',
            ],
        },
        {
            phase: 'Implementation',
            description: 'Delivering quality interventions with communities',
            activities: [
                'Activity implementation',
                'Partnership coordination',
                'Procurement and logistics',
                'Quality monitoring',
            ],
        },
        {
            phase: 'Monitoring',
            description: 'Tracking progress and adapting as needed',
            activities: [
                'Output and outcome tracking',
                'Regular field monitoring',
                'Data collection and analysis',
                'Course corrections',
            ],
        },
        {
            phase: 'Evaluation',
            description: 'Measuring impact and learning from experience',
            activities: [
                'Mid-term and final evaluations',
                'Impact assessments',
                'Lesson learned documentation',
                'Best practice identification',
            ],
        },
    ]

    return (
        <>
            <Head title="Programmatic Approach - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Programmatic Approach
                            </h1>
                            <p className="text-xl text-white/90">
                                Our framework for delivering effective,
                                sustainable, and community-centered development
                                programs
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            {/* Introduction */}
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Approach to Development
                                </h2>
                                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                                    VDO's programmatic approach is guided by
                                    international best practices and rooted in
                                    the realities of Afghan communities. We
                                    believe in community ownership, evidence-based
                                    interventions, and sustainable solutions that
                                    create lasting positive change.
                                </p>
                            </div>

                            {/* Core Approaches */}
                            <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {approaches.map((approach) => (
                                    <div
                                        key={approach.id}
                                        className="group rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                    >
                                        {/* Icon */}
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B7EC] to-[#23369C] shadow-lg transition-transform duration-300 group-hover:scale-110">
                                            <approach.icon className="h-8 w-8 text-white" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            {approach.title}
                                        </h3>
                                        <p className="mb-4 text-sm text-gray-600">
                                            {approach.description}
                                        </p>

                                        {/* Principles */}
                                        <ul className="space-y-2">
                                            {approach.principles.map(
                                                (principle, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-sm text-gray-700"
                                                    >
                                                        <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00B7EC]" />
                                                        {principle}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Program Cycle */}
                            <div className="mb-20">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Program Management Cycle
                                </h2>
                                <p className="mb-12 text-center text-lg text-gray-700">
                                    Our systematic approach to program management
                                    ensures quality and effectiveness at every
                                    stage
                                </p>

                                <div className="space-y-8">
                                    {programCycle.map((phase, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-start gap-8 ${
                                                idx % 2 === 0
                                                    ? 'flex-row'
                                                    : 'flex-row-reverse'
                                            }`}
                                        >
                                            {/* Number Circle */}
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00B7EC] to-[#23369C] text-2xl font-bold text-white shadow-xl">
                                                    {idx + 1}
                                                </div>
                                                {idx < programCycle.length - 1 && (
                                                    <div className="mt-4 h-24 w-1 bg-[#00B7EC]/20" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 rounded-2xl bg-white p-6 shadow-lg">
                                                <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                                    {phase.phase}
                                                </h3>
                                                <p className="mb-4 text-gray-600">
                                                    {phase.description}
                                                </p>
                                                <div className="grid gap-2 md:grid-cols-2">
                                                    {phase.activities.map(
                                                        (activity, actIdx) => (
                                                            <div
                                                                key={actIdx}
                                                                className="flex items-center gap-2 rounded-lg bg-[#00B7EC]/5 p-2"
                                                            >
                                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00B7EC]">
                                                                    <svg
                                                                        className="h-3 w-3 text-white"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                3
                                                                            }
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-sm text-gray-700">
                                                                    {activity}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cross-Cutting Themes */}
                            <div className="rounded-3xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Cross-Cutting Themes
                                </h2>
                                <p className="mb-10 text-center text-lg text-white/90">
                                    These themes are integrated across all our
                                    programs and activities
                                </p>
                                <div className="grid gap-6 md:grid-cols-3">
                                    {[
                                        {
                                            title: 'Gender Equality',
                                            desc: 'Promoting equal opportunities and rights for all genders',
                                        },
                                        {
                                            title: 'Protection',
                                            desc: 'Safeguarding vulnerable populations from harm',
                                        },
                                        {
                                            title: 'Climate Resilience',
                                            desc: 'Building resilience to climate change impacts',
                                        },
                                        {
                                            title: 'Disability Inclusion',
                                            desc: 'Ensuring programs are accessible to persons with disabilities',
                                        },
                                        {
                                            title: 'Conflict Sensitivity',
                                            desc: 'Operating in ways that do not exacerbate conflicts',
                                        },
                                        {
                                            title: 'Innovation',
                                            desc: 'Embracing new approaches and technologies',
                                        },
                                    ].map((theme, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                                        >
                                            <h3 className="mb-2 text-lg font-bold">
                                                {theme.title}
                                            </h3>
                                            <p className="text-sm text-white/80">
                                                {theme.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
