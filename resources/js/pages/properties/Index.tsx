import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Property {
    id: number;
    name: string;
    address: string;
    no_of_floors: number;
    lift_stairs: string;
    electricity_account?: string;
    water_charges_account?: string;
    occupied_units: number;
    total_units: number;
}

interface Props {
    properties: Property[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Properties',
        href: '/properties',
    },
];

const PropertiesIndex: React.FC<Props> = ({ properties }) => {
    const getOccupancyColor = (occupied: number, total: number) => {
        const percentage = (occupied / total) * 100;
        if (percentage >= 80) return 'bg-gray-100 text-gray-200';
        return 'bg-gray-100 text-gray-800';
    };

    const getAccessType = (type: string) => {
        switch (type) {
            case 'lift':
                return 'Lift';
            case 'stairs':
                return 'Stairs';
            case 'both':
                return 'Lift & Stairs';
            default:
                return 'Unknown';
        }
    };

    // Array of gradient backgrounds for cards
    const cardGradients = [
        'bg-gradient-to-br from-gray-50 to-gray-100',
    ];

    const getCardGradient = (index: number) => {
        return cardGradients[index % cardGradients.length];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Properties" />
            
            {/* Light Gradient Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Manage your property portfolio and houses
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link 
                                href="/houses/create"
                                className="inline-flex items-center justify-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 border border-black shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add House
                            </Link>
                            <Link 
                                href="/properties/create"
                                className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-300 shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Add Property
                            </Link>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {properties.map((property, index) => (
                                <div 
                                    key={property.id} 
                                    className={`${getCardGradient(index)} backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 hover:shadow-md transition-all duration-200 group`}
                                >
                                    {/* Property Header with Image */}
                                    <div className="flex items-start gap-4 mb-4">
                                        {/* Image Placeholder with Gradient */}
                                        <div className="flex-shrink-0 w-16 h-16 bg-white/80 rounded-lg flex items-center justify-center shadow-inner border border-white/60">
                                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
                                                {property.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                {property.address}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded border border-white/60">
                                                    {getAccessType(property.lift_stairs)}
                                                </span>
                                                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded border border-white/60">
                                                    {property.no_of_floors} floor{property.no_of_floors > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Property Stats */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getOccupancyColor(property.occupied_units, property.total_units)}`}>
                                            <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                                            {property.occupied_units}/{property.total_units} units occupied
                                        </div>
                                    </div>

                                    {/* Occupancy Progress Bar */}
                                    <div className="mb-4">
                                        <div className="w-full bg-white/80 rounded-full h-2 border border-white/60">
                                            <div 
                                                className="bg-gradient-to-r from-gray-700 to-gray-900 h-2 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${Math.max(5, (property.occupied_units / property.total_units) * 100)}%` 
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/properties/${property.id}`}
                                            className="flex-1 bg-white/80 text-gray-700 px-3 py-2 rounded-lg text-sm text-center hover:bg-white hover:shadow-sm transition-all duration-200 font-medium border border-white/60"
                                        >
                                            View Details
                                        </Link>
                                        <Link 
                                            href={`/houses/create?property=${property.id}`}
                                            className="flex-1 bg-black text-white px-3 py-2 rounded-lg text-sm text-center hover:bg-gray-800 hover:shadow-sm transition-all duration-200 font-medium"
                                        >
                                            Add House
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center max-w-md mx-auto">
                                <div className="text-gray-300 mb-6">
                                    <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties yet</h3>
                                <p className="text-gray-600 text-sm mb-6">
                                    Start building your property portfolio by adding your first property. You'll be able to manage houses, tenants, and payments all in one place.
                                </p>
                                <Link 
                                    href="/properties/create"
                                    className="inline-flex items-center justify-center gap-2 bg-black text-sm text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Your First Property
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default PropertiesIndex;