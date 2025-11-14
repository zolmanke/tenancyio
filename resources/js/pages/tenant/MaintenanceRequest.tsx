// resources/js/pages/tenant/MaintenanceRequest.tsx
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            uuid: string;
        };
    };
    currentAssignment: {
        id: number;
        house: {
            id: number;
            house_no: string;
            type: string;
            property: {
                name: string;
            };
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenant Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Report Issue',
        href: '/maintenance',
    },
];

export default function MaintenanceRequest({ auth, currentAssignment }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        description: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        category: 'general' as 'general' | 'plumbing' | 'electrical' | 'structural' | 'appliance' | 'other',
        house_assignment_id: currentAssignment?.id || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/maintenance');
    };

    const categories = [
        { value: 'general', label: 'General Maintenance' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrical', label: 'Electrical' },
        { value: 'structural', label: 'Structural' },
        { value: 'appliance', label: 'Appliance' },
        { value: 'other', label: 'Other' },
    ];

    const priorities = [
        { value: 'low', label: 'Low', color: 'text-green-600' },
        { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
        { value: 'high', label: 'High', color: 'text-red-600' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Report Maintenance Issue" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <Link 
                                href="/dashboard"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Dashboard
                            </Link>
                            <h1 className="text-xl font-bold text-gray-900">Report Maintenance Issue</h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                Submit a maintenance request for your house
                            </p>
                        </div>
                    </div>

                    {/* Current House Info */}
                    {currentAssignment && (
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/60 p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-blue-900">Current House</h2>
                                    <p className="text-blue-700 text-sm">
                                        {currentAssignment.house.property.name} • House {currentAssignment.house.house_no} • {currentAssignment.house.type}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Maintenance Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Issue Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Brief description of the issue"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                        errors.title ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-2 text-red-600 text-sm">{errors.title}</p>
                                )}
                            </div>

                            {/* Category and Priority */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value as any)}
                                        className="w-full px-4 py-3 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                        required
                                    >
                                        {categories.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                                        Priority *
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={data.priority}
                                        onChange={e => setData('priority', e.target.value as any)}
                                        className="w-full px-4 py-3 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                        required
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority.value} value={priority.value}>
                                                {priority.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={6}
                                    placeholder="Please provide a detailed description of the issue, including location, when it started, and any other relevant information..."
                                    className={`text-sm w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white resize-none ${
                                        errors.description ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-2 text-red-600 text-sm">{errors.description}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {processing ? 'Submitting...' : 'Submit Maintenance Request'}
                                </button>
                            </div>

                            {/* Success Message */}
                            {recentlySuccessful && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-green-800">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="font-medium">Maintenance request submitted successfully!</span>
                                    </div>
                                    <p className="text-green-700 text-sm mt-1">
                                        Your request has been sent to the property manager. You'll be notified of updates.
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Help Information */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Immediate Assistance?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/80 rounded-lg p-4 border border-gray-200/60">
                                <h4 className="font-medium text-gray-900 mb-2">Emergency Issues</h4>
                                <p className="text-gray-600">
                                    For emergencies like gas leaks, major water leaks, or electrical hazards, 
                                    please contact your property manager directly.
                                </p>
                            </div>
                            <div className="bg-white/80 rounded-lg p-4 border border-gray-200/60">
                                <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                                <p className="text-gray-600">
                                    High priority issues are typically addressed within 24 hours. 
                                    Lower priority issues may take 3-5 business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}