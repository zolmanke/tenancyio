// resources/js/pages/properties/Create.tsx

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const CreateProperty: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        no_of_floors: 1,
        lift_stairs: 'stairs' as 'lift' | 'stairs' | 'both',
        electricity_account: '',
        water_charges_account: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/properties');
    };

    return (
        <>
            <Head title="Add Property" />
            
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
                            <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
                            <p className="text-gray-600 mt-2 text-sm">Create a new property to start managing houses and tenants</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                                        <p className="text-gray-600 text-sm">Enter the property name and address</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Property Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="Enter property name"
                                            className={`w-full px-4 py-3 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.name ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-red-600 text-sm flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Address *
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            rows={3}
                                            placeholder="Enter complete property address including street, city, and postal code"
                                            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white resize-none ${
                                                errors.address ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        />
                                        {errors.address && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Building Specifications */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Building Specifications</h2>
                                        <p className="text-gray-600 text-sm">Define the building structure and access</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Number of Floors */}
                                    <div>
                                        <label htmlFor="no_of_floors" className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Floors *
                                        </label>
                                        <input
                                            type="number"
                                            id="no_of_floors"
                                            name="no_of_floors"
                                            value={data.no_of_floors}
                                            onChange={e => setData('no_of_floors', parseInt(e.target.value) || 1)}
                                            min="1"
                                            max="50"
                                            className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.no_of_floors ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        />
                                        {errors.no_of_floors && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.no_of_floors}</p>
                                        )}
                                    </div>

                                    {/* Lift/Stairs */}
                                    <div>
                                        <label htmlFor="lift_stairs" className="block text-sm font-medium text-gray-700 mb-2">
                                            Access Type *
                                        </label>
                                        <select
                                            id="lift_stairs"
                                            name="lift_stairs"
                                            value={data.lift_stairs}
                                            onChange={e => setData('lift_stairs', e.target.value as 'lift' | 'stairs' | 'both')}
                                            className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.lift_stairs ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        >
                                            <option value="None">None</option>
                                            <option value="stairs">Stairs Only</option>
                                            <option value="lift">Lift Only</option>
                                            <option value="both">Both Lift & Stairs</option>
                                        </select>
                                        {errors.lift_stairs && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.lift_stairs}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Utility Configuration */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Utility Configuration</h2>
                                        <p className="text-gray-600 text-sm">Set up utility billing methods</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Electricity Type */}
                                    <div>
                                        <label htmlFor="electricity_account" className="block text-sm font-medium text-gray-700 mb-2">
                                            Electricity Type <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                                        </label>
                                        <select
                                            id="electricity_account"
                                            name="electricity_account"
                                            value={data.electricity_account}
                                            onChange={e => setData('electricity_account', e.target.value)}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                        >
                                            <option value="">Select electricity type</option>
                                            <option value="Token">Token Meter</option>
                                            <option value="Meter">Standard Meter</option>
                                        </select>
                                        <p className="mt-2 text-xs text-gray-500">How electricity is billed for this property</p>
                                    </div>

                                    {/* Water Type */}
                                    <div>
                                        <label htmlFor="water_charges_account" className="block text-sm font-medium text-gray-700 mb-2">
                                            Water Type <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                                        </label>
                                        <select
                                            id="water_charges_account"
                                            name="water_charges_account"
                                            value={data.water_charges_account}
                                            onChange={e => setData('water_charges_account', e.target.value)}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                                        >
                                            <option value="">Select water type</option>
                                            <option value="Fixed">Fixed Charges</option>
                                            <option value="Meter Reading">Meter Reading</option>
                                        </select>
                                        <p className="mt-2 text-xs text-gray-500">How water is billed for this property</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <Link 
                                    href="/properties"
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-center"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding Property...
                                        </span>
                                    ) : (
                                        'Add Property'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProperty;