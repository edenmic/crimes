import type { Crime, SummaryStats, OffenseCodeGroup, District, DayOfWeek } from '../types';

export const calculateStats = (crimes: Crime[]): SummaryStats => {
    if (!crimes.length) {
        return {
            totalThreats: 0,
            mostCommonOffense: null,
            mostCommonDistrict: null,
            mostCommonDayOfWeek: null,
            mostCommonStreet: ''
        };
    }

    // Total number of crimes
    const totalThreats = crimes.length;

    // Most common offense
    const offenseCount = crimes.reduce<Record<string, number>>((acc, crime) => {
        const key = crime.offenseCode;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const mostCommonOffenseEntry = Object.entries(offenseCount).sort((a, b) => b[1] - a[1])[0];
    const mostCommonOffense = mostCommonOffenseEntry ? mostCommonOffenseEntry[0] as OffenseCodeGroup : null;

    // Most common district
    const districtCount = crimes.reduce<Record<string, number>>((acc, crime) => {
        const key = crime.district;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const mostCommonDistrictEntry = Object.entries(districtCount).sort((a, b) => b[1] - a[1])[0];
    const mostCommonDistrict = mostCommonDistrictEntry ? mostCommonDistrictEntry[0] as District : null;

    // Most common day of week
    const dayOfWeekCount = crimes.reduce<Record<string, number>>((acc, crime) => {
        const key = crime.dayOfWeek;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const mostCommonDayOfWeekEntry = Object.entries(dayOfWeekCount).sort((a, b) => b[1] - a[1])[0];
    const mostCommonDayOfWeek = mostCommonDayOfWeekEntry ? mostCommonDayOfWeekEntry[0] as DayOfWeek : null;

    // Most common street
    const streetCount = crimes.reduce<Record<string, number>>((acc, crime) => {
        const key = crime.street;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const mostCommonStreetEntry = Object.entries(streetCount).sort((a, b) => b[1] - a[1])[0];
    const mostCommonStreet = mostCommonStreetEntry ? mostCommonStreetEntry[0] : '';

    return {
        totalThreats,
        mostCommonOffense,
        mostCommonDistrict,
        mostCommonDayOfWeek,
        mostCommonStreet
    };
};
