import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Compass, Eye, Files, Flag, TrendingUp } from 'lucide-react'

const photos = [
    {
        src: '/Header and Gallary Photos/09.jpg',
        alt: 'Education programs in local classrooms',
    },
    {
        src: '/Header and Gallary Photos/14.jpg',
        alt: 'Community engagement in rural areas',
    },
    {
        src: '/Header and Gallary Photos/17.jpg',
        alt: 'Humanitarian aid distribution',
    },
]

const historyParagraphs = [
    "Vision Development Organization (VDO) Founded in 2015 by a courageous Afghan woman. VDO is dedicated to education, advocacy, and empowerment for Afghanistan's most vulnerable communities. Initially focused on community-based advocacy, capacity-building workshops, and awareness campaigns, VDO operated through volunteerism, building trust and credibility at the grassroots level.",
    "Following the government collapse in 2021, In response to Afghanistan's escalating social and economic instability VDO expanded its impact. In June 2022, the organization signed its first official grant, delivering lifesaving services in Inclusion, Protection, and Health to marginalized populations, including women, children, and persons with disabilities.",
    'Since then, VDO has launched multiple initiatives in health, livelihoods, food security, humanitarian aid, and programs bridging emergency response with long-term development. Today, VDO is a recognized Afghan NGO capable of operating in complex environments, navigating access challenges, and delivering results under difficult circumstances. Beyond service delivery, VDO amplifies Afghan voices at national and international forums, including the UN Human Rights Council, the Afghanistan Coordination Group, and the Senior Officials Meeting in Brussels, providing evidence-based recommendations to shape humanitarian and development policy.',
]

const leadershipRoles = [
    {
        color: 'rgb(62,64,149)',
        title: 'UN Humanitarian Country Team (HCT)',
        body: 'Elected member, representing national NGO voices and elected for 3 years in 3 consecutive terms.',
    },
    {
        color: 'rgb(0,175,239)',
        title: 'ACBAR',
        body: 'Steering Committee Member and currently Chairperson (2025–2026 term).',
    },
    {
        color: 'rgb(189,191,193)',
        title: 'Strategic working groups and clusters',
        body: 'across protection, education, and humanitarian coordination platforms.',
    },
]

function BalloonPin({ color }: { color: string }) {
    return (
        <div className="relative flex flex-col items-center">
            <svg
                viewBox="0 0 40 56"
                className="h-14 w-10 drop-shadow-md"
                fill={color}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M20 0 C8.95 0 0 8.95 0 20 c0 5.6 2.3 10.67 6 14.3 L20 56 L34 34.3 C37.7 30.67 40 25.6 40 20 C40 8.95 31.05 0 20 0 Z" />
                <ellipse cx="14" cy="14" rx="5" ry="3" fill="rgba(255,255,255,0.25)" />
            </svg>
            <span
                className="mt-1 h-2 w-2 rounded-full border-2"
                style={{ borderColor: color }}
            />
        </div>
    )
}

const lookingAheadParagraphs = [
    'Afghanistan faces a fragile humanitarian landscape, widespread poverty, and restrictions on the rights of women and girls. Limited international aid and a weakened financial system have strained services and community resilience, while rising food insecurity, shrinking economic opportunities, and youth psychosocial stress pose ongoing challenges.',
    'Amid these difficulties, opportunities exist for innovative, community-driven solutions in areas like climate adaptation, food security, livelihoods, and youth empowerment — where humanitarian and development goals can align.',
    'As a woman-led national NGO with deep local networks, VDO is uniquely positioned to navigate these challenges. Our strategy focuses on long-term community resilience, skills development, and safe spaces for dialogue, empowering Afghan women and youth to actively shape their futures. Over the next five years, VDO will leverage its expertise and partnerships to protect lives, uphold dignity, and advance equity and sustainable development in Afghanistan.',
]

const executiveSummaryParagraphs = [
    "Vision Development Organization (VDO) is a women-led national non-governmental organization established in 2015 with a clear mission: to empower women, youth, and marginalized communities to lead change and build resilient futures in Afghanistan. Rooted in communities and guided by humanitarian principles, VDO has grown into a trusted and credible organization delivering high-quality humanitarian, development, and advocacy programming across multiple regions of the country.",
    "Operating in one of the world's most complex and constrained environments, VDO has demonstrated exceptional resilience, adaptability, and compliance. Since 2021, the organization has sustained uninterrupted operations by combining strong local acceptance, principled engagement, and robust risk-mitigation systems. VDO's ability to navigate access constraints, policy shifts, and protection risks—while safeguarding staff, communities, and resources—has positioned it as a reliable partner for donors, UN agencies, and coordination platforms.",
    "VDO's programming addresses interconnected needs through integrated and multisectoral approaches. Our work spans education and alternative learning pathways, livelihoods and economic resilience, gender equality and protection, health and nutrition, WASH, climate and environmental resilience, emergency response, and evidence-based advocacy. Across all sectors, VDO prioritizes accountability to affected populations, safeguarding and zero tolerance for exploitation, abuse, fraud, and aid diversion, and the meaningful inclusion of women, girls, persons with disabilities, returnees, and other at-risk groups.",
    'Strong governance, compliance, and institutional systems underpin VDO\'s impact. The organization maintains comprehensive policies covering safeguarding, PSEAH, compliance, anti-corruption, risk management, financial control, procurement, data protection, and security. These systems are actively implemented, monitored, and continuously strengthened to meet international donor standards while remaining responsive to the Afghan context.',
    'As a nationally anchored organization, VDO also plays an active leadership role in coordination, dialogue, and sector representation at national and sub-national levels. Through these platforms, VDO contributes Afghan-led perspectives, promotes localization, and advocates for more effective, inclusive, and accountable aid delivery.',
    'Looking ahead, VDO is committed to deepening its impact, strengthening Afghan civil society, and expanding its role as a center of excellence for safe, principled, and evidence-driven programming. Guided by its senior management and supported by dedicated teams, VDO remains focused on delivering results with integrity—today and for the future of Afghanistan.',
]

