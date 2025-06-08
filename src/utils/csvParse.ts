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

    // Analyze raw offense code distribution
    const rawOffenseCounts: Record<string, number> = {};
    result.data.forEach((item: any) => {
      const rawOffense = item.OFFENSE_CODE_GROUP || item.offenseCodeGroup;
      if (rawOffense) {
        rawOffenseCounts[rawOffense] = (rawOffenseCounts[rawOffense] || 0) + 1;
      }
    });

    // Get top 15 raw offense types
    const topOffenses = Object.entries(rawOffenseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    console.log('Top 15 raw offense types:', topOffenses);

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
  // Clean input
  const rawValue = (value || '').trim();
  
  // Direct matches for our defined types
  const exactMatches: Record<string, OffenseCodeGroup> = {
    'Motor Vehicle Accident Response': 'Motor Vehicle Accident Response',
    'Vandalism': 'Vandalism',
    'Simple Assault': 'Simple Assault', 
    'Residential Burglary': 'Residential Burglary',
    'Harassment': 'Harassment',
    'Confidence Games': 'Confidence Games',
    'Investigate Property': 'Investigate Property',
    'Investigate Person': 'Investigate Person',
    'Recovered Stolen Property': 'Recovered Stolen Property',
    'Violations': 'Violations',
    'Auto Theft': 'Auto Theft'
  };
  
  // Check for exact match
  if (rawValue in exactMatches) {
    return exactMatches[rawValue];
  }
  
  // Fuzzy matching - check if raw value contains any of our keys
  for (const [key, mappedValue] of Object.entries(exactMatches)) {
    if (rawValue.includes(key)) {
      return mappedValue;
    }
  }
  
  // Additional mappings for common categories in Boston crime data
  if (rawValue.includes('ASSAULT') || rawValue.includes('AGGRAVATED')) {
    return 'Simple Assault';
  }
  
  if (rawValue.includes('AUTO') || rawValue.includes('VEHICLE') || rawValue.includes('CAR')) {
    return 'Auto Theft';
  }
  
  if (rawValue.includes('BURGLARY') || rawValue.includes('BREAKING')) {
    return 'Residential Burglary';
  }
  
  if (rawValue.includes('VANDALISM') || rawValue.includes('DAMAGE')) {
    return 'Vandalism';
  }
  
  if (rawValue.includes('INVESTIGATE') || rawValue.includes('INVESTIGATION')) {
    return rawValue.includes('PERSON') ? 'Investigate Person' : 'Investigate Property';
  }
  
  // Special cases from Boston crime data
  if (rawValue === 'LARCENY' || rawValue.includes('THEFT')) {
    return 'Auto Theft'; // Consider creating a separate "Theft" category
  }
  
  if (rawValue.includes('DRUG') || rawValue.includes('NARCOTICS')) {
    return 'Violations';
  }
  
  // Log unmapped values to help with debugging
  console.log('Unmapped offense:', rawValue);
  
  return 'Other';
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
