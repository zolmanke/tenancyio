// resources/js/pages/tenant/Dashboard.tsx

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Home, DollarSign, Calendar, FileText, AlertCircle, CheckCircle, Clock, Copy, User } from 'lucide-react';

interface User {
    id: number;
    uuid: string; // UUID comes from user data
    name: string;
    email: string;
}

interface House {
    id: number;
    house_no: string;
    type: string;
    floor: string;
    price: number;
    description?: string;
    property: {
        id: number;
        name: string;
        address: string;
    };
}

interface HouseAssignment {
    id: number;
    lease_start_date: string;
    lease_end_date?: string;
    rent_amount: number;
    payment_frequency: string;
    security_deposit: number;
    house: House;
}

interface PaymentHistory {
    total_paid: number;
    last_payment: string | null;
    next_payment_due: string | null;
}

interface MaintenanceRequests {
    pending: number;
    resolved: number;
    recent: any[];
}

interface Stats {
    has_active_lease: boolean;
    current_rent: number;
    days_until_next_payment: number;
    lease_days_remaining: number | null;
}

interface Props {
    currentAssignment: HouseAssignment | null;
    paymentHistory: PaymentHistory;
    maintenanceRequests: MaintenanceRequests;
    stats: Stats;
    auth: { // Add auth object to access user data
        user: User;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenant Dashboard',
        href: dashboard().url,
    },
];

