import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

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
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface InfoPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  company_name: string;
  meta_title: string;
  meta_description: string;
  email: string;
  website: string;
  map_embed_code: string;

  phones: {
    label: string;
    number: string;
  }[];

  addresses: {
    label: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
  }[];

  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}
