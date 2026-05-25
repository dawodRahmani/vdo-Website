import { PropsWithChildren } from 'react'
import { Head, usePage } from '@inertiajs/react'
import Header from '@/components/header'
import SiteFooter from '@/components/site-footer'

interface SiteLayoutProps {
    title: string
}

interface PageWithBackground {
    pageBackground?: string
    [key: string]: unknown
}

export default function SiteLayout({
    title,
    children,
}: PropsWithChildren<SiteLayoutProps>) {
    const { pageBackground } = usePage<PageWithBackground>().props
    const bgColor = pageBackground ?? 'rgb(245,245,245)'

    return (
        <>
            <Head title={title} />
            <div
                className="flex min-h-screen flex-col"
                style={{ backgroundColor: bgColor }}
            >
                <Header />
                <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
        </>
    )
}
