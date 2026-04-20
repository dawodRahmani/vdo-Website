import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'

const photos = [
    { src: '/Header and Gallary Photos/06.jpg', alt: 'Education programs' },
    { src: '/Header and Gallary Photos/12.jpg', alt: 'Community development' },
    { src: '/Header and Gallary Photos/20.jpg', alt: 'Humanitarian response' },
]

export default function Education() {
    return (
        <SiteLayout title="Education">
            <PhotoStrip photos={photos} />

            <section className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <img
                        src="/education.png"
                        alt="Education overview: target groups, coverage areas in Afghanistan, and beneficiary percentages"
                        className="mx-auto w-full max-w-6xl"
                    />
                </div>
            </section>
        </SiteLayout>
    )
}
