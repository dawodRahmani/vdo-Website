import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Heart, Clock, MapPin, Users, GraduationCap, Stethoscope, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VolunteerRole {
    icon: React.ReactNode
    title: string
    commitment: string
    description: string
}

const volunteerRoles: VolunteerRole[] = [
    {
        icon: <GraduationCap className="h-8 w-8" />,
        title: 'Education Support',
        commitment: '10-15 hours/week',
        description:
            'Help with teaching, tutoring, and educational program development.',
    },
    {
        icon: <Stethoscope className="h-8 w-8" />,
        title: 'Health Outreach',
        commitment: '8-12 hours/week',
        description:
            'Support health awareness campaigns and community health initiatives.',
    },
    {
        icon: <Users className="h-8 w-8" />,
        title: 'Community Development',
        commitment: '10-20 hours/week',
        description:
            'Assist in community mobilization and development projects.',
    },
    {
        icon: <Heart className="h-8 w-8" />,
        title: 'Emergency Response',
        commitment: 'Flexible',
        description:
            'Support emergency relief operations during humanitarian crises.',
    },
]

export default function Volunteers() {
    return (
        <>
            <Head title="Volunteers - VDO" />
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
                                Volunteer With Us
                            </h1>
                            <p className="text-xl text-white/90">
                                Dedicate your time and skills to support
                                humanitarian work in Afghanistan
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
                                    Volunteer Opportunities
                                </h2>
                                <p className="mx-auto max-w-2xl text-gray-600">
                                    Our volunteers are the backbone of our
                                    organization. Join our team of dedicated
                                    individuals making a difference in
                                    communities across Afghanistan.
                                </p>
                            </div>

                            {/* Stats Section */}
                            <div className="mb-12 grid gap-6 sm:grid-cols-3">
                                <div className="rounded-xl bg-[#23369C] p-6 text-center text-white">
                                    <p className="text-4xl font-bold">500+</p>
                                    <p className="text-white/80">
                                        Active Volunteers
                                    </p>
                                </div>
                                <div className="rounded-xl bg-[#00B7EC] p-6 text-center text-white">
                                    <p className="text-4xl font-bold">25+</p>
                                    <p className="text-white/80">
                                        Provinces Covered
                                    </p>
                                </div>
                                <div className="rounded-xl bg-[#23369C] p-6 text-center text-white">
                                    <p className="text-4xl font-bold">50K+</p>
                                    <p className="text-white/80">
                                        Hours Contributed
                                    </p>
                                </div>
                            </div>

                            {/* Volunteer Roles */}
                            <div className="mb-12">
                                <h3 className="mb-6 text-2xl font-bold text-[#23369C]">
                                    Available Roles
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {volunteerRoles.map((role, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                        >
                                            <div className="mb-4 flex items-start gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10 text-[#00B7EC]">
                                                    {role.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-bold text-[#23369C]">
                                                        {role.title}
                                                    </h4>
                                                    <p className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Clock className="h-4 w-4" />
                                                        {role.commitment}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-gray-600">
                                                {role.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Section */}
                            <div className="mb-12 rounded-2xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-8 text-white">
                                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                                    <div>
                                        <h3 className="mb-4 text-2xl font-bold">
                                            Become a Volunteer
                                        </h3>
                                        <p className="mb-4 text-white/90">
                                            We welcome individuals from all
                                            backgrounds who are passionate about
                                            making a difference. No prior
                                            experience is required – just a
                                            willingness to help.
                                        </p>
                                        <ul className="space-y-2 text-sm text-white/80">
                                            <li className="flex items-center gap-2">
                                                <ChevronRight className="h-4 w-4 text-[#00B7EC]" />
                                                Flexible time commitments
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ChevronRight className="h-4 w-4 text-[#00B7EC]" />
                                                Training and support provided
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ChevronRight className="h-4 w-4 text-[#00B7EC]" />
                                                Certificate upon completion
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="text-center">
                                        <Button
                                            size="lg"
                                            className="gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90"
                                        >
                                            Apply to Volunteer
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h3 className="mb-6 text-2xl font-bold text-[#23369C]">
                                    Requirements
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Minimum age of 18 years
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Commitment to humanitarian principles
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Good communication skills
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Willingness to travel (for some roles)
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-[#23369C]/20 pt-6">
                                    <p className="text-gray-700">
                                        For volunteer inquiries, contact us at:
                                    </p>
                                    <a
                                        href="mailto:volunteers@vdongo.org"
                                        className="text-lg font-semibold text-[#00B7EC] hover:underline"
                                    >
                                        volunteers@vdongo.org
                                    </a>
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
