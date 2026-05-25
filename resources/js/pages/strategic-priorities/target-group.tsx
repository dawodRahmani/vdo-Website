import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Target, UsersRound, Users } from 'lucide-react'
import {
    Bullets,
    PageSection,
    Paragraph,
    SectionHeading,
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

const primaryDefaults = {
    body:
        "VDO's beneficiaries include vulnerable and underserved groups across Afghanistan who directly and indirectly receive support through its programs:",
    image: '/svg/Strategic Priorities/12.svg',
    alt: "VDO's primary beneficiaries",
}

const secondaryDefaults = {
    bullets: [
        'Community Leaders & Influencers: Elders and religious figures supporting safe participation and positive social norms.',
        'Local Civil Society Organizations: Women- and youth-led groups benefiting from capacity-building, collaboration, advocacy (e.g., Change Drive Network).',
        'Private Sector & Employers: Access to skilled jobseekers, apprenticeships, internships, inclusive employment.',
        'Government Bodies & Local Authorities: Facilitating policy alignment, approvals, and safe community access.',
    ],
}

const tertiaryDefaults = {
    body:
        'The tertiary audience contributes through funding, advocacy, and technical collaboration, while Afghan diaspora leaders and regional/global networks amplify the voices of women and youth, and researchers, academics, and storytelling partners support evidence-based policy and highlight local success stories.',
    image: '/svg/Strategic Priorities/13.svg',
    alt:
        'Tertiary audience tiers: International NGOs, UN Agencies & Donors; Diaspora & Global Network; Media & Research Institutions',
}

interface Props {
    primary?: SpContent
    secondary?: SpContent
    tertiary?: SpContent
}

function PrimarySection({ content }: { content?: SpContent }) {
    const title = pickHeading(content?.heading, 'Target Groups:')
    const body = paragraphs(pickBody(content?.body, primaryDefaults.body))
    const subHeading = pickHeading(
        content?.achievements_heading,
        "VDO's Primary Beneficiaries",
    )
    const image = pickImage(content?.infographic_url, primaryDefaults.image)
    const alt = content?.infographic_alt ?? primaryDefaults.alt

    return (
        <section id="primary" className="scroll-mt-28">
            <SectionHeading icon={Target} title={title} />
            {body.map((p, i) => (
                <Paragraph key={i}>{p}</Paragraph>
            ))}
            <h3 className="mt-6 text-base font-bold text-[rgb(62,64,149)]">
                {subHeading}
            </h3>
            <div className="mt-4 flex justify-center">
                <img src={image} alt={alt} className="h-auto w-full max-w-3xl" />
            </div>
        </section>
    )
}

function SecondarySection({ content }: { content?: SpContent }) {
    const title = pickHeading(
        content?.heading,
        "VDO's Secondary Beneficiaries:",
    )
    const body = paragraphs(content?.body ?? '')
    const between = paragraphs(content?.between_body ?? '')
    const bullets = pickBullets(content?.bullets, secondaryDefaults.bullets)
    const achievementsHeading = content?.achievements_heading?.trim() ?? ''
    const infographic = content?.infographic_url ?? ''
    const infographicAlt = content?.infographic_alt ?? ''
    const beneficiary = content?.beneficiary_url ?? ''
    const beneficiaryAlt = content?.beneficiary_alt ?? ''

    return (
        <section id="secondary" className="scroll-mt-28">
            <SectionHeading icon={UsersRound} title={title} />

            {body.map((p, i) => (
                <Paragraph key={i}>{p}</Paragraph>
            ))}

            {infographic && (
                <div className="mt-6 flex justify-center">
                    <img
                        src={infographic}
                        alt={infographicAlt}
                        className="h-auto w-full max-w-3xl"
                    />
                </div>
            )}

            {between.length > 0 && (
                <div className="mt-4 space-y-3">
                    {between.map((p, i) => (
                        <Paragraph key={i}>{renderRich(p)}</Paragraph>
                    ))}
                </div>
            )}

            {bullets.length > 0 && (
                <div className="mt-6">
                    {achievementsHeading && (
                        <h3 className="text-base font-bold text-[rgb(62,64,149)]">
                            {achievementsHeading}
                        </h3>
                    )}
                    <Bullets items={bullets} />
                </div>
            )}

            {beneficiary && (
                <div className="mt-6 flex justify-center">
                    <img
                        src={beneficiary}
                        alt={beneficiaryAlt}
                        className="h-auto w-full max-w-xl"
                    />
                </div>
            )}
        </section>
    )
}

function TertiarySection({ content }: { content?: SpContent }) {
    const title = pickHeading(
        content?.heading,
        'Tertiary Audience (Influencers & Advocates):',
    )
    const body = paragraphs(pickBody(content?.body, tertiaryDefaults.body))
    const image = pickImage(content?.infographic_url, tertiaryDefaults.image)
    const alt = content?.infographic_alt ?? tertiaryDefaults.alt

    return (
        <section id="tertiary" className="scroll-mt-28">
            <SectionHeading icon={Users} title={title} />
            {body.map((p, i) => (
                <Paragraph key={i}>{p}</Paragraph>
            ))}
            <div className="mt-6 flex justify-center">
                <img src={image} alt={alt} className="h-auto w-full max-w-xl" />
            </div>
        </section>
    )
}

export default function TargetGroup({ primary, secondary, tertiary }: Props) {
    return (
        <SiteLayout title="Target Group">
            <PhotoStrip photos={photos} />

            <PageSection>
                <div className="space-y-12">
                    <PrimarySection content={primary} />
                    <div className="border-t border-gray-200" />
                    <SecondarySection content={secondary} />
                    <div className="border-t border-gray-200" />
                    <TertiarySection content={tertiary} />
                </div>
            </PageSection>
        </SiteLayout>
    )
}
