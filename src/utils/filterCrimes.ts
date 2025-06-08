import type { Crime, Filters } from '../types';

export const filterCrimes = (crimes: Crime[], filters: Filters): Crime[] => {
  if (!crimes.length) return [];
  
  return crimes.filter(crime => {
    // Filter by offense code
    if (filters.offenseCode !== 'All' && crime.offenseCode !== filters.offenseCode) {
      return false;
    }
    
    // Filter by district
    if (filters.district !== 'All' && crime.district !== filters.district) {
      return false;
    }
    
    // Filter by day of week
    if (filters.dayOfWeek !== 'All' && crime.dayOfWeek !== filters.dayOfWeek) {
      return false;
    }
    
    // Filter by street
    if (filters.street !== 'All' && crime.street !== filters.street) {
      return false;
    }
    
    // Filter by date range
    if (filters.startDate && filters.endDate) {
      const crimeDate = new Date(crime.occuredOnDate);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      
      if (crimeDate < startDate || crimeDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
};