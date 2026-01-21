import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CommitmentHero from '@/components/commitment/commitment-hero'
import InclusivitySection from '@/components/commitment/inclusivity-section'
import AapSection from '@/components/commitment/aap-section'
import SafeguardingSection from '@/components/commitment/safeguarding-section'
import PseahSection from '@/components/commitment/pseah-section'
import AntiFraudSection from '@/components/commitment/anti-fraud-section'
import EffectivenessSection from '@/components/commitment/effectiveness-section'
import ImpactSection from '@/components/commitment/impact-section'
import AidDiversionSection from '@/components/commitment/aid-diversion-section'
import HumanitarianPrinciplesSection from '@/components/commitment/humanitarian-principles-section'

interface CommitmentProps {
    scrollTo?: string
}

export default function Commitment({ scrollTo }: CommitmentProps) {
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
            <Head title="Our Commitment" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Hero Section */}
                <CommitmentHero />

                {/* Inclusivity */}
                <InclusivitySection />

                {/* Accountability to Affected Populations */}
                <AapSection />

                {/* Safeguarding */}
                <SafeguardingSection />

                {/* PSEAH */}
                <PseahSection />

                {/* Anti-Fraud & Transparency */}
                <AntiFraudSection />

                {/* Effectiveness & Efficiency */}
                <EffectivenessSection />

                {/* Impact & Sustainability */}
                <ImpactSection />

                {/* Prevention from Aid Diversion */}
                <AidDiversionSection />

                {/* Humanitarian Principles */}
                <HumanitarianPrinciplesSection />

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}
