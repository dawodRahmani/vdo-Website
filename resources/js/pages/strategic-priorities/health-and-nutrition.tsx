import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { HeartPulse } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function HealthAndNutrition() {
    return (
        <SiteLayout title="Health and Nutrition">
            <PhotoStrip photos={photos} />

            <PageSection>
                <SectionHeading
                    icon={HeartPulse}
                    title="Health and Nutrition:"
                />
                <Paragraph>
                    VDO advances equitable access to essential and life-saving
                    primary healthcare and nutrition services for women,
                    children, and crisis-affected communities, ensuring
                    dignity, safety, and stronger foundations for long-term
                    well-being, through community health centers, mobile
                    health and nutrition teams, and emergency response
                    approaches.
                </Paragraph>

                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    Health and Nutrition Geographic Presence:
                </h3>
                <div className="mt-4 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/08.svg"
                        alt="Health and Nutrition coverage: Central, Northeastern, West, Eastern regions"
                        className="h-auto w-full max-w-2xl"
                    />
                </div>

                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    VDO's interventions in Health sector include:
                </h3>
                <div className="mt-4 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/09.svg"
                        alt="Health interventions: Nutrition support for children and pregnant women, Community health awareness, Physical Support and Referral services for women and GBV survivors, Nutrition Assistance to vulnerable households"
                        className="h-auto w-full max-w-2xl"
                    />
                </div>

                <Paragraph>
                    <span className="mt-6 block">
                        VDO, as an active member of the Health and WASH
                        Clusters, ensures alignment with global humanitarian
                        standards. Our focus on training health workers and
                        deploying mobile services reflects Afghanistan's
                        urgent need for equitable healthcare access, advancing{' '}
                        <strong className="text-[rgb(62,64,149)]">
                            SDG 3
                        </strong>{' '}
                        (Good Health & Wellbeing) and reducing inequalities
                        for the most at-risk.
                    </span>
                </Paragraph>

                <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                    Number of Beneficiaries Reached:
                </h3>
                <div className="mt-4 flex justify-center">
                    <img
                        src="/svg/Strategic Priorities/10.svg"
                        alt="Health and Nutrition beneficiaries: Children 390,000 (50%), Women 234,000 (30%), Others 156,000 (20%), Total 780,000"
                        className="h-auto w-full max-w-md"
                    />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
