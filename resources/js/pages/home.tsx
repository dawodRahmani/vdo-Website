import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import HeroFirstSection from '@/components/hero-first-section'
import HomeSecondSection from '@/components/home-second-section'
import OurCommitment from '@/components/our-commitment'
import SiteFooter from '@/components/site-footer'
import { Region } from '@/types'

interface HomeProps {
    canRegister?: boolean
    regions: Region[]
}

export default function Home({ canRegister, regions }: HomeProps) {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-gray-100">
                <Header />

                {/* Hero / First Section */}
                <HeroFirstSection />

                {/* Second Section — Map + Priority Areas + Lists + News */}
                <HomeSecondSection regions={regions} />

                {/* Our Commitment — final home-page section */}
                <OurCommitment />

                {/* Footer — newsletter + contact */}
                <SiteFooter />
            </div>
        </>
    )
}
