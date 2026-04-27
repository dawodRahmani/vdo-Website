import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Target } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function TargetGroup() {
    return (
        <SiteLayout title="Target Group">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={Target} title="Target Groups:" />
                <Paragraph>
                    VDO's beneficiaries include vulnerable and underserved
                    groups across Afghanistan who directly and indirectly
                    receive support through its programs:
                </Paragraph>
                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    VDO's Primary Beneficiaries
                </h3>
                <div className="mt-4 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/12.svg"
                        alt="VDO's primary beneficiaries: Women and Girls (female-headed households, GBV survivors, adolescent girls, women entrepreneurs); Youth needing skills, internships, employment, civic engagement; Out-of-school children (conflict affected, displaced or poverty-impact); Persons with disabilities and caregivers; Crisis-affected communities (IDPs, returnees, disaster-affected households)"
                        className="h-auto w-full max-w-3xl"
                    />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
