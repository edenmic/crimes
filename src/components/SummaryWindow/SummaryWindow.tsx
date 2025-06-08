import type { FC } from 'react';
import type { SummaryStats } from '../../types';
import styles from './SummaryWindow.module.css';

interface SummaryWindowProps {
  stats: SummaryStats;
}

export const SummaryWindow: FC<SummaryWindowProps> = ({ stats }) => {
  return (
    <div className={styles.summaryContainer}>
      <h3>Crime Statistics Summary</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h4>Total Incidents</h4>
          <div className={styles.statValue}>{stats.totalThreats}</div>
        </div>
        
        <div className={styles.statCard}>
          <h4>Most Common Offense</h4>
          <div className={styles.statValue}>{stats.mostCommonOffense || 'N/A'}</div>
        </div>
        
        <div className={styles.statCard}>
          <h4>Most Active District</h4>
          <div className={styles.statValue}>{stats.mostCommonDistrict || 'N/A'}</div>
        </div>
        
        <div className={styles.statCard}>
          <h4>Most Common Day</h4>
          <div className={styles.statValue}>{stats.mostCommonDayOfWeek || 'N/A'}</div>
        </div>
        
        <div className={styles.statCard}>
          <h4>Most Common Location</h4>
          <div className={styles.statValue}>{stats.mostCommonStreet}</div>
        </div>
      </div>
    </div>
  );
};