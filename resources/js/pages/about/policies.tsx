import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { FileText, Download } from 'lucide-react'

export default function Policies() {
    const policies = [
        {
            id: 1,
            title: 'Safeguarding Policy',
            description:
                'Our comprehensive policy ensuring the protection and safety of all beneficiaries, staff, and stakeholders.',
            category: 'Protection',
        },
        {
            id: 2,
            title: 'Code of Conduct',
            description:
                'Ethical guidelines and behavioral standards for all VDO personnel and partners.',
            category: 'Ethics',
        },
        {
            id: 3,
            title: 'Gender Equality Policy',
            description:
                'Commitment to promoting gender equality and women empowerment in all programs.',
            category: 'Inclusion',
        },
        {
            id: 4,
            title: 'Financial Management Policy',
            description:
                'Transparent financial practices and accountability measures for all operations.',
            category: 'Finance',
        },
        {
            id: 5,
            title: 'Environmental Policy',
            description:
                'Guidelines for environmentally sustainable practices in all projects and operations.',
            category: 'Environment',
        },
        {
            id: 6,
            title: 'Anti-Corruption Policy',
            description:
                'Zero-tolerance approach to corruption, fraud, and unethical practices.',
            category: 'Integrity',
        },
    ]

    return (
        <>
            <Head title="Policies - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/2.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Our Policies
                            </h1>
                            <p className="text-xl text-white/90">
                                Guiding principles and frameworks that ensure
                                accountability, transparency, and ethical
                                practices
                            </p>
                        </div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Commitment to Excellence
                                </h2>
                                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
                                    At VDO, our policies reflect our unwavering
                                    commitment to the highest standards of
                                    professionalism, integrity, and
                                    accountability. These frameworks guide our
                                    operations and ensure we deliver impactful,
                                    sustainable solutions to the communities we
                                    serve.
                                </p>
                            </div>

                            {/* Policy Cards */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {policies.map((policy) => (
                                    <div
                                        key={policy.id}
                                        className="group relative overflow-hidden rounded-xl border-2 border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                    >
                                        {/* Category Badge */}
                                        <div className="mb-4 inline-block rounded-full bg-[#00B7EC]/10 px-3 py-1 text-xs font-semibold text-[#00B7EC]">
                                            {policy.category}
                                        </div>

                                        {/* Icon */}
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#23369C] to-[#23369C]/80 text-white shadow-lg">
                                            <FileText className="h-8 w-8" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            {policy.title}
                                        </h3>
                                        <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                            {policy.description}
                                        </p>

                                        {/* Download Button */}
                                        <button className="flex items-center gap-2 text-sm font-semibold text-[#00B7EC] transition-colors hover:text-[#00B7EC]/80">
                                            <Download className="h-4 w-4" />
                                            <span>Download PDF</span>
                                        </button>

                                        {/* Decorative Element */}
                                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00B7EC]/5 transition-all duration-300 group-hover:bg-[#00B7EC]/10" />
                                    </div>
                                ))}
                            </div>

                            {/* Key Principles Section */}
                            <div className="mt-20">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Core Principles
                                </h2>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                            <svg
                                                className="h-7 w-7"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-3 text-2xl font-bold text-[#23369C]">
                                            Accountability
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">
                                            We maintain the highest standards of
                                            accountability to our beneficiaries,
                                            donors, and partners through
                                            transparent reporting and ethical
                                            practices.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                            <svg
                                                className="h-7 w-7"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-3 text-2xl font-bold text-[#23369C]">
                                            Inclusivity
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">
                                            Our policies ensure equal
                                            opportunities and fair treatment for
                                            all, promoting diversity and
                                            inclusion in everything we do.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                            <svg
                                                className="h-7 w-7"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-3 text-2xl font-bold text-[#23369C]">
                                            Innovation
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">
                                            We continuously review and update
                                            our policies to incorporate best
                                            practices and innovative approaches
                                            to development.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                            <svg
                                                className="h-7 w-7"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-3 text-2xl font-bold text-[#23369C]">
                                            Do No Harm
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">
                                            All our policies are designed with a
                                            'do no harm' approach, ensuring our
                                            interventions protect and benefit
                                            communities.
                                        </p>
                                    </div>
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
