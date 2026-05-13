import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { HeartPulse } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    SectionHeading,
    photos,
} from '@/components/strategic-priorities/blocks'

function DashList({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700 md:text-[15px]">
            {items.map((item, i) => (
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
    )
}

export default function HealthAndNutrition() {
    return (
        <SiteLayout title="Health and Nutrition">
            <PhotoStrip photos={photos} />

            <PageSection>
                <hr className="border-0 border-t border-dashed border-[rgb(0,175,239)]" />
                <div className="md:pl-8 lg:pl-12">
                    <SectionHeading
                        icon={HeartPulse}
                        title="Health and Nutrition:"
                    />
                    <Paragraph>
                        VDO advances equitable access to essential and
                        life-saving primary healthcare and nutrition services
                        for women, children, and crisis-affected communities,
                        ensuring dignity, safety, and stronger foundations for
                        long-term well-being, through community health centers,
                        and mobile health and nutrition team and emergency
                        responses approach.
                    </Paragraph>
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center md:gap-6">
                    <div className="md:pl-8 lg:pl-12">
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            Health and Nutrition Geographic Presence:
                        </h3>
                        <div className="mt-4 flex justify-start">
                            <img
                                src={encodeURI(
                                    '/svg/Health and Nutrition - Map.svg',
                                )}
                                alt="Health and Nutrition coverage: Central, Northeastern, West, Eastern regions"
                                className="h-auto w-full max-w-[460px]"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            VDO's interventions in Health sector include:
                        </h3>
                        <div className="mt-4 flex justify-center">
                            <img
                                src="/svg/Strategic Priorities/09.svg"
                                alt="Health interventions: Nutrition support for children and pregnant women, Community health awareness, Psychosocial support and Referral services for women, Nutrition Assistance to vulnerable households"
                                className="h-auto w-full max-w-[520px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <ul className="space-y-0.5 text-xs leading-tight text-gray-700 md:text-[13px]">
                        {[
                            'Provision of essential medicines and medical supplies to underserved communities.',
                            'Support to operating community health centers and delivery of primary healthcare services.',
                            'Capacity building and training of Community Health Workers (CHWs) and local health volunteers.',
                            'Maternal and child healthcare services in remote and crisis-affected areas.',
                            'Community-based outreach, referrals, and preventive healthcare awareness initiatives.',
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
                </div>

                <Paragraph className="mt-8">
                    VDO as an active member of the Health and WASH Clusters,
                    ensures alignment with global humanitarian standards. Our
                    focus on training health workers and deploying mobile
                    services reflects Afghanistan's urgent need for equitable
                    healthcare access, advancing{' '}
                    <strong className="text-[rgb(62,64,149)]">SDG 3</strong>{' '}
                    (Good Health & Wellbeing) and reducing inequalities for
                    the most at-risk.
                </Paragraph>

                <div className="mt-12 md:pl-8 lg:pl-12">
                    <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                        Key Achievements:
                    </h3>
                    <div className="mt-4 grid gap-8 md:grid-cols-[1fr_320px] md:items-center">
                        <div className="md:pl-12 lg:pl-16">
                            <DashList
                                items={[
                                    'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management in North.',
                                    'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS.',
                                    'Conduct 30 awareness-raising sessions on available nutrition services and provide training to nutrition partners on conducting safety audits.',
                                    'Distribute dignity kits to vulnerable women and girls and establish women- and girls-friendly spaces near health centres for recreational activities and GBV awareness.',
                                    'Through the Integrated Health–Nutrition–Immunization Project VDO addressed vaccine misconceptions and promoted positive health behaviors, leading caregivers to better understand and accept immunization and nutrition services, improving child health outcomes in East.',
                                ]}
                            />
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <img
                                src={encodeURI(
                                    '/svg/Health and Nutrition - Number of Beneficiaries.svg',
                                )}
                                alt="Health and Nutrition beneficiaries: Children 288,154 (30%), Women 480,257 (50%), Others 192,103 (20%), Total 960,515 (100%)"
                                className="h-auto w-full max-w-[320px]"
                            />
                        </div>
                    </div>
                </div>

                <hr className="mt-12 border-0 border-t border-dashed border-[rgb(0,175,239)]" />
            </PageSection>
        </SiteLayout>
    )
}
