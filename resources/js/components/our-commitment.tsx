interface CommitmentItem {
    title: string
    svg: string
}

const items: CommitmentItem[] = [
    { title: 'Inclusivity', svg: '/svg/Missed Icons/Home page/14.svg' },
    { title: 'Accountability to Affected People', svg: '/svg/Missed Icons/Home page/15.svg' },
    { title: 'Humanitarian Principles', svg: '/svg/Missed Icons/Home page/16.svg' },
    { title: 'Impact & Sustainability', svg: '/svg/Missed Icons/Home page/17.svg' },
    { title: 'Prevention from Aid Diversion', svg: '/svg/Missed Icons/Home page/18.svg' },
]

export default function OurCommitment() {
    return (
        <section className="bg-gray-100 py-10 md:py-12">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <h2 className="mb-8 text-left text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                    Our Commitment:
                </h2>

                <div className="relative">
                    {/* Items */}
                    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
                        {items.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center px-1 text-center"
                            >
                                <img
                                    src={item.svg}
                                    alt={item.title}
                                    className="h-10 w-10 object-contain"
                                />
                                <p className="mt-2 whitespace-nowrap text-[10px] font-medium leading-snug text-[rgb(62,64,149)] md:text-[9px] lg:text-xs">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Dotted timeline with square markers */}
                    <div className="relative mt-2 hidden md:block">
                        <div
                            className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, rgb(0,175,239) 1px, transparent 1px)',
                                backgroundSize: '10px 2px',
                                backgroundRepeat: 'repeat-x',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div className="relative grid grid-cols-5">
                            {items.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex justify-center"
                                >
                                    <span className="h-2 w-2 border border-[rgb(0,175,239)] bg-white" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
