import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { ChevronRight, Grid3x3 } from 'lucide-react'

interface PageRow {
    id: number
    page_key: string
    page_label: string
    heading: string | null
}

interface PageProps {
    pages: PageRow[]
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Strategic Priorities', href: '/admin/strategic-priorities' },
]

export default function StrategicPrioritiesIndex({ pages }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Strategic Priorities" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Strategic Priorities</h1>
                    <p className="text-sm text-muted-foreground">
                        Each public strategic priorities page has its own admin page.
                    </p>
                </div>

                <Link
                    href="/admin/strategic-priorities/hub"
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)]">
                        <Grid3x3 className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                        <div className="font-semibold">Overview (Hub Cards)</div>
                        <div className="text-xs text-muted-foreground">
                            The 10 cards on /strategic-priorities — title, link, icon, description.
                        </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {pages.map((p) => (
                        <Link
                            key={p.id}
                            href={`/admin/strategic-priorities/page/${p.page_key}`}
                            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex-1">
                                <div className="font-semibold">{p.page_label}</div>
                                <div className="text-xs text-muted-foreground">
                                    /strategic-priorities/{p.page_key}
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
