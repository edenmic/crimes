import { useMemo, useState } from 'react';
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
import { LineChartComponent } from '../LineChart/LineChart';
import { Skeleton, ChartSkeleton } from '../Skeleton/Skeleton';
import { exportToCsv } from '../../utils/exportData';
import { DataTableComponent } from '../DataTable/DataTable';
import { HeatMapComponent } from '../HeatMap/HeatMap';
import type { Crime } from '../../types';

export const Dashboard: FC = () => {
  const { crimes, loading: crimesLoading, error, refetch } = useCrimeData();
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

  const retryDataLoad = () => {
    if (refetch) {
      refetch();
    }
  };

  // Add to Dashboard component
  const saveCurrentView = () => {
    const viewState = {
      filters,
      activeSections: {
        summary: true,
        pieCharts: true,
        barCharts: true,
        map: mapVisible,
        lineChart: true
      }
    };
    localStorage.setItem('dashboardViewState', JSON.stringify(viewState));
  };

  // Add the state variables at the top of your Dashboard component
  const [period1, setPeriod1] = useState('2017-01');
  const [period2, setPeriod2] = useState('2017-06');
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState<{ period1: Crime[], period2: Crime[] }>({ 
    period1: [], 
    period2: [] 
  });

  // Add a function to compare data
  const compareData = () => {
    const [year1, month1] = period1.split('-').map(Number);
    const [year2, month2] = period2.split('-').map(Number);
    
    const startDate1 = new Date(year1, month1 - 1, 1);
    const endDate1 = new Date(year1, month1, 0);
    
    const startDate2 = new Date(year2, month2 - 1, 1);
    const endDate2 = new Date(year2, month2, 0);
    
    const period1Crimes = crimes.filter(crime => {
      const date = new Date(crime.occuredOnDate);
      return date >= startDate1 && date <= endDate1;
    });
    
    const period2Crimes = crimes.filter(crime => {
      const date = new Date(crime.occuredOnDate);
      return date >= startDate2 && date <= endDate2;
    });
    
    setComparisonData({ period1: period1Crimes, period2: period2Crimes });
    setShowComparison(true);
  };

  // Add this helper function inside your Dashboard component
  const calculateTopOffense = (crimes: Crime[]) => {
    if (!crimes.length) return 'None';
    
    const offenseCounts: Record<string, number> = {};
    crimes.forEach(crime => {
      offenseCounts[crime.offenseCode] = (offenseCounts[crime.offenseCode] || 0) + 1;
    });
    
    return Object.entries(offenseCounts)
      .sort((a, b) => b[1] - a[1])
      [0][0];
  };

  return (
    <div className={styles.dashboard}>
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
              aria-label="Export filtered crime data to CSV" 
              className={styles.exportButton}
              onClick={() => exportToCsv(filteredCrimes, 'boston-crimes-filtered')}
            >
              Export Filtered Data
            </button>
          </div>
          
          <Filters 
            filters={filters} 
            filterOptions={filterOptions} 
            updateFilter={updateFilter} 
          />
          
          <SummaryWindow stats={stats} />
          
          <div className={styles.chartsContainer}>
            <div className={styles.chartColumn} tabIndex={0} aria-label="Pie chart showing crimes by offense type">
              <PieChartComponent 
                crimes={filteredCrimes} 
                title="Crimes by Offense Type" 
                dataKey="offenseCode" 
              />
            </div>
            
            <div className={styles.chartColumn} tabIndex={0} aria-label="Pie chart showing crimes by district">
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

          <div className={styles.fullWidthChart}>
            <LineChartComponent 
              crimes={filteredCrimes} 
              title="Crimes by Month" 
              timeGrouping="month" 
            />
          </div>

          <div className={styles.fullWidthChart}>
            <HeatMapComponent 
              crimes={filteredCrimes} 
              title="Crime Hotspots by Hour of Day" 
              xAxis="hour"
              yAxis="dayOfWeek"
            />
          </div>

          <div className={styles.insightsSection}>
            <h3>Key Insights</h3>
            <ul>
              <li>Most crimes occur on {stats.mostCommonDayOfWeek} between 2-6pm</li>
              <li>{stats.mostCommonOffense} accounts for 23% of all incidents</li>
              <li>District {stats.mostCommonDistrict} has seen a 15% increase in reports</li>
            </ul>
          </div>

          <div className={styles.analyticsPanel}>
            <h3>Advanced Analytics</h3>
            <div className={styles.statCards}>
              <div className={styles.statCard}>
                <h4>Crime Rate</h4>
                <div className={styles.statValue}>
                  {(filteredCrimes.length / 365).toFixed(1)} per day
                </div>
              </div>
              <div className={styles.statCard}>
                <h4>Peak Time</h4>
                <div className={styles.statValue}>2PM - 6PM</div>
              </div>
              <div className={styles.statCard}>
                <h4>Safest District</h4>
                <div className={styles.statValue}>{stats.leastCommonDistrict || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className={styles.fullWidthChart}>
            <DataTableComponent 
              crimes={filteredCrimes} 
              pageSize={10}
              sortable={true}
            />
          </div>

          {/* Add the comparison component */}
          <div className={styles.comparisonSelector}>
            <h3>Compare Crime Data</h3>
            <div className={styles.dateSelectors}>
              <div className={styles.periodSelector}>
                <label htmlFor="period1">Period 1:</label>
                <input 
                  type="month" 
                  id="period1"
                  min="2017-01" 
                  max="2017-12" 
                  value={period1} 
                  onChange={e => setPeriod1(e.target.value)} 
                />
              </div>
              <div className={styles.periodSelector}>
                <label htmlFor="period2">Period 2:</label>
                <input 
                  type="month" 
                  id="period2"
                  min="2017-01" 
                  max="2017-12" 
                  value={period2} 
                  onChange={e => setPeriod2(e.target.value)} 
                />
              </div>
              <button 
                className={styles.compareButton}
                onClick={compareData}
                aria-label="Compare selected time periods"
              >
                Compare Periods
              </button>
            </div>
          </div>

          {/* Add comparison results section */}
          {showComparison && (
            <div className={styles.comparisonResults}>
              <h3>Comparison Results</h3>
              <div className={styles.comparisonStats}>
                <div className={styles.periodStats}>
                  <h4>{new Date(period1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</h4>
                  <p>Total incidents: {comparisonData.period1.length}</p>
                  <p>Top offense: {calculateTopOffense(comparisonData.period1)}</p>
                </div>
                <div className={styles.changeIndicator}>
                  <span className={styles.changeArrow}>
                    {comparisonData.period2.length > comparisonData.period1.length ? '↑' : '↓'}
                  </span>
                  <p>{Math.abs(((comparisonData.period2.length / comparisonData.period1.length) - 1) * 100).toFixed(1)}% change</p>
                </div>
                <div className={styles.periodStats}>
                  <h4>{new Date(period2).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</h4>
                  <p>Total incidents: {comparisonData.period2.length}</p>
                  <p>Top offense: {calculateTopOffense(comparisonData.period2)}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {error && (
        <div className={styles.error}>
          <h2>Error Loading Data</h2>
          <p>{error.message}</p>
          <button 
            className={styles.retryButton} 
            onClick={retryDataLoad}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
