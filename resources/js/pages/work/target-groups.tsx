import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Users, Baby, Heart, Home, Leaf, Briefcase } from 'lucide-react'

export default function TargetGroups() {
    const targetGroups = [
        {
            id: 1,
            title: 'Women and Girls',
            icon: Heart,
            population: '250,000+',
            color: 'from-pink-500 to-rose-600',
            description:
                'Empowering women and girls through education, livelihood, health, and protection services',
            interventions: [
                'Skills training and livelihood support',
                'Maternal and reproductive health services',
                'Gender-based violence prevention and response',
                'Girls education and literacy programs',
                'Women leadership and participation',
                'Economic empowerment initiatives',
            ],
        },
        {
            id: 2,
            title: 'Children and Adolescents',
            icon: Baby,
            population: '180,000+',
            color: 'from-blue-500 to-cyan-600',
            description:
                'Protecting and supporting children through education, nutrition, and child-friendly spaces',
            interventions: [
                'Formal and non-formal education',
                'Child protection services',
                'Nutrition screening and treatment',
                'Psychosocial support programs',
                'Child-friendly recreational spaces',
                'Early childhood development',
            ],
        },
        {
            id: 3,
            title: 'Internally Displaced Persons',
            icon: Home,
            population: '120,000+',
            color: 'from-orange-500 to-amber-600',
            description:
                'Providing essential services and durable solutions for displaced families',
            interventions: [
                'Emergency shelter and NFI distribution',
                'WASH facilities in displacement sites',
                'Cash assistance for basic needs',
                'Livelihood and skills training',
                'Integration and social cohesion programs',
                'Protection and legal assistance',
            ],
        },
        {
            id: 4,
            title: 'Returnees and Refugees',
            icon: Users,
            population: '85,000+',
            color: 'from-purple-500 to-violet-600',
            description:
                'Supporting sustainable reintegration and rebuilding lives',
            interventions: [
                'Reintegration support packages',
                'Shelter rehabilitation assistance',
                'Livelihood recovery programs',
                'Documentation and legal support',
                'Community-based reintegration',
                'Access to basic services',
            ],
        },
        {
            id: 5,
            title: 'Persons with Disabilities',
            icon: Users,
            population: '45,000+',
            color: 'from-teal-500 to-emerald-600',
            description:
                'Ensuring inclusive programming and accessibility for persons with disabilities',
            interventions: [
                'Assistive devices and mobility aids',
                'Inclusive education programs',
                'Accessible WASH facilities',
                'Disability-inclusive livelihood training',
                'Rehabilitation and physiotherapy',
                'Advocacy for disability rights',
            ],
        },
        {
            id: 6,
            title: 'Vulnerable Host Communities',
            icon: Leaf,
            population: '150,000+',
            color: 'from-green-500 to-lime-600',
            description:
                'Strengthening resilience and reducing vulnerabilities in host communities',
            interventions: [
                'Community infrastructure development',
                'Agricultural and livestock support',
                'Climate resilience programs',
                'Health and nutrition services',
                'Water resource management',
                'Community-based disaster preparedness',
            ],
        },
    ]

    const approachPrinciples = [
        {
            title: 'Do No Harm',
            description:
                'All programming is designed to avoid causing harm and exacerbating vulnerabilities',
        },
        {
            title: 'Inclusion',
            description:
                'Ensuring access for all, regardless of gender, age, disability, or other characteristics',
        },
        {
            title: 'Participation',
            description:
                'Meaningfully involving target groups in needs assessment, planning, and implementation',
        },
        {
            title: 'Dignity',
            description:
                'Treating all beneficiaries with respect and ensuring assistance preserves human dignity',
        },
        {
            title: 'Empowerment',
            description:
                'Building capacity and agency rather than creating dependency',
        },
        {
            title: 'Sustainability',
            description:
                'Developing solutions that can be maintained by communities in the long term',
        },
    ]

    const vulnerabilityCriteria = [
        'Female-headed households',
        'Families with persons with disabilities',
        'Elderly persons without support',
        'Unaccompanied and separated children',
        'Households with chronic illness',
        'Single parents with multiple children',
        'Landless and asset-poor families',
        'Survivors of gender-based violence',
        'Child-headed households',
        'Families with malnourished children',
        'Minority and marginalized groups',
        'Households with no income source',
    ]

    return (
        <>
            <Head title="Target Groups - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/3.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Target Groups
                            </h1>
                            <p className="text-xl text-white/90">
                                Serving the most vulnerable populations with
                                dignity, respect, and tailored support
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
                                    Who We Serve
                                </h2>
                                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                                    VDO's programs are designed to reach the
                                    most vulnerable populations in Afghanistan.
                                    We use comprehensive vulnerability
                                    assessments to identify and prioritize those
                                    most in need, ensuring our assistance
                                    reaches the people who need it most. Our
                                    approach is inclusive, participatory, and
                                    tailored to the specific needs of each
                                    target group.
                                </p>
                            </div>

                            {/* Target Groups */}
                            <div className="mb-20 space-y-8">
                                {targetGroups.map((group) => (
                                    <div
                                        key={group.id}
                                        className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-xl transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                    >
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Header Section */}
                                            <div
                                                className={`flex flex-1 flex-col justify-center bg-gradient-to-br ${group.color} p-8 text-white lg:w-80`}
                                            >
                                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                                    <group.icon className="h-12 w-12" />
                                                </div>
                                                <h3 className="mb-3 text-3xl font-bold">
                                                    {group.title}
                                                </h3>
                                                <div className="mb-4 text-4xl font-bold">
                                                    {group.population}
                                                </div>
                                                <p className="text-white/90">
                                                    {group.description}
                                                </p>
                                            </div>

                                            {/* Interventions Section */}
                                            <div className="flex-1 bg-gray-50 p-8">
                                                <h4 className="mb-6 text-xl font-bold text-[#23369C]">
                                                    Key Interventions
                                                </h4>
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    {group.interventions.map(
                                                        (intervention, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm"
                                                            >
                                                                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00B7EC]">
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
                                                                    {
                                                                        intervention
                                                                    }
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Approach Principles */}
                            <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Our Approach Principles
                                </h2>
                                <p className="mb-10 text-center text-lg text-white/90">
                                    Guiding principles that shape how we work
                                    with all target groups
                                </p>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {approachPrinciples.map(
                                        (principle, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                                            >
                                                <h3 className="mb-3 text-xl font-bold">
                                                    {principle.title}
                                                </h3>
                                                <p className="text-sm text-white/80">
                                                    {principle.description}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Vulnerability Criteria */}
                            <div className="rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                                    Vulnerability Assessment Criteria
                                </h2>
                                <p className="mb-10 text-center text-lg text-gray-700">
                                    We use the following criteria to identify
                                    the most vulnerable households and
                                    individuals
                                </p>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {vulnerabilityCriteria.map(
                                        (criteria, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg"
                                            >
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#00B7EC] to-[#23369C] text-white">
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {criteria}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Total Impact */}
                            <div className="mt-20 text-center">
                                <div className="mb-8 inline-block rounded-full bg-gradient-to-br from-[#00B7EC] to-[#23369C] px-8 py-3 text-sm font-semibold text-white shadow-xl">
                                    Total Impact
                                </div>
                                <div className="mb-4 text-6xl font-bold text-[#23369C]">
                                    830,000+
                                </div>
                                <p className="text-xl text-gray-700">
                                    Vulnerable individuals reached across all
                                    target groups in 2024
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
