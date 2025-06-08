import { useMemo } from 'react';
import styles from './HeatMap.module.css';
import type { Crime } from '../../types';
import type { FC } from 'react';

interface HeatMapProps {
  crimes: Crime[];
  title: string;
  xAxis: 'hour' | 'month' | 'district';
  yAxis: 'dayOfWeek' | 'offenseCode' | 'district';
}

export const HeatMapComponent: FC<HeatMapProps> = ({ crimes, title }) => {
  return (
    <div className={styles.heatMapContainer}>
      <h3>{title}</h3>
      <div className={styles.placeholder}>
        Heat map visualization - {crimes.length} data points
      </div>
    </div>
  );
};