import { ArrowRight } from 'lucide-react'

interface WorkItem {
    id: number
    title: string
    category: string
    description: string
    image: string
    link: string
}

const workItems: WorkItem[] = [
    {
        id: 1,
        title: 'Community Health Initiative',
        category: 'Healthcare',
        description:
            'Providing essential healthcare services to remote communities across Afghanistan.',
        image: '/images/1.jpg',
        link: '/projects/health-initiative',
    },
    {
        id: 2,
        title: 'Education for All Program',
        category: 'Education',
        description:
            'Empowering youth through accessible education and skill development programs.',
        image: '/images/2.jpg',
        link: '/projects/education-program',
    },
    {
        id: 3,
        title: 'Women Empowerment Project',
        category: 'Empowerment',
        description:
            'Supporting Afghan women with vocational training and economic opportunities.',
        image: '/images/3.jpg',
        link: '/projects/women-empowerment',
    },
]

export default function LatestWork() {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[rgb(0,175,239)]">
                        Our Projects
                    </p>
                    <h2 className="mb-4 text-3xl font-bold text-[rgb(62,64,149)] md:text-4xl">
                        Latest Work
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Discover our recent projects making a real difference in
                        communities across Afghanistan
                    </p>
                </div>

                {/* Work Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {workItems.map((item) => (
                        <article
                            key={item.id}
                            className="group overflow-hidden rounded-2xl bg-gray-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Category Badge */}
                                <span className="absolute left-4 top-4 rounded-full bg-[rgb(0,175,239)] px-4 py-1 text-xs font-semibold text-white">
                                    {item.category}
                                </span>
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-bold text-[rgb(62,64,149)] transition-colors group-hover:text-[rgb(0,175,239)]">
                                    {item.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                    {item.description}
                                </p>
                                <a
                                    href={item.link}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(0,175,239)] transition-colors hover:text-[rgb(62,64,149)]"
                                >
                                    Learn More
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <a
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-lg bg-[rgb(62,64,149)] px-8 py-3 font-semibold text-white transition-all hover:bg-[rgb(62,64,149)]/90 hover:shadow-lg"
                    >
                        View All Projects
                        <ArrowRight className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    )
}
