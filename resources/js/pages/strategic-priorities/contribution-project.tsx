import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { CheckCircle2 } from 'lucide-react'
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
    'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management in the North.',
    'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS.',
    'Conduct 30 awareness-raising sessions on available nutrition services and provide training to nutrition partners on conducting safety audits.',
    'Distribute dignity kits to vulnerable women and girls and establish women- and girls-friendly spaces near health centres for recreational activities and GBV awareness.',
    'Through the Integrated Health–Nutrition–Immunization Project, VDO addressed vaccine misconceptions and promoted positive health behaviors, leading caregivers to better understand and accept immunization and nutrition services, improving child health outcomes in the East.',
]

export default function ContributionProject({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, 'VDO Contribution Project:')
    const body = paragraphs(content?.body ?? '')
    const between = paragraphs(content?.between_body ?? '')
    const bullets = pickBullets(content?.bullets, defaultBullets)
    const achievementsHeading = content?.achievements_heading?.trim() ?? ''
    const infographic = content?.infographic_url ?? ''
    const infographicAlt = content?.infographic_alt ?? ''
    const beneficiary = content?.beneficiary_url ?? ''
    const beneficiaryAlt = content?.beneficiary_alt ?? ''

    return (
        <SiteLayout title="VDO's Contribution Project">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={CheckCircle2} title={title} />

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
