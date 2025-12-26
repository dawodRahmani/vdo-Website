import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Job {
    id: number
    title: string
    location: string
    type: string
    department: string
    deadline: string
}

// Placeholder data - replace with actual data from backend
const jobs: Job[] = [
    {
        id: 1,
        title: 'Project Manager',
        location: 'Kabul, Afghanistan',
        type: 'Full-time',
        department: 'Operations',
        deadline: 'January 15, 2025',
    },
    {
        id: 2,
        title: 'Finance Officer',
        location: 'Herat, Afghanistan',
        type: 'Full-time',
        department: 'Finance',
        deadline: 'January 20, 2025',
    },
    {
        id: 3,
        title: 'M&E Specialist',
        location: 'Mazar-i-Sharif, Afghanistan',
        type: 'Contract',
        department: 'Programs',
        deadline: 'January 25, 2025',
    },
]

export default function Jobs() {
    return (
        <>
            <Head title="Jobs - VDO" />
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
                                Career Opportunities
                            </h1>
                            <p className="text-xl text-white/90">
                                Join our team and make a difference in the lives
                                of communities across Afghanistan
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
                                    Current Openings
                                </h2>
                                <p className="mx-auto max-w-2xl text-gray-600">
                                    We are always looking for talented and
                                    passionate individuals to join our team.
                                    Explore our current job openings below.
                                </p>
                            </div>

                            {/* Job Listings */}
                            <div className="space-y-6">
                                {jobs.length > 0 ? (
                                    jobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                        >
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div className="flex-1">
                                                    <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                                        {job.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4 text-[#00B7EC]" />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Briefcase className="h-4 w-4 text-[#00B7EC]" />
                                                            {job.type}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4 text-[#00B7EC]" />
                                                            Deadline: {job.deadline}
                                                        </span>
                                                    </div>
                                                    <span className="mt-2 inline-block rounded-full bg-[#23369C]/10 px-3 py-1 text-xs font-medium text-[#23369C]">
                                                        {job.department}
                                                    </span>
                                                </div>
                                                <Button className="gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90">
                                                    View Details
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl bg-gray-50 p-12 text-center">
                                        <Briefcase className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                        <h3 className="mb-2 text-xl font-semibold text-gray-600">
                                            No Current Openings
                                        </h3>
                                        <p className="text-gray-500">
                                            Check back later for new opportunities
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Application Info */}
                            <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h3 className="mb-4 text-2xl font-bold text-[#23369C]">
                                    How to Apply
                                </h3>
                                <p className="mb-4 text-gray-700">
                                    To apply for any position, please send your
                                    CV and cover letter to:
                                </p>
                                <a
                                    href="mailto:hr@vdongo.org"
                                    className="text-lg font-semibold text-[#00B7EC] hover:underline"
                                >
                                    hr@vdongo.org
                                </a>
                                <p className="mt-4 text-sm text-gray-600">
                                    Please mention the job title in the subject
                                    line of your email. Only shortlisted
                                    candidates will be contacted.
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
