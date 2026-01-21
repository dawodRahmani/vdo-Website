import { Head } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Construction, ArrowLeft, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ComingSoonProps {
    section?: string
}

export default function ComingSoon({ section }: ComingSoonProps) {
    const sectionTitle = section || 'Media'

    return (
        <>
            <Head title={`${sectionTitle} - Coming Soon`} />

            <div className="flex min-h-screen flex-col bg-gray-50">
                <Header />

                <main className="flex flex-1 items-center justify-center px-4 py-20">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#23369C] to-[#00B7EC]">
                                <Construction className="h-12 w-12 text-white" />
                            </div>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold text-[#23369C] md:text-5xl">
                            Coming Soon
                        </h1>

                        <p className="mb-2 text-xl text-gray-600">
                            {sectionTitle}
                        </p>

                        <p className="mb-8 text-gray-500">
                            We're working hard to bring you this section. Stay
                            tuned for updates!
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="gap-2 border-[#23369C] text-[#23369C] hover:bg-[#23369C] hover:text-white"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 rounded-xl bg-gradient-to-r from-[#23369C]/5 to-[#00B7EC]/5 p-6">
                            <div className="mb-3 flex items-center justify-center gap-2 text-[#23369C]">
                                <Bell className="h-5 w-5" />
                                <span className="font-semibold">
                                    Want to be notified?
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Check back soon or contact us for updates on
                                when this section will be available.
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}
