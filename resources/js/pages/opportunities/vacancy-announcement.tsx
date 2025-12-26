import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Megaphone, Calendar, MapPin, Clock, Users, ChevronRight, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Vacancy {
    id: number
    title: string
    location: string
    department: string
    type: string
    positions: number
    openDate: string
    closeDate: string
    description: string
}

// Placeholder data - replace with actual data from backend
const vacancies: Vacancy[] = [
    {
        id: 1,
        title: 'Senior Program Coordinator',
        location: 'Kabul, Afghanistan',
        department: 'Programs',
        type: 'Full-time',
        positions: 2,
        openDate: 'December 20, 2024',
        closeDate: 'January 20, 2025',
        description:
            'We are seeking experienced professionals to coordinate our program activities across multiple provinces.',
    },
    {
        id: 2,
        title: 'Field Engineer',
        location: 'Multiple Locations',
        department: 'Infrastructure',
        type: 'Contract',
        positions: 5,
        openDate: 'December 22, 2024',
        closeDate: 'January 15, 2025',
        description:
            'Responsible for overseeing construction projects and ensuring quality standards in our infrastructure programs.',
    },
    {
        id: 3,
        title: 'Communications Officer',
        location: 'Kabul, Afghanistan',
        department: 'Communications',
        type: 'Full-time',
        positions: 1,
        openDate: 'December 25, 2024',
        closeDate: 'January 25, 2025',
        description:
            'Join our communications team to help share stories of impact and manage our media presence.',
    },
]

export default function VacancyAnnouncement() {
    return (
        <>
            <Head title="Vacancy Announcement - VDO" />
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
                                Vacancy Announcements
                            </h1>
                            <p className="text-xl text-white/90">
                                Find detailed information about our current job
                                openings and application procedures
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
                                    Open Positions
                                </h2>
                                <p className="mx-auto max-w-2xl text-gray-600">
                                    Browse our current vacancy announcements and
                                    find the perfect opportunity to contribute to
                                    our mission.
                                </p>
                            </div>

                            {/* Vacancy Listings */}
                            <div className="space-y-8">
                                {vacancies.length > 0 ? (
                                    vacancies.map((vacancy) => (
                                        <div
                                            key={vacancy.id}
                                            className="rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg"
                                        >
                                            {/* Header */}
                                            <div className="border-b border-gray-100 bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-6">
                                                <div className="flex flex-wrap items-start justify-between gap-4">
                                                    <div>
                                                        <div className="mb-2 flex flex-wrap gap-2">
                                                            <span className="rounded-full bg-[#23369C] px-3 py-1 text-xs font-medium text-white">
                                                                {vacancy.department}
                                                            </span>
                                                            <span className="rounded-full bg-[#00B7EC] px-3 py-1 text-xs font-medium text-white">
                                                                {vacancy.type}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-[#23369C]">
                                                            {vacancy.title}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                                                        <Users className="h-5 w-5 text-[#00B7EC]" />
                                                        <span className="font-semibold text-gray-700">
                                                            {vacancy.positions}{' '}
                                                            Position
                                                            {vacancy.positions > 1
                                                                ? 's'
                                                                : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-6">
                                                <p className="mb-4 text-gray-600">
                                                    {vacancy.description}
                                                </p>

                                                <div className="mb-6 grid gap-3 sm:grid-cols-3">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="h-4 w-4 text-[#00B7EC]" />
                                                        {vacancy.location}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4 text-[#00B7EC]" />
                                                        Opens: {vacancy.openDate}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                                                        <Clock className="h-4 w-4" />
                                                        Closes: {vacancy.closeDate}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <Button className="gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90">
                                                        <ExternalLink className="h-4 w-4" />
                                                        View Full Details
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="gap-2 border-[#23369C] text-[#23369C] hover:bg-[#23369C] hover:text-white"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        Download TOR
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl bg-gray-50 p-12 text-center">
                                        <Megaphone className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                        <h3 className="mb-2 text-xl font-semibold text-gray-600">
                                            No Current Announcements
                                        </h3>
                                        <p className="text-gray-500">
                                            Check back later for new vacancy
                                            announcements
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Application Process */}
                            <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h3 className="mb-6 text-2xl font-bold text-[#23369C]">
                                    Application Process
                                </h3>
                                <div className="grid gap-6 md:grid-cols-4">
                                    <div className="text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#23369C] text-xl font-bold text-white">
                                            1
                                        </div>
                                        <h4 className="mb-1 font-semibold text-[#23369C]">
                                            Review
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Read the vacancy details and TOR
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#23369C] text-xl font-bold text-white">
                                            2
                                        </div>
                                        <h4 className="mb-1 font-semibold text-[#23369C]">
                                            Prepare
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Prepare your CV and cover letter
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#23369C] text-xl font-bold text-white">
                                            3
                                        </div>
                                        <h4 className="mb-1 font-semibold text-[#23369C]">
                                            Submit
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Send application before deadline
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00B7EC] text-xl font-bold text-white">
                                            4
                                        </div>
                                        <h4 className="mb-1 font-semibold text-[#23369C]">
                                            Wait
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Shortlisted candidates contacted
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-lg bg-white p-6">
                                    <h4 className="mb-3 font-semibold text-[#23369C]">
                                        Submit Your Application
                                    </h4>
                                    <p className="mb-2 text-gray-600">
                                        Send your application documents to:
                                    </p>
                                    <a
                                        href="mailto:recruitment@vdongo.org"
                                        className="text-lg font-semibold text-[#00B7EC] hover:underline"
                                    >
                                        recruitment@vdongo.org
                                    </a>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="mt-0.5 h-4 w-4 text-[#00B7EC]" />
                                            Include the position title in subject
                                            line
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="mt-0.5 h-4 w-4 text-[#00B7EC]" />
                                            Attach CV and cover letter (PDF format
                                            preferred)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="mt-0.5 h-4 w-4 text-[#00B7EC]" />
                                            Only shortlisted candidates will be
                                            contacted
                                        </li>
                                    </ul>
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
