import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Download, BookOpen, FileText, BarChart } from 'lucide-react'

const publications = [
    {
        id: 1,
        title: "Annual Report 2024",
        description: "Comprehensive overview of VDO's programs, achievements, and financial performance for the year 2024.",
        type: "Annual Report",
        icon: BarChart,
        year: "2024",
        pages: 48,
        pdfUrl: "#",
        image: "/images/1.jpg"
    },
    {
        id: 2,
        title: "Education Program Impact Assessment",
        description: "Detailed analysis of educational outcomes and impact across community-based education programs.",
        type: "Research Report",
        icon: BookOpen,
        year: "2024",
        pages: 32,
        pdfUrl: "#",
        image: "/images/2.jpg"
    },
    {
        id: 3,
        title: "Women's Economic Empowerment Study",
        description: "Research findings on the effectiveness of women's economic empowerment initiatives in rural Afghanistan.",
        type: "Research Report",
        icon: FileText,
        year: "2024",
        pages: 28,
        pdfUrl: "#",
        image: "/images/3.jpg"
    },
    {
        id: 4,
        title: "Health and Nutrition Program Review",
        description: "Evaluation report on health and nutrition interventions and their impact on community wellbeing.",
        type: "Evaluation Report",
        icon: FileText,
        year: "2024",
        pages: 36,
        pdfUrl: "#",
        image: "/images/4.jpg"
    },
    {
        id: 5,
        title: "Strategic Plan 2024-2027",
        description: "VDO's strategic direction, priorities, and planned initiatives for the next three years.",
        type: "Strategic Document",
        icon: BookOpen,
        year: "2024",
        pages: 24,
        pdfUrl: "#",
        image: "/images/5.jpg"
    },
    {
        id: 6,
        title: "Emergency Response Guidelines",
        description: "Operational guidelines and protocols for humanitarian emergency response activities.",
        type: "Guidelines",
        icon: FileText,
        year: "2023",
        pages: 42,
        pdfUrl: "#",
        image: "/images/6.jpg"
    },
]

const categories = [
    "All Publications",
    "Annual Reports",
    "Research Reports",
    "Evaluation Reports",
    "Strategic Documents",
    "Guidelines"
]

export default function Publications() {
    return (
        <>
            <Head title="Publications - VDO" />
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
                                Publications
                            </h1>
                            <p className="text-xl text-white/90">
                                Access our reports, research, and organizational documents
                            </p>
                        </div>
                    </div>
                </section>

                {/* Publications Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Our Publications
                            </h2>
                            <p className="max-w-2xl text-gray-600">
                                Explore our collection of reports, research papers, and strategic documents that showcase our work and impact.
                            </p>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-10 flex flex-wrap gap-3">
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                                        index === 0
                                            ? 'bg-[#23369C] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Publications Grid */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {publications.map((pub) => (
                                <article
                                    key={pub.id}
                                    className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={pub.image}
                                            alt={pub.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#23369C]">
                                                <pub.icon className="h-3 w-3" />
                                                {pub.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
                                            <span>{pub.year}</span>
                                            <span>•</span>
                                            <span>{pub.pages} pages</span>
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C] transition-colors group-hover:text-[#00B7EC]">
                                            {pub.title}
                                        </h3>
                                        <p className="mb-4 text-gray-600 line-clamp-3">
                                            {pub.description}
                                        </p>
                                        <a
                                            href={pub.pdfUrl}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00B7EC] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#00B7EC]/90"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download PDF
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-12 text-center">
                            <button className="rounded-lg border-2 border-[#23369C] px-8 py-3 font-semibold text-[#23369C] transition-colors hover:bg-[#23369C] hover:text-white">
                                View All Publications
                            </button>
                        </div>
                    </div>
                </section>

                {/* Subscribe Section */}
                <section className="bg-gradient-to-br from-[#23369C] to-[#23369C]/90 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">
                                Stay Informed
                            </h2>
                            <p className="mb-8 text-white/80">
                                Subscribe to receive notifications when new publications are released.
                            </p>
                            <form className="flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B7EC]"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-[#00B7EC] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#00B7EC]/90"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
