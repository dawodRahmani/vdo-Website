export default function OrganizationHero() {
    return (
        <section className="relative bg-gradient-to-br from-[rgb(62,64,149)] to-[rgb(62,64,149)] py-24">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Organization Capacity
                    </h1>
                    <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                        VDO maintains comprehensive institutional systems,
                        policies, and frameworks that enable effective,
                        accountable, and principled humanitarian and development
                        programming across Afghanistan.
                    </p>
                </div>
            </div>
        </section>
    )
}
