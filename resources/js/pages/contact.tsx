import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const contactInfo = [
    {
        icon: Phone,
        title: 'Phone',
        details: ['+93 728777119'],
    },
    {
        icon: Mail,
        title: 'Email',
        details: ['communications@vdongo.org', 'info@vdongo.org'],
    },
    {
        icon: MapPin,
        title: 'Address',
        details: ['Shahr-e-Naw, 5th District', 'Kabul, Afghanistan'],
    },
    {
        icon: Clock,
        title: 'Working Hours',
        details: ['Saturday - Thursday', '8:00 AM - 4:00 PM'],
    },
]

export default function Contact() {
    return (
        <>
            <Head title="Contact Us" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#23369C] to-[#1a2875] py-20">
                    <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
                    <div className="container relative z-10 mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                                Contact Us
                            </h1>
                            <p className="text-lg text-white/90">
                                Get in touch with Vision Development Organization.
                                We're here to answer your questions and hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            <div className="grid gap-12 lg:grid-cols-2">
                                {/* Contact Information */}
                                <div>
                                    <h2 className="mb-6 text-2xl font-bold text-[#23369C]">
                                        Get In Touch
                                    </h2>
                                    <p className="mb-8 text-gray-600">
                                        Have questions about our programs, want to
                                        partner with us, or need more information?
                                        Reach out to us through any of the following
                                        channels.
                                    </p>

                                    <div className="space-y-6">
                                        {contactInfo.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4"
                                            >
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#23369C]">
                                                    <item.icon className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-[#23369C]">
                                                        {item.title}
                                                    </h3>
                                                    {item.details.map(
                                                        (detail, idx) => (
                                                            <p
                                                                key={idx}
                                                                className="text-gray-600"
                                                            >
                                                                {detail}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="rounded-xl bg-white p-8 shadow-lg">
                                    <h2 className="mb-6 text-2xl font-bold text-[#23369C]">
                                        Send Us a Message
                                    </h2>
                                    <form className="space-y-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23369C] focus:outline-none focus:ring-1 focus:ring-[#23369C]"
                                                    placeholder="Your first name"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23369C] focus:outline-none focus:ring-1 focus:ring-[#23369C]"
                                                    placeholder="Your last name"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23369C] focus:outline-none focus:ring-1 focus:ring-[#23369C]"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23369C] focus:outline-none focus:ring-1 focus:ring-[#23369C]"
                                                placeholder="How can we help?"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Message
                                            </label>
                                            <textarea
                                                rows={5}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23369C] focus:outline-none focus:ring-1 focus:ring-[#23369C]"
                                                placeholder="Your message..."
                                            ></textarea>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full gap-2 bg-[#23369C] py-6 text-lg hover:bg-[#23369C]/90"
                                        >
                                            <Send className="h-5 w-5" />
                                            Send Message
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="bg-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.8628561989577!2d69.17095!3d34.5283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDMxJzQxLjkiTiA2OcKwMTAnMTUuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="VDO Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
