import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AfghanistanMap from '@/components/afghanistan-map'
import {
    MapPin,
    Users,
    Building2,
    Home,
    GraduationCap,
    TrendingUp,
    Building,
    Heart,
    Stethoscope,
    Shield,
} from 'lucide-react'

interface WhereWeWorkProps {
    scrollTo?: string
}

export default function WhereWeWork({ scrollTo }: WhereWeWorkProps) {
    useEffect(() => {
        if (scrollTo) {
            const element = document.getElementById(scrollTo)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }

        const hash = window.location.hash.replace('#', '')
        if (hash) {
            const element = document.getElementById(hash)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }
    }, [scrollTo])

    const regions = [
        {
            id: 'central',
            name: 'Central Region',
            provinces: [
                'Kabul',
                'Parwan',
                'Kapisa',
                'Logar',
                'Wardak',
                'Panjsher',
            ],
            beneficiaries: '150,000+',
            projects: 45,
            color: 'from-blue-600 to-blue-800',
            description:
                "VDO is committed to improving lives in the central region through education, economic growth, urban development, and emergency response.",
            details: [
                {
                    icon: GraduationCap,
                    title: 'Education',
                    text: 'Expands urban school access, ensuring children in underserved areas can learn and thrive.',
                },
                {
                    icon: TrendingUp,
                    title: 'Economic Growth',
                    text: 'Supports MSMEs, helping small businesses grow, create jobs, and strengthen local livelihoods.',
                },
                {
                    icon: Building,
                    title: 'Urban Development',
                    text: 'Addresses challenges like flooding by improving infrastructure and promoting resilient, livable communities.',
                },
                {
                    icon: Shield,
                    title: 'Emergency Response',
                    text: 'Provides emergency response support to vulnerable populations, helping communities recover and build resilience.',
                },
            ],
            summary:
                'Through these integrated efforts, VDO empowers communities, fosters inclusive growth, and strengthens resilience across the central region.',
        },
        {
            id: 'northern',
            name: 'Northern Region',
            provinces: ['Balkh', 'Kunduz', 'Takhar', 'Baghlan', 'Samangan'],
            beneficiaries: '120,000+',
            projects: 38,
            color: 'from-green-600 to-green-800',
            description:
                "VDO empowers communities in the northern region through integrated interventions in education, economic growth, urban development, and health.",
            details: [
                {
                    icon: GraduationCap,
                    title: 'Education',
                    text: 'Improves access to schools in underserved rural areas.',
                },
                {
                    icon: TrendingUp,
                    title: 'Economic Growth',
                    text: 'Supports MSMEs and TVET training for youth.',
                },
                {
                    icon: Building,
                    title: 'Urban Development',
                    text: 'Strengthens resilience in drought-prone provinces.',
                },
                {
                    icon: Stethoscope,
                    title: 'Health & Nutrition',
                    text: 'Raises awareness on COVID-19, nutrition, and menstrual hygiene, trains frontline workers, conducts nutrition sessions, and provides dignity kits and women- and girls-friendly spaces.',
                },
            ],
            summary:
                'Through these efforts, VDO enhances livelihoods, health, and community resilience, ensuring no one is left behind.',
        },
        {
            id: 'eastern',
            name: 'Eastern Region',
            provinces: ['Nangarhar', 'Laghman', 'Kunar', 'Nuristan'],
            beneficiaries: '85,000+',
            projects: 28,
            color: 'from-orange-600 to-orange-800',
            description:
                "VDO empowers communities in the eastern region through integrated programs in education, economic growth, urban development, and health.",
            details: [
                {
                    icon: GraduationCap,
                    title: 'Education',
                    text: 'Supports children in crisis-affected areas to continue learning.',
                },
                {
                    icon: TrendingUp,
                    title: 'Economic Growth',
                    text: 'Provides MSME support and TVET training to boost livelihoods.',
                },
                {
                    icon: Building,
                    title: 'Urban Development',
                    text: 'Strengthens flood-affected communities through resilient urban development initiatives.',
                },
                {
                    icon: Stethoscope,
                    title: 'Health & Nutrition',
                    text: "Integrated Health-Nutrition-Immunization Project addresses vaccine misconceptions, promotes positive health behaviors, and increases caregivers' understanding of immunization and nutrition services.",
                },
            ],
            summary:
                'Through these interventions, VDO enhances education, economic opportunities, health, and resilience, ensuring that vulnerable populations in the eastern region are supported to thrive.',
        },
        {
            id: 'western',
            name: 'Western Region',
            provinces: ['Herat', 'Badghis', 'Farah', 'Ghor'],
            beneficiaries: '95,000+',
            projects: 32,
            color: 'from-purple-600 to-purple-800',
            description:
                "VDO empowers communities in the western region through integrated programs in education, economic growth, urban development, and health and nutrition.",
            details: [
                {
                    icon: GraduationCap,
                    title: 'Education',
                    text: 'Provides education support to ensure children and youth access quality learning opportunities.',
                },
                {
                    icon: TrendingUp,
                    title: 'Economic Growth',
                    text: 'Equips women and youth with startup kits, small business grants, financial literacy training, TVET and market-aligned skills development. Through mentorship, coaching, and the WAQAR Career Center, participants gain tools and opportunities.',
                },
                {
                    icon: Building,
                    title: 'Urban Development',
                    text: 'Supports drought-prone provinces through infrastructure improvements and sustainable planning to build resilient communities.',
                },
                {
                    icon: Stethoscope,
                    title: 'Health & Nutrition',
                    text: 'Works to improve community well-being by raising awareness on key health issues, providing nutrition services, and supporting families with access to essential health resources.',
                },
            ],
            summary:
                'Through these integrated efforts, VDO strengthens livelihoods, education, urban resilience, and health, creating lasting impact for vulnerable populations in the western region.',
        },
        {
            id: 'southern',
            name: 'Southern Region',
            provinces: ['Kandahar', 'Helmand', 'Zabul', 'Uruzgan'],
            beneficiaries: '50,000+',
            projects: 18,
            color: 'from-red-600 to-red-800',
            description:
                "VDO empowers communities in the southern region through integrated programs in education, economic growth, urban development, emergency response, and health and nutrition.",
            details: [
                {
                    icon: GraduationCap,
                    title: 'Education',
                    text: 'Improves access to learning opportunities for children and youth in underserved and crisis-affected areas.',
                },
                {
                    icon: TrendingUp,
                    title: 'Economic Growth',
                    text: 'Supports MSMEs and provides TVET training, startup kits, small business grants, and mentorship.',
                },
                {
                    icon: Building,
                    title: 'Urban Development',
                    text: 'Strengthens urban development and resilience in drought- and disaster-prone areas through infrastructure improvements, sustainable planning, and community-based risk reduction.',
                },
                {
                    icon: Stethoscope,
                    title: 'Health & Nutrition',
                    text: 'Partner-led initiatives raise awareness on vaccines, nutrition, and hygiene, while supporting women and girls with safe spaces and essential services.',
                },
            ],
            summary:
                'Through these integrated interventions, VDO builds resilient communities, strengthens livelihoods, improves health outcomes, and ensures that vulnerable populations in the southern region are empowered to thrive.',
        },
        {
            id: 'northwestern',
            name: 'North-Western Region',
            provinces: ['Faryab', 'Jawzjan', 'Sar-e Pol', 'Badakhshan'],
            beneficiaries: '75,000+',
            projects: 24,
            color: 'from-teal-600 to-teal-800',
            description:
                "VDO, through its local partners, supports communities in the north-western region across education, economic growth, urban development, emergency response, and health and nutrition.",
            details: [
                {
                    icon: GraduationCap,
                    title: 'Education',
                    text: 'Improves access to learning for children and youth in underserved and crisis-affected areas.',
                },
                {
                    icon: TrendingUp,
                    title: 'Economic Growth',
                    text: 'Provides MSME support, TVET training, startup kits, and small business grants, enabling sustainable livelihoods and job opportunities.',
                },
                {
                    icon: Building,
                    title: 'Urban Development',
                    text: 'Strengthens urban resilience in drought- and disaster-prone areas through infrastructure improvements and sustainable planning.',
                },
                {
                    icon: Stethoscope,
                    title: 'Health & Nutrition',
                    text: 'Partner-led programs address vaccine misconceptions, promote positive health practices, and provide women and girls with safe spaces and essential services.',
                },
            ],
            summary:
                'Through these efforts, VDO enhances livelihoods, education, health, and community resilience in the north-western region.',
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
            value: '6',
            label: 'Regions',
            description: 'Comprehensive coverage across all major regions',
        },
        {
            icon: Home,
            value: '150+',
            label: 'Communities',
            description: 'Working in over 150 rural and urban communities',
        },
        {
            icon: Users,
            value: '575K+',
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

                            {/* Interactive Map Section */}
                            <div id="map" className="mb-20 scroll-mt-32">
                                <h2 className="mb-10 text-center text-3xl font-bold text-[#23369C]">
                                    Afghanistan Map
                                </h2>
                                <div className="rounded-3xl bg-gradient-to-br from-[#23369C]/5 to-[#00B7EC]/5 p-8 shadow-xl">
                                    <AfghanistanMap />
                                </div>
                            </div>

                            {/* Area-Based Information */}
                            <div id="area-based" className="mb-20 scroll-mt-32">
                                <h2 className="mb-4 text-center text-3xl font-bold text-[#23369C]">
                                    Area-Based Information
                                </h2>
                                <p className="mx-auto mb-10 max-w-3xl text-center text-gray-600">
                                    Explore our comprehensive programs across
                                    Afghanistan's six major regions, each
                                    tailored to address local needs and
                                    challenges.
                                </p>
                                <div className="space-y-10">
                                    {regions.map((region) => (
                                        <div
                                            key={region.id}
                                            id={region.id}
                                            className="scroll-mt-32 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                                        >
                                            {/* Region Header */}
                                            <div
                                                className={`bg-gradient-to-r ${region.color} p-8 text-white`}
                                            >
                                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                                    <div>
                                                        <h3 className="mb-3 text-3xl font-bold">
                                                            {region.name}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {region.provinces.map(
                                                                (
                                                                    province,
                                                                    idx,
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm"
                                                                    >
                                                                        {
                                                                            province
                                                                        }
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-6">
                                                        <div className="text-center">
                                                            <div className="text-3xl font-bold">
                                                                {
                                                                    region.beneficiaries
                                                                }
                                                            </div>
                                                            <div className="text-sm text-white/80">
                                                                Beneficiaries
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-3xl font-bold">
                                                                {region.projects}
                                                            </div>
                                                            <div className="text-sm text-white/80">
                                                                Projects
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Region Content */}
                                            <div className="p-8">
                                                <p className="mb-8 text-lg text-gray-700">
                                                    {region.description}
                                                </p>

                                                {/* Program Areas */}
                                                <div className="mb-8 grid gap-6 md:grid-cols-2">
                                                    {region.details.map(
                                                        (detail, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex gap-4 rounded-xl bg-gray-50 p-5"
                                                            >
                                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#00B7EC]/10 text-[#00B7EC]">
                                                                    <detail.icon className="h-6 w-6" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="mb-1 font-bold text-[#23369C]">
                                                                        {
                                                                            detail.title
                                                                        }
                                                                    </h4>
                                                                    <p className="text-sm text-gray-600">
                                                                        {
                                                                            detail.text
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>

                                                {/* Summary */}
                                                <div className="rounded-xl bg-gradient-to-r from-[#23369C]/10 to-[#00B7EC]/10 p-6">
                                                    <p className="font-medium text-gray-700">
                                                        {region.summary}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Locations */}
                            <div
                                id="offices"
                                className="scroll-mt-32 rounded-3xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-10"
                            >
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

                            {/* Hard-to-Reach Areas */}
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
