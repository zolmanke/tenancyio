// resources/js/pages/houses/AssignmentHistory.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
}

interface HouseAssignment {
    id: number;
    user: User;
    terminatedBy?: User;
    lease_start_date: string;
    lease_end_date?: string;
    rent_amount: number;
    payment_frequency: string;
    security_deposit: number;
    vacated_at?: string;
    vacate_reason?: string;
    termination_notes?: string;
    is_active: boolean;
    created_at: string;
}

interface House {
    id: number;
    house_no: string;
    type: string;
    floor: string;
    property: {
        id: number;
        name: string;
    };
}

interface Props {
    house: House;
    assignments: HouseAssignment[];
}

const AssignmentHistory: React.FC<Props> = ({ house, assignments }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title={`Assignment History - House ${house.house_no}`} />
            
            {/* Light Gradient Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <Link 
                                href={`/properties/${house.property.id}`}
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Property
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Assignment History - House {house.house_no}
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                {house.type} • {house.floor} • {house.property.name}
                            </p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center hover:shadow-md transition-all duration-200">
                            <div className="text-2xl font-bold text-gray-900">{assignments.length}</div>
                            <div className="text-gray-600 text-sm mt-1">Total Assignments</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center hover:shadow-md transition-all duration-200">
                            <div className="text-2xl font-bold text-green-600">
                                {assignments.filter(a => a.is_active).length}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">Active</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center hover:shadow-md transition-all duration-200">
                            <div className="text-2xl font-bold text-black">
                                {assignments.filter(a => !a.is_active).length}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">Terminated</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6 text-center hover:shadow-md transition-all duration-200">
                            <div className="text-2xl font-bold text-black">
                                {assignments.length > 0 ? Math.round((assignments.filter(a => !a.is_active).length / assignments.length) * 100) : 0}%
                            </div>
                            <div className="text-gray-600 text-sm mt-1">Turnover Rate</div>
                        </div>
                    </div>

                    {/* Assignments Table */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Tenant Assignments</h2>
                                <p className="text-gray-600 text-sm">Complete history of tenant assignments for this house</p>
                            </div>
                        </div>

                        {assignments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Tenant</th>
                                            <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Lease Period</th>
                                            <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Rent Details</th>
                                            <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Status</th>
                                            <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Termination Details</th>
                                            <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Assigned</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignments.map((assignment) => (
                                            <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-all duration-200">
                                                {/* Tenant Column */}
                                                <td className="py-4 px-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{assignment.user.name}</div>
                                                        <div className="text-sm text-gray-600">{assignment.user.email}</div>
                                                    </div>
                                                </td>
                                                
                                                {/* Lease Period Column */}
                                                <td className="py-4 px-4">
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900">
                                                            {formatDate(assignment.lease_start_date)}
                                                        </div>
                                                        {assignment.lease_end_date ? (
                                                            <div className="text-gray-600 text-xs">
                                                                to {formatDate(assignment.lease_end_date)}
                                                            </div>
                                                        ) : (
                                                            <div className="text-gray-400 text-xs">No end date</div>
                                                        )}
                                                    </div>
                                                </td>
                                                
                                                {/* Rent Details Column */}
                                                <td className="py-4 px-4">
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900">
                                                            {formatCurrency(assignment.rent_amount)}
                                                        </div>
                                                        <div className="text-gray-600 capitalize text-xs">
                                                            {assignment.payment_frequency}
                                                        </div>
                                                        {assignment.security_deposit > 0 && (
                                                            <div className="text-gray-500 text-xs">
                                                                Deposit: {formatCurrency(assignment.security_deposit)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                
                                                {/* Status Column */}
                                                <td className="py-4 px-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                        assignment.is_active 
                                                            ? 'bg-green-100 text-green-800 border border-green-200' 
                                                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                                                    }`}>
                                                        {assignment.is_active ? 'Active' : 'Terminated'}
                                                    </span>
                                                </td>
                                                
                                                {/* Termination Details Column */}
                                                <td className="py-4 px-4">
                                                    {!assignment.is_active ? (
                                                        <div className="text-sm space-y-1">
                                                            {assignment.vacate_reason && (
                                                                <div className="font-medium text-gray-900 text-xs">
                                                                    {assignment.vacate_reason}
                                                                </div>
                                                            )}
                                                            {assignment.vacated_at && (
                                                                <div className="text-gray-600 text-xs">
                                                                    Vacated: {formatDate(assignment.vacated_at)}
                                                                </div>
                                                            )}
                                                            {assignment.termination_notes && (
                                                                <div className="text-gray-600 text-xs max-w-xs truncate" title={assignment.termination_notes}>
                                                                    {assignment.termination_notes}
                                                                </div>
                                                            )}
                                                            {assignment.terminatedBy && (
                                                                <div className="text-gray-500 text-xs">
                                                                    By: {assignment.terminatedBy.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-400 text-sm">-</div>
                                                    )}
                                                </td>
                                                
                                                {/* Assignment Date Column */}
                                                <td className="py-4 px-4 text-sm text-gray-600">
                                                    {formatDate(assignment.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-12">
                                <div className="text-gray-300 mb-6">
                                    <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No assignment history</h3>
                                <p className="text-gray-600 mb-6">This house has no previous tenant assignments.</p>
                                <Link 
                                    href={`/house-assignments/create?house=${house.id}`}
                                    className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Assign First Tenant
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Summary Section */}
                    {assignments.length > 0 && (
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Assignment Summary</h2>
                                    <p className="text-gray-600 text-sm">Overview of tenancy history and financial details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700 text-sm">Tenancy Overview</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Current Occupant:</span>
                                            <span className="font-medium text-gray-900">
                                                {assignments.find(a => a.is_active)?.user.name || 'Vacant'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Total Tenants:</span>
                                            <span className="font-medium text-gray-900">{assignments.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Unique Tenants:</span>
                                            <span className="font-medium text-gray-900">
                                                {new Set(assignments.map(a => a.user.id)).size}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700 text-sm">Financial Overview</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Current Rent:</span>
                                            <span className="font-medium text-gray-900">
                                                {assignments.find(a => a.is_active) 
                                                    ? formatCurrency(assignments.find(a => a.is_active)!.rent_amount)
                                                    : 'N/A'
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Highest Rent:</span>
                                            <span className="font-medium text-gray-900">
                                                {assignments.length > 0 
                                                    ? formatCurrency(Math.max(...assignments.map(a => a.rent_amount)))
                                                    : 'N/A'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default AssignmentHistory;