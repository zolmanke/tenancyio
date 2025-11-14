// resources/js/services/propertyService.ts

import axios from 'axios';
import { Property, House, PropertyFormData, HouseFormData } from '../types/property';

export const propertyService = {
    // Properties
    getProperties: (): Promise<Property[]> => 
        axios.get('/api/properties').then(res => res.data),

    createProperty: (property: PropertyFormData): Promise<Property> => 
        axios.post('/api/properties', property).then(res => res.data),

    getProperty: (id: number): Promise<Property> => 
        axios.get(`/api/properties/${id}`).then(res => res.data),

    // Houses
    createHouse: (house: HouseFormData): Promise<House> => 
        axios.post('/api/houses', house).then(res => res.data),

    getHousesByProperty: (propertyId: number): Promise<House[]> => 
        axios.get(`/api/properties/${propertyId}/houses`).then(res => res.data),
};