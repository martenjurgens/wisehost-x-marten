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
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type ServerStatus = 'online' | 'offline' | 'starting' | 'stopping';

export interface UserServer {
    id: number;
    name: string;
    ip_address: string | null;
    status: ServerStatus;
    port: number;
    version: string;
    description: string | null;
}

export interface ServerMod {
    id: number;
    name: string;
    game_version: string;
    author: string | null;
    description: string | null;
    file_name: string;
    file_size: number;
    updated_at: string;
}

export interface Mod {
    id: number;
    name: string;
    game_version: string;
    author: string;
    description: string;
    updated_at: string;
    is_enabled: boolean;
}

export interface Server {
    id: number;
    name: string;
    version: string;
    status: ServerStatus;
    ip_address: string | null;
    port: number;
}

export interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
}
