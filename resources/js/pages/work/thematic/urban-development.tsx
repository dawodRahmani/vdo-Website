import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Building2, Droplets, Lightbulb, Home } from 'lucide-react'

export default function UrbanDevelopment() {
    return (
        <>
            <Head title="Urban Development - VDO" />
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
                                Urban Development
                            </h1>
                            <p className="text-xl text-white/90">
                                Building sustainable infrastructure and improving urban living conditions
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
                                    Transforming Urban Landscapes
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                    VDO's urban development programs focus on improving infrastructure,
                                    enhancing access to basic services, and creating sustainable urban environments.
                                    We work with communities and local authorities to address the challenges of
                                    rapid urbanization and ensure that urban growth benefits all residents.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    Our integrated approach combines infrastructure development with community
                                    engagement to create lasting improvements in urban areas and informal settlements.
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
                                            <Droplets className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Water & Sanitation
                                        </h3>
                                        <p className="text-gray-600">
                                            Developing water supply systems, sanitation facilities, and drainage
                                            infrastructure to improve public health in urban communities.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Building2 className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Infrastructure Development
                                        </h3>
                                        <p className="text-gray-600">
                                            Construction and rehabilitation of roads, bridges, and public facilities
                                            to improve connectivity and access to services.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Home className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Settlement Upgrading
                                        </h3>
                                        <p className="text-gray-600">
                                            Improving living conditions in informal settlements through community-led
                                            upgrading programs and tenure security.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Lightbulb className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Solar Energy Solutions
                                        </h3>
                                        <p className="text-gray-600">
                                            Promoting renewable energy access through solar installations for
                                            households, schools, and health facilities.
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
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">150+</div>
                                        <p className="text-gray-700">Water Systems Built</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">100,000+</div>
                                        <p className="text-gray-700">People with Clean Water</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">500+</div>
                                        <p className="text-gray-700">km Roads Constructed</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">50+</div>
                                        <p className="text-gray-700">Communities Upgraded</p>
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
                                            Community Infrastructure Development
                                        </h3>
                                        <p className="text-gray-700">
                                            Participatory planning and implementation of infrastructure projects
                                            including roads, drainage systems, and public spaces with strong
                                            community involvement.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            WASH (Water, Sanitation & Hygiene)
                                        </h3>
                                        <p className="text-gray-700">
                                            Comprehensive WASH programs including construction of water networks,
                                            public toilets, and hygiene awareness campaigns to improve community health.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Green Urban Solutions
                                        </h3>
                                        <p className="text-gray-700">
                                            Promoting sustainable urban development through renewable energy,
                                            waste management systems, and urban greening initiatives.
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
