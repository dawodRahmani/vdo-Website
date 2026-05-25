import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import HeroFirstSection, {
    type HeroPhoto,
    type HeroSlide,
    type ImpactStat,
} from '@/components/hero-first-section'
import HomeSecondSection, {
    type LatestNewsItem,
    type PrioritiesSection,
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
    prioritiesSection?: PrioritiesSection
    homeCommitments?: CommitmentItem[]
    homeCommitmentsLineGap?: number
    latestNews?: LatestNewsItem[]
    regionsImage?: RegionsImage
}

export default function Home({
    heroPhotos,
    heroSlides,
    impactStats,
    priorityAreas,
    prioritiesSection,
    homeCommitments,
    homeCommitmentsLineGap,
    latestNews,
    regionsImage,
}: HomeProps) {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-[rgb(245,245,245)]">
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
                    prioritiesSection={prioritiesSection}
                />

                <OurCommitment
                    commitments={homeCommitments}
                    lineGap={homeCommitmentsLineGap}
                />

                <SiteFooter />
            </div>
        </>
    )
}
