import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building, Home, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface DashboardStats {
    total_properties: number;
    total_houses: number;
    occupied_houses: number;
    vacant_houses: number;
    total_tenants: number;
    monthly_revenue: number;
    occupancy_rate: number;
    recent_payments: number;
}

interface Props {
    stats?: DashboardStats; // Make stats optional
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Default stats in case they're not provided
const defaultStats: DashboardStats = {
    total_properties: 0,
    total_houses: 0,
    occupied_houses: 0,
    vacant_houses: 0,
    total_tenants: 0,
    monthly_revenue: 0,
    occupancy_rate: 0,
    recent_payments: 0,
};

export default function Dashboard({ stats = defaultStats }: Props) {
    // Use provided stats or default stats
    const dashboardStats = stats || defaultStats;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const StatCard = ({ 
        title, 
        value, 
        icon: Icon, 
        change, 
        color = 'black',
        href 
    }: {
        title: string;
        value: string | number;
        icon: any;
        change?: string;
        color?: 'black' | 'blue' | 'green' | 'red' | 'purple' | 'orange';
        href?: string;
    }) => {
        const colorClasses = {
            black: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-900',
            blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-900',
            green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-900',
            red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-900',
            purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-900',
            orange: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-orange-900',
        };

        const iconBgClasses = {
            black: 'bg-white bg-opacity-80',
            blue: 'bg-white bg-opacity-80',
            green: 'bg-white bg-opacity-80',
            red: 'bg-white bg-opacity-80',
            purple: 'bg-white bg-opacity-80',
            orange: 'bg-white bg-opacity-80',
        };

        const content = (
            <div className={`p-6 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-md hover:shadow-gray-200/50 group`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium opacity-80">{title}</p>
                        <p className="text-2xl font-bold mt-2 group-hover:scale-105 transition-transform">{value}</p>
                        {change && (
                            <p className="text-xs mt-1 opacity-70">{change}</p>
                        )}
                    </div>
                    <div className={`p-3 rounded-full ${iconBgClasses[color]} shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        );

        if (href) {
            return (
                <Link href={href} className="block">
                    {content}
                </Link>
            );
        }

        return content;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Properties"
                        value={dashboardStats.total_properties}
                        icon={Building}
                        color="black"
                        href="/properties"
                        change="Active Properties"
                    />
                    <StatCard
                        title="Total Houses"
                        value={dashboardStats.total_houses}
                        icon={Home}
                        color="black"
                        change={`${dashboardStats.occupied_houses} occupied`}
                    />
                    <StatCard
                        title="Active Tenants"
                        value={dashboardStats.total_tenants}
                        icon={Users}
                        color="black"
                        change="Currently renting"
                    />
                    <StatCard
                        title="Monthly Revenue"
                        value={formatCurrency(dashboardStats.monthly_revenue)}
                        icon={DollarSign}
                        color="black"
                        change="Expected Revenue This Month"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3 text-sm">
                            <Link
                                href="/properties/create"
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-gray-100">
                                        <Building className="w-4 h-4 text-gray-700" />
                                    </div>
                                    <span className="font-medium text-gray-900">Add New Property</span>
                                </div>
                                <span className="text-gray-600 font-bold">+</span>
                            </Link>
                            <Link
                                href="/house-assignments/create"
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-gray-100">
                                        <Users className="w-4 h-4 text-gray-700" />
                                    </div>
                                    <span className="font-medium text-gray-900">Assign Tenant</span>
                                </div>
                                <span className="text-gray-600 font-bold">+</span>
                            </Link>
                            <Link
                                href="/houses/create"
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-gray-100">
                                        <Home className="w-4 h-4 text-gray-700" />
                                    </div>
                                    <span className="font-medium text-gray-900">Add New House</span>
                                </div>
                                <span className="text-gray-600 font-bold">+</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Occupancy Progress</span>
                                    <span className="font-medium text-gray-900">{dashboardStats.occupancy_rate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-gray-700 to-gray-900 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${dashboardStats.occupancy_rate}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center p-3 rounded-lg bg-white/80 border border-gray-200">
                                    <div className="font-bold text-gray-900">{dashboardStats.occupied_houses}</div>
                                    <div className="text-gray-600">Occupied</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-white/80 border border-gray-200">
                                    <div className="font-bold text-gray-900">{dashboardStats.vacant_houses}</div>
                                    <div className="text-gray-600">Vacant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}