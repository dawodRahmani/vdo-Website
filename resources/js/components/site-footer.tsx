import { Facebook, Heart, Linkedin, Undo2, Youtube } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'

function TwitterIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const socials = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: TwitterIcon, href: '#', label: 'X' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function SiteFooter() {
    const [email, setEmail] = useState('')
    const { url } = usePage()
    const isHome = url === '/'

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEmail('')
    }

    return (
        <footer className="pb-6 pt-4">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <div className="rounded-md bg-[rgb(0,175,239)] px-6 py-6 text-white md:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                        {/* Back to Home Page */}
                        {!isHome && (
                            <Link
                                href="/"
                                className="flex flex-col items-center self-start text-center text-white transition-opacity hover:opacity-80 lg:self-center"
                            >
                                <Undo2 className="h-7 w-7" strokeWidth={2} />
                                <span className="mt-1.5 text-[11px] font-medium leading-snug">
                                    Back to Home Page
                                </span>
                            </Link>
                        )}

                        {/* Newsletter */}
                        <div className="flex-1">
                            <h3 className="mb-3 text-base font-semibold">
                                Sign up for our newsletter
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full rounded-md bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </form>
                        </div>

                        {/* Donate + Contact + Socials */}
                        <div className="flex flex-col items-stretch gap-3 lg:items-end">
                            <Link
                                href="/donate"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-white px-10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[rgb(0,175,239)] lg:w-auto lg:min-w-[260px]"
                            >
                                Donate
                                <Heart className="h-4 w-4" />
                            </Link>

                            <div className="flex flex-wrap items-center justify-start gap-3 text-sm lg:justify-end">
                                <span className="font-semibold">Contact:</span>
                                <span>+93 728 777 117</span>
                                <span className="opacity-80">-</span>
                                <a
                                    href="mailto:communications@vdongo.org"
                                    className="hover:underline"
                                >
                                    communications@vdongo.org
                                </a>

                                <div className="flex items-center gap-1.5">
                                    {socials.map((social) => {
                                        const Icon = social.icon
                                        return (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                aria-label={social.label}
                                                className="flex h-8 w-8 items-center justify-center rounded bg-white/95 text-[rgb(0,175,239)] transition-colors hover:bg-white"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
