import React from 'react';
import type { FC } from 'react';
import type { Filters as FiltersType, FilterOptions } from '../../types';
import styles from './Filters.module.css';

interface FiltersProps {
  filters: FiltersType;
  filterOptions: FilterOptions;
  updateFilter: (filterName: keyof FiltersType, value: string) => void;
}

export const Filters: FC<FiltersProps> = ({ filters, filterOptions, updateFilter }) => {
  return (
    <div className={styles.filtersContainer}>
      <h3>Filter Crimes</h3>
      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          <label htmlFor="offenseCode">Offense Type:</label>
          <select 
            id="offenseCode" 
            value={filters.offenseCode} 
            onChange={(e) => updateFilter('offenseCode', e.target.value)}
          >
            <option value="All">All Offenses</option>
            {filterOptions.offenseCodes.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="district">District:</label>
          <select 
            id="district" 
            value={filters.district} 
            onChange={(e) => updateFilter('district', e.target.value)}
          >
            <option value="All">All Districts</option>
            {filterOptions.districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="dayOfWeek">Day of Week:</label>
          <select 
            id="dayOfWeek" 
            value={filters.dayOfWeek} 
            onChange={(e) => updateFilter('dayOfWeek', e.target.value)}
          >
            <option value="All">All Days</option>
            {filterOptions.daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="dateRange">Date Range:</label>
          <div className={styles.dateInputs}>
            <input 
              type="date" 
              value={filters.startDate} 
              onChange={(e) => updateFilter('startDate', e.target.value)} 
            />
            <span>to</span>
            <input 
              type="date" 
              value={filters.endDate} 
              onChange={(e) => updateFilter('endDate', e.target.value)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};