import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { map as adminMap } from '@/routes/admin';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChartPie, Map, Workflow } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {isAdmin && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <Link
                            href={adminMap()}
                            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                        >
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)] group-hover:bg-[rgb(0,175,239)] group-hover:text-white">
                                <Map className="h-6 w-6" />
                            </span>
                            <div>
                                <h3 className="font-semibold">
                                    Map Configuration
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Edit region colors, labels, and pin
                                    positions on the homepage map.
                                </p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/diagrams/leadership-roles"
                            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                        >
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(62,64,149)]/10 text-[rgb(62,64,149)] group-hover:bg-[rgb(62,64,149)] group-hover:text-white">
                                <Workflow className="h-6 w-6" />
                            </span>
                            <div>
                                <h3 className="font-semibold">
                                    Diagrams · Leadership Roles
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Edit the leadership-roles diagram on the
                                    About page — pins, colors, icons, order.
                                </p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/diagrams/education-segments"
                            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                        >
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(0,175,239)]/10 text-[rgb(0,175,239)] group-hover:bg-[rgb(0,175,239)] group-hover:text-white">
                                <ChartPie className="h-6 w-6" />
                            </span>
                            <div>
                                <h3 className="font-semibold">
                                    Diagrams · Education Donut
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Edit the education target-group donut on
                                    the Education page — labels, percentages,
                                    colors.
                                </p>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
