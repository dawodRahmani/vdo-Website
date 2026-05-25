import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SiteSettings {
    logo_url: string | null;
    logo_height: number | null;
    logo_offset_x: number | null;
    logo_offset_y: number | null;
    contact_phone: string | null;
    contact_email: string | null;
    social_facebook_url: string | null;
    social_twitter_url: string | null;
    social_linkedin_url: string | null;
    social_youtube_url: string | null;
    newsletter_heading: string | null;
    donate_button_text: string | null;
    donate_button_url: string | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    siteSettings: SiteSettings;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Region {
    id: number;
    name: string;
    label: string | null;
    slug: string;
    description: string;
    color: string;
    svg_path: string;
    label_x: number;
    label_y: number;
    label_two_line: boolean;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface MapPin {
    id: number;
    name: string;
    region_label: string;
    description: string | null;
    stats: string | null;
    x: number;
    y: number;
    color: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface EducationDonutSegment {
    id: number;
    label: string;
    percent: number;
    color: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
