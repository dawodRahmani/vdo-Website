import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Layers } from 'lucide-react'
import {
    PageSection,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'
import {
    pickHeading,
    pickImage,
    type SpContent,
} from '@/components/strategic-priorities/dynamic'

const defaultImage = '/svg/Strategic Priorities/11.svg'
const defaultAlt =
    "VDO's 12 cross-cutting areas: Gender equality and women's empowerment, Safeguarding/PSEAH/Child protection, Accountability to affected people, Do no harm and conflict sensitivity, Protection mainstreaming, Inclusion of persons with disabilities, Environmental sustainability and climate sensitivity, Localization and community ownership, Data protection and ethical information management, Anti-fraud/anti-corruption/aid diversion protection, MEAL and evidence-based programming, Equity, diversity and inclusion"

export default function CrossCuttingAreas({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, "VDO's Cross Cutting Areas:")
    const image = pickImage(content?.infographic_url, defaultImage)
    const alt = content?.infographic_alt ?? defaultAlt

    return (
        <SiteLayout title="VDO's Cross Cutting Areas">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={Layers} title={title} />
                <div className="mt-6 flex justify-center">
                    <img src={image} alt={alt} className="h-auto w-full max-w-3xl" />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
