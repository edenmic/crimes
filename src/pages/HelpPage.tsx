import type { FC } from 'react';
import styles from './HelpPage.module.css';

export const HelpPage: FC = () => {
  return (
    <div className={styles.helpPage}>
      <div className={styles.container}>
        <h1>Help & Documentation</h1>
        
        <h2>How to Use the Dashboard</h2>
        <ul>
          <li><strong>Filters:</strong> Use the filter controls to narrow down crime data by offense type, district, date range, and day of week.</li>
          <li><strong>Map:</strong> Click on map markers to see detailed information about specific incidents.</li>
          <li><strong>Charts:</strong> Interactive charts show crime statistics and trends.</li>
          <li><strong>Export:</strong> Use the export button to download filtered data as CSV.</li>
          <li><strong>Dark Mode:</strong> Toggle between light and dark themes using the theme switcher in the header.</li>
        </ul>
        
        <h2>Navigation</h2>
        <ul>
          <li><strong>Dashboard:</strong> Main page with all crime data visualizations</li>
          <li><strong>About:</strong> Information about this application</li>
          <li><strong>Help:</strong> This help documentation</li>
        </ul>
        
        <h2>Data Information</h2>
        <p>The dashboard displays Boston crime incident data from 2017, sourced from the Boston Police Department's public records.</p>
      </div>
    </div>
  );
};