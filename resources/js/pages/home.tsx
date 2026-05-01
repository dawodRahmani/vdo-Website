import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import HeroFirstSection from '@/components/hero-first-section'
import HomeSecondSection from '@/components/home-second-section'
import OurCommitment from '@/components/our-commitment'
import SiteFooter from '@/components/site-footer'

export default function Home() {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-gray-100 shadow-[inset_0_10px_12px_-6px_rgba(0,0,0,0.18),inset_0_-10px_12px_-6px_rgba(0,0,0,0.18)]">
                <Header />

                <HeroFirstSection />

                <HomeSecondSection />

                <OurCommitment />

                <SiteFooter />
            </div>
        </>
    )
}
