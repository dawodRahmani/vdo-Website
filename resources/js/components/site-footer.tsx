import { Heart } from 'lucide-react'
import { ComponentType, FormEvent, SVGProps, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'

type IconProps = SVGProps<SVGSVGElement>

function FacebookIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
        </svg>
    )
}

function TwitterIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

function LinkedInIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}

function YouTubeIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    )
}

interface SocialEntry {
    Icon: ComponentType<IconProps>
    label: string
    url: string | null
}

export default function SiteFooter() {
    const settings = usePage<SharedData>().props.siteSettings
    const [email, setEmail] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEmail('')
    }

    const socials: SocialEntry[] = (
        [
            { Icon: FacebookIcon, label: 'Facebook', url: settings.social_facebook_url },
            { Icon: TwitterIcon, label: 'X', url: settings.social_twitter_url },
            { Icon: LinkedInIcon, label: 'LinkedIn', url: settings.social_linkedin_url },
            { Icon: YouTubeIcon, label: 'YouTube', url: settings.social_youtube_url },
        ] satisfies SocialEntry[]
    ).filter((s) => Boolean(s.url))

    return (
        <footer className="pb-6 pt-4">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <div className="rounded-md bg-[rgb(0,175,239)] px-6 py-6 text-white md:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                        {/* Newsletter */}
                        <div className="flex-1">
                            <h3 className="mb-3 text-base font-semibold">
                                {settings.newsletter_heading ??
                                    'Sign up for our newsletter'}
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
                                href={settings.donate_button_url ?? '/donate'}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-white px-10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[rgb(0,175,239)] lg:w-auto lg:min-w-[260px]"
                            >
                                {settings.donate_button_text ?? 'Donate'}
                                <Heart className="h-4 w-4" />
                            </Link>

                            <div className="flex flex-wrap items-center justify-start gap-3 text-sm lg:justify-end">
                                {(settings.contact_phone ||
                                    settings.contact_email) && (
                                    <>
                                        <span className="font-semibold">
                                            Contact:
                                        </span>
                                        {settings.contact_phone && (
                                            <span>{settings.contact_phone}</span>
                                        )}
                                        {settings.contact_phone &&
                                            settings.contact_email && (
                                                <span className="opacity-80">
                                                    -
                                                </span>
                                            )}
                                        {settings.contact_email && (
                                            <a
                                                href={`mailto:${settings.contact_email}`}
                                                className="hover:underline"
                                            >
                                                {settings.contact_email}
                                            </a>
                                        )}
                                    </>
                                )}

                                {socials.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        {socials.map(({ Icon, url, label }) => (
                                            <a
                                                key={label}
                                                href={url as string}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="flex h-8 w-9 items-center justify-center bg-white text-gray-500 transition-colors hover:text-gray-700"
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
