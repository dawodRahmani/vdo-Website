import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { AlertTriangle } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function EmergencyResponse() {
    return (
        <SiteLayout title="Emergency Response">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading
                    icon={AlertTriangle}
                    title="Emergency Response:"
                />
                <Paragraph>
                    VDO delivers rapid, community-centered emergency assistance
                    to households affected by crises, natural disasters, and
                    conflict across Afghanistan. Our approach focuses on
                    meeting urgent needs while protecting the dignity and
                    resilience of affected families. Through coordinated
                    humanitarian interventions—including emergency cash
                    assistance, distribution of essential non-food items,
                    nutrition support, and access to lifesaving information
                    and referrals—we ensure that vulnerable women, children,
                    and marginalized groups receive timely and equitable
                    support. Guided by local knowledge and rooted in strong
                    community networks, VDO's emergency response programs are
                    designed to save lives, reduce suffering, and help
                    communities recover with strength and hope.
                </Paragraph>
            </PageSection>
        </SiteLayout>
    )
}
