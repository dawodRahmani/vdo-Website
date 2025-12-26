import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Play, Clock, Calendar } from 'lucide-react'

const documentaries = [
    {
        id: 1,
        title: "Empowering Communities: VDO's Journey",
        description: "A comprehensive documentary showcasing VDO's 20+ years of humanitarian and development work across Afghanistan.",
        duration: "45 min",
        year: "2024",
        thumbnail: "/images/1.jpg",
        videoUrl: "https://www.youtube.com/embed/Oa9FFx0_uLA",
        category: "Organization Profile"
    },
    {
        id: 2,
        title: "Education for All: Breaking Barriers",
        description: "Documentary exploring the impact of community-based education programs in remote areas of Afghanistan.",
        duration: "32 min",
        year: "2024",
        thumbnail: "/images/2.jpg",
        videoUrl: "https://www.youtube.com/embed/Oa9FFx0_uLA",
        category: "Education"
    },
    {
        id: 3,
        title: "Women Leading Change",
        description: "Stories of Afghan women entrepreneurs transforming their communities through economic empowerment programs.",
        duration: "28 min",
        year: "2024",
        thumbnail: "/images/3.jpg",
        videoUrl: "https://www.youtube.com/embed/Oa9FFx0_uLA",
        category: "Women Empowerment"
    },
    {
        id: 4,
        title: "Emergency Response: When Every Minute Counts",
        description: "Behind-the-scenes look at VDO's emergency response operations during humanitarian crises.",
        duration: "38 min",
        year: "2023",
        thumbnail: "/images/4.jpg",
        videoUrl: "https://www.youtube.com/embed/Oa9FFx0_uLA",
        category: "Emergency Response"
    },
    {
        id: 5,
        title: "Building Health: Community Healthcare Initiatives",
        description: "Documentary on the establishment and operation of healthcare facilities in underserved areas.",
        duration: "35 min",
        year: "2023",
        thumbnail: "/images/5.jpg",
        videoUrl: "https://www.youtube.com/embed/Oa9FFx0_uLA",
        category: "Health"
    },
    {
        id: 6,
        title: "Youth Voices: The Future of Afghanistan",
        description: "Young Afghans share their aspirations and how VDO's programs are helping them achieve their dreams.",
        duration: "25 min",
        year: "2023",
        thumbnail: "/images/6.jpg",
        videoUrl: "https://www.youtube.com/embed/Oa9FFx0_uLA",
        category: "Youth"
    },
]

const categories = ["All", "Organization Profile", "Education", "Women Empowerment", "Emergency Response", "Health", "Youth"]

export default function Documentary() {
    return (
        <>
            <Head title="Documentary - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/5.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Documentaries
                            </h1>
                            <p className="text-xl text-white/90">
                                Watch our documentaries and see the impact of our work
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Documentary */}
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-center text-3xl font-bold text-[#23369C]">
                            Featured Documentary
                        </h2>
                        <div className="mx-auto max-w-5xl">
                            <div className="overflow-hidden rounded-2xl shadow-2xl">
                                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute inset-0 h-full w-full"
                                        src="https://www.youtube.com/embed/Oa9FFx0_uLA"
                                        title="Featured Documentary"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="mb-2 text-2xl font-bold text-[#23369C]">
                                    Empowering Communities: VDO's Journey
                                </h3>
                                <p className="text-gray-600">
                                    A comprehensive look at VDO's mission, values, and the impact we've made across Afghanistan over the past two decades.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documentary Library */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Documentary Library
                            </h2>
                            <p className="max-w-2xl text-gray-600">
                                Explore our collection of documentaries that tell the stories of resilience, hope, and transformation.
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

                        {/* Documentaries Grid */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {documentaries.map((doc) => (
                                <article
                                    key={doc.id}
                                    className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={doc.thumbnail}
                                            alt={doc.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC] text-white transition-transform hover:scale-110">
                                                <Play className="h-8 w-8" fill="currentColor" />
                                            </button>
                                        </div>
                                        <div className="absolute left-4 top-4">
                                            <span className="rounded-full bg-[#00B7EC] px-3 py-1 text-xs font-semibold text-white">
                                                {doc.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                                            <Clock className="h-3 w-3" />
                                            {doc.duration}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>{doc.year}</span>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C] transition-colors group-hover:text-[#00B7EC]">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {doc.description}
                                        </p>
                                        <button className="mt-4 inline-flex items-center gap-2 font-semibold text-[#00B7EC] transition-colors hover:text-[#23369C]">
                                            <Play className="h-4 w-4" />
                                            Watch Now
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-12 text-center">
                            <button className="rounded-lg border-2 border-[#23369C] px-8 py-3 font-semibold text-[#23369C] transition-colors hover:bg-[#23369C] hover:text-white">
                                Load More Videos
                            </button>
                        </div>
                    </div>
                </section>

                {/* YouTube Channel CTA */}
                <section className="bg-gradient-to-br from-[#23369C] to-[#00B7EC] py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                                <svg
                                    className="h-8 w-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-white">
                                Subscribe to Our Channel
                            </h2>
                            <p className="mb-8 text-white/80">
                                Get notified when we release new documentaries and videos. Join our community on YouTube.
                            </p>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-[#23369C] transition-colors hover:bg-white/90"
                            >
                                Subscribe on YouTube
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
