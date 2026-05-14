import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { UsersRound } from 'lucide-react'
import {
    Bullets,
    PageSection,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'
import {
    pickBullets,
    pickHeading,
    type SpContent,
} from '@/components/strategic-priorities/dynamic'

const defaultBullets = [
    'Community Leaders & Influencers: Elders and religious figures supporting safe participation and positive social norms.',
    'Local Civil Society Organizations: Women- and youth-led groups benefiting from capacity-building, collaboration, advocacy (e.g., Change Drive Network).',
    'Private Sector & Employers: Access to skilled jobseekers, apprenticeships, internships, inclusive employment.',
    'Government Bodies & Local Authorities: Facilitating policy alignment, approvals, and safe community access.',
]

export default function SecondaryBeneficiaries({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, "VDO's Secondary Beneficiaries:")
    const items = pickBullets(content?.bullets, defaultBullets)

    return (
        <SiteLayout title="VDO's Secondary Beneficiaries">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={UsersRound} title={title} />
                <Bullets items={items} />
            </PageSection>
        </SiteLayout>
    )
}
