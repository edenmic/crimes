import Papa from 'papaparse';
import type { Crime, OffenseCodeGroup, District, DayOfWeek } from '../types';

export const parseCSVData = async (csvPath: string): Promise<Crime[]> => {
  try {
    const response = await fetch(csvPath);
    const csvText = await response.text();

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        // Convert CSV headers to camelCase properties
        const headerMap: Record<string, string> = {
          'INCIDENT_NUMBER': 'incidentNumber',
          'OFFENSE_CODE_GROUP': 'offenseCode',
          'OFFENSE_DESCRIPTION': 'offenseDescription',
          'DISTRICT': 'district',
          'OCCURRED_ON_DATE': 'occuredOnDate',
          'DAY_OF_WEEK': 'dayOfWeek',
          'STREET': 'street',
          'Lat': 'latitude',
          'Long': 'longitude'
        };
        return headerMap[header] || header.trim();
      }
    });

    return result.data
      .filter((item): item is Record<string, any> => !!(item as Record<string, any>).incidentNumber) // Remove any rows without incident numbers
      .map((item: any) => ({
        incidentNumber: item.incidentNumber,
        offenseCode: mapOffenseCodeGroup(item.offenseCode),
        offenseDescription: item.offenseDescription,
        district: mapDistrict(item.district),
        occuredOnDate: item.occuredOnDate,
        dayOfWeek: mapDayOfWeek(item.dayOfWeek),
        street: item.street || '',
        latitude: parseFloat(item.latitude) || 0,
        longitude: parseFloat(item.longitude) || 0
      }));
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    return [];
  }
};

// Helper functions to map CSV values to our type definitions
function mapOffenseCodeGroup(value: string): OffenseCodeGroup {
  const knownGroups: OffenseCodeGroup[] = [
    'Auto Theft', 'Vandalism', 'Simple Assault', 'Residential Burglary',
    'Harassment', 'Confidence Games', 'Investigate Property', 'Investigate Person',
    'Recovered Stolen Property', 'Motor Vehicle Accident Response', 'Violations'
  ];
  
  return knownGroups.includes(value as OffenseCodeGroup) 
    ? value as OffenseCodeGroup 
    : 'Other';
}

function mapDistrict(value: string): District {
  const knownDistricts: District[] = [
    'A1', 'A7', 'B3', 'C6', 'C11', 'D4', 'D14', 'E13', 'E18'
  ];
  
  return knownDistricts.includes(value as District) 
    ? value as District 
    : 'Unknown';
}

function mapDayOfWeek(value: string): DayOfWeek {
  const daysOfWeek: DayOfWeek[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  const day = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return daysOfWeek.includes(day as DayOfWeek) 
    ? day as DayOfWeek 
    : 'Monday'; // Default value
}
