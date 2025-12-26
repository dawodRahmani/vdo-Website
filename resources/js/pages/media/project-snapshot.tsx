import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { MapPin, Users, Calendar, Target, Download } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: "Community-Based Education Program",
        location: "Kabul, Nangarhar, Herat",
        beneficiaries: "45,000",
        duration: "2023-2025",
        sector: "Education",
        status: "Active",
        description: "Providing quality education to children in underserved communities through community-based schools and teacher training programs.",
        image: "/images/1.jpg",
        donor: "UNICEF"
    },
    {
        id: 2,
        title: "Emergency Food Assistance",
        location: "Northern Provinces",
        beneficiaries: "120,000",
        duration: "2024",
        sector: "Emergency Response",
        status: "Active",
        description: "Delivering emergency food assistance to families affected by natural disasters and economic hardship.",
        image: "/images/2.jpg",
        donor: "WFP"
    },
    {
        id: 3,
        title: "Women's Livelihood Support",
        location: "Balkh, Jawzjan, Faryab",
        beneficiaries: "8,500",
        duration: "2023-2024",
        sector: "Economic Growth",
        status: "Active",
        description: "Supporting women entrepreneurs through skills training, microfinance, and market linkage programs.",
        image: "/images/3.jpg",
        donor: "UN Women"
    },
    {
        id: 4,
        title: "Primary Healthcare Services",
        location: "Kandahar, Helmand",
        beneficiaries: "95,000",
        duration: "2022-2025",
        sector: "Health",
        status: "Active",
        description: "Operating health facilities and mobile health teams to provide essential healthcare services to remote communities.",
        image: "/images/4.jpg",
        donor: "WHO"
    },
    {
        id: 5,
        title: "WASH Infrastructure Development",
        location: "Baghlan, Kunduz",
        beneficiaries: "35,000",
        duration: "2023-2024",
        sector: "Urban Development",
        status: "Completed",
        description: "Constructing water supply systems and sanitation facilities to improve access to clean water and hygiene.",
        image: "/images/5.jpg",
        donor: "USAID"
    },
    {
        id: 6,
        title: "Youth Skills Development",
        location: "Kabul, Mazar-i-Sharif",
        beneficiaries: "5,200",
        duration: "2024-2025",
        sector: "Education",
        status: "Active",
        description: "Providing vocational training and employment support to youth for sustainable livelihoods.",
        image: "/images/6.jpg",
        donor: "ILO"
    },
]

const sectors = ["All Sectors", "Education", "Health", "Economic Growth", "Emergency Response", "Urban Development"]

export default function ProjectSnapshot() {
    return (
        <>
            <Head title="Project Snapshot - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/4.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Project Snapshot
                            </h1>
                            <p className="text-xl text-white/90">
                                Overview of our ongoing and completed projects across Afghanistan
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-gradient-to-r from-[#23369C] to-[#00B7EC] py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">25+</p>
                                <p className="text-white/80">Active Projects</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">18</p>
                                <p className="text-white/80">Provinces Covered</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">500K+</p>
                                <p className="text-white/80">Beneficiaries</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">15+</p>
                                <p className="text-white/80">Partners</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Our Projects
                            </h2>
                            <p className="max-w-2xl text-gray-600">
                                Explore our diverse portfolio of development and humanitarian projects making a difference across Afghanistan.
                            </p>
                        </div>

                        {/* Sector Filter */}
                        <div className="mb-10 flex flex-wrap gap-3">
                            {sectors.map((sector, index) => (
                                <button
                                    key={sector}
                                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                                        index === 0
                                            ? 'bg-[#23369C] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {sector}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid gap-8 lg:grid-cols-2">
                            {projects.map((project) => (
                                <article
                                    key={project.id}
                                    className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative h-64 overflow-hidden md:h-auto md:w-2/5">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute right-4 top-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                                                    project.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6">
                                            <div className="mb-2">
                                                <span className="rounded-full bg-[#00B7EC]/10 px-3 py-1 text-xs font-semibold text-[#00B7EC]">
                                                    {project.sector}
                                                </span>
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-[#23369C] transition-colors group-hover:text-[#00B7EC]">
                                                {project.title}
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-600">
                                                {project.description}
                                            </p>
                                            <div className="space-y-2 text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-[#00B7EC]" />
                                                    <span>{project.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-[#00B7EC]" />
                                                    <span>{project.beneficiaries} Beneficiaries</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-[#00B7EC]" />
                                                    <span>{project.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Target className="h-4 w-4 text-[#00B7EC]" />
                                                    <span>Donor: {project.donor}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <a
                                                    href="#"
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#23369C] transition-colors hover:text-[#00B7EC]"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download Factsheet
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-12 text-center">
                            <button className="rounded-lg border-2 border-[#23369C] px-8 py-3 font-semibold text-[#23369C] transition-colors hover:bg-[#23369C] hover:text-white">
                                View All Projects
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
