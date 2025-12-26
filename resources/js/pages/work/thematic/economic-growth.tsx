import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { TrendingUp, Briefcase, Banknote, Sprout } from 'lucide-react'

export default function EconomicGrowth() {
    return (
        <>
            <Head title="Economic Growth - VDO" />
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
                                Economic Growth
                            </h1>
                            <p className="text-xl text-white/90">
                                Building sustainable livelihoods and fostering economic independence
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            {/* Overview */}
                            <div className="mb-16">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Driving Economic Development
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                    VDO's economic growth programs aim to create sustainable livelihood opportunities
                                    for vulnerable communities across Afghanistan. We focus on skill development,
                                    vocational training, microfinance, and agricultural support to help individuals
                                    and families achieve economic self-sufficiency.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    Our approach combines immediate income-generating activities with long-term
                                    capacity building to ensure lasting economic resilience and community prosperity.
                                </p>
                            </div>

                            {/* Key Areas */}
                            <div className="mb-16">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Key Focus Areas
                                </h2>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Briefcase className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Vocational Training
                                        </h3>
                                        <p className="text-gray-600">
                                            Market-driven skills training programs that equip youth and adults with
                                            practical skills for employment or self-employment opportunities.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Banknote className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Microfinance & Savings
                                        </h3>
                                        <p className="text-gray-600">
                                            Community-based savings groups and microfinance programs that provide
                                            access to financial services for small business development.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Sprout className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Agricultural Development
                                        </h3>
                                        <p className="text-gray-600">
                                            Supporting farmers with improved techniques, quality seeds, irrigation
                                            systems, and market linkages to enhance agricultural productivity.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <TrendingUp className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Enterprise Development
                                        </h3>
                                        <p className="text-gray-600">
                                            Business development support including mentoring, training, and access
                                            to markets for small and medium enterprises.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Impact Statistics */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Our Impact
                                </h2>
                                <div className="grid gap-6 md:grid-cols-4">
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">50,000+</div>
                                        <p className="text-gray-700">Beneficiaries Trained</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">3,500+</div>
                                        <p className="text-gray-700">Businesses Supported</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">200+</div>
                                        <p className="text-gray-700">Savings Groups</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">15,000+</div>
                                        <p className="text-gray-700">Farmers Assisted</p>
                                    </div>
                                </div>
                            </div>

                            {/* Programs Section */}
                            <div className="mt-16">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Our Programs
                                </h2>
                                <div className="space-y-6">
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Skills for Employment Program
                                        </h3>
                                        <p className="text-gray-700">
                                            Comprehensive vocational training in high-demand trades including tailoring,
                                            carpentry, electrical work, plumbing, and computer skills, combined with
                                            job placement support.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Women's Economic Empowerment
                                        </h3>
                                        <p className="text-gray-700">
                                            Targeted programs for women including home-based business development,
                                            handicraft production, and savings groups to promote financial independence.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Agricultural Livelihoods
                                        </h3>
                                        <p className="text-gray-700">
                                            Support for farming communities through provision of improved seeds,
                                            training on modern farming techniques, and development of irrigation infrastructure.
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
