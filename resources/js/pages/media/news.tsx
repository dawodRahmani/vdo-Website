import { Head, Link } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Calendar, ArrowRight } from 'lucide-react'

const newsItems = [
    {
        id: 1,
        title: "VDO Launches New Education Initiative in Rural Afghanistan",
        excerpt: "Vision Development Organization announces a comprehensive education program targeting underserved communities in rural provinces, aiming to reach 50,000 children.",
        date: "December 20, 2024",
        image: "/images/1.jpg",
        category: "Education"
    },
    {
        id: 2,
        title: "Emergency Response Team Deployed to Northern Provinces",
        excerpt: "In response to recent flooding, VDO's emergency response team has been deployed to provide immediate relief and support to affected families.",
        date: "December 15, 2024",
        image: "/images/2.jpg",
        category: "Emergency Response"
    },
    {
        id: 3,
        title: "Partnership Announcement with International Aid Organizations",
        excerpt: "VDO strengthens its humanitarian capacity through new partnerships with leading international organizations to expand program reach.",
        date: "December 10, 2024",
        image: "/images/3.jpg",
        category: "Partnership"
    },
    {
        id: 4,
        title: "Women's Empowerment Program Celebrates 1000 Graduates",
        excerpt: "Our women's economic empowerment program marks a significant milestone with 1000 women completing vocational training courses.",
        date: "December 5, 2024",
        image: "/images/4.jpg",
        category: "Women Empowerment"
    },
    {
        id: 5,
        title: "Health and Nutrition Program Expansion",
        excerpt: "VDO expands health services to three new provinces, providing essential healthcare access to over 100,000 beneficiaries.",
        date: "November 28, 2024",
        image: "/images/5.jpg",
        category: "Health"
    },
    {
        id: 6,
        title: "Annual Report 2024: Impact and Achievements",
        excerpt: "VDO releases its comprehensive annual report highlighting key achievements and the impact of programs across Afghanistan.",
        date: "November 20, 2024",
        image: "/images/6.jpg",
        category: "Reports"
    },
]

export default function News() {
    return (
        <>
            <Head title="News - VDO" />
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
                                News
                            </h1>
                            <p className="text-xl text-white/90">
                                Stay updated with the latest news and updates from VDO
                            </p>
                        </div>
                    </div>
                </section>

                {/* News Grid Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Latest News
                            </h2>
                            <p className="max-w-2xl text-gray-600">
                                Discover the latest developments, achievements, and stories from our work across Afghanistan.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {newsItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute left-4 top-4">
                                            <span className="rounded-full bg-[#00B7EC] px-3 py-1 text-xs font-semibold text-white">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C] transition-colors group-hover:text-[#00B7EC]">
                                            {item.title}
                                        </h3>
                                        <p className="mb-4 text-gray-600 line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                        <Link
                                            href="#"
                                            className="inline-flex items-center gap-2 font-semibold text-[#00B7EC] transition-colors hover:text-[#23369C]"
                                        >
                                            Read More
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            <button className="rounded-lg bg-[#23369C] px-4 py-2 text-white transition-colors hover:bg-[#23369C]/90">
                                1
                            </button>
                            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
                                2
                            </button>
                            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
                                3
                            </button>
                            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
                                Next
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
