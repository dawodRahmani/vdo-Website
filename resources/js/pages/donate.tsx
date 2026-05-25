import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    BookOpen,
    Building2,
    Droplets,
    HandHeart,
    HeartPulse,
    Landmark,
    Mail,
    MapPin,
    Phone,
    Sprout,
    Users,
    Utensils,
    Globe,
    Heart,
    Stethoscope,
    GraduationCap,
    Briefcase,
    Home as HomeIcon,
    LifeBuoy,
    Wallet,
    CreditCard,
    Smartphone,
    Send,
    type LucideIcon,
} from 'lucide-react'

const photos = [
    { src: '/Header and Gallary Photos/08.jpg', alt: 'Community support' },
    { src: '/Header and Gallary Photos/15.jpg', alt: 'Aid distribution' },
    { src: '/Header and Gallary Photos/21.jpg', alt: 'Education programs' },
]

const ICON_MAP: Record<string, LucideIcon> = {
    BookOpen,
    Building2,
    Droplets,
    HandHeart,
    HeartPulse,
    Landmark,
    Mail,
    MapPin,
    Phone,
    Sprout,
    Users,
    Utensils,
    Globe,
    Heart,
    Stethoscope,
    GraduationCap,
    Briefcase,
    Home: HomeIcon,
    LifeBuoy,
    Wallet,
    CreditCard,
    Smartphone,
    Send,
}

function resolveIcon(name: string | null | undefined): LucideIcon {
    if (name && ICON_MAP[name]) return ICON_MAP[name]
    return HandHeart
}

interface DonationItem {
    id: number
    kind: 'intro' | 'cause' | 'method'
    icon_name: string
    title: string
    body: string
    order: number
    is_active: boolean
}

interface DonateProps {
    items?: DonationItem[]
}

export default function Donate({ items = [] }: DonateProps) {
    const intro = items.find((i) => i.kind === 'intro')
    const causes = items.filter((i) => i.kind === 'cause')
    const methods = items.filter((i) => i.kind === 'method')

    const introTitle = intro?.title ?? 'Support Our Mission'
    const introBody =
        intro?.body ??
        'Your generosity helps VDO deliver lifesaving aid, education, and long-term development to communities across Afghanistan.'

    return (
        <SiteLayout title="Donate">
            <PhotoStrip photos={photos} />

            {/* Intro */}
            <section className="bg-[rgb(245,245,245)] pt-10 pb-6">
                <div className="mx-auto max-w-[1240px] px-6 text-center md:px-10 lg:px-14">
                    <div className="mb-3 flex items-center justify-center gap-3">
                        <HandHeart className="h-8 w-8 text-[rgb(0,175,239)]" />
                        <h1 className="text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                            {introTitle}
                        </h1>
                    </div>
                    <p className="mx-auto max-w-3xl whitespace-pre-line text-sm leading-relaxed text-gray-700 md:text-[15px]">
                        {introBody}
                    </p>
                </div>
            </section>

            {/* Donation Categories */}
            {causes.length > 0 && (
                <section className="bg-[rgb(245,245,245)] py-8">
                    <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                            Where Your Donation Goes:
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {causes.map((item) => {
                                const Icon = resolveIcon(item.icon_name)
                                return (
                                    <article
                                        key={item.id}
                                        className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(0,175,239)]/40 hover:shadow-md"
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)] transition-colors group-hover:bg-[rgb(0,175,239)] group-hover:text-white">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-base font-semibold text-[rgb(62,64,149)] md:text-lg">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-700">
                                            {item.body}
                                        </p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* How to Donate */}
            {methods.length > 0 && (
                <section
                    className="relative bg-[rgb(245,245,245)] py-10"
                    style={{
                        backgroundImage: 'url(/svg/Map.svg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="absolute inset-0 bg-[rgb(245,245,245)]/80" />
                    <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                        <h2 className="mb-6 text-xl font-semibold text-[rgb(62,64,149)] md:text-2xl">
                            Ways to Donate:
                        </h2>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {methods.map((item) => {
                                const Icon = resolveIcon(item.icon_name)
                                const lines = item.body.split('\n')
                                return (
                                    <div
                                        key={item.id}
                                        className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <Icon className="h-5 w-5 text-[rgb(0,175,239)]" />
                                            <h3 className="text-sm font-semibold text-[rgb(62,64,149)] md:text-base">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="space-y-1 text-xs leading-relaxed text-gray-700 md:text-[13px]">
                                            {lines.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-[rgb(0,175,239)]/30 bg-white/90 p-6 text-center md:flex-row md:justify-between md:text-left">
                            <div className="flex items-center gap-3">
                                <Users className="h-7 w-7 flex-none text-[rgb(0,175,239)]" />
                                <p className="text-sm text-gray-700 md:text-[15px]">
                                    Every contribution — large or small —
                                    directly strengthens communities across
                                    Afghanistan.
                                </p>
                            </div>
                            <a
                                href="mailto:info@vdo.org.af"
                                className="inline-flex items-center gap-2 rounded-md bg-[rgb(0,175,239)] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[rgb(62,64,149)]"
                            >
                                <Building2 className="h-4 w-4" />
                                Contact Us to Donate
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    )
}
