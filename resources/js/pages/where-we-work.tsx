import PhotoStrip from '@/components/photo-strip'
import SiteLayout from '@/layouts/site-layout'
import { Play } from 'lucide-react'
import { Fragment } from 'react'

interface HeroPhoto {
    src?: string
    url?: string
    alt?: string | null
}

interface WorkRegion {
    id: number
    slug: string
    title: string
    subtitle: string | null
    body: string
    map_svg_url: string | null
    video_url: string | null
    map_on_right: boolean
}

interface PageProps {
    heroPhotos?: HeroPhoto[]
    workRegions?: WorkRegion[]
}

const defaultPhotos: HeroPhoto[] = [
    { src: '/Header and Gallary Photos/04.jpg', alt: 'Community engagement' },
    { src: '/Header and Gallary Photos/10.jpg', alt: 'Regional programs' },
    { src: '/Header and Gallary Photos/18.jpg', alt: 'Women-led initiatives' },
]

function photoSrc(p: HeroPhoto): string {
    return p.src ?? p.url ?? ''
}

function paragraphs(body: string): string[] {
    return body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
}

function youtubeEmbedUrl(url: string): string | null {
    const m =
        url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/) ||
        url.match(/^([\w-]{11})$/)
    if (!m) return null
    return `https://www.youtube.com/embed/${m[1]}`
}

function VideoEmbed({ url }: { url: string | null }) {
    const embed = url ? youtubeEmbedUrl(url) : null

    if (embed) {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
                <iframe
                    src={embed}
                    title="Region video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
            </div>
        )
    }

    if (url) {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
                <video
                    src={url}
                    controls
                    className="h-full w-full object-cover"
                />
            </div>
        )
    }

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-300/80 shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-red-600 text-white shadow-md">
                    <Play className="h-6 w-6 fill-current" />
                </span>
            </div>
        </div>
    )
}

export default function WhereWeWork({
    heroPhotos,
    workRegions,
}: PageProps) {
    const photos =
        heroPhotos && heroPhotos.length > 0
            ? heroPhotos.map((p) => ({ src: photoSrc(p), alt: p.alt ?? '' }))
            : defaultPhotos.map((p) => ({
                  src: photoSrc(p),
                  alt: p.alt ?? '',
              }))

    const regions = workRegions ?? []

    return (
        <SiteLayout title="Where We Work">
            <PhotoStrip photos={photos} />

            <section className="bg-gray-100 pb-14">
                <div className="mx-auto max-w-[1240px] space-y-8 px-6 py-8 md:px-10 lg:px-14">
                    {regions.map((region, index) => {
                        const altText = `Afghanistan — ${region.title.replace(
                            ':',
                            '',
                        )} highlighted`
                        return (
                            <Fragment key={region.id}>
                                {index > 0 && (
                                    <div
                                        aria-hidden
                                        className="border-t-2 border-dotted border-[rgb(0,175,239)]"
                                    />
                                )}
                                <article
                                    id={region.slug}
                                    className="relative scroll-mt-24 overflow-hidden rounded-xl px-4 py-6 md:px-6 md:py-8"
                                    style={{
                                        backgroundImage: 'url(/svg/Map.svg)',
                                        backgroundSize: '100% auto',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <h2 className="text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                                        {region.title}
                                    </h2>
                                    {region.subtitle && (
                                        <h3 className="mt-1 text-sm font-bold text-gray-900 md:text-base">
                                            {region.subtitle}
                                        </h3>
                                    )}
                                    <div className="mt-4 space-y-4">
                                        {paragraphs(region.body).map((p, i) => (
                                            <p
                                                key={i}
                                                className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]"
                                            >
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mt-6 grid items-center gap-4 md:grid-cols-2">
                                        {region.map_on_right ? (
                                            <>
                                                <VideoEmbed
                                                    url={region.video_url}
                                                />
                                                {region.map_svg_url && (
                                                    <img
                                                        src={region.map_svg_url}
                                                        alt={altText}
                                                        className="h-auto w-full"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {region.map_svg_url && (
                                                    <img
                                                        src={region.map_svg_url}
                                                        alt={altText}
                                                        className="h-auto w-full"
                                                        loading="lazy"
                                                    />
                                                )}
                                                <VideoEmbed
                                                    url={region.video_url}
                                                />
                                            </>
                                        )}
                                    </div>
                                </article>
                            </Fragment>
                        )
                    })}
                </div>
            </section>
        </SiteLayout>
    )
}
