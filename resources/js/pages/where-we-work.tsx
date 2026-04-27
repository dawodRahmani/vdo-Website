import { Fragment } from 'react'
import SiteLayout from '@/layouts/site-layout'
import PhotoStrip from '@/components/photo-strip'
import { Play } from 'lucide-react'

const photos = [
    {
        src: '/Header and Gallary Photos/04.jpg',
        alt: 'Community engagement',
    },
    {
        src: '/Header and Gallary Photos/10.jpg',
        alt: 'Regional programs',
    },
    {
        src: '/Header and Gallary Photos/18.jpg',
        alt: 'Women-led initiatives',
    },
]

interface Region {
    id: string
    title: string
    subtitle: string
    mapSvg: string
    paragraphs: string[]
    mapOnRight?: boolean
}

const regions: Region[] = [
    {
        id: 'central',
        title: 'Central Region:',
        subtitle: "VDO's Work in the Central Region",
        mapSvg: '/svg/Where We Work/01.svg',
        paragraphs: [
            'VDO is committed to improving lives in the central region through education, economic growth, urban development, and emergency response.',
            'In education, VDO expands urban school access, ensuring children in underserved areas can learn and thrive. For economic growth, the organization supports MSMEs, helping small businesses grow, create jobs, and strengthen local livelihoods. In urban development, VDO addresses challenges like flooding by improving infrastructure and promoting resilient, livable communities. Additionally, VDO provides emergency response support to vulnerable populations, helping communities recover and build resilience.',
            'Through these integrated efforts, VDO empowers communities, fosters inclusive growth, and strengthens resilience across the central region.',
        ],
    },
    {
        id: 'northeastern',
        title: 'North Eastern Region:',
        subtitle: "VDO's Impact in the Northern Region",
        mapSvg: '/svg/Where We Work/02.svg',
        mapOnRight: true,
        paragraphs: [
            'VDO empowers communities in the northern region through integrated interventions in education, economic growth, urban development, and health. The organization improves access to schools in underserved rural areas, supports MSMEs and TVET training for youth, and strengthens resilience in drought-prone provinces. In health and nutrition, VDO raises awareness on COVID-19, nutrition, and menstrual hygiene, trains frontline workers, conducts nutrition sessions, and provides dignity kits and women- and girls-friendly spaces for recreational activities and GBV awareness. Through these efforts, VDO enhances livelihoods, health, and community resilience, ensuring no one is left behind.',
        ],
    },
    {
        id: 'eastern',
        title: 'Eastern Region:',
        subtitle: "VDO's Work in the Eastern Region",
        mapSvg: '/svg/Where We Work/03.svg',
        paragraphs: [
            'VDO empowers communities in the eastern region through integrated programs in education, economic growth, urban development, and health. The organization supports children in crisis-affected areas to continue learning, provides MSME support and TVET training to boost livelihoods, and strengthens flood-affected communities through resilient urban development initiatives.',
            "In health and nutrition, VDO's Integrated Health–Nutrition–Immunization Project addresses vaccine misconceptions, promotes positive health behaviors, and increases caregivers' understanding and acceptance of immunization and nutrition services, improving child health outcomes.",
            'Through these interventions, VDO enhances education, economic opportunities, health, and resilience, ensuring that vulnerable populations in the eastern region are supported to thrive.',
        ],
    },
    {
        id: 'western',
        title: 'Western Region:',
        subtitle: "VDO's Work in the Western Region",
        mapSvg: '/svg/Where We Work/04.svg',
        mapOnRight: true,
        paragraphs: [
            'VDO empowers communities in the western region through integrated programs in education, economic growth, urban development, and health and nutrition. The organization provides education support to ensure children and youth access quality learning opportunities, helping them build knowledge and skills for the future.',
            'In economic growth, VDO equips women and youth with startup kits, small business grants, financial literacy training, and TVET and market-aligned skills development. Through mentorship, coaching, and the WAQAR Career Center, participants gain the tools, guidance, and opportunities needed to launch or expand businesses and secure meaningful employment, strengthening local economies and promoting financial independence.',
            'VDO also supports drought-prone provinces through urban development initiatives, including infrastructure improvements and sustainable planning, to build resilient communities capable of withstanding environmental challenges.',
            "In health and nutrition, VDO works to improve community well-being by raising awareness on key health issues, providing nutrition services, and supporting families with access to essential health resources. These interventions strengthen caregivers' knowledge, promote healthy behaviors, and improve overall child and community health outcomes.",
            'Through these integrated efforts, VDO strengthens livelihoods, education, urban resilience, and health, creating lasting impact for vulnerable populations in the western region.',
        ],
    },
    {
        id: 'southern',
        title: 'Southern Region:',
        subtitle: "VDO's Work in the Southern Region",
        mapSvg: '/svg/Where We Work/05.svg',
        paragraphs: [
            'VDO empowers communities in the southern region through integrated programs in education, economic growth, urban development, emergency response, and health and nutrition. Working with local partners, the organization ensures that vulnerable populations, especially women, youth, and children, receive the support they need to thrive.',
            'In education, VDO improves access to learning opportunities for children and youth in underserved and crisis-affected areas. In economic growth, the organization supports MSMEs and provides TVET training, startup kits, small business grants, and mentorship, helping participants launch sustainable businesses and gain meaningful employment.',
            'VDO strengthens urban development and resilience in drought- and disaster-prone areas through infrastructure improvements, sustainable planning, and community-based risk reduction. In health and nutrition, partner-led initiatives raise awareness on vaccines, nutrition, and hygiene, while supporting women and girls with safe spaces and essential services.',
            'Through these integrated interventions, VDO builds resilient communities, strengthens livelihoods, improves health outcomes, and ensures that vulnerable populations in the southern region are empowered to thrive.',
        ],
    },
    {
        id: 'northwestern',
        title: 'North-Western Region:',
        subtitle: "VDO's Work in the North-Western Region",
        mapSvg: '/svg/Where We Work/06.svg',
        mapOnRight: true,
        paragraphs: [
            'VDO, through its local partners, supports communities in the north-western region across education, economic growth, urban development, emergency response, and health and nutrition. The organization focuses on empowering women, youth, and children, helping communities become more resilient.',
            'In education, VDO improves access to learning for children and youth in underserved and crisis-affected areas. In economic growth, it provides MSME support, TVET training, startup kits, and small business grants, enabling sustainable livelihoods and job opportunities.',
            'VDO strengthens urban resilience in drought- and disaster-prone areas through infrastructure improvements and sustainable planning. In health and nutrition, partner-led programs address vaccine misconceptions, promote positive health practices, and provide women and girls with safe spaces and essential services.',
            'Through these efforts, VDO enhances livelihoods, education, health, and community resilience in the north-western region.',
        ],
    },
]

