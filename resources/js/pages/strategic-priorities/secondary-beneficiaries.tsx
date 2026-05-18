import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { UsersRound } from 'lucide-react'
import {
    Bullets,
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'
import {
    paragraphs,
    pickBullets,
    pickHeading,
    renderRich,
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
    const body = paragraphs(content?.body ?? '')
    const between = paragraphs(content?.between_body ?? '')
    const bullets = pickBullets(content?.bullets, defaultBullets)
    const achievementsHeading = content?.achievements_heading?.trim() ?? ''
    const infographic = content?.infographic_url ?? ''
    const infographicAlt = content?.infographic_alt ?? ''
    const beneficiary = content?.beneficiary_url ?? ''
    const beneficiaryAlt = content?.beneficiary_alt ?? ''

    return (
        <SiteLayout title="VDO's Secondary Beneficiaries">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={UsersRound} title={title} />

                {body.map((p, i) => (
                    <Paragraph key={i}>{p}</Paragraph>
                ))}

                {infographic && (
                    <div className="mt-6 flex justify-center">
                        <img
                            src={infographic}
                            alt={infographicAlt}
                            className="h-auto w-full max-w-3xl"
                        />
                    </div>
                )}

                {between.length > 0 && (
                    <div className="mt-4 space-y-3">
                        {between.map((p, i) => (
                            <Paragraph key={i}>{renderRich(p)}</Paragraph>
                        ))}
                    </div>
                )}

                {bullets.length > 0 && (
                    <div className="mt-6">
                        {achievementsHeading && (
                            <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                                {achievementsHeading}
                            </h3>
                        )}
                        <Bullets items={bullets} />
                    </div>
                )}

                {beneficiary && (
                    <div className="mt-6 flex justify-center">
                        <img
                            src={beneficiary}
                            alt={beneficiaryAlt}
                            className="h-auto w-full max-w-xl"
                        />
                    </div>
                )}
            </PageSection>
        </SiteLayout>
    )
}
