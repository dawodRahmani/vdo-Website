export default function AboutHero() {
    return (
        <section className="relative bg-gradient-to-br from-[#23369C] to-[#1a2875] py-24">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        About Us
                    </h1>
                    <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                        Vision Development Organization (VDO) is a women-led
                        national non-governmental organization established in
                        2015 with a clear mission: to empower women, youth, and
                        marginalized communities to lead change and build
                        resilient futures in Afghanistan.
                    </p>
                </div>
            </div>
        </section>
    )
}
