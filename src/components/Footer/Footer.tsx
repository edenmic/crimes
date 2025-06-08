import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>About This Dashboard</h4>
          <p>This dashboard visualizes crime data from Boston in 2017 using React and modern data visualization libraries.</p>
        </div>
        
        <div className={styles.section}>
          <h4>Data Source</h4>
          <p>Data provided by the Boston Police Department through the city's open data initiative.</p>
        </div>
        
        <div className={styles.section}>
          <h4>Resources</h4>
          <ul>
            <li><a href="https://data.boston.gov/dataset/crime-incident-reports-august-2015-to-date-source-new-system" target="_blank" rel="noopener noreferrer">Boston Crime Data</a></li>
            <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a></li>
            <li><a href="https://recharts.org/" target="_blank" rel="noopener noreferrer">Recharts</a></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <p>&copy; {currentYear} Boston Crime Dashboard. For educational purposes only.</p>
      </div>
    </footer>
  );
};