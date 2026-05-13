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
            <div className="flex min-h-screen flex-col bg-[rgb(189,191,193)] shadow-[inset_0_10px_12px_-6px_rgba(0,0,0,0.18),inset_0_-10px_12px_-6px_rgba(0,0,0,0.18)]">
                <Header />
                <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
        </>
    )
}
