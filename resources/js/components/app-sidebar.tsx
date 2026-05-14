import { NavCollapsible } from '@/components/nav-collapsible';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    Film,
    HandHeart,
    Home,
    Images,
    Info,
    LayoutGrid,
    Newspaper,
    PanelBottom,
    PanelTop,
    Mail,
    MapPin,
    Shield,
    ShieldCheck,
    Target,
} from 'lucide-react';
import AppLogo from './app-logo';

const baseNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Home Page',
        href: '/admin/home-page',
        icon: Home,
    },
    {
        title: 'About Page',
        href: '/admin/about-page',
        icon: Info,
    },
    {
        title: 'News & Announcements',
        href: '/admin/news',
        icon: Newspaper,
    },
    {
        title: 'Hero Sections',
        href: '/admin/hero-sections',
        icon: Images,
    },
    {
        title: 'Donate',
        href: '/admin/donate',
        icon: HandHeart,
    },
    {
        title: 'Media',
        href: '/admin/media',
        icon: Film,
    },
    {
        title: 'Opportunities',
        href: '/admin/opportunities',
        icon: Briefcase,
    },
    {
        title: 'Our Commitment',
        href: '/admin/commitments',
        icon: Shield,
    },
    {
        title: 'Where We Work',
        href: '/admin/work-regions',
        icon: MapPin,
    },
    {
        title: 'Email Settings',
        href: '/admin/mail-settings',
        icon: Mail,
    },
];

const strategicPrioritiesItems: NavItem[] = [
    { title: 'Overview (Hub Cards)', href: '/admin/strategic-priorities/hub' },
    { title: 'Education', href: '/admin/strategic-priorities/page/education' },
    {
        title: 'Economic Growth',
        href: '/admin/strategic-priorities/page/economic-growth',
    },
    {
        title: 'Rural Development',
        href: '/admin/strategic-priorities/page/rural-development',
    },
    {
        title: 'Health and Nutrition',
        href: '/admin/strategic-priorities/page/health-and-nutrition',
    },
    {
        title: 'Emergency Response',
        href: '/admin/strategic-priorities/page/emergency-response',
    },
    {
        title: 'Cross-Cutting Areas',
        href: '/admin/strategic-priorities/page/cross-cutting-areas',
    },
    {
        title: 'Target Group',
        href: '/admin/strategic-priorities/page/target-group',
    },
    {
        title: 'Secondary Beneficiaries',
        href: '/admin/strategic-priorities/page/secondary-beneficiaries',
    },
    {
        title: 'Tertiary Audience',
        href: '/admin/strategic-priorities/page/tertiary-audience',
    },
    {
        title: 'Contribution Project',
        href: '/admin/strategic-priorities/page/contribution-project',
    },
];

const resilienceItems: NavItem[] = [
    { title: 'Our Capacity', href: '/admin/resilience/capacities' },
    { title: 'Policies', href: '/admin/resilience/policies' },
    {
        title: 'Programmatic Approach',
        href: '/admin/resilience/programmatic-approach',
    },
    {
        title: 'Collective Resilience',
        href: '/admin/resilience/collective-resilience',
    },
];

const siteLayoutNavItems: NavItem[] = [
    {
        title: 'Header',
        href: '/admin/site/header',
        icon: PanelTop,
    },
    {
        title: 'Footer',
        href: '/admin/site/footer',
        icon: PanelBottom,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.user?.role === 'admin';
    const items = isAdmin ? [...baseNavItems, ...adminNavItems] : baseNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={items} />
                {isAdmin && (
                    <NavCollapsible
                        label="Pages"
                        group={{
                            title: 'Strategic Priorities',
                            icon: Target,
                            basePath: '/admin/strategic-priorities',
                            items: strategicPrioritiesItems,
                        }}
                    />
                )}
                {isAdmin && (
                    <NavCollapsible
                        label=" "
                        group={{
                            title: "VDO's Resilience",
                            icon: ShieldCheck,
                            basePath: '/admin/resilience',
                            items: resilienceItems,
                        }}
                    />
                )}
                {isAdmin && (
                    <NavMain
                        label="Header & Footer"
                        items={siteLayoutNavItems}
                    />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
