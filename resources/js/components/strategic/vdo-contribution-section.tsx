import { Award, Target, Heart, Globe } from 'lucide-react'

export default function VdoContributionSection() {
    return (
        <section id="vdo-contribution" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[rgb(0,175,239)]/10 px-4 py-2 text-sm font-semibold text-[rgb(0,175,239)]">
                        Our Impact
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        VDO Contribution Project
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    {/* Main Content */}
                    <div className="mb-12 rounded-2xl bg-gradient-to-br from-[rgb(62,64,149)] to-[rgb(0,175,239)] p-8 text-white shadow-xl md:p-12">
                        <p className="mb-8 text-lg leading-relaxed text-white/90">
                            VDO's contribution projects represent our commitment
                            to creating lasting, sustainable impact across
                            Afghanistan. Through innovative approaches and
                            community-centered programming, we address the most
                            pressing needs while building long-term resilience.
                        </p>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="rounded-xl bg-white/10 p-6">
                                <Award className="mb-3 h-8 w-8 text-yellow-300" />
                                <h3 className="mb-2 text-lg font-bold">
                                    Excellence in Delivery
                                </h3>
                                <p className="text-sm text-white/80">
                                    Maintaining highest standards of program
                                    quality and accountability
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-6">
                                <Target className="mb-3 h-8 w-8 text-green-300" />
                                <h3 className="mb-2 text-lg font-bold">
                                    Targeted Impact
                                </h3>
                                <p className="text-sm text-white/80">
                                    Reaching the most vulnerable and underserved
                                    communities
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-6">
                                <Heart className="mb-3 h-8 w-8 text-red-300" />
                                <h3 className="mb-2 text-lg font-bold">
                                    Community Trust
                                </h3>
                                <p className="text-sm text-white/80">
                                    Building lasting relationships based on
                                    respect and transparency
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-6">
                                <Globe className="mb-3 h-8 w-8 text-blue-300" />
                                <h3 className="mb-2 text-lg font-bold">
                                    National Reach
                                </h3>
                                <p className="text-sm text-white/80">
                                    Operating across all 34 provinces of
                                    Afghanistan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Images */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="overflow-hidden rounded-xl shadow-lg">
                            <img
                                src="/images/strategic/image7.png"
                                alt="VDO Contribution Impact"
                                className="h-auto w-full"
                            />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-lg">
                            <img
                                src="/images/strategic/image8.png"
                                alt="VDO Community Programs"
                                className="h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
