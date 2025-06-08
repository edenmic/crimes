import { Crime, SummaryWindow, OffenseCodeGroup } from '../types/Crime';    

export const calculateStats = (crimes: Crime[]): SummaryWindow => {
    if (!crimes.length) {
        return {
            totalThreats: 0,
            mostCommonOffense: null,
            mostCommonDistrict: null,
            mostCommonDayOfWeek: null,
            mostCommonStreet: ''
        };
    }

    //total number of crimes
    const totalThreats = crimes.length;

    //most common offense
    const offenseCount = crimes.reduce((acc, crime) => {
        acc[crime.offenseCode] = (acc[crime.offenseCode] || 0) + 1;
        return acc;
    }, {} as Record<OffenseCodeGroup, number>);

    const mostCommonOffenseCode = Object.entries(offenseCount).sort((a, b) => b[1] - a[1])[0][0] as OffenseCodeGroup;

    //most common district
    const districtCount = crimes.reduce((acc, crime) => {
        acc[crime.district] = (acc[crime.district] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);   
    const mostCommonDistrict = Object.entries(districtCount).sort((a, b) => b[1] - a[1])[0][0];

    //most common day of week
    const dayOfWeekCount = crimes.reduce((acc, crime) => {
        acc[crime.dayOfWeek] = (acc[crime.dayOfWeek] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);   
    const mostCommonDayOfWeek = Object.entries(dayOfWeekCount).sort((a, b) => b[1] - a[1])[0][0];

    //most common street
    const streetCount = crimes.reduce((acc, crime) => {
        acc[crime.street] = (acc[crime.street] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const mostCommonStreet = Object.entries(streetCount).sort((a, b) => b[1] - a[1])[0][0];

    return {
        totalThreats,
        mostCommonOffense: mostCommonOffenseCode,
        mostCommonDistrict,
        mostCommonDayOfWeek,
        mostCommonStreet
    };  
    };
    