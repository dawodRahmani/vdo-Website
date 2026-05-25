import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { AlertTriangle } from 'lucide-react'
import {
    Bullets,
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'
import {
    paragraphs,
    pickBody,
    pickBullets,
    pickHeading,
    renderRich,
    type SpContent,
} from '@/components/strategic-priorities/dynamic'

const defaultBody =
    "VDO delivers rapid, community-centered emergency assistance to households affected by crises, natural disasters, and conflict across Afghanistan. Our approach focuses on meeting urgent needs while protecting the dignity and resilience of affected families. Through coordinated humanitarian interventions—including emergency cash assistance, distribution of essential non-food items, nutrition support, and access to lifesaving information and referrals—we ensure that vulnerable women, children, and marginalized groups receive timely and equitable support. Guided by local knowledge and rooted in strong community networks, VDO's emergency response programs are designed to save lives, reduce suffering, and help communities recover with strength and hope."

export default function EmergencyResponse({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, 'Emergency Response:')
    const body = paragraphs(pickBody(content?.body, defaultBody))
    const between = paragraphs(content?.between_body ?? '')
    const bullets = pickBullets(content?.bullets, [])
    const achievementsHeading = pickHeading(
        content?.achievements_heading,
        'Key Achievements:',
    )
    const infographic = content?.infographic_url ?? ''
    const infographicAlt = content?.infographic_alt ?? ''
    const beneficiary = content?.beneficiary_url ?? ''
    const beneficiaryAlt = content?.beneficiary_alt ?? ''

    return (
        <SiteLayout title="Emergency Response">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={AlertTriangle} title={title} />
                {body.map((p, i) => (
                    <Paragraph key={i}>{p}</Paragraph>
                ))}

                {(infographic || beneficiary) && (
                    <div className="mt-6 grid items-center gap-6 md:grid-cols-2">
                        {infographic && (
                            <div className="flex justify-center">
                                <img
                                    src={infographic}
                                    alt={infographicAlt}
                                    className="h-auto w-full max-w-md"
                                />
                            </div>
                        )}
                        {beneficiary && (
                            <div className="flex justify-center">
                                <img
                                    src={beneficiary}
                                    alt={beneficiaryAlt}
                                    className="h-auto w-full max-w-md"
                                />
                            </div>
                        )}
                    </div>
                )}

                {between.length > 0 && (
                    <div className="mt-6 space-y-3">
                        {between.map((p, i) => (
                            <Paragraph key={i}>{renderRich(p)}</Paragraph>
                        ))}
                    </div>
                )}

                {bullets.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            {achievementsHeading}
                        </h3>
                        <Bullets items={bullets} />
                    </div>
                )}
            </PageSection>
        </SiteLayout>
    )
}
