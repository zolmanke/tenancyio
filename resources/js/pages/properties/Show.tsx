// resources/js/pages/properties/Show.tsx

import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import TerminateAssignmentModal from '@/components/TerminateAssignmentModal';

interface User {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone?: string;
}

interface HouseAssignment {
    id: number;
    user: User;
    lease_start_date: string;
    lease_end_date?: string;
    rent_amount: number;
    payment_frequency: string;
    security_deposit: number;
    is_active: boolean;
}

interface House {
    id: number;
    house_no: string;
    type: string;
    floor: string;
    price: number;
    description?: string;
    is_occupied: boolean;
    active_assignment?: HouseAssignment;
}

interface Property {
    id: number;
    name: string;
    address: string;
    no_of_floors: number;
    lift_stairs: 'lift' | 'stairs' | 'both';
    electricity_account?: string;
    water_charges_account?: string;
    occupied_units: number;
    total_units: number;
    houses: House[];
}

interface Props {
    property: Property;
}

const PropertyShow: React.FC<Props> = ({ property }) => {
    const [assignmentToTerminate, setAssignmentToTerminate] = useState<HouseAssignment | null>(null);
    const [showTerminateModal, setShowTerminateModal] = useState(false);
    const [showTenantDetails, setShowTenantDetails] = useState<{ [key: number]: boolean }>({});

    const getLiftStairsLabel = (value: string) => {
        const labels = {
            'lift': 'Lift',
            'stairs': 'Stairs', 
            'both': 'Lift & Stairs'
        };
        return labels[value as keyof typeof labels] || value;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const occupancyRate = property.total_units > 0 
        ? Math.round((property.occupied_units / property.total_units) * 100) 
        : 0;

    const handleTerminateClick = (assignment: HouseAssignment) => {
        setAssignmentToTerminate(assignment);
        setShowTerminateModal(true);
    };

    const handleCloseModal = () => {
        setShowTerminateModal(false);
        setAssignmentToTerminate(null);
    };

    const toggleTenantDetails = (houseId: number) => {
        setShowTenantDetails(prev => ({
            ...prev,
            [houseId]: !prev[houseId]
        }));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Properties',
            href: '/properties',
        },
        {
            title: property.name,
            href: '',
        },
    ];    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${property.name} - Property Details`} />
            
            {/* Terminate Assignment Modal */}
            {assignmentToTerminate && (
                <TerminateAssignmentModal
                    assignment={assignmentToTerminate}
                    isOpen={showTerminateModal}
                    onClose={handleCloseModal}
                />
            )}
            
            {/* Light Gradient Background */}
            <div className="min-h-screen">
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
                            <p className="text-gray-600 mt-2 text-sm">{property.address}</p>
                        </div>
                        <Link 
                            href={`/houses/create?property=${property.id}`}
                            className="inline-flex items-center justify-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add House
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Property Details & Stats */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Property Details Card */}
                            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100/80">
                                        <span className="text-sm text-gray-600">Floors</span>
                                        <span className="font-medium text-gray-900">{property.no_of_floors}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100/80">
                                        <span className="text-sm text-gray-600">Access Type</span>
                                        <span className="font-medium text-gray-900">{getLiftStairsLabel(property.lift_stairs)}</span>
                                    </div>
                                    
                                    {property.electricity_account && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100/80">
                                            <span className="text-sm text-gray-600">Electricity</span>
                                            <span className="font-medium text-gray-900">{property.electricity_account}</span>
                                        </div>
                                    )}
                                    
                                    {property.water_charges_account && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100/80">
                                            <span className="text-sm text-gray-600">Water</span>
                                            <span className="font-medium text-gray-900">{property.water_charges_account}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-4 text-center hover:shadow-md transition-all duration-200 shadow-sm">
                                    <div className="text-2xl font-bold text-gray-900">{property.total_units}</div>
                                    <div className="text-gray-600 text-sm mt-1">Total Units</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-4 text-center hover:shadow-md transition-all duration-200 shadow-sm">
                                    <div className="text-2xl font-bold text-black">{property.occupied_units}</div>
                                    <div className="text-gray-600 text-sm mt-1">Occupied</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-4 text-center hover:shadow-md transition-all duration-200 shadow-sm">
                                    <div className="text-2xl font-bold text-black">{property.total_units - property.occupied_units}</div>
                                    <div className="text-gray-600 text-sm mt-1">Vacant</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-4 text-center hover:shadow-md transition-all duration-200 shadow-sm">
                                    <div className="text-2xl font-bold text-black">{occupancyRate}%</div>
                                    <div className="text-gray-600 text-sm mt-1">Occupancy</div>
                                </div>
                            </div>
                        </div>

                        {/* Houses List */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Houses</h2>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {property.houses.length} house{property.houses.length !== 1 ? 's' : ''} in this property
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                            property.occupied_units === property.total_units 
                                                ? 'bg-green-100 text-green-800'
                                                : property.occupied_units > 0
                                                ? 'bg-gray-100 text-black'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {property.occupied_units === property.total_units 
                                                ? 'Fully Occupied'
                                                : property.occupied_units > 0
                                                ? 'Partially Occupied'
                                                : 'Vacant'
                                            }
                                        </span>
                                    </div>
                                </div>

                                {property.houses.length > 0 ? (
                                    <div className="space-y-4">
                                        {property.houses.map((house) => (
                                            <div key={house.id} className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-5 hover:shadow-md transition-all duration-200 group">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                                                                        House {house.house_no} • {house.type}
                                                                    </h3>
                                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                        house.is_occupied 
                                                                            ? 'bg-red-100 text-red-800' 
                                                                            : 'bg-green-100 text-green-800'
                                                                    }`}>
                                                                        {house.is_occupied ? 'Occupied' : 'Vacant'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-600">
                                                                    {house.floor} • KES {house.price.toLocaleString()}/month
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        {house.description && (
                                                            <p className="text-sm text-gray-600 mb-3">{house.description}</p>
                                                        )}

                                                        {/* Occupant Details - Only show when occupied with active assignment */}
                                                        {house.is_occupied && house.active_assignment && (
                                                            <div className="mt-4">
                                                                <div className="flex justify-between items-center mb-3">
                                                                    <h4 className="font-medium text-gray-900 text-sm">Current Tenant</h4>
                                                                    <div className="flex gap-3">
                                                                        <button
                                                                            onClick={() => toggleTenantDetails(house.id)}
                                                                            className="text-black hover:text-blue-800 text-sm font-medium transition-colors"
                                                                        >
                                                                            {showTenantDetails[house.id] ? 'Hide Details' : 'View Details'}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleTerminateClick(house.active_assignment!)}
                                                                            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                                                                        >
                                                                            Terminate
                                                                        </button>
                                                                        <Link
                                                                            href={`/houses/${house.id}/assignment-history`}
                                                                            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                                                                        >
                                                                            History
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                
                                                                {showTenantDetails[house.id] && (
                                                                    <div className="p-4 bg-blue-50/80 border border-blue-200/60 rounded-lg backdrop-blur-sm">
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">Name:</span>
                                                                                <span>{house.active_assignment.user.name}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">Email:</span>
                                                                                <span>{house.active_assignment.user.email}</span>
                                                                            </div>
                                                                            {house.active_assignment.user.phone && (
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="font-medium text-gray-700">Phone:</span>
                                                                                    <span>{house.active_assignment.user.phone}</span>
                                                                                </div>
                                                                            )}
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">UUID:</span>
                                                                                <span className="font-mono text-xs">{house.active_assignment.user.uuid}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">Lease Start:</span>
                                                                                <span>{formatDate(house.active_assignment.lease_start_date)}</span>
                                                                            </div>
                                                                            {house.active_assignment.lease_end_date && (
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="font-medium text-gray-700">Lease End:</span>
                                                                                    <span>{formatDate(house.active_assignment.lease_end_date)}</span>
                                                                                </div>
                                                                            )}
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">Rent:</span>
                                                                                <span>KES {house.active_assignment.rent_amount.toLocaleString()}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">Payment:</span>
                                                                                <span className="capitalize">{house.active_assignment.payment_frequency}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-gray-700">Deposit:</span>
                                                                                <span>KES {house.active_assignment.security_deposit.toLocaleString()}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Vacant House Message - Only show when not occupied */}
                                                        {!house.is_occupied && (
                                                            <div className="mt-4 p-4 bg-gray-50/80 border border-gray-200/60 rounded-lg backdrop-blur-sm">
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <p className="text-sm text-gray-600 mb-2">This house is currently vacant</p>
                                                                        <Link 
                                                                            href={`/house-assignments/create?house=${house.id}`}
                                                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                            </svg>
                                                                            Assign Tenant
                                                                        </Link>
                                                                    </div>
                                                                    <Link
                                                                        href={`/houses/${house.id}/assignment-history`}
                                                                        className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                                                                    >
                                                                        View History
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3 ml-4">
                                                        <button
                                                            onClick={() => router.get(`/houses/${house.id}/edit`)}
                                                            className="text-gray-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-300 mb-6">
                                            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No houses yet</h3>
                                        <p className="text-gray-600 mb-6 text-sm">Add houses to start managing tenants and rental income</p>
                                        <Link 
                                            href={`/houses/create?property=${property.id}`}
                                            className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add First House
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PropertyShow;