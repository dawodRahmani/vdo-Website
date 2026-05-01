import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    Bullets,
    PageSection,
    Paragraph,
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

                {/* Education coverage infographic */}
                <div
                    className="-mx-6 mt-6 md:-mx-10 lg:-mx-14"
                    role="img"
                    aria-label="Education coverage: target groups, coverage areas, and beneficiary breakdown"
                    style={{
                        backgroundImage: "url('/svg/education.svg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center top',
                        aspectRatio: '500 / 200',
                        backgroundColor: 'transparent',
                    }}
                />

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
