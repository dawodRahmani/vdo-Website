import { Head, Link } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Calendar, Download, FileText } from 'lucide-react'

const pressReleases = [
    {
        id: 1,
        title: "VDO Responds to Humanitarian Crisis in Western Afghanistan",
        date: "December 18, 2024",
        summary: "Vision Development Organization mobilizes emergency response teams to address the urgent humanitarian needs in western provinces following recent natural disasters.",
        pdfUrl: "#"
    },
    {
        id: 2,
        title: "Partnership Agreement Signed with UNICEF for Education Programs",
        date: "December 10, 2024",
        summary: "VDO announces strategic partnership with UNICEF to expand educational opportunities for children in underserved communities across Afghanistan.",
        pdfUrl: "#"
    },
    {
        id: 3,
        title: "Annual General Meeting 2024 Highlights",
        date: "November 30, 2024",
        summary: "VDO's Annual General Meeting concludes with review of 2024 achievements and strategic planning for the coming year.",
        pdfUrl: "#"
    },
    {
        id: 4,
        title: "Launch of Women's Economic Empowerment Initiative",
        date: "November 15, 2024",
        summary: "New initiative aims to support 5,000 women entrepreneurs through skills training, microfinance, and market access programs.",
        pdfUrl: "#"
    },
    {
        id: 5,
        title: "VDO Receives Excellence Award for Humanitarian Work",
        date: "October 25, 2024",
        summary: "Recognition from international humanitarian community acknowledges VDO's outstanding contribution to development work in Afghanistan.",
        pdfUrl: "#"
    },
    {
        id: 6,
        title: "Health Program Milestone: 500,000 Beneficiaries Served",
        date: "October 10, 2024",
        summary: "VDO's health and nutrition programs reach significant milestone, providing essential healthcare services to half a million beneficiaries.",
        pdfUrl: "#"
    },
]

export default function PressRelease() {
    return (
        <>
            <Head title="Press Release - VDO" />
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
                                Press Releases
                            </h1>
                            <p className="text-xl text-white/90">
                                Official statements and announcements from VDO
                            </p>
                        </div>
                    </div>
                </section>

                {/* Press Releases List */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Official Press Releases
                            </h2>
                            <p className="max-w-2xl text-gray-600">
                                Access our official press releases and media statements for the latest organizational announcements.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {pressReleases.map((release) => (
                                <article
                                    key={release.id}
                                    className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#00B7EC] hover:shadow-lg"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="flex-1">
                                            <div className="mb-3 flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#23369C]/10">
                                                    <FileText className="h-6 w-6 text-[#23369C]" />
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{release.date}</span>
                                                </div>
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-[#23369C] transition-colors group-hover:text-[#00B7EC]">
                                                {release.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {release.summary}
                                            </p>
                                        </div>
                                        <div className="flex gap-3 md:flex-col">
                                            <Link
                                                href="#"
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#23369C] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#23369C]/90"
                                            >
                                                Read More
                                            </Link>
                                            <a
                                                href={release.pdfUrl}
                                                className="inline-flex items-center gap-2 rounded-lg border border-[#00B7EC] px-4 py-2 text-sm font-semibold text-[#00B7EC] transition-colors hover:bg-[#00B7EC] hover:text-white"
                                            >
                                                <Download className="h-4 w-4" />
                                                PDF
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="mt-12 text-center">
                            <button className="rounded-lg border-2 border-[#23369C] px-8 py-3 font-semibold text-[#23369C] transition-colors hover:bg-[#23369C] hover:text-white">
                                Load More Press Releases
                            </button>
                        </div>
                    </div>
                </section>

                {/* Media Contact Section */}
                <section className="bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                Media Contact
                            </h2>
                            <p className="mb-6 text-gray-600">
                                For media inquiries, interview requests, or additional information, please contact our communications team.
                            </p>
                            <div className="rounded-xl bg-white p-6 shadow-lg">
                                <p className="mb-2 font-semibold text-[#23369C]">
                                    Communications Department
                                </p>
                                <p className="text-gray-600">
                                    Email: communications@vdongo.org
                                </p>
                                <p className="text-gray-600">
                                    Phone: +93 728777119
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
