import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Users, Heart, Globe, Lightbulb, HandHeart, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ParticipationOption {
    icon: React.ReactNode
    title: string
    description: string
}

const participationOptions: ParticipationOption[] = [
    {
        icon: <Users className="h-8 w-8" />,
        title: 'Community Programs',
        description:
            'Join our community-based programs and contribute to local development initiatives.',
    },
    {
        icon: <Heart className="h-8 w-8" />,
        title: 'Fundraising Events',
        description:
            'Participate in or organize fundraising events to support our humanitarian work.',
    },
    {
        icon: <Globe className="h-8 w-8" />,
        title: 'Awareness Campaigns',
        description:
            'Help spread awareness about important social issues affecting Afghan communities.',
    },
    {
        icon: <Lightbulb className="h-8 w-8" />,
        title: 'Training & Workshops',
        description:
            'Attend or facilitate training sessions and workshops on various topics.',
    },
    {
        icon: <HandHeart className="h-8 w-8" />,
        title: 'Partner Organizations',
        description:
            'Collaborate with VDO as an institutional partner to maximize impact.',
    },
]

export default function Participation() {
    return (
        <>
            <Head title="Participation - VDO" />
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
                                Get Involved
                            </h1>
                            <p className="text-xl text-white/90">
                                Discover ways to participate and make a
                                meaningful impact in Afghan communities
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
                                    Ways to Participate
                                </h2>
                                <p className="mx-auto max-w-2xl text-gray-600">
                                    There are many ways to get involved with VDO
                                    and contribute to positive change. Whether
                                    you're an individual or an organization, your
                                    participation matters.
                                </p>
                            </div>

                            {/* Participation Options */}
                            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {participationOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00B7EC]/10 text-[#00B7EC]">
                                            {option.icon}
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            {option.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {option.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Call to Action */}
                            <div className="mb-12 rounded-2xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-8 text-center text-white">
                                <h3 className="mb-4 text-2xl font-bold">
                                    Ready to Make a Difference?
                                </h3>
                                <p className="mb-6 text-white/90">
                                    Join thousands of people who are already
                                    contributing to our mission. Your
                                    participation, no matter how small, creates
                                    lasting change.
                                </p>
                                <Button
                                    size="lg"
                                    className="gap-2 bg-[#00B7EC] hover:bg-[#00B7EC]/90"
                                >
                                    Register Your Interest
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Benefits Section */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h3 className="mb-6 text-2xl font-bold text-[#23369C]">
                                    Benefits of Participation
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Gain hands-on experience in
                                            humanitarian and development work
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Network with like-minded individuals
                                            and organizations
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Receive certificates and recognition
                                            for your contributions
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                        <p className="text-gray-700">
                                            Make a tangible impact in the lives
                                            of vulnerable communities
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-[#23369C]/20 pt-6">
                                    <p className="text-gray-700">
                                        For more information about participation
                                        opportunities, contact us at:
                                    </p>
                                    <a
                                        href="mailto:participation@vdongo.org"
                                        className="text-lg font-semibold text-[#00B7EC] hover:underline"
                                    >
                                        participation@vdongo.org
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
