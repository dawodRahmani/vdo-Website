import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Building2 } from 'lucide-react'
import {
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
                <hr className="border-0 border-t border-dashed border-[rgb(0,175,239)]" />

                <div className="md:pl-8 lg:pl-12">
                    <SectionHeading
                        icon={Building2}
                        title="Rural Development:"
                    />
                    <Paragraph>
                        VDO's Rural Development work promotes sustainable,
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

                <div className="mt-10 md:pl-8 lg:pl-12">
                    <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                        Geographic Coverage of Rural Development Initiatives:
                    </h3>
                    <div className="mt-4 flex justify-center">
                        <img
                            src="/svg/Strategic Priorities/06.svg"
                            alt="Rural Development coverage: Northern drought-prone, Eastern flood-affected, Western drought-prone, Central flood-affected provinces"
                            className="h-auto w-full max-w-5xl"
                        />
                    </div>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
                    <div className="md:pl-8 lg:pl-12">
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            The below number of beneficiaries reached through
                            Rural Development initiatives:
                        </h3>
                        <div className="mt-4 flex justify-center">
                            <img
                                src="/svg/Strategic Priorities/07.svg"
                                alt="Rural Development beneficiaries: Farmers 19,520 (40%), Women 17,080 (35%), IDPs 7,320 (15%), People with Disabilities 4,880 (10%), Total 48,800"
                                className="h-auto w-full max-w-md"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            Our interventions include:
                        </h3>
                        <ul className="mt-3 space-y-1.5 text-xs leading-tight text-gray-700 md:text-[13px]">
                            {[
                                'Rural reforestation and greenbelt development to reduce heat islands, prevent erosion, and restore ecological balance.',
                                'Promotion of clean and renewable energy sources, including household and community-level solar solutions.',
                                'Climate-smart agriculture models, tailored for peri-rural households and small-scale farmers, to improve food security and reduce pressure on degraded land.',
                                'Community-led environmental stewardship, including awareness campaigns on waste reduction, recycling, water conservation, and disaster preparedness.',
                                'Rural water management through improved drainage, flood prevention measures, and protection of natural water sources.',
                            ].map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span
                                        aria-hidden="true"
                                        className="font-semibold text-[rgb(0,175,239)]"
                                    >
                                        -
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Paragraph className="mt-4">
                            These efforts aim to safeguard lives, livelihoods,
                            water security, and food systems, while promoting
                            healthier ecosystems and long-term sustainability.
                        </Paragraph>
                    </div>
                </div>

                <Paragraph className="mt-8">
                    As a national advocate for climate resilience, VDO bridges
                    local adaptation practices with global sustainability
                    frameworks, contributing directly to{' '}
                    <strong className="text-[rgb(62,64,149)]">SDG 11</strong>{' '}
                    (Sustainable Cities and Communities),{' '}
                    <strong className="text-[rgb(62,64,149)]">SDG 13</strong>{' '}
                    (Climate Action), and{' '}
                    <strong className="text-[rgb(62,64,149)]">SDG 15</strong>{' '}
                    (Life on Land). By embedding climate considerations into
                    all rural programming, VDO helps secure a healthier,
                    greener, and more resilient future for Afghanistan's next
                    generations.
                </Paragraph>

                <hr className="mt-12 border-0 border-t border-dashed border-[rgb(0,175,239)]" />
            </PageSection>
        </SiteLayout>
    )
}
