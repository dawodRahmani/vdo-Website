import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import {
    Bullets,
    PageSection,
    Paragraph,
    photos,
} from '@/components/strategic-priorities/blocks'
import {
    paragraphs,
    pickBody,
    pickBullets,
    pickHeading,
    pickImage,
    renderRich,
    type SpContent,
} from '@/components/strategic-priorities/dynamic'

const defaultBody = [
    "VDO is a development organization in Afghanistan dedicated to improving quality education through a strong focus on access, equity, safety, and inclusion. By working in the country's most underserved communities, VDO strives to ensure that every child—regardless of gender, ability, or background—has the opportunity to learn in a safe and supportive environment.",
    "VDO's education initiatives prioritize the most vulnerable and underserved populations, focusing on five key target groups:",
].join('\n\n')

const defaultBetween = [
    "By constructing schools, distributing learning materials, and supporting adolescent girls' education, VDO contributes directly to **SDG 4** (Quality Education) and **SDG 5** (Gender Equality).",
    'Our work ensures that education remains a right, not a privilege, even for those in the most remote and displacement-affected communities.',
].join('\n\n')

const defaultBullets = [
    'Implementing Community Based Education (CBE), Accelerate Learning Programs (ALP), Teacher training in multiple provinces using VDO-developed GBV-safe schooling guides.',
    'Improved school safety awareness and retention of girls in education.',
    "Field-tested community engagement models increasing access and acceptance for girls' learning.",
    'Demonstrated successful transition of community schools to formal education systems.',
]

const defaultInfographic = '/svg/education.svg'
const defaultBeneficiary = '/svg/Strategic Priorities/03.svg'

export default function Education({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, 'Education:')
    const body = paragraphs(pickBody(content?.body, defaultBody))
    const between = paragraphs(pickBody(content?.between_body, defaultBetween))
    const bullets = pickBullets(content?.bullets, defaultBullets)
    const infographic = pickImage(content?.infographic_url, defaultInfographic)
    const infographicAlt =
        content?.infographic_alt ??
        'Education coverage: target groups, coverage areas, and beneficiary breakdown'
    const achievementsHeading = pickHeading(content?.achievements_heading, 'Key Achievements:')
    const beneficiary = pickImage(content?.beneficiary_url, defaultBeneficiary)
    const beneficiaryAlt =
        content?.beneficiary_alt ??
        'Education beneficiaries: Female 166,920 (48%), Male 153,080 (52%), Total 321,000'

    return (
        <SiteLayout title="Education">
            <PhotoStrip photos={photos} />

            <PageSection>
                <h2 className="text-2xl font-bold text-[rgb(62,64,149)] md:text-3xl">
                    {title}
                </h2>
                <div className="space-y-3">
                    {body.map((p, i) => (
                        <Paragraph key={i}>{p}</Paragraph>
                    ))}
                </div>

                <div
                    className="-mx-6 mt-6 md:-mx-10 lg:-mx-14"
                    role="img"
                    aria-label={infographicAlt}
                    style={{
                        backgroundImage: `url('${infographic}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center top',
                        aspectRatio: '500 / 200',
                        backgroundColor: 'transparent',
                    }}
                />

                <div className="space-y-3">
                    {between.map((p, i) => (
                        <Paragraph key={i}>{renderRich(p)}</Paragraph>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            {achievementsHeading}
                        </h3>
                        <Bullets items={bullets} />
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <img
                            src={beneficiary}
                            alt={beneficiaryAlt}
                            className="h-auto w-[180px] md:w-[210px]"
                        />
                    </div>
                </div>
            </PageSection>
        </SiteLayout>
    )
}
