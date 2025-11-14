// resources/js/pages/tenant/MaintenanceList.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface MaintenanceRequest {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
    assigned_to?: string;
    notes?: string;
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    maintenanceRequests: MaintenanceRequest[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenant Dashboard',
        href: '/tenant/dashboard',
    },
    {
        title: 'Maintenance Requests',
        href: '/tenant/maintenance',
    },
];

export default function MaintenanceList({ auth, maintenanceRequests }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-gray-100 text-gray-800 border-gray-200',
            in_progress: 'bg-gray-100 text-gray-800 border-gray-200',
            completed: 'bg-gray-100 text-gray-800 border-gray-200',
            cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return colors[status as keyof typeof colors] || colors.pending;
    };

    const getPriorityColor = (priority: string) => {
        const colors = {
            low: 'text-gray-600',
            medium: 'text-gray-600',
            high: 'text-gray-600',
        };
        return colors[priority as keyof typeof colors] || colors.medium;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Maintenance Requests" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/30">
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <Link 
                                href="/tenant/dashboard"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                View and track your maintenance requests
                            </p>
                        </div>
                        <Link
                            href="maintenance/create"
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                        >
                            Report New Issue
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center">
                            <div className="text-2xl font-bold text-gray-900">{maintenanceRequests.length}</div>
                            <div className="text-gray-600 text-sm mt-1">Total Requests</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                                {maintenanceRequests.filter(req => req.status === 'pending').length}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">Pending</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                                {maintenanceRequests.filter(req => req.status === 'in_progress').length}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">In Progress</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                                {maintenanceRequests.filter(req => req.status === 'completed').length}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">Completed</div>
                        </div>
                    </div>

                    {/* Requests List */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        {maintenanceRequests.length > 0 ? (
                            <div className="space-y-4">
                                {maintenanceRequests.map((request) => (
                                    <div key={request.id} className="border border-gray-200/60 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                                        {request.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                    <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                                                        {request.priority.toUpperCase()} PRIORITY
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-3">{request.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="capitalize">{request.category.replace('_', ' ')}</span>
                                                    <span>•</span>
                                                    <span>Submitted: {formatDate(request.created_at)}</span>
                                                    {request.assigned_to && (
                                                        <>
                                                            <span>•</span>
                                                            <span>Assigned to: {request.assigned_to}</span>
                                                        </>
                                                    )}
                                                </div>
                                                {request.notes && (
                                                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                        <p className="text-sm text-gray-800">
                                                            <strong>Update:</strong> {request.notes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-300 mb-6">
                                    <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Maintenance Requests</h3>
                                <p className="text-gray-600 mb-6">You haven't submitted any maintenance requests yet.</p>
                                <Link
                                    href="/tenant/maintenance/create"
                                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                                >
                                    Report Your First Issue
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}