import { useMemo } from 'react';
import type { FC } from 'react';
import { useCrimeData } from '../../hooks/useCrimeData';
import { Filters } from '../Filters/Filters';
import { SummaryWindow } from '../SummaryWindow/SummaryWindow';
import { PieChartComponent } from '../PieChart/PieChart';
import { BarChartComponent } from '../BarChart/BarChart';
import { filterCrimes } from '../../utils/filterCrimes';
import { calculateStats } from '../../utils/calculateStats';
import styles from './Dashboard.module.css';
import { useFilters } from '../../hooks/useFilters';
import { CrimeMap } from '../CrimeMap/CrimeMap';
// Import the skeleton components
import { Skeleton, ChartSkeleton } from '../Skeleton/Skeleton';
import { exportToCsv } from '../../utils/exportData';

export const Dashboard: FC = () => {
  const { crimes, loading: crimesLoading, error } = useCrimeData();
  const { filters, filterOptions, loading: filtersLoading, updateFilter } = useFilters(crimes);

  // Apply filters to the crimes
  const filteredCrimes = useMemo(() => {
    return filterCrimes(crimes, filters);
  }, [crimes, filters]);

  // Calculate stats from filtered crimes
  const stats = useMemo(() => {
    return calculateStats(filteredCrimes);
  }, [filteredCrimes]);

  const loading = crimesLoading || filtersLoading;

  if (error) {
    return <div className={styles.error}>Error loading data: {error.message}</div>;
  }   

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Boston Crime Dashboard (2017)</h1>
      </header>

      {loading ? (
        <div className={styles.loadingContainer}>
          <h2 className={styles.loadingHeader}>Loading Crime Data...</h2>
          
          <div className={styles.skeletonFilters}>
            <Skeleton height="60px" />
          </div>
          
          <div className={styles.skeletonSummary}>
            <Skeleton height="120px" />
          </div>
          
          <div className={styles.chartsContainer}>
            <div className={styles.chartColumn}>
              <ChartSkeleton />
            </div>
            <div className={styles.chartColumn}>
              <ChartSkeleton />
            </div>
          </div>
          
          <ChartSkeleton height="400px" />
          <ChartSkeleton height="400px" />
        </div>
      ) : (
        <>
          <div className={styles.actions}>
            <button 
              className={styles.exportButton}
              onClick={() => exportToCsv(filteredCrimes, 'boston-crimes-filtered')}
              disabled={filteredCrimes.length === 0}
            >
              Export Filtered Data to CSV
            </button>
          </div>
          
          <Filters 
            filters={filters} 
            filterOptions={filterOptions} 
            updateFilter={updateFilter} 
          />
          
          <SummaryWindow stats={stats} />
          
          <div className={styles.chartsContainer}>
            <div className={styles.chartColumn}>
              <PieChartComponent 
                crimes={filteredCrimes} 
                title="Crimes by Offense Type" 
                dataKey="offenseCode" 
              />
            </div>
            
            <div className={styles.chartColumn}>
              <PieChartComponent 
                crimes={filteredCrimes} 
                title="Crimes by District" 
                dataKey="district" 
              />
            </div>
          </div>
          
          <div className={styles.fullWidthChart}>
            <BarChartComponent 
              crimes={filteredCrimes} 
              title="Top 15 Offense Types" 
              dataKey="offenseCode" 
              limit={15}
            />
          </div>
          
          <div className={styles.fullWidthChart}>
            <BarChartComponent 
              crimes={filteredCrimes} 
              title="Crimes by Day of Week" 
              dataKey="dayOfWeek" 
            />
          </div>
          
          <div className={styles.fullWidthChart}>
            <CrimeMap 
              crimes={filteredCrimes} 
              title="Crime Locations in Boston" 
            />
          </div>
        </>
      )}
    </div>
  );
};
