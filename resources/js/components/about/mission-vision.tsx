import { Target, Eye } from 'lucide-react'

export default function MissionVision() {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Mission */}
                        <div className="rounded-2xl bg-white p-8 shadow-xl">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(62,64,149)]">
                                    <Target className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-[rgb(62,64,149)]">
                                    Our Mission
                                </h3>
                            </div>
                            <p className="leading-relaxed text-gray-700">
                                To deliver impactful humanitarian assistance and
                                drive sustainable development by empowering
                                vulnerable communities in Afghanistan. We work
                                for all Afghanistan with a particular focus on
                                women and children, to ensure everyone reaches
                                their full potential and contributes to the
                                development of their communities. We achieve
                                this by addressing the education, healthcare,
                                social, and economic needs of our target groups,
                                while promoting resilience, equality, and human
                                rights.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="rounded-2xl bg-[rgb(62,64,149)] p-8 shadow-xl">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                                    <Eye className="h-7 w-7 text-[rgb(62,64,149)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    Our Vision
                                </h3>
                            </div>
                            <p className="leading-relaxed text-white/90">
                                A prosperous and inclusive Afghanistan where
                                every community has the opportunity to thrive in
                                dignity, peace, and sustainability.
                            </p>

                            <div className="mt-8 rounded-lg bg-white/10 p-4">
                                <p className="text-sm italic text-white/80">
                                    "Building resilient futures for women,
                                    youth, and marginalized communities across
                                    Afghanistan."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
