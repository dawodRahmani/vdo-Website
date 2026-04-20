import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'

const photos = [
    { src: '/Header and Gallary Photos/06.jpg', alt: 'Education programs' },
    { src: '/Header and Gallary Photos/12.jpg', alt: 'Community development' },
    { src: '/Header and Gallary Photos/20.jpg', alt: 'Humanitarian response' },
]

export default function ContributionProject() {
    return (
        <SiteLayout title="VDO's Contribution Project">
            <PhotoStrip photos={photos} />
        </SiteLayout>
    )
}
