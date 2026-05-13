import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { TrendingUp } from 'lucide-react'
import {
    PageSection,
    Paragraph,
    WorldMapBackdrop,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function EconomicGrowth() {
    return (
        <SiteLayout title="Economic Growth">
            <PhotoStrip photos={photos} />

            <PageSection>
                <div className="mb-4 flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-[rgb(0,175,239)]" />
                    <h2 className="text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                        Economic Growth:
                    </h2>
                </div>
                <div className="space-y-4">
                    <Paragraph className="text-[12px] md:text-[12px]">
                        VDO has advanced economic growth by equipping
                        individuals—especially women and youth—with startup
                        kits, small business grants, and financial literacy
                        skills, enabling them to build sustainable livelihoods.
                        The organization provides TVET and market-aligned
                        skills training, coupled with entrepreneurship
                        support, mentorship, and coaching to help participants
                        successfully launch or expand their businesses. Through
                        start-up toolkits and seed grants, VDO has strengthened
                        numerous women-led enterprises and promoted financial
                        independence. Its WAQAR Career Center initiative offers
                        career guidance and job placement services, linking
                        jobseekers to meaningful employment.
                    </Paragraph>
                </div>

                <div className="relative mt-6 grid px-2 py-8 md:px-4 md:py-10">
                    <WorldMapBackdrop />

                    <h3 className="absolute text-base font-bold text-[rgb(62,64,149)]">
                        Geographic Coverage of Economic Growth Initiatives:
                    </h3>

                    <div className="mt-4 flex justify-start">
                        <img
                            src="/svg/Strategic Priorities/04.svg"
                            alt="Economic Growth coverage: Kabul, Northern Regions, Western Regions, Eastern Regions"
                            className="absolute right-0 top-[-18px] grid h-auto w-[600px]"
                        />
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
                        <div>
                            <Paragraph>
                                As a frontline defender of humanitarian
                                principles, VDO engages in policy dialogues on
                                resilience and inclusive growth. Linking
                                grassroots practices with national frameworks,
                                we contribute to{' '}
                                <strong className="text-[rgb(62,64,149)]">
                                    SDG 1
                                </strong>{' '}
                                (No Poverty) and{' '}
                                <strong className="text-[rgb(62,64,149)]">
                                    SDG 8
                                </strong>{' '}
                                (Decent Work & Economic Growth). Our integrated
                                approach helps displaced and marginalized
                                households secure food, income, and dignity.
                            </Paragraph>
                        </div>
                        <div />
                    </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr] md:items-start">
                    <div>
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            Key Achievements:
                        </h3>
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            Numbers of Beneficiaries Reached:
                        </h3>
                        <div className="mt-4 flex justify-start">
                            <img
                                src="/svg/Strategic Priorities/05.svg"
                                alt="Economic Growth beneficiaries: Women 36,450 (45%), Men 32,400 (40%), Children/Youth 12,150 (15%), Total 81,000"
                                className="h-auto w-full max-w-[240px]"
                            />
                        </div>
                    </div>

                    <div className="pt-16 md:pt-20">
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            {[
                                'Supporting women-owned businesses and inclusive entrepreneurship initiatives.',
                                'Promoting sustainable livelihoods and income generation for youth, women, returnees, refugees, and IDPs.',
                                'Strengthening job placement, employability, and private sector engagement opportunities.',
                                'Expanding disability-inclusive and home-based livelihood support initiatives.',
                                'Building climate-resilient and market-driven economic empowerment programs.',
                                'Enhancing economic resilience through skills development, enterprise support, and workforce readiness initiatives.',
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
                </div>
            </PageSection>
        </SiteLayout>
    )
}
