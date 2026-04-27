import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { CheckCircle2 } from 'lucide-react'
import {
    Bullets,
    PageSection,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function ContributionProject() {
    return (
        <SiteLayout title="VDO's Contribution Project">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading
                    icon={CheckCircle2}
                    title="VDO Contribution Project:"
                />
                <Bullets
                    items={[
                        'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management in the North.',
                        'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS.',
                        'Conduct 30 awareness-raising sessions on available nutrition services and provide training to nutrition partners on conducting safety audits.',
                        'Distribute dignity kits to vulnerable women and girls and establish women- and girls-friendly spaces near health centres for recreational activities and GBV awareness.',
                        'Through the Integrated Health–Nutrition–Immunization Project, VDO addressed vaccine misconceptions and promoted positive health behaviors, leading caregivers to better understand and accept immunization and nutrition services, improving child health outcomes in the East.',
                    ]}
                />
            </PageSection>
        </SiteLayout>
    )
}
