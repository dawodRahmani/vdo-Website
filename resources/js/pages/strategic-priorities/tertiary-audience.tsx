import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Users } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function TertiaryAudience() {
    return (
        <SiteLayout title="Tertiary Audience">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading
                    icon={Users}
                    title="Tertiary Audience (Influencers & Advocates):"
                />
                <Paragraph>
                    The tertiary audience contributes through funding,
                    advocacy, and technical collaboration, while Afghan
                    diaspora leaders and regional/global networks amplify the
                    voices of women and youth, and researchers, academics, and
                    storytelling partners support evidence-based policy and
                    highlight local success stories.
                </Paragraph>
                <div className="mt-6 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/13.svg"
                        alt="Tertiary audience tiers: International NGOs, UN Agencies & Donors; Diaspora & Global Network; Media & Research Institutions"
                        className="h-auto w-full max-w-xl"
                    />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
