import { Head, Link } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Heart, Phone, Mail, MapPin, Building2, CreditCard, Users } from 'lucide-react'

export default function DonatePage() {
    return (
        <>
            <Head title="Donate - Support VDO" />
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#23369C] to-[#1a2870] py-20 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[url('/images/pattern.png')] bg-repeat" />
                </div>
                <div className="container relative mx-auto px-4 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#00B7EC]">
                        <Heart className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        Make a Difference Today
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-200">
                        Your donation, no matter the size, has the power to transform lives
                        and communities in Afghanistan. Together, we can build a brighter future.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Left Column - Why Donate */}
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                Why Your Support Matters
                            </h2>
                            <p className="mb-6 text-[#BDBFC1]">
                                Vision Development Organization (VDO) has been dedicated to serving
                                the people of Afghanistan since 2002. Your generous contribution
                                directly supports our programs in:
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#00B7EC]">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#23369C]">Education</h3>
                                        <p className="text-sm text-[#BDBFC1]">
                                            Supporting schools, teachers, and educational resources for children across Afghanistan.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#00B7EC]">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#23369C]">Health & Nutrition</h3>
                                        <p className="text-sm text-[#BDBFC1]">
                                            Providing healthcare services and nutrition programs to vulnerable communities.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#00B7EC]">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#23369C]">Economic Growth</h3>
                                        <p className="text-sm text-[#BDBFC1]">
                                            Empowering communities through livelihood programs and economic opportunities.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#00B7EC]">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#23369C]">Emergency Response</h3>
                                        <p className="text-sm text-[#BDBFC1]">
                                            Providing rapid humanitarian assistance during crises and natural disasters.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - How to Donate */}
                        <div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                                <h2 className="mb-6 text-2xl font-bold text-[#23369C]">
                                    How to Donate
                                </h2>

                                {/* Bank Transfer */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#23369C]">
                                            <Building2 className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#23369C]">Bank Transfer</h3>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="mb-3 text-sm text-[#BDBFC1]">
                                            For bank transfer details and donation arrangements, please contact our finance department directly.
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <p className="flex items-center gap-2 text-[#BDBFC1]">
                                                <Mail className="h-4 w-4 text-[#00B7EC]" />
                                                <a href="mailto:communications@vdongo.org" className="text-[#23369C] hover:underline">
                                                    communications@vdongo.org
                                                </a>
                                            </p>
                                            <p className="flex items-center gap-2 text-[#BDBFC1]">
                                                <Phone className="h-4 w-4 text-[#00B7EC]" />
                                                <a href="tel:+93728777119" className="text-[#23369C] hover:underline">
                                                    +93 728777119
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* In-Kind Donations */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#23369C]">
                                            <Users className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#23369C]">In-Kind Donations</h3>
                                    </div>
                                    <p className="text-sm text-[#BDBFC1]">
                                        We also accept in-kind donations such as educational materials, medical supplies,
                                        and other resources. Contact us to discuss how your contribution can help.
                                    </p>
                                </div>

                                {/* Contact Info */}
                                <div className="border-t pt-6">
                                    <h3 className="mb-4 text-lg font-semibold text-[#23369C]">
                                        Contact Us
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                            <div>
                                                <p className="text-sm font-medium text-[#23369C]">Phone</p>
                                                <a href="tel:+93728777119" className="text-sm text-[#BDBFC1] hover:text-[#23369C]">
                                                    +93 728777119
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                            <div>
                                                <p className="text-sm font-medium text-[#23369C]">Email</p>
                                                <a href="mailto:communications@vdongo.org" className="text-sm text-[#BDBFC1] hover:text-[#23369C]">
                                                    communications@vdongo.org
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00B7EC]" />
                                            <div>
                                                <p className="text-sm font-medium text-[#23369C]">Address</p>
                                                <p className="text-sm text-[#BDBFC1]">
                                                    Shahr-e-Naw, 5th District,<br />
                                                    Kabul, Afghanistan
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-[#23369C]">
                        Your Impact
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-[#BDBFC1]">
                        Every contribution helps us reach more communities and create lasting change.
                    </p>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-xl bg-white p-8 shadow-md">
                            <div className="mb-4 text-4xl font-bold text-[#00B7EC]">20+</div>
                            <div className="text-[#BDBFC1]">Years of Service</div>
                        </div>
                        <div className="rounded-xl bg-white p-8 shadow-md">
                            <div className="mb-4 text-4xl font-bold text-[#00B7EC]">6</div>
                            <div className="text-[#BDBFC1]">Regions Served</div>
                        </div>
                        <div className="rounded-xl bg-white p-8 shadow-md">
                            <div className="mb-4 text-4xl font-bold text-[#00B7EC]">1000s</div>
                            <div className="text-[#BDBFC1]">Lives Impacted</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#23369C] py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold">
                        Ready to Make a Difference?
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-gray-200">
                        Contact us today to learn more about how your donation can help
                        transform lives in Afghanistan.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:communications@vdongo.org"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#00B7EC] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#00B7EC]/90"
                        >
                            <Mail className="h-5 w-5" />
                            Email Us
                        </a>
                        <a
                            href="tel:+93728777119"
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#23369C]"
                        >
                            <Phone className="h-5 w-5" />
                            Call Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
