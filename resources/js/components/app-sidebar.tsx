import { NavFooter } from '@/components/nav-footer';
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
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Building, Home, User, DollarSign, AlertCircle } from 'lucide-react';
import AppLogo from './app-logo';

// Common navigation items for all users
const commonNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

// Landlord-specific navigation items
const landlordNavItems: NavItem[] = [
    {
        title: 'My Properties',
        href: '/properties',
        icon: Building,
    },
    {
        title: 'Add Tenant',
        href: '/house-assignments/create',
        icon: User, 
    },
];

// Tenant-specific navigation items
const tenantNavItems: NavItem[] = [
    // {
    //     title: 'My House',
    //     href: '/tenant/my-house',
    //     icon: Home,
    // },
    // {
    //     title: 'Payments',
    //     href: '/payment-history',
    //     icon: DollarSign,
    // },
    // {
    //     title: 'Maintenance',
    //     href: 'maintenance',
    //     icon: AlertCircle,
    // },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { user_type: string } } }>().props;
    const user = auth.user;
    
    const getNavItems = (): NavItem[] => {
        switch (user.user_type) {
            case 'Landlord':
                return [...commonNavItems, ...landlordNavItems];
            case 'Tenant':
                return [...commonNavItems, ...tenantNavItems];
            case 'Admin':
            case 'Caretaker':
            case 'Agent':
                // You can add staff-specific navigation here
                return [...commonNavItems];
            default:
                return commonNavItems;
        }
    };

    const mainNavItems = getNavItems();

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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}