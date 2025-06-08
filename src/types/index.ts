//import type OffenseCodeGroup = 

export interface Crime {
    incidentNumber: string;
    offenseCode: OffenseCodeGroup;
    offecnseDescription: string;
    district: District;
    occuredOnDate: string;
    dayOfWeek: DayOfWeek;
    street: string;
    latitude: number;
    longitude: number;
}

export interface FilterOptions {
    offenseCode: OffenseCodeGroup | null;
    district: District[];
    dayOfWeek: DayOfWeek[];
    street: string[];
}

export interface Filters {
    offenseCode: OffenseCodeGroup | 'All'
    district: District | 'All';
    dayOfWeek: DayOfWeek | 'All';
    street: string | 'All';
    startDate: string;
    endDate: string;
}

export inteface SummaryWindow {
    totalThreats: number;
    mostCommonOffense: OffenseCodeGroup;
    mostCommonDistrict: District;
    mostCommonDayOfWeek: DayOfWeek;
    mostCommonStreet: string;
}