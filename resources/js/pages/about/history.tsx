import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function History() {
    return (
        <>
            <Head title="History - VDO" />
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
                                Our History
                            </h1>
                            <p className="text-xl text-white/90">
                                Discover the journey that shaped Vision
                                Development Organization
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            {/* Timeline Section */}
                            <div className="mb-16">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Our Journey
                                </h2>
                                <div className="space-y-12">
                                    {/* Timeline Item */}
                                    <div className="flex gap-8">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC] text-white shadow-lg">
                                                <span className="text-xl font-bold">
                                                    1
                                                </span>
                                            </div>
                                            <div className="h-full w-1 bg-[#00B7EC]/20" />
                                        </div>
                                        <div className="flex-1 pb-12">
                                            <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                                Foundation
                                            </h3>
                                            <p className="mb-2 text-sm font-semibold text-[#00B7EC]">
                                                Year 2000
                                            </p>
                                            <p className="leading-relaxed text-gray-700">
                                                Vision Development Organization
                                                (VDO) was established with a
                                                mission to bring sustainable
                                                development and positive change
                                                to communities across
                                                Afghanistan. Founded by a group
                                                of dedicated professionals, VDO
                                                began its journey with a focus on
                                                education and community
                                                empowerment.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="flex gap-8">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC] text-white shadow-lg">
                                                <span className="text-xl font-bold">
                                                    2
                                                </span>
                                            </div>
                                            <div className="h-full w-1 bg-[#00B7EC]/20" />
                                        </div>
                                        <div className="flex-1 pb-12">
                                            <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                                Expansion & Growth
                                            </h3>
                                            <p className="mb-2 text-sm font-semibold text-[#00B7EC]">
                                                2005-2010
                                            </p>
                                            <p className="leading-relaxed text-gray-700">
                                                During this period, VDO expanded
                                                its operations across multiple
                                                provinces in Afghanistan. We
                                                diversified our programs to
                                                include health and nutrition,
                                                economic growth, and urban
                                                development initiatives,
                                                reaching thousands of
                                                beneficiaries.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="flex gap-8">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC] text-white shadow-lg">
                                                <span className="text-xl font-bold">
                                                    3
                                                </span>
                                            </div>
                                            <div className="h-full w-1 bg-[#00B7EC]/20" />
                                        </div>
                                        <div className="flex-1 pb-12">
                                            <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                                International Recognition
                                            </h3>
                                            <p className="mb-2 text-sm font-semibold text-[#00B7EC]">
                                                2011-2015
                                            </p>
                                            <p className="leading-relaxed text-gray-700">
                                                VDO gained recognition from
                                                international organizations and
                                                donors for our impactful work.
                                                We established partnerships with
                                                leading humanitarian
                                                organizations and expanded our
                                                emergency response capabilities.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Item */}
                                    <div className="flex gap-8">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC] text-white shadow-lg">
                                                <span className="text-xl font-bold">
                                                    4
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                                Present Day
                                            </h3>
                                            <p className="mb-2 text-sm font-semibold text-[#00B7EC]">
                                                2016-Present
                                            </p>
                                            <p className="leading-relaxed text-gray-700">
                                                Today, VDO continues to be at the
                                                forefront of humanitarian and
                                                development work in Afghanistan.
                                                We have helped over 500,000
                                                beneficiaries through our various
                                                programs and maintain a strong
                                                commitment to our core values of
                                                transparency, accountability, and
                                                community empowerment.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Milestones Section */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Key Milestones
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="rounded-lg bg-white p-6 shadow-md">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#23369C]">
                                                320,000+ Students
                                            </h3>
                                        </div>
                                        <p className="text-gray-600">
                                            Educated through our programs
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-white p-6 shadow-md">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#23369C]">
                                                25+ Provinces
                                            </h3>
                                        </div>
                                        <p className="text-gray-600">
                                            Operating across Afghanistan
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-white p-6 shadow-md">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#23369C]">
                                                500+ Staff
                                            </h3>
                                        </div>
                                        <p className="text-gray-600">
                                            Dedicated team members
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-white p-6 shadow-md">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B7EC] text-white">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#23369C]">
                                                200+ Projects
                                            </h3>
                                        </div>
                                        <p className="text-gray-600">
                                            Successfully completed
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
