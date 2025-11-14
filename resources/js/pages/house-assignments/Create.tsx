// resources/js/pages/house-assignments/Create.tsx

import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface User {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone?: string;
}

interface House {
    id: number;
    house_no: string;
    type: string;
    floor: string;
    price: number;
}

interface Property {
    id: number;
    name: string;
    houses: House[];
}

interface Props {
    properties: Property[];
}

const CreateHouseAssignment: React.FC<Props> = ({ properties }) => {
    const [formData, setFormData] = useState({
        user_uuid: '',
        house_id: '',
        lease_start_date: '',
        lease_end_date: '',
        rent_amount: '',
        payment_frequency: 'monthly',
        security_deposit: '',
        terms: ''
    });

    const [selectedProperty, setSelectedProperty] = useState('');
    const [availableHouses, setAvailableHouses] = useState<House[]>([]);
    const [loading, setLoading] = useState(false);
    const [tenant, setTenant] = useState<User | null>(null);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState('');

    const handlePropertyChange = (propertyId: string) => {
        setSelectedProperty(propertyId);
        const property = properties.find(p => p.id === parseInt(propertyId));
        setAvailableHouses(property?.houses || []);
        setFormData(prev => ({ ...prev, house_id: '' }));
    };

    const searchTenant = async () => {
        if (!formData.user_uuid.trim()) {
            setSearchError('Please enter a Tenant ID');
            return;
        }

        setSearching(true);
        setSearchError('');
        setTenant(null);

        try {
            const response = await fetch(`/tenants/${formData.user_uuid}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (response.ok) {
                const data = await response.json();
                
                if (data.success && data.tenant) {
                    setTenant(data.tenant);
                    setSearchError('');
                } else {
                    setSearchError(data.error || 'Tenant not found');
                    setTenant(null);
                }
            } else {
                const errorData = await response.json();
                setSearchError(errorData.error || 'Tenant not found');
                setTenant(null);
            }
        } catch (error) {
            console.error('Error searching for tenant:', error);
            setSearchError('Network error. Please check your connection and try again.');
            setTenant(null);
        } finally {
            setSearching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!tenant) {
            setSearchError('Please search and select a tenant first');
            return;
        }

        setLoading(true);

        try {
            await router.post('/house-assignments', formData);
        } catch (error: any) {
            console.error('Error assigning tenant:', error);
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                if (errors.user_uuid) {
                    setSearchError(errors.user_uuid[0]);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'user_uuid') {
            setTenant(null);
            setSearchError('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.currentTarget.id === 'user_uuid') {
            e.preventDefault();
            searchTenant();
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <Head title="Assign Tenant to House" />
            
            {/* Light Gradient Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                <div className="container mx-auto px-4 py-6 max-w-4xl">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <Link 
                                href="/properties"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Properties
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Assign Tenant to House</h1>
                            <p className="text-gray-600 mt-2 text-sm">Assign a tenant to an available house and set up lease terms</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Tenant Search Section */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Find Tenant</h2>
                                        <p className="text-gray-600 text-sm">Search for tenant using their TenantID</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="user_uuid" className="block text-sm font-medium text-gray-700 mb-2">
                                            Tenant ID *
                                        </label>
                                       <div className="relative flex-1">
    <input
        type="text"
        id="user_uuid"
        name="user_uuid"
        value={formData.user_uuid}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter Tenant ID (e.g., TNC-123456)"
        className="w-full px-4 py-3 pr-32 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
        required
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-1">
        <button
            type="button"
            onClick={searchTenant}
            disabled={searching || !formData.user_uuid.trim()}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm h-[calc(100%-8px)] mr-1"
        >
            {searching ? (
                <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching
                </div>
            ) : 'Search'}
        </button>
    </div>
</div>
                                        {searchError && (
                                            <p className="mt-2 text-red-600 text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {searchError}
                                            </p>
                                        )}
                                    </div>
                                    
                                    {/* Tenant Details */}
                                    {tenant && (
                                        <div className="p-4 bg-green-50/80 border border-green-200 rounded-lg backdrop-blur-sm">
                                            <div className="flex items-center gap-2 mb-3">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h3 className="font-semibold text-green-800">Tenant Verified</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-700">Name:</span>
                                                    <span className="text-gray-900">{tenant.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-700">Email:</span>
                                                    <span className="text-gray-900">{tenant.email}</span>
                                                </div>
                                                {tenant.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-700">Phone:</span>
                                                        <span className="text-gray-900">{tenant.phone}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-700">UUID:</span>
                                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-900">{tenant.uuid}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Property and House Selection */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Select Property & House</h2>
                                        <p className="text-gray-600 text-sm">Choose the property and available house</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-2">
                                            Property *
                                        </label>
                                        <select
                                            id="property"
                                            value={selectedProperty}
                                            onChange={(e) => handlePropertyChange(e.target.value)}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                            required
                                        >
                                            <option value="">Select a property</option>
                                            {properties.map((property) => (
                                                <option key={property.id} value={property.id}>
                                                    {property.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="house_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            House *
                                        </label>
                                        <select
                                            id="house_id"
                                            name="house_id"
                                            value={formData.house_id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                            required
                                            disabled={!selectedProperty || availableHouses.length === 0}
                                        >
                                            <option value="">Select a house</option>
                                            {availableHouses.map((house) => (
                                                <option key={house.id} value={house.id}>
                                                    {house.house_no} - {house.type} ({house.floor})
                                                </option>
                                            ))}
                                        </select>
                                        {selectedProperty && availableHouses.length === 0 && (
                                            <p className="mt-2 text-orange-600 text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                No available houses in this property
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Lease Details */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Lease Details</h2>
                                        <p className="text-gray-600 text-sm">Set up lease duration and terms</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="lease_start_date" className="block text-sm font-medium text-gray-700 mb-2">
                                            Lease Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="lease_start_date"
                                            name="lease_start_date"
                                            value={formData.lease_start_date}
                                            onChange={handleChange}
                                            min={today}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="lease_end_date" className="block text-sm font-medium text-gray-700 mb-2">
                                            Lease End Date <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="lease_end_date"
                                            name="lease_end_date"
                                            value={formData.lease_end_date}
                                            onChange={handleChange}
                                            min={formData.lease_start_date || today}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Financial Details */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Financial Details</h2>
                                        <p className="text-gray-600 text-sm">Set rent amount and payment terms</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="rent_amount" className="block text-sm font-medium text-gray-700 mb-2">
                                            Rent Amount (KES) *
                                        </label>
                                        <input
                                            type="number"
                                            id="rent_amount"
                                            name="rent_amount"
                                            value={formData.rent_amount}
                                            onChange={handleChange}
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="payment_frequency" className="block text-sm font-medium text-gray-700 mb-2">
                                            Payment Frequency *
                                        </label>
                                        <select
                                            id="payment_frequency"
                                            name="payment_frequency"
                                            value={formData.payment_frequency}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                            required
                                        >
                                            <option value="monthly">Monthly</option>
                                            <option value="quarterly">Quarterly</option>
                                            <option value="annually">Annually</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="security_deposit" className="block text-sm font-medium text-gray-700 mb-2">
                                        Security Deposit (KES) <span className="text-gray-400 text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="security_deposit"
                                        name="security_deposit"
                                        value={formData.security_deposit}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                    />
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Additional Notes</h2>
                                        <p className="text-gray-600 text-sm">Additional terms and conditions and any other detail worth noting down</p>
                                    </div>
                                </div>

                                <textarea
                                    id="terms"
                                    name="terms"
                                    value={formData.terms}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white resize-none"
                                    placeholder="Enter any additional terms and conditions for this lease agreement..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={loading || !tenant || !formData.house_id}
                                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Assigning Tenant...
                                        </div>
                                    ) : 'Assign Tenant to House'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateHouseAssignment;