import { usePage } from '@inertiajs/react'

interface PhotoStripPhoto {
    src: string
    alt: string
}

interface PhotoStripProps {
    photos: PhotoStripPhoto[]
}

export default function PhotoStrip({ photos: fallback }: PhotoStripProps) {
    const { heroPhotos, heroBackground } = usePage().props as {
        heroPhotos?: PhotoStripPhoto[]
        heroBackground?: string | null
    }
    const photos =
        heroPhotos && heroPhotos.length === 3 && heroPhotos.every((p) => p.src)
            ? heroPhotos
            : fallback

    return (
        <section
            className="pb-10 pt-6"
            style={heroBackground ? { backgroundColor: heroBackground } : undefined}
        >
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                    {photos.map((photo, i) => (
                        <div
                            key={`${photo.src}-${i}`}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[5/3]"
                        >
                            <img
                                src={encodeURI(photo.src)}
                                alt={photo.alt}
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
