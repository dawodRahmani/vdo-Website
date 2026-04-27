import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Building2 } from 'lucide-react'
import {
    Bullets,
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function RuralDevelopment() {
    return (
        <SiteLayout title="Rural Development">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading icon={Building2} title="Urban Development:" />
                <div className="space-y-4">
                    <Paragraph>
                        VDO's Urban Development work promotes sustainable,
                        climate-resilient, and inclusive cities by integrating
                        environmental protection, community-driven planning,
                        and risk-reduction measures across all programs. With a
                        commitment to strengthening the resilience of
                        Afghanistan's most vulnerable populations—including
                        rural farming families affected by droughts and floods,
                        women and girls facing livelihood and water insecurity,
                        internally displaced people (IDPs), and
                        disaster-affected communities, people with disabilities
                        and vulnerable households, youth engaged in local
                        climate action, community resilience and water
                        management groups.
                    </Paragraph>
                </div>

                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    Our interventions include:
                </h3>
                <Bullets
                    items={[
                        'Urban reforestation and greenbelt development to reduce heat islands, prevent erosion, and restore ecological balance.',
                        'Promotion of clean and renewable energy sources, including household and community-level solar solutions.',
                        'Climate-smart agriculture models, tailored for peri-urban households and small-scale farmers, to improve food security and reduce pressure on degraded land.',
                        'Community-led environmental stewardship, including awareness campaigns on waste reduction, recycling, water conservation, and disaster preparedness.',
                        'Urban water management through improved drainage, flood prevention measures, and protection of natural water sources.',
                    ]}
                />

                <Paragraph>
                    <span className="mt-4 block">
                        These efforts aim to safeguard lives, livelihoods,
                        water security, and food systems, while promoting
                        healthier ecosystems and long-term sustainability. As
                        a national advocate for climate resilience, VDO
                        bridges local adaptation practices with global
                        sustainability frameworks, contributing directly to{' '}
                        <strong className="text-[rgb(62,64,149)]">
                            SDG 11
                        </strong>{' '}
                        (Sustainable Cities and Communities),{' '}
                        <strong className="text-[rgb(62,64,149)]">
                            SDG 13
                        </strong>{' '}
                        (Climate Action), and{' '}
                        <strong className="text-[rgb(62,64,149)]">
                            SDG 15
                        </strong>{' '}
                        (Life on Land).
                    </span>
                </Paragraph>

                <h3 className="mt-8 text-base font-bold text-[rgb(62,64,149)]">
                    Geographic Coverage of Urban Development Initiatives:
                </h3>
                <div className="mt-4 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/06.svg"
                        alt="Urban Development coverage: Northern drought-prone, Eastern flood-affected, Western drought-prone, Central flood-affected provinces"
                        className="h-auto w-full max-w-3xl"
                    />
                </div>

                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    The below number of beneficiaries reached through Urban
                    Development initiatives:
                </h3>
                <div className="mt-4 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/07.svg"
                        alt="Urban Development beneficiaries: Farmers 19,520 (40%), Women 17,080 (35%), IDPs 7,320 (15%), People with Disabilities 4,880 (10%), Total 48,800"
                        className="h-auto w-full max-w-lg"
                    />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
