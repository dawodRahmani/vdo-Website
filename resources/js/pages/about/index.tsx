import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AboutHero from '@/components/about/about-hero'
import ExecutiveSummary from '@/components/about/executive-summary'
import HistorySection from '@/components/about/history-section'
import MissionVision from '@/components/about/mission-vision'
import LookingAhead from '@/components/about/looking-ahead'
import BestPractices from '@/components/about/best-practices'
import StrengthSection from '@/components/about/strength-section'

interface AboutProps {
    scrollTo?: string
}

export default function About({ scrollTo }: AboutProps) {
    useEffect(() => {
        // Handle scrollTo prop from server
        if (scrollTo) {
            const element = document.getElementById(scrollTo)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }

        // Handle hash in URL (client-side navigation)
        const hash = window.location.hash.replace('#', '')
        if (hash) {
            const element = document.getElementById(hash)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }
    }, [scrollTo])

    return (
        <>
            <Head title="About Us" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Hero Section */}
                <AboutHero />

                {/* Executive Summary */}
                <ExecutiveSummary />

                {/* Mission & Vision */}
                <MissionVision />

                {/* History Section */}
                <HistorySection />

                {/* Looking Ahead */}
                <LookingAhead />

                {/* Best Practices */}
                <BestPractices />

                {/* VDO Strength */}
                <StrengthSection />

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}
