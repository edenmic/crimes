import type { FC } from 'react';
import styles from './AboutPage.module.css';

export const AboutPage: FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <h1>About Boston Crime Dashboard</h1>
        <p>This dashboard visualizes crime data from Boston for the year 2017.</p>
        <p>Built with React, TypeScript, and modern data visualization libraries.</p>
        
        <h2>Data Source</h2>
        <p>Crime incident reports from the Boston Police Department.</p>
        
        <h2>Technology Stack</h2>
        <ul>
          <li>React & TypeScript</li>
          <li>Recharts for data visualization</li>
          <li>Leaflet for interactive maps</li>
          <li>CSS Modules for styling</li>
        </ul>
      </div>
    </div>
  );
};