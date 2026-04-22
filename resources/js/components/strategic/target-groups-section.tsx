import { Users, Heart, Baby, UserCheck, Globe, Building2 } from 'lucide-react'

const primaryBeneficiaries = [
    { icon: Heart, label: 'Women and Girls' },
    { icon: Baby, label: 'Children' },
    { icon: Users, label: 'Youth' },
    { icon: UserCheck, label: 'People with Disabilities' },
    { icon: Users, label: 'IDPs and Returnees' },
    { icon: Users, label: 'Elderly and Vulnerable Households' },
]

const secondaryBeneficiaries = [
    {
        title: 'Community Leaders & Influencers',
        description:
            'Elders and religious figures supporting safe participation and positive social norms',
    },
    {
        title: 'Local Civil Society Organizations',
        description:
            'Women- and youth-led groups benefiting from capacity-building and advocacy',
    },
    {
        title: 'Private Sector & Employers',
        description:
            'Access to skilled jobseekers, apprenticeships, and inclusive employment',
    },
    {
        title: 'Government Bodies & Local Authorities',
        description:
            'Facilitating policy alignment, approvals, and safe community access',
    },
]

const tertiaryAudience = [
    'Funding partners and donors',
    'Afghan diaspora leaders',
    'Regional and global networks',
    'Researchers and academics',
    'Storytelling partners',
]

export default function TargetGroupsSection() {
    return (
        <section id="target-groups" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(62,64,149)]/10 px-4 py-2 text-sm font-semibold text-[rgb(62,64,149)]">
                        Who We Serve
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Target Groups
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        VDO's beneficiaries include vulnerable and underserved
                        groups across Afghanistan who directly and indirectly
                        receive support through its programs.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    {/* Primary Beneficiaries */}
                    <div className="mb-12">
                        <h3 className="mb-6 text-center text-xl font-bold text-[rgb(62,64,149)]">
                            Primary Beneficiaries
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            {primaryBeneficiaries.map((group, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(62,64,149)]">
                                        <group.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-center text-sm font-medium text-gray-700">
                                        {group.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src="/images/strategic/image6.png"
                            alt="VDO Target Groups"
                            className="h-auto w-full"
                        />
                    </div>

                    {/* Secondary Beneficiaries */}
                    <div className="mb-12 rounded-xl bg-[rgb(62,64,149)] p-8 text-white">
                        <h3 className="mb-6 text-xl font-bold">
                            Secondary Beneficiaries
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {secondaryBeneficiaries.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg bg-white/10 p-4"
                                >
                                    <h4 className="mb-2 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-white/80">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tertiary Audience */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                        <div className="mb-4 flex items-center gap-3">
                            <Globe className="h-6 w-6 text-[rgb(0,175,239)]" />
                            <h3 className="text-xl font-bold text-[rgb(62,64,149)]">
                                Tertiary Audience
                            </h3>
                        </div>
                        <p className="mb-4 text-gray-600">
                            The tertiary audience contributes through funding,
                            advocacy, and technical collaboration:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tertiaryAudience.map((item, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-[rgb(0,175,239)]/10 px-4 py-2 text-sm font-medium text-[rgb(0,175,239)]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
