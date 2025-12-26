import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import HeroSlider from '@/components/hero-slider'
import AfghanistanMap from '@/components/afghanistan-map'
import InfoSlider from '@/components/info-slider'
import ImpactStats from '@/components/impact-stats'
import Publications from '@/components/publications'
import { Region } from '@/types'

interface HomeProps {
    canRegister?: boolean
    regions: Region[]
}

export default function Home({ canRegister, regions }: HomeProps) {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Hero Slider Section */}
                <HeroSlider />

                {/* Afghanistan Map Section */}
                <section
                    className="relative bg-white py-16"
                    style={{
                        backgroundImage: 'url(/images/map.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* Overlay for better content visibility */}
                    <div className="absolute inset-0 bg-white/80"></div>

                    <div className="container relative z-10 mx-auto px-4">
                        <h2 className="mb-12 text-center text-4xl font-bold text-[#23369C]">
                            Where We Work
                        </h2>

                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Left side - Afghanistan Map */}
                            <div className="flex flex-col">
                                <AfghanistanMap regions={regions} />
                            </div>

                            {/* Right side - Impact Card */}
                            <div className="flex flex-col justify-center">
                                <div className="rounded-2xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-8 shadow-xl">
                                    {/* Latest Post */}
                                    <div className="mb-8 border-b border-white/20 pb-6">
                                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/80">
                                            Latest Post:
                                        </p>
                                        <h3 className="text-xl font-bold text-white">
                                            VDO's Southern Office inauguration
                                        </h3>
                                    </div>

                                    {/* Impact Stats */}
                                    <div className="mb-8">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                                                <svg
                                                    className="h-6 w-6 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-white">
                                                    +12,000,000
                                                </p>
                                                <p className="text-sm text-white/80">
                                                    People Reached
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key Highlight */}
                                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                        <p className="text-sm leading-relaxed text-white">
                                            Afghan women led resilient brand
                                            identity building sustainable
                                            livelihoods and empowering
                                            communities across all regions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info Slider Section */}
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-center text-4xl font-bold text-[#23369C]">
                            Our Story in Pictures
                        </h2>
                        <InfoSlider />
                    </div>
                </section>

                {/* Impact Stats Section */}
                <ImpactStats />

                {/* Video Section */}
                <section className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-4xl font-bold text-[#23369C]">
                            See Our Work in Action
                        </h2>

                        <div className="mx-auto max-w-5xl">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute inset-0 h-full w-full"
                                    src="https://www.youtube.com/embed/Oa9FFx0_uLA"
                                    title="VDO Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Optional: Video description */}
                            <div className="mt-8 text-center">
                                <p className="text-lg text-gray-600">
                                    Watch how we're making a difference in communities across Afghanistan
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Publications Section */}
                <Publications />

                {/* Footer */}
                <footer className="bg-[#0a1628] py-12 text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                            {/* Logo and Contact Info */}
                            <div>
                                <div className="mb-6">
                                    <img
                                        src="/images/logo.png"
                                        alt="Vision Logo"
                                        className="h-16 w-auto object-contain"
                                    />
                                </div>

                                <div className="mb-6 space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <svg
                                            className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span className="text-gray-300">
                                            +93 728777119
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <svg
                                            className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="text-gray-300">
                                            communications@vdongo.org
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <svg
                                            className="mt-1 h-5 w-5 flex-shrink-0 text-[#00B7EC]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="text-gray-300">
                                            Kabul, Afghanistan
                                        </span>
                                    </div>
                                </div>

                                {/* Social Icons */}
                                <div className="flex gap-3">
                                    <a
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded bg-[#00B7EC] transition-colors hover:bg-[#00B7EC]/90"
                                        aria-label="Twitter/X"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4"
                                            fill="currentColor"
                                        >
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded bg-[#00B7EC] transition-colors hover:bg-[#00B7EC]/90"
                                        aria-label="YouTube"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded bg-[#00B7EC] transition-colors hover:bg-[#00B7EC]/90"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Main Pages */}
                            <div>
                                <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-[#00B7EC]">
                                    Main Pages
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/who-we-are"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Who We Are
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/what-we-do"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            What We Do
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/where-we-work"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Where We Work
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/contact"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-[#00B7EC]">
                                    Quick Links
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="/jobs"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Jobs
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/news"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            News
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/multimedia"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Multimedia
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/publications"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Publications
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/safeguarding"
                                            className="text-sm text-gray-300 transition-colors hover:text-[#00B7EC]"
                                        >
                                            Our safeguarding commitment
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Donation */}
                            <div>
                                <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-[#00B7EC]">
                                    Donation
                                </h4>
                                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                                    Your donation, no matter the size, has the
                                    power to transform lives and communities in
                                    Afghanistan.
                                </p>
                                <a
                                    href="/donate"
                                    className="inline-block rounded bg-[#00B7EC] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00B7EC]/90"
                                >
                                    Donate Now
                                </a>
                            </div>
                        </div>

                        {/* Bottom Copyright */}
                        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
                            <p className="text-sm text-[#00B7EC]">
                                All Right Reserved By VDO ©{' '}
                                {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