export default function TenantDashboard({ 
    currentAssignment, 
    paymentHistory, 
    maintenanceRequests, 
    stats,
    auth 
}: Props) {
    const [copied, setCopied] = React.useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calculate whole number days
    const getDaysUntilNextPayment = () => {
        return Math.floor(stats.days_until_next_payment);
    };

    const getLeaseDaysRemaining = () => {
        return stats.lease_days_remaining ? Math.floor(stats.lease_days_remaining) : null;
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
        } catch (err) {
            console.error('Failed to copy UUID: ', err);
        }
    };

    const StatCard = ({ 
        title, 
        value, 
        icon: Icon, 
        subtitle,
        color = 'black',
        href 
    }: {
        title: string;
        value: string | number;
        icon: any;
        subtitle?: string;
        color?: 'black' | 'blue' | 'green' | 'red' | 'purple' | 'orange';
        href?: string;
    }) => {
        const colorClasses = {
            black: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200/60 text-gray-900',
            blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/60 text-blue-900',
            green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200/60 text-green-900',
            red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200/60 text-red-900',
            purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/60 text-purple-900',
            orange: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200/60 text-orange-900',
        };

        const iconClasses = {
            black: 'bg-white/80 text-gray-700',
            blue: 'bg-white/80 text-blue-600',
            green: 'bg-white/80 text-green-600',
            red: 'bg-white/80 text-red-600',
            purple: 'bg-white/80 text-purple-600',
            orange: 'bg-white/80 text-orange-600',
        };

        const content = (
            <div className={`p-6 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-md hover:shadow-gray-200/50 group`}>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
                        <p className="text-2xl font-bold group-hover:scale-105 transition-transform">{value}</p>
                        {subtitle && (
                            <p className="text-sm opacity-70 mt-2">{subtitle}</p>
                        )}
                    </div>
                    <div className={`p-3 rounded-full ${iconClasses[color]} shadow-sm group-hover:scale-110 transition-transform`}>
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

    const QuickAction = ({ 
        title, 
        description, 
        icon: Icon, 
        href,
        color = 'black'
    }: {
        title: string;
        description: string;
        icon: any;
        href: string;
        color?: 'black' | 'blue' | 'green' | 'purple';
    }) => {
        const colorClasses = {
            black: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200/60 hover:shadow-md text-gray-900',
            blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/60 hover:shadow-md text-blue-900',
            green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200/60 hover:shadow-md text-green-900',
            purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/60 hover:shadow-md text-purple-900',
        };

        return (
            <Link 
                href={href}
                className={`p-4 rounded-xl border transition-all ${colorClasses[color]} flex items-start gap-4 group`}
            >
                <div className="p-2 rounded-lg bg-white/80 shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-black transition-colors">{title}</h3>
                    <p className="text-sm opacity-75 mt-1">{description}</p>
                </div>
            </Link>
        );
    };

    // UUID Display Component (reusable)
    const UuidDisplay = () => (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-white/80" />
                <span className="text-sm font-medium text-white/80">Your Tenant ID</span>
            </div>
            <div className="flex items-center gap-2">
                <code className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
                    {auth.user.uuid}
                </code>
                <button
                    onClick={() => copyToClipboard(auth.user.uuid)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group relative"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                        <Copy className="w-4 h-4 text-white/80 group-hover:text-white" />
                    )}
                    
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {copied ? 'Copied!' : 'Copy to clipboard'}
                    </span>
                </button>
            </div>
            <p className="text-xs text-white/60 mt-2">
                Use this ID for all communications with your landlord
            </p>
        </div>
    );

    if (!stats.has_active_lease) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Tenant Dashboard" />
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                    <div className="flex h-full flex-1 flex-col gap-6 p-6">
                        <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl p-8 text-white text-center">
                            <h1 className="text-2xl font-bold">Welcome, {auth.user.name}! 👋</h1>
                            <p className="opacity-90 mt-2 text-lg">You don't have an active house assignment yet</p>
                            <p className="opacity-75 mt-1">Please contact your landlord to get assigned to a house</p>
                            
                            {/* Show UUID even when no active lease */}
                            <div className="mt-6 max-w-md mx-auto">
                                <UuidDisplay />
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200/60 p-6 text-center">
                            <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-orange-800">No Active Lease</h2>
                            <p className="text-orange-700 mt-2">
                                You need to be assigned to a house by your landlord to access tenant features.
                            </p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenant Dashboard" />
            
            {/* Light Gradient Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Welcome Header with Tenant UUID */}
                    <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl p-8 text-white">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-xl font-bold">Welcome, {auth.user.name}!</h1>
                                <p className="opacity-60 mt-2 text-l">
                                    {currentAssignment?.house.property.name} • House {currentAssignment?.house.house_no}
                                </p>
                                <p className="opacity-75 mt-1">{currentAssignment?.house.property.address}</p>
                            </div>
                            
                            {/* Tenant UUID Section */}
                            <UuidDisplay />
                        </div>
                    </div>

                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Monthly Rent"
                            value={formatCurrency(stats.current_rent)}
                            icon={DollarSign}
                            subtitle="Current rate"
                            color="black"
                        />
                        <StatCard
                            title="Next Payment"
                            value={`${getDaysUntilNextPayment()} days`}
                            icon={Calendar}
                            subtitle="Days to your next payment"
                            color={getDaysUntilNextPayment() <= 7 ? 'red' : 'black'}
                        />
                        <StatCard
                            title="Lease Status"
                            value={getLeaseDaysRemaining() ? `${getLeaseDaysRemaining()} days` : 'Open'}
                            icon={Clock}
                            subtitle={getLeaseDaysRemaining() ? "Remaining" : "No end date"}
                            color="black"
                        />
                        <StatCard
                            title="Maintenance"
                            value={`${maintenanceRequests.pending} pending`}
                            icon={AlertCircle}
                            subtitle={`${maintenanceRequests.resolved} resolved`}
                            color={maintenanceRequests.pending > 0 ? 'orange' : 'green'}
                        />
                    </div>

                    {/* Current House & Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Current House Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <Home className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Current House Details</h2>
                                        <p className="text-gray-600 text-sm">Complete information about your rented house</p>
                                    </div>
                                </div>

                                {currentAssignment && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200/60 p-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {currentAssignment.house.property.name}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {currentAssignment.house.property.address}
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200/60 p-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">House</label>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {currentAssignment.house.house_no} - {currentAssignment.house.type}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {currentAssignment.house.floor}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200/60 p-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Lease Period</label>
                                                <p className="text-gray-900 font-medium">
                                                    {formatDate(currentAssignment.lease_start_date)}
                                                    {currentAssignment.lease_end_date && (
                                                        <> to {formatDate(currentAssignment.lease_end_date)}</>
                                                    )}
                                                    {!currentAssignment.lease_end_date && (
                                                        <span className="text-green-600 text-sm ml-2">(Open-ended)</span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200/60 p-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Details</label>
                                                <p className="text-gray-900 font-medium capitalize">
                                                    {formatCurrency(currentAssignment.rent_amount)} {currentAssignment.payment_frequency}
                                                </p>
                                                {currentAssignment.security_deposit > 0 && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Deposit: {formatCurrency(currentAssignment.security_deposit)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {currentAssignment.house.description && (
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200/60 p-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                                <p className="text-gray-900">{currentAssignment.house.description}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                                    <p className="text-gray-600 text-sm">Access important tenant features</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <QuickAction
                                    title="Payment History"
                                    description="View your payment records and receipts"
                                    icon={DollarSign}
                                    href="/tenant/payment-history"
                                    color="black"
                                />
                                <QuickAction
                                    title="Report Issue"
                                    description="Submit maintenance request"
                                    icon={AlertCircle}
                                    href="/maintenance"
                                    color="black"
                                />
                                <QuickAction
                                    title="Lease Agreement"
                                    description="View and download lease documents"
                                    icon={FileText}
                                    href="/tenant/lease"
                                    color="black"
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}