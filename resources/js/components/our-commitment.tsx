interface CommitmentItem {
    title: string
    svg: string
}

const items: CommitmentItem[] = [
    { title: 'Inclusivity', svg: '/svg/Home Page/14.svg' },
    { title: 'Accountability to Affected People', svg: '/svg/Home Page/15.svg' },
    { title: 'Humanitarian Principles', svg: '/svg/Home Page/16.svg' },
    { title: 'Impact & Sustainability', svg: '/svg/Home Page/17.svg' },
    { title: 'Prevention from Aid Diversion', svg: '/svg/Home Page/18.svg' },
]

export default function OurCommitment() {
    return (
        <section className="bg-gray-100 py-12 md:py-16">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <h2 className="mb-10 text-center text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                    Our Commitment:
                </h2>

                <div className="relative">
                    {/* Items */}
                    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
                        {items.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center px-2 text-center"
                            >
                                <img
                                    src={item.svg}
                                    alt={item.title}
                                    className="h-10 w-10 object-contain"
                                />
                                <p className="mt-3 text-xs font-medium leading-snug text-[rgb(62,64,149)] md:text-sm">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Dotted timeline with square markers */}
                    <div className="relative mt-6 hidden md:block">
                        <div className="absolute inset-x-0 top-1/2 border-t-2 border-dotted border-[rgb(0,175,239)]" />
                        <div className="relative grid grid-cols-5">
                            {items.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex justify-center"
                                >
                                    <span className="h-2.5 w-2.5 bg-[rgb(0,175,239)]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
