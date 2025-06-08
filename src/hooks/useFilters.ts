import { useState, useEffect } from 'react';
import type { Crime, Filters, FilterOptions, OffenseCodeGroup, District, DayOfWeek } from '../types';

export const useFilters = (crimes: Crime[] = []) => {
  const [filters, setFilters] = useState<Filters>({
    offenseCode: 'All',
    district: 'All',
    dayOfWeek: 'All',
    street: 'All',
    startDate: '',
    endDate: ''
  });
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    offenseCodes: [],
    districts: [],
    daysOfWeek: [],
    streets: []
  });

  const [loading, setLoading] = useState(true);

  // Extract unique values for filter options
  useEffect(() => {
    if (crimes.length > 0) {
      const offenseCodes = Array.from(new Set(crimes.map(crime => crime.offenseCode)));
      const districts = Array.from(new Set(crimes.map(crime => crime.district)));
      const daysOfWeek = Array.from(new Set(crimes.map(crime => crime.dayOfWeek)));
      const streets = Array.from(new Set(crimes.map(crime => crime.street)));

      setFilterOptions({
        offenseCodes: offenseCodes as OffenseCodeGroup[],
        districts: districts as District[],
        daysOfWeek: daysOfWeek as DayOfWeek[],
        streets
      });
      
      setLoading(false);
    }
  }, [crimes]);

  // Load saved filters on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('crimeFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Save filters whenever they change
  useEffect(() => {
    localStorage.setItem('crimeFilters', JSON.stringify(filters));
  }, [filters]);

  // Function to update a specific filter
  const updateFilter = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return { filters, filterOptions, loading, updateFilter };
};