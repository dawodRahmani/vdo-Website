import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    Bullets,
    PageSection,
    Paragraph,
    WorldMapBackdrop,
    photos,
} from '@/components/strategic-priorities/blocks'

export default function Education() {
    return (
        <SiteLayout title="Education">
            <PhotoStrip photos={photos} />

            <PageSection>
                <h2 className="text-2xl font-bold text-[rgb(62,64,149)] md:text-3xl">
                    Education:
                </h2>
                <div className="space-y-3">
                    <Paragraph>
                        VDO is a development organization in Afghanistan
                        dedicated to improving quality education through a
                        strong focus on access, equity, safety, and inclusion.
                        By working in the country's most underserved
                        communities, VDO strives to ensure that every
                        child—regardless of gender, ability, or background—has
                        the opportunity to learn in a safe and supportive
                        environment.
                    </Paragraph>
                    <Paragraph>
                        VDO's education initiatives prioritize the most
                        vulnerable and underserved populations, focusing on
                        five key target groups:
                    </Paragraph>
                </div>

                {/* Coverage section on top of world map backdrop */}
                <div className="relative mt-6 px-2 py-8 md:px-4 md:py-10">
                    <WorldMapBackdrop />

                    <p className="text-sm font-semibold text-[rgb(62,64,149)]">
                        To date, the following percentages of beneficiaries
                        have been reached across education coverage areas:
                    </p>

                    {/* Target groups banner */}
                    <div className="mt-6 flex justify-start">
                        <img
                            src="/svg/Strategic Priorities/01.svg"
                            alt="Target groups: Girls, Adolescents, Out-of-school Children, Children with Disabilities, Youth without Education or Skills Pathways"
                            className="h-auto w-full max-w-[848px]"
                        />
                    </div>

                    <div className="mt-4 grid gap-6 md:grid-cols-[1fr_220px] md:items-start">
                        <div>
                            <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                                Coverage Areas in Education:
                            </h3>

                            <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[rgb(39,174,96)]" />
                                    <span>
                                        <strong>Kabul</strong> - Urban
                                        expansion and increased schooling
                                        access
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[rgb(231,127,46)]" />
                                    <span>
                                        <strong>Northeastern Regions</strong>{' '}
                                        - Reaching underserved rural
                                        communities
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[rgb(0,175,239)]" />
                                    <span>
                                        <strong>
                                            Emergency-affected districts
                                        </strong>{' '}
                                        - Education support in crisis affected
                                        areas
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-6">
                                <Paragraph>
                                    In addition, VDO works closely with
                                    caregivers and community education
                                    structures to strengthen local support
                                    systems, while also empowering government
                                    and community-based teachers with the tools
                                    and training they need to deliver quality,
                                    inclusive education.
                                </Paragraph>
                            </div>
                        </div>

                        {/* Donut chart graphic in upper right */}
                        <div className="flex justify-start md:justify-start">
                            <img
                                src="/svg/Strategic Priorities/02.svg"
                                alt="Education beneficiaries donut chart"
                                className="h-auto w-[180px] md:w-[200px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Paragraph>
                        By constructing schools, distributing learning
                        materials, and supporting adolescent girls' education,
                        VDO contributes directly to{' '}
                        <strong className="text-[rgb(62,64,149)]">
                            SDG 4
                        </strong>{' '}
                        (Quality Education) and{' '}
                        <strong className="text-[rgb(62,64,149)]">
                            SDG 5
                        </strong>{' '}
                        (Gender Equality).
                    </Paragraph>
                    <Paragraph>
                        Our work ensures that education remains a right, not a
                        privilege, even for those in the most remote and
                        displacement-affected communities.
                    </Paragraph>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            Key Achievements:
                        </h3>
                        <Bullets
                            items={[
                                'Implementing Community Based Education (CBE), Accelerate Learning Programs (ALP), Teacher training in multiple provinces using VDO-developed GBV-safe schooling guides.',
                                'Improved school safety awareness and retention of girls in education.',
                                "Field-tested community engagement models increasing access and acceptance for girls' learning.",
                                'Demonstrated successful transition of community schools to formal education systems.',
                            ]}
                        />
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <img
                            src="/svg/Strategic Priorities/03.svg"
                            alt="Education beneficiaries: Female 166,920 (48%), Male 153,080 (52%), Total 321,000"
                            className="h-auto w-[180px] md:w-[210px]"
                        />
                    </div>
                </div>
            </PageSection>
        </SiteLayout>
    )
}
