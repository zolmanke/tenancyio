// resources/js/pages/houses/Create.tsx

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface Property {
    id: number;
    name: string;
    address: string;
}

interface Props {
    properties: Property[];
}

const CreateHouse: React.FC<Props> = ({ properties }) => {
    const { data, setData, post, processing, errors } = useForm({
        property_id: 0,
        house_no: '',
        type: '',
        floor: '',
        price: 0,
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/houses');
    };

    // Set default property from URL query parameter
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = urlParams.get('property');
        if (propertyId && properties.length > 0) {
            setData('property_id', parseInt(propertyId));
        }
    }, [properties]);

    return (
        <>
            <Head title="Add House" />
            
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
                            <h1 className="text-2xl font-bold text-gray-900">Add New House</h1>
                            <p className="text-gray-600 mt-2 text-sm">Create a new house unit in your property portfolio</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Property Selection */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Property Selection</h2>
                                        <p className="text-gray-600 text-sm">Select the property where this house is located</p>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="property_id" className="block text-sm font-medium text-gray-700 mb-2">
                                        Property *
                                    </label>
                                    <select
                                        id="property_id"
                                        name="property_id"
                                        value={data.property_id}
                                        onChange={e => setData('property_id', parseInt(e.target.value) || 0)}
                                        className={`w-full px-4 py-3 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                            errors.property_id ? 'border-red-400' : 'border-gray-300'
                                        }`}
                                        required
                                    >
                                        <option value={0}>Select a property</option>
                                        {properties.map((property) => (
                                            <option key={property.id} value={property.id}>
                                                {property.name} - {property.address}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.property_id && (
                                        <p className="mt-2 text-red-600 text-sm flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.property_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* House Details */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">House Details</h2>
                                        <p className="text-gray-600 text-sm">Enter basic information about the house</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* House Number */}
                                    <div>
                                        <label htmlFor="house_no" className="block text-sm font-medium text-gray-700 mb-2">
                                            House Number *
                                        </label>
                                        <input
                                            type="text"
                                            id="house_no"
                                            name="house_no"
                                            value={data.house_no}
                                            onChange={e => setData('house_no', e.target.value)}
                                            placeholder="e.g., A1, B12, G05"
                                            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.house_no ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        />
                                        {errors.house_no && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.house_no}</p>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                            Monthly Rent (KES) *
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={data.price}
                                            onChange={e => setData('price', parseFloat(e.target.value) || 0)}
                                            step="100"
                                            min="0"
                                            placeholder="0.00"
                                            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.price ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        />
                                        {errors.price && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.price}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* House Specifications */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">House Specifications</h2>
                                        <p className="text-gray-600 text-sm">Define the type and location of the house</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Floor */}
                                    <div>
                                        <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-2">
                                            Floor *
                                        </label>
                                        <select
                                            id="floor"
                                            name="floor"
                                            value={data.floor}
                                            onChange={e => setData('floor', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.floor ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        >
                                            <option value="">Select floor</option>
                                            <option value="None">None</option>
                                            <option value="Ground Floor">Ground Floor</option>
                                            <option value="Roof Top">Roof Top</option>
                                            {[...Array(15)].map((_, i) => (
                                                <option key={i + 1} value={`${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Floor`}>
                                                    {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Floor
                                                </option>
                                            ))}
                                        </select>
                                        {errors.floor && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.floor}</p>
                                        )}
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                            House Type *
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={data.type}
                                            onChange={e => setData('type', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white ${
                                                errors.type ? 'border-red-400' : 'border-gray-300'
                                            }`}
                                            required
                                        >
                                            <option value="">Select type</option>
                                            <option value="Bedsitter">Bedsitter</option>
                                            <option value="1 Bedroom">1 Bedroom</option>
                                            <option value="2 Bedroom">2 Bedroom</option>
                                            <option value="3 Bedroom">3 Bedroom</option>
                                            <option value="3 Bedroom + Sq">3 Bedroom + Sq</option>
                                            <option value="4 Bedroom + Sq">4 Bedroom + Sq</option>
                                            <option value="Mansionette">Mansionette</option>
                                        </select>
                                        {errors.type && (
                                            <p className="mt-2 text-red-600 text-sm">{errors.type}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/60 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
                                        <p className="text-gray-600 text-sm">Add any extra details about the house</p>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        placeholder="Add any additional details about the house, such as special features, amenities, or notes..."
                                        className="w-full px-4 py-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white resize-none"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    name="submit_and_add_another"
                                    value="1"
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 border border-gray-600 text-gray-800 text-sm font-medium rounded-lg hover:bg-black hover:text-white hover:border-black transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Submit & Add Another
                                        </div>
                                    )}
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding House...
                                        </div>
                                    ) : 'Add House'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateHouse;