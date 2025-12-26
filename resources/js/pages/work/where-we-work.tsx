import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { MapPin, Users, Building2, Home } from 'lucide-react'

export default function WhereWeWork() {
    const regions = [
        {
            id: 1,
            name: 'Central Region',
            provinces: ['Kabul', 'Parwan', 'Kapisa', 'Logar', 'Wardak', 'Panjsher'],
            beneficiaries: '150,000+',
            projects: 45,
            description:
                'Our largest operational area with comprehensive programming across all sectors',
        },
        {
            id: 2,
            name: 'Eastern Region',
            provinces: ['Nangarhar', 'Laghman', 'Kunar', 'Nuristan'],
            beneficiaries: '85,000+',
            projects: 28,
            description:
                'Focus on health, education, and livelihood support in hard-to-reach communities',
        },
        {
            id: 3,
            name: 'Northern Region',
            provinces: ['Balkh', 'Kunduz', 'Takhar', 'Baghlan', 'Samangan'],
            beneficiaries: '120,000+',
            projects: 38,
            description:
                'Extensive WASH and protection programs serving displaced populations',
        },
        {
            id: 4,
            name: 'Western Region',
            provinces: ['Herat', 'Badghis', 'Farah', 'Ghor'],
            beneficiaries: '95,000+',
            projects: 32,
            description:
                'Integrated programming addressing drought resilience and food security',
        },
        {
            id: 5,
            name: 'Southern Region',
            provinces: ['Kandahar', 'Helmand', 'Zabul', 'Uruzgan'],
            beneficiaries: '50,000+',
            projects: 18,
            description:
                'Emergency response and basic service delivery in conflict-affected areas',
        },
    ]

    const coverage = [
        {
            icon: MapPin,
            value: '34',
            label: 'Provinces',
            description: 'Operating across all 34 provinces of Afghanistan',
        },
        {
            icon: Building2,
            value: '48',
            label: 'Districts',
            description: 'Direct presence in 48 districts nationwide',
        },
        {
            icon: Home,
            value: '150+',
            label: 'Communities',
            description: 'Working in over 150 rural and urban communities',
        },
        {
            icon: Users,
            value: '500K+',
            label: 'Beneficiaries',
            description: 'Total beneficiaries reached across all regions',
        },
    ]

    const officeLocations = [
        {
            type: 'Head Office',
            location: 'Kabul',
            address: 'Karte-4, Kabul, Afghanistan',
            contact: '+93 728777119',
        },
        {
            type: 'Regional Office',
            location: 'Herat',
            address: 'Herat City, Herat Province',
            contact: '+93 728777120',
        },
        {
            type: 'Regional Office',
            location: 'Balkh',
            address: 'Mazar-i-Sharif, Balkh Province',
            contact: '+93 728777121',
        },
        {
            type: 'Regional Office',
            location: 'Nangarhar',
            address: 'Jalalabad City, Nangarhar Province',
            contact: '+93 728777122',
        },
        {
            type: 'Regional Office',
            location: 'Kandahar',
            address: 'Kandahar City, Kandahar Province',
            contact: '+93 728777123',
        },
    ]

    return (
        <>
            <Head title="Where We Work - VDO" />
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
                                Where We Work
                            </h1>
                            <p className="text-xl text-white/90">
                                Serving communities across Afghanistan with
                                comprehensive humanitarian and development
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
                                    Our Geographic Reach
                                </h2>
                                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
                                    VDO maintains a strong presence across
                                    Afghanistan, with regional offices and field
                                    teams strategically located to serve the
                                    most vulnerable populations. Our extensive
                                    network allows us to respond quickly to
                                    emergencies and deliver sustained
                                    development programming in both accessible
                                    and hard-to-reach areas.
                                </p>
                            </div>

                            {/* Coverage Statistics */}
                            <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {coverage.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group rounded-2xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8 text-center shadow-xl transition-all duration-300 hover:shadow-2xl"
                                    >
                                        <div className="mb-6 flex justify-center">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00B7EC] to-[#23369C] shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                <item.icon className="h-10 w-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="mb-2 text-4xl font-bold text-[#23369C]">
                                            {item.value}
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-gray-800">
                                            {item.label}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Regional Presence */}
                            <div className="mb-20">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Regional Presence
                                </h2>
                                <div className="space-y-8">
                                    {regions.map((region) => (
                                        <div
                                            key={region.id}
                                            className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-xl transition-all duration-300 hover:border-[#00B7EC] hover:shadow-2xl"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                {/* Region Info */}
                                                <div className="flex-1 bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-8 text-white">
                                                    <h3 className="mb-4 text-2xl font-bold">
                                                        {region.name}
                                                    </h3>
                                                    <p className="mb-6 text-white/90">
                                                        {region.description}
                                                    </p>
                                                    <div className="mb-4 flex flex-wrap gap-2">
                                                        {region.provinces.map(
                                                            (province, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm"
                                                                >
                                                                    {province}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Statistics */}
                                                <div className="flex flex-col justify-center gap-6 bg-gray-50 p-8 md:w-80">
                                                    <div className="text-center">
                                                        <div className="mb-2 text-3xl font-bold text-[#00B7EC]">
                                                            {
                                                                region.beneficiaries
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Beneficiaries Served
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="mb-2 text-3xl font-bold text-[#00B7EC]">
                                                            {region.projects}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Active Projects
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Locations */}
                            <div className="rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Our Office Locations
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {officeLocations.map((office, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-white p-6 shadow-lg"
                                        >
                                            <div className="mb-4 inline-block rounded-full bg-[#00B7EC] px-4 py-1 text-sm font-semibold text-white">
                                                {office.type}
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                                {office.location}
                                            </h3>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00B7EC]" />
                                                    <span>{office.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        className="h-4 w-4 flex-shrink-0 text-[#00B7EC]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                    <span>{office.contact}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Access Information */}
                            <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Hard-to-Reach Areas
                                </h2>
                                <p className="mb-10 text-center text-lg text-white/90">
                                    VDO is committed to reaching the most
                                    vulnerable populations, even in remote and
                                    insecure areas
                                </p>
                                <div className="grid gap-6 md:grid-cols-3">
                                    {[
                                        {
                                            title: 'Remote Programming',
                                            desc: 'Implementing programs in areas with limited access through local partnerships',
                                        },
                                        {
                                            title: 'Mobile Teams',
                                            desc: 'Deploying mobile teams to deliver services in hard-to-reach communities',
                                        },
                                        {
                                            title: 'Community Networks',
                                            desc: 'Building strong community networks to maintain presence and deliver assistance',
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                                        >
                                            <h3 className="mb-3 text-lg font-bold">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-white/80">
                                                {item.desc}
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
