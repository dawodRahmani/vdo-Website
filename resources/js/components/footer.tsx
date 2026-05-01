export default function Footer() {
    return (
        <footer className="bg-[rgb(62,64,149)] py-12 text-white">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo and Contact Info */}
                    <div>
                        <div className="mb-6">
                            <img
                                src="/svg/logo.png"
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
                        <div className="inline-flex gap-1">
                            <a
                                href="#"
                                className="block h-9 w-10 overflow-hidden bg-white transition-opacity hover:opacity-90"
                                aria-label="Facebook"
                            >
                                <img
                                    src="/svg/Home%20Page/23.svg"
                                    alt="Facebook"
                                    className="h-full w-full"
                                />
                            </a>
                            <a
                                href="#"
                                className="block h-9 w-10 overflow-hidden bg-white transition-opacity hover:opacity-90"
                                aria-label="Twitter/X"
                            >
                                <img
                                    src="/svg/Home%20Page/22.svg"
                                    alt="X"
                                    className="h-full w-full"
                                />
                            </a>
                            <a
                                href="#"
                                className="block h-9 w-10 overflow-hidden bg-white transition-opacity hover:opacity-90"
                                aria-label="LinkedIn"
                            >
                                <img
                                    src="/svg/Home%20Page/21.svg"
                                    alt="LinkedIn"
                                    className="h-full w-full"
                                />
                            </a>
                            <a
                                href="#"
                                className="block h-9 w-10 overflow-hidden bg-white transition-opacity hover:opacity-90"
                                aria-label="YouTube"
                            >
                                <img
                                    src="/svg/Home%20Page/20.svg"
                                    alt="YouTube"
                                    className="h-full w-full"
                                />
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
