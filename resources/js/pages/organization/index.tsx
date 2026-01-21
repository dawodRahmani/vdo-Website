import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import OrganizationHero from '@/components/organization/organization-hero'
import OurCapacity from '@/components/organization/our-capacity'
import PoliciesSection from '@/components/organization/policies-section'
import ProgrammaticApproach from '@/components/organization/programmatic-approach'
import LocalizationFramework from '@/components/organization/localization-framework'
import StakeholderEngagement from '@/components/organization/stakeholder-engagement'
import GovernanceSection from '@/components/organization/governance-section'

interface OrganizationProps {
    scrollTo?: string
}

export default function Organization({ scrollTo }: OrganizationProps) {
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
            <Head title="Organization Capacity" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Hero Section */}
                <OrganizationHero />

                {/* Our Capacity */}
                <OurCapacity />

                {/* Policies Section */}
                <PoliciesSection />

                {/* Programmatic Approach */}
                <ProgrammaticApproach />

                {/* Localization Framework */}
                <LocalizationFramework />

                {/* Stakeholder Engagement */}
                <StakeholderEngagement />

                {/* Governance */}
                <GovernanceSection />

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}