function VideoPlaceholder() {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-300/80 shadow-sm">
            <button
                type="button"
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center"
            >
                <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-red-600 text-white shadow-md transition-transform hover:scale-105">
                    <Play className="h-6 w-6 fill-current" />
                </span>
            </button>
        </div>
    )
}

export default function WhereWeWork() {
    return (
        <SiteLayout title="Where We Work">
            <PhotoStrip photos={photos} />

            <section className="bg-gray-100 pb-14">
                <div className="mx-auto max-w-[1240px] space-y-8 px-6 py-8 md:px-10 lg:px-14">
                    {regions.map((region, index) => (
                        <Fragment key={region.id}>
                            {index > 0 && (
                                <div
                                    aria-hidden
                                    className="border-t-2 border-dotted border-[rgb(0,175,239)]"
                                />
                            )}
                            <article
                                id={region.id}
                                className="relative scroll-mt-24 overflow-hidden rounded-xl px-4 py-6 md:px-6 md:py-8"
                            style={{
                                backgroundImage: 'url(/svg/Map.svg)',
                                backgroundSize: '100% auto',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <h2 className="text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                                {region.title}
                            </h2>
                            <h3 className="mt-1 text-sm font-bold text-gray-900 md:text-base">
                                {region.subtitle}
                            </h3>
                            <div className="mt-4 space-y-4">
                                {region.paragraphs.map((p, i) => (
                                    <p
                                        key={i}
                                        className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]"
                                    >
                                        {p}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-6 grid items-center gap-4 md:grid-cols-2">
                                {region.mapOnRight ? (
                                    <>
                                        <VideoPlaceholder />
                                        <img
                                            src={region.mapSvg}
                                            alt={`Afghanistan — ${region.title.replace(':', '')} highlighted`}
                                            className="h-auto w-full"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={region.mapSvg}
                                            alt={`Afghanistan — ${region.title.replace(':', '')} highlighted`}
                                            className="h-auto w-full"
                                        />
                                        <VideoPlaceholder />
                                    </>
                                )}
                            </div>
                            </article>
                        </Fragment>
                    ))}
                </div>
            </section>
        </SiteLayout>
    )
}
