import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Users } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'
import {
    paragraphs,
    pickBody,
    pickHeading,
    pickImage,
    type SpContent,
} from '@/components/strategic-priorities/dynamic'

const defaultBody =
    'The tertiary audience contributes through funding, advocacy, and technical collaboration, while Afghan diaspora leaders and regional/global networks amplify the voices of women and youth, and researchers, academics, and storytelling partners support evidence-based policy and highlight local success stories.'
const defaultImage = '/svg/Strategic Priorities/13.svg'
const defaultAlt =
    'Tertiary audience tiers: International NGOs, UN Agencies & Donors; Diaspora & Global Network; Media & Research Institutions'

export default function TertiaryAudience({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, 'Tertiary Audience (Influencers & Advocates):')
    const body = paragraphs(pickBody(content?.body, defaultBody))
    const image = pickImage(content?.infographic_url, defaultImage)
    const alt = content?.infographic_alt ?? defaultAlt

    return (
        <SiteLayout title="Tertiary Audience">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={Users} title={title} />
                {body.map((p, i) => (
                    <Paragraph key={i}>{p}</Paragraph>
                ))}
                <div className="mt-6 flex justify-center">
                    <img src={image} alt={alt} className="h-auto w-full max-w-xl" />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
