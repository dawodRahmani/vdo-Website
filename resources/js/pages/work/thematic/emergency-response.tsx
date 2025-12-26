import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { AlertTriangle, Package, Tent, HeartHandshake } from 'lucide-react'

export default function EmergencyResponse() {
    return (
        <>
            <Head title="Emergency Response - VDO" />
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
                                Emergency Response
                            </h1>
                            <p className="text-xl text-white/90">
                                Rapid humanitarian assistance when disaster strikes
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
                                    Responding to Humanitarian Crises
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                    VDO maintains a strong emergency response capacity to provide rapid humanitarian
                                    assistance during natural disasters, conflicts, and other emergencies. Our teams
                                    are trained and equipped to respond quickly to meet the immediate needs of
                                    affected populations while laying the groundwork for recovery.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    We coordinate closely with humanitarian clusters, government agencies, and
                                    community leaders to ensure effective and efficient emergency response that
                                    reaches the most vulnerable.
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
                                            <AlertTriangle className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Rapid Needs Assessment
                                        </h3>
                                        <p className="text-gray-600">
                                            Quick deployment of assessment teams to evaluate humanitarian needs
                                            and identify the most vulnerable populations for immediate assistance.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Package className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Relief Distribution
                                        </h3>
                                        <p className="text-gray-600">
                                            Distribution of emergency supplies including food, shelter materials,
                                            hygiene kits, and essential non-food items to affected families.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Tent className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Emergency Shelter
                                        </h3>
                                        <p className="text-gray-600">
                                            Provision of emergency shelter solutions including tents, transitional
                                            shelters, and winterization support for displaced families.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <HeartHandshake className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Cash Assistance
                                        </h3>
                                        <p className="text-gray-600">
                                            Multi-purpose cash assistance to help affected families meet their
                                            basic needs while supporting local markets and preserving dignity.
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
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">100,000+</div>
                                        <p className="text-gray-700">People Assisted</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">50+</div>
                                        <p className="text-gray-700">Emergency Responses</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">10,000+</div>
                                        <p className="text-gray-700">Shelters Provided</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">24/7</div>
                                        <p className="text-gray-700">Response Capacity</p>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Response Cycle */}
                            <div className="mt-16">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Our Response Approach
                                </h2>
                                <div className="space-y-6">
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Preparedness & Early Warning
                                        </h3>
                                        <p className="text-gray-700">
                                            Maintaining pre-positioned stocks, trained rapid response teams, and
                                            early warning systems to enable quick mobilization when emergencies occur.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Immediate Relief
                                        </h3>
                                        <p className="text-gray-700">
                                            Rapid distribution of life-saving assistance including food, water,
                                            shelter, health services, and protection support within 72 hours of emergency.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Early Recovery
                                        </h3>
                                        <p className="text-gray-700">
                                            Transitioning from relief to recovery by supporting livelihoods restoration,
                                            shelter reconstruction, and community resilience building.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Disaster Risk Reduction
                                        </h3>
                                        <p className="text-gray-700">
                                            Working with communities to reduce vulnerability to future disasters
                                            through awareness, planning, and infrastructure improvements.
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
