export default function Footer() {
    return (
        <footer className="bg-[rgb(62,64,149)] py-12 text-white">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo and Contact Info */}
                    <div>
                        <div className="mb-6">
                            <img
                                src="/images/logo.png"
                                alt="Vision Logo"
                                className="h-24 w-auto object-contain"
                            />
                        </div>

                        <div className="mb-6 space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <svg
                                    className="mt-1 h-5 w-5 flex-shrink-0 text-[rgb(0,175,239)]"
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
                                    className="mt-1 h-5 w-5 flex-shrink-0 text-[rgb(0,175,239)]"
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
                                    className="mt-1 h-5 w-5 flex-shrink-0 text-[rgb(0,175,239)]"
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
                                    Shahr-e-Naw, 5th District, Kabul,
                                    Afghanistan
                                </span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded bg-[rgb(0,175,239)] transition-colors hover:bg-[rgb(0,175,239)]/90"
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
                                className="flex h-9 w-9 items-center justify-center rounded bg-[rgb(0,175,239)] transition-colors hover:bg-[rgb(0,175,239)]/90"
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
                                className="flex h-9 w-9 items-center justify-center rounded bg-[rgb(0,175,239)] transition-colors hover:bg-[rgb(0,175,239)]/90"
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
                        <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-[rgb(0,175,239)]">
                            Main Pages
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/organization-capacity"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Organization Capacity
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/strategic-priorities"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Strategic Priorities
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/where-we-work"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Where We Work
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/our-commitment"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Our Commitment
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-[rgb(0,175,239)]">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/opportunities/jobs"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Jobs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/opportunities/bids"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Bids
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/media/news"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    News
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/media/publications"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Publications
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/our-commitment#safeguarding"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Safeguarding
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/our-commitment#humanitarian-principles"
                                    className="text-sm text-gray-300 transition-colors hover:text-[rgb(0,175,239)]"
                                >
                                    Humanitarian Principles
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Donation */}
                    <div>
                        <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-[rgb(0,175,239)]">
                            Donation
                        </h4>
                        <p className="mb-6 text-sm leading-relaxed text-gray-300">
                            Your donation, no matter the size, has the power to
                            transform lives and communities in Afghanistan.
                        </p>
                        <a
                            href="/donate"
                            className="inline-block rounded bg-[rgb(0,175,239)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[rgb(0,175,239)]/90"
                        >
                            Donate Now
                        </a>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-12 border-t border-gray-700 pt-8 text-center">
                    <p className="text-sm text-[rgb(0,175,239)]">
                        All Right Reserved By VDO © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    )
}
