import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';

interface CollapsibleGroup {
    title: string;
    icon?: LucideIcon;
    basePath: string;
    items: NavItem[];
}

export function NavCollapsible({
    group,
    label = 'Platform',
}: {
    group: CollapsibleGroup;
    label?: string;
}) {
    const page = usePage();
    const isOpen = page.url.startsWith(group.basePath);
    const Icon = group.icon;

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible defaultOpen={isOpen} className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                tooltip={{ children: group.title }}
                                isActive={isOpen}
                            >
                                {Icon && <Icon />}
                                <span>{group.title}</span>
                                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {group.items.map((item) => {
                                    const href =
                                        typeof item.href === 'string'
                                            ? item.href
                                            : item.href.url;
                                    return (
                                        <SidebarMenuSubItem key={item.title}>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={page.url === href}
                                            >
                                                <Link href={item.href} prefetch>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    );
                                })}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}
