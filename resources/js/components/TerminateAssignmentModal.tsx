// resources/js/components/TerminateAssignmentModal.tsx

import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface House {
    house_no: string;
    type: string;
}

interface HouseAssignment {
    id: number;
    user: User;
    house?: House; // Make house optional since it might not be loaded
}

interface Props {
    assignment: HouseAssignment;
    isOpen: boolean;
    onClose: () => void;
}

const TerminateAssignmentModal: React.FC<Props> = ({ assignment, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        vacate_reason: '',
        termination_notes: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await router.post(`/house-assignments/${assignment.id}/terminate`, formData);
            onClose();
            setFormData({ vacate_reason: '', termination_notes: '' });
        } catch (error) {
            console.error('Error terminating assignment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!isOpen) return null;

    // Safely get house information with fallbacks
    const houseInfo = assignment.house 
        ? `House ${assignment.house.house_no} - ${assignment.house.type}`
        : 'the house';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Terminate Tenant Assignment
                </h2>
                
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                        You are about to terminate the assignment for <strong>{assignment.user.name}</strong> 
                        {assignment.house && (
                            <> in <strong>{houseInfo}</strong></>
                        )}.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="vacate_reason" className="block text-sm font-medium text-gray-700 mb-1">
                            Reason for Termination *
                        </label>
                        <select
                            id="vacate_reason"
                            name="vacate_reason"
                            value={formData.vacate_reason}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a reason</option>
                            <option value="Lease Ended">Lease Ended</option>
                            <option value="Tenant Moved Out">Tenant Moved Out</option>
                            <option value="Eviction">Eviction</option>
                            <option value="Mutual Agreement">Mutual Agreement</option>
                            <option value="Property Sale">Property Sale</option>
                            <option value="Renovation">Renovation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="termination_notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Notes
                        </label>
                        <textarea
                            id="termination_notes"
                            name="termination_notes"
                            value={formData.termination_notes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Any additional information about the termination..."
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Terminating...' : 'Terminate Assignment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TerminateAssignmentModal;