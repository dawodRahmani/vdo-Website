import { PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import SiteFooter from '@/components/site-footer'

interface SiteLayoutProps {
    title: string
}

export default function SiteLayout({
    title,
    children,
}: PropsWithChildren<SiteLayoutProps>) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col bg-gray-50">
                <Header />
                <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
        </>
    )
}
