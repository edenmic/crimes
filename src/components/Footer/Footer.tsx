import React from 'react';
import type { FC } from 'react';
import styles from './Footer.module.css';

export const Footer: FC = () => {
    return (
    <footer className={styles.footer}>
      <div className={styles.skyline} aria-hidden="true">
        {/* Simple Boston skyline SVG accent */}
        <svg viewBox="0 0 600 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.skylineSvg}>
          <path d="M0 40 V25 H30 V10 H60 V30 H90 V5 H120 V35 H150 V15 H180 V40 H210 V20 H240 V40 H270 V10 H300 V40 H330 V25 H360 V40 H390 V15 H420 V40 H450 V5 H480 V40 H510 V20 H540 V40 H570 V10 H600 V40 Z" fill="currentColor" opacity="0.12"/>
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4 className={styles.logo}>Boston Crime Dashboard</h4>
          <p className={styles.description}>Visualizing Boston's 2017 crime data with React and modern data visualization libraries.</p>
        </div>
        <div className={styles.section}>
          <h4>Resources</h4>
          <ul className={styles.links}>
            <li><a href="https://data.boston.gov/dataset/crime-incident-reports-august-2015-to-date-source-new-system" target="_blank" rel="noopener noreferrer"><span className={styles.icon} aria-hidden="true">📊</span> Boston Crime Data</a></li>
            <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><span className={styles.icon} aria-hidden="true">⚛️</span> React</a></li>
            <li><a href="https://recharts.org/" target="_blank" rel="noopener noreferrer"><span className={styles.icon} aria-hidden="true">📈</span> Recharts</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Contact</h4>
          <ul className={styles.links}>
            <li><a href="mailto:eden.mic.her@gmail.com"><span className={styles.icon} aria-hidden="true">✉️</span> Email</a></li>
            <li><a href="https://github.com/edenmic/" target="_blank" rel="noopener noreferrer"><span className={styles.icon} aria-hidden="true">🐙</span> GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2017 Boston Crime Dashboard. For educational purposes only.</p>
      </div>
    </footer>
  );
};