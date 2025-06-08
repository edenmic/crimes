import Papa from 'papaparse';
import type Crime from '../types/Crime';
import type { FilterOptions } from '../types/FilterOptions';
import type { Filters } from '../types/Filters';

export const ParseDara = async(csvPath: string): Promise<Crime[]> => {
    try {
        const response = await fetch(csvPath);
        const csvText = await response.text();

        const result = Papa.parse<Crime>(csvText, {
            header: true,
            skipEmptyLines: true,
            transform: (value) => {
                // Convert latitude and longitude to numbers
                if (value.latitude) {
                    value.latitude = parseFloat(value.latitude);
                }
                if (value.longitude) {
                    value.longitude = parseFloat(value.longitude);
                }
                return value.trim();
            },
            transformHeader: (header) => {
                return header.trim();
            }
        });
        return XPathResult.data.map((item: any)  => ({
            incidentNumber: parseInt(item.incidentNumber),
            offenseCode: item.offenseCode,
            offenseDescription: item.offenseDescription,
            district: item.district,
            occuredOnDate: item.occuredOnDate,
            dayOfWeek: item.dayOfWeek,
            street: item.street,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude)
        }));
    } catch (error) {
        console.error('Error parsing CSV data:', error);
        return [];
    }
};
