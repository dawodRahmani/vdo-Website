import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Target } from 'lucide-react'
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
    "VDO's beneficiaries include vulnerable and underserved groups across Afghanistan who directly and indirectly receive support through its programs:"
const defaultImage = '/svg/Strategic Priorities/12.svg'
const defaultAlt = "VDO's primary beneficiaries"

export default function TargetGroup({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, 'Target Groups:')
    const body = paragraphs(pickBody(content?.body, defaultBody))
    const subHeading = pickHeading(content?.achievements_heading, "VDO's Primary Beneficiaries")
    const image = pickImage(content?.infographic_url, defaultImage)
    const alt = content?.infographic_alt ?? defaultAlt

    return (
        <SiteLayout title="Target Group">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={Target} title={title} />
                {body.map((p, i) => (
                    <Paragraph key={i}>{p}</Paragraph>
                ))}
                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    {subHeading}
                </h3>
                <div className="mt-4 flex justify-center">
                    <img src={image} alt={alt} className="h-auto w-full max-w-3xl" />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
