import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Heart, Baby, Apple, Stethoscope } from 'lucide-react'

export default function HealthNutrition() {
    return (
        <>
            <Head title="Health and Nutrition - VDO" />
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
                                Health and Nutrition
                            </h1>
                            <p className="text-xl text-white/90">
                                Improving health outcomes and nutrition for vulnerable communities
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
                                    Promoting Healthier Communities
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                    VDO's health and nutrition programs address critical gaps in healthcare access
                                    and nutrition security across Afghanistan. We focus on strengthening health
                                    systems, improving maternal and child health, and combating malnutrition through
                                    evidence-based interventions.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    Our comprehensive approach integrates health service delivery with community-based
                                    health education and nutrition support to achieve sustainable health improvements.
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
                                            <Baby className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Maternal & Child Health
                                        </h3>
                                        <p className="text-gray-600">
                                            Comprehensive care for mothers and children including prenatal care,
                                            safe delivery services, postnatal support, and child immunization.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Apple className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Nutrition Programs
                                        </h3>
                                        <p className="text-gray-600">
                                            Treatment of acute malnutrition, infant and young child feeding support,
                                            and micronutrient supplementation for vulnerable populations.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Stethoscope className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Primary Healthcare
                                        </h3>
                                        <p className="text-gray-600">
                                            Supporting health facilities and mobile health teams to deliver essential
                                            healthcare services to underserved communities.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Heart className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Health Education
                                        </h3>
                                        <p className="text-gray-600">
                                            Community health awareness programs covering hygiene, disease prevention,
                                            nutrition, and healthy lifestyle practices.
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
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">200,000+</div>
                                        <p className="text-gray-700">Patients Treated</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">50,000+</div>
                                        <p className="text-gray-700">Children Vaccinated</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">25,000+</div>
                                        <p className="text-gray-700">Malnourished Treated</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">100+</div>
                                        <p className="text-gray-700">Health Facilities</p>
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
                                            Community-Based Management of Acute Malnutrition (CMAM)
                                        </h3>
                                        <p className="text-gray-700">
                                            Screening, treatment, and follow-up of malnourished children through
                                            outpatient therapeutic programs and supplementary feeding centers.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Reproductive Health Services
                                        </h3>
                                        <p className="text-gray-700">
                                            Comprehensive reproductive health services including antenatal care,
                                            skilled birth attendance, postnatal care, and family planning support.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Mobile Health Teams
                                        </h3>
                                        <p className="text-gray-700">
                                            Deploying mobile health teams to reach remote and underserved communities
                                            with essential health services and health education.
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
