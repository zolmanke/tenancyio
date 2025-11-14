// resources/js/types/property.ts

export interface Property {
    id: number;
    name: string;
    address: string;
    no_of_floors: number;
    lift_stairs: 'lift' | 'stairs' | 'both';
    electricity_account?: string;
    water_charges_account?: string;
    user_id: number; // Changed to user_id
    created_at: string;
    updated_at: string;
    occupied_units?: number;
    total_units?: number;
    user?: { // Optional relation to user data
        id: number;
        name: string;
        email: string;
        user_type: string;
    };
}

export interface House {
    id: number;
    property_id: number;
    house_no: string;
    type: string;
    floor: string;
    price: number;
    description?: string;
    is_occupied: boolean;
    created_at: string;
    updated_at: string;
    property?: Property;
}

export interface PropertyFormData {
    name: string;
    address: string;
    no_of_floors: number;
    lift_stairs: 'lift' | 'stairs' | 'both';
    electricity_account: string;
    water_charges_account: string;
}

export interface HouseFormData {
    property_id: number;
    house_no: string;
    type: string;
    floor: string;
    price: number;
    description: string;
}