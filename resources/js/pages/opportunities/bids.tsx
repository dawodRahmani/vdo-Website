import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { FileText, Calendar, MapPin, ChevronRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Bid {
    id: number
    title: string
    referenceNumber: string
    location: string
    publishDate: string
    deadline: string
    category: string
}

// Placeholder data - replace with actual data from backend
const bids: Bid[] = [
    {
        id: 1,
        title: 'Supply of Office Equipment',
        referenceNumber: 'VDO-BID-2025-001',
        location: 'Kabul, Afghanistan',
        publishDate: 'December 20, 2024',
        deadline: 'January 15, 2025',
        category: 'Procurement',
    },
    {
        id: 2,
        title: 'Construction of Community Center',
        referenceNumber: 'VDO-BID-2025-002',
        location: 'Herat, Afghanistan',
        publishDate: 'December 22, 2024',
        deadline: 'January 20, 2025',
        category: 'Construction',
    },
    {
        id: 3,
        title: 'IT Infrastructure Services',
        referenceNumber: 'VDO-BID-2025-003',
        location: 'Multiple Locations',
        publishDate: 'December 25, 2024',
        deadline: 'January 25, 2025',
        category: 'Services',
    },
]

export default function Bids() {
    return (
        <>
            <Head title="Bids - VDO" />
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
                                Bids & Tenders
                            </h1>
                            <p className="text-xl text-white/90">
                                Explore our current procurement opportunities
                                and tender announcements
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            {/* Introduction */}
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                                    Active Tenders
                                </h2>
                                <p className="mx-auto max-w-2xl text-gray-600">
                                    VDO maintains a transparent and competitive
                                    procurement process. Below are our current
                                    bid opportunities.
                                </p>
                            </div>

                            {/* Bid Listings */}
                            <div className="space-y-6">
                                {bids.length > 0 ? (
                                    bids.map((bid) => (
                                        <div
                                            key={bid.id}
                                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                        >
                                            <div className="mb-4 flex items-start justify-between">
                                                <div>
                                                    <span className="mb-2 inline-block rounded-full bg-[#00B7EC]/10 px-3 py-1 text-xs font-medium text-[#00B7EC]">
                                                        {bid.category}
                                                    </span>
                                                    <h3 className="mt-2 text-xl font-bold text-[#23369C]">
                                                        {bid.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">
                                                        Ref: {bid.referenceNumber}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mb-4 grid gap-3 sm:grid-cols-3">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4 text-[#00B7EC]" />
                                                    {bid.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="h-4 w-4 text-[#00B7EC]" />
                                                    Published: {bid.publishDate}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                                                    <Calendar className="h-4 w-4" />
                                                    Deadline: {bid.deadline}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                <Button className="gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90">
                                                    View Details
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="gap-2 border-[#23369C] text-[#23369C] hover:bg-[#23369C] hover:text-white"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download Documents
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl bg-gray-50 p-12 text-center">
                                        <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                        <h3 className="mb-2 text-xl font-semibold text-gray-600">
                                            No Active Bids
                                        </h3>
                                        <p className="text-gray-500">
                                            Check back later for new tender
                                            announcements
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Procurement Info */}
                            <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h3 className="mb-4 text-2xl font-bold text-[#23369C]">
                                    Procurement Guidelines
                                </h3>
                                <p className="mb-4 text-gray-700">
                                    VDO follows strict procurement policies to
                                    ensure transparency and fairness. For
                                    inquiries regarding our bids and tenders,
                                    please contact:
                                </p>
                                <a
                                    href="mailto:procurement@vdongo.org"
                                    className="text-lg font-semibold text-[#00B7EC] hover:underline"
                                >
                                    procurement@vdongo.org
                                </a>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-0.5 h-4 w-4 text-[#00B7EC]" />
                                        All bids must be submitted before the
                                        deadline
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-0.5 h-4 w-4 text-[#00B7EC]" />
                                        Late submissions will not be considered
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-0.5 h-4 w-4 text-[#00B7EC]" />
                                        VDO reserves the right to reject any or
                                        all bids
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
