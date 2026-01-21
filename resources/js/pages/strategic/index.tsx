import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StrategicHero from '@/components/strategic/strategic-hero'
import EducationSection from '@/components/strategic/education-section'
import EconomicGrowthSection from '@/components/strategic/economic-growth-section'
import UrbanDevelopmentSection from '@/components/strategic/urban-development-section'
import HealthNutritionSection from '@/components/strategic/health-nutrition-section'
import EmergencyResponseSection from '@/components/strategic/emergency-response-section'
import TargetGroupsSection from '@/components/strategic/target-groups-section'
import VdoContributionSection from '@/components/strategic/vdo-contribution-section'

interface StrategicProps {
    scrollTo?: string
}

export default function Strategic({ scrollTo }: StrategicProps) {
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
            <Head title="Strategic Priorities" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Hero Section */}
                <StrategicHero />

                {/* Education */}
                <EducationSection />

                {/* Economic Growth */}
                <EconomicGrowthSection />

                {/* Urban Development */}
                <UrbanDevelopmentSection />

                {/* Health and Nutrition */}
                <HealthNutritionSection />

                {/* Emergency Response */}
                <EmergencyResponseSection />

                {/* Target Groups */}
                <TargetGroupsSection />

                {/* VDO Contribution */}
                <VdoContributionSection />

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}
