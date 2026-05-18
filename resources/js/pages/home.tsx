import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import HeroFirstSection, {
    type HeroPhoto,
    type HeroSlide,
    type ImpactStat,
} from '@/components/hero-first-section'
import HomeSecondSection, {
    type LatestNewsItem,
    type PriorityArea,
    type RegionsImage,
} from '@/components/home-second-section'
import OurCommitment, {
    type CommitmentItem,
} from '@/components/our-commitment'
import SiteFooter from '@/components/site-footer'

interface HomeProps {
    heroPhotos?: HeroPhoto[]
    heroSlides?: HeroSlide[]
    impactStats?: ImpactStat[]
    priorityAreas?: PriorityArea[]
    homeCommitments?: CommitmentItem[]
    latestNews?: LatestNewsItem[]
    regionsImage?: RegionsImage
}

export default function Home({
    heroPhotos,
    heroSlides,
    impactStats,
    priorityAreas,
    homeCommitments,
    latestNews,
    regionsImage,
}: HomeProps) {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-gray-100 shadow-[inset_0_10px_12px_-6px_rgba(0,0,0,0.18),inset_0_-10px_12px_-6px_rgba(0,0,0,0.18)]">
                <Header />

                <HeroFirstSection
                    heroPhotos={heroPhotos}
                    heroSlides={heroSlides}
                    impactStats={impactStats}
                />

                <HomeSecondSection
                    priorityAreas={priorityAreas}
                    latestNews={latestNews}
                    regionsImage={regionsImage}
                />

                <OurCommitment commitments={homeCommitments} />

                <SiteFooter />
            </div>
        </>
    )
}
