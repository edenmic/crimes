export type OffenseCodeGroup = 
  | 'Auto Theft'
  | 'Vandalism'
  | 'Simple Assault'
  | 'Residential Burglary'
  | 'Harassment'
  | 'Confidence Games'
  | 'Investigate Property'
  | 'Investigate Person'
  | 'Recovered Stolen Property'
  | 'Motor Vehicle Accident Response'
  | 'Violations'
  | 'Other';

export type District = 
  | 'A1' | 'A7' 
  | 'B3' 
  | 'C6' | 'C11' 
  | 'D4' | 'D14' 
  | 'E13' | 'E18'
  | 'Unknown';

export type DayOfWeek = 
  | 'Monday' | 'Tuesday' | 'Wednesday' 
  | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Crime {
  incidentNumber: string;
  offenseCode: OffenseCodeGroup;
  offenseDescription: string;
  district: District;
  occuredOnDate: string;
  dayOfWeek: DayOfWeek;
  street: string;
  latitude: number;
  longitude: number;
}

export interface FilterOptions {
  offenseCodes: OffenseCodeGroup[];
  districts: District[];
  daysOfWeek: DayOfWeek[];
  streets: string[];
}

export interface Filters {
  offenseCode: OffenseCodeGroup | 'All';
  district: District | 'All';
  dayOfWeek: DayOfWeek | 'All';
  street: string | 'All';
  startDate: string;
  endDate: string;
}

export interface SummaryStats {
  totalThreats: number;
  mostCommonOffense: OffenseCodeGroup | null;
  mostCommonDistrict: District | null;
  mostCommonDayOfWeek: DayOfWeek | null;
  mostCommonStreet: string;
}