export default function About() {
    return (
        <SiteLayout title="About Us">
            {/* Hero photo strip */}
            <PhotoStrip photos={photos} />

            {/* Executive Summary */}
            <section className="bg-gray-100 py-10 md:py-14">
                <div className="container mx-auto px-4">
                    <div className="flex items-start gap-4 md:gap-6">
                        <Files className="mt-1 h-10 w-10 flex-shrink-0 text-[rgb(0,175,239)] md:h-12 md:w-12" />
                        <div className="flex-1">
                            <h2 className="mb-3 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                                Executive Summary:
                            </h2>
                            <h3 className="mb-4 text-sm font-bold text-gray-900 md:text-base">
                                Message from the Senior Management Team
                            </h3>
                            <div className="space-y-4 text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                {executiveSummaryParagraphs.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="bg-gray-100 pb-14 pt-2">
                <div className="container mx-auto px-4">
                    <div className="flex items-start gap-4 md:gap-6">
                        <Flag className="mt-1 h-10 w-10 flex-shrink-0 text-[rgb(0,175,239)] md:h-12 md:w-12" />
                        <div className="flex-1">
                            <h2 className="mb-3 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                                History:
                            </h2>
                            <div className="space-y-4 text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                {historyParagraphs.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coordination bodies */}
                    <div className="mt-12">
                        <p className="mb-10 text-center text-sm font-bold text-gray-900 md:text-base">
                            VDO's credibility is further strengthened by its
                            active membership and leadership roles in major
                            coordination bodies:
                        </p>

                        <div className="relative">
                            {/* Dotted line between pins */}
                            <div className="absolute left-[16%] right-[16%] top-[52px] border-t border-dotted border-gray-400" />

                            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
                                {leadershipRoles.map((role) => (
                                    <div
                                        key={role.title}
                                        className="flex flex-col items-center"
                                    >
                                        <BalloonPin color={role.color} />
                                        <p className="mt-4 text-center text-sm leading-relaxed text-gray-700 md:text-left">
                                            {role.title} – {role.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-10 text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            These roles allow VDO to shape policies, influence
                            programming priorities, and advocate for principled,
                            needs-driven humanitarian response in Afghanistan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Looking Ahead */}
            <section className="bg-gray-100 pb-14 pt-2">
                <div className="container mx-auto space-y-10 px-4">
                    {/* Mission */}
                    <div className="flex items-start gap-4 md:gap-6">
                        <Compass className="mt-1 h-8 w-8 flex-shrink-0 text-[rgb(0,175,239)] md:h-10 md:w-10" />
                        <p className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            <strong className="font-bold text-[rgb(62,64,149)]">
                                Our mission
                            </strong>{' '}
                            is to deliver impactful humanitarian assistance and
                            drive sustainable development by empowering
                            vulnerable communities in Afghanistan. We work for
                            all Afghanistan with a particular focus on women,
                            children, to ensure everyone reach their full
                            potential and contribute to the development of
                            their communities. We achieve this by addressing
                            the education, healthcare, social, and economic,
                            needs of our target groups, while promoting
                            resilience, equality, and human rights.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="flex items-start gap-4 md:gap-6">
                        <Eye className="mt-1 h-8 w-8 flex-shrink-0 text-[rgb(0,175,239)] md:h-10 md:w-10" />
                        <p className="text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            <strong className="font-bold text-[rgb(62,64,149)]">
                                Our vision
                            </strong>{' '}
                            is a prosperous and inclusive Afghanistan where
                            every community has the opportunity to thrive in
                            dignity, peace, and sustainability.
                        </p>
                    </div>

                    {/* Looking Ahead */}
                    <div className="flex items-start gap-4 md:gap-6">
                        <TrendingUp className="mt-1 h-8 w-8 flex-shrink-0 text-[rgb(0,175,239)] md:h-10 md:w-10" />
                        <div className="flex-1">
                            <h2 className="mb-4 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                                Looking Ahead
                            </h2>
                            <h3 className="mb-4 text-sm font-bold text-gray-900 md:text-base">
                                Looking Ahead: Crisis and Possibility
                            </h3>
                            <div className="space-y-4 text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]">
                                {lookingAheadParagraphs.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    )
}
