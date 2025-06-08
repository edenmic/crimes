import { useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import type { Crime } from '../../types';
import styles from './HeatMap.module.css';
import type { FC } from 'react';

interface HeatMapProps {
  crimes: Crime[];
  title: string;
}

export const HeatMap: FC<HeatMapProps> = ({ crimes, title }) => {
  const { darkMode } = useTheme();

  // Create heatmap data by hour and day of week
  const heatmapData = useMemo(() => {
    const data: { [day: string]: { [hour: string]: number } } = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Initialize data structure
    days.forEach(day => {
      data[day] = {};
      for (let hour = 0; hour < 24; hour++) {
        data[day][hour.toString()] = 0;
      }
    });

    // Count crimes by day and hour
    crimes.forEach(crime => {
      if (crime.occuredOnDate) {
        const date = new Date(crime.occuredOnDate);
        const dayName = days[date.getDay()];
        const hour = date.getHours().toString();
        
        if (data[dayName] && data[dayName][hour] !== undefined) {
          data[dayName][hour]++;
        }
      }
    });

    return data;
  }, [crimes]);

  // Find max value for scaling
  const maxValue = useMemo(() => {
    let max = 0;
    Object.values(heatmapData).forEach(dayData => {
      Object.values(dayData).forEach(count => {
        if (count > max) max = count;
      });
    });
    return max;
  }, [heatmapData]);

  // Get color intensity based on count
  const getIntensity = (count: number): number => {
    return maxValue > 0 ? count / maxValue : 0;
  };

  // Get background color for cell
  const getCellColor = (count: number): string => {
    const intensity = getIntensity(count);
    if (intensity === 0) return darkMode ? '#2d2d2d' : '#f5f5f5';
    
    const baseColor = darkMode ? '106, 155, 230' : '74, 128, 186'; // RGB values
    return `rgba(${baseColor}, ${0.2 + intensity * 0.8})`;
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className={styles.heatMapContainer}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.heatMapWrapper}>
        <div className={styles.heatMap}>
          {/* Hour labels */}
          <div className={styles.hourLabels}>
            <div className={styles.emptyCell}></div>
            {hours.map(hour => (
              <div key={hour} className={styles.hourLabel}>
                {hour.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          
          {/* Day rows */}
          {days.map(day => (
            <div key={day} className={styles.dayRow}>
              <div className={styles.dayLabel}>{day}</div>
              {hours.map(hour => {
                const count = heatmapData[day][hour.toString()];
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={styles.cell}
                    style={{ backgroundColor: getCellColor(count) }}
                    title={`${day} ${hour}:00 - ${count} crimes`}
                  >
                    {count > 0 && <span className={styles.cellValue}>{count}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Less</span>
          <div className={styles.legendScale}>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={styles.legendCell}
                style={{ 
                  backgroundColor: getCellColor(Math.floor((maxValue / 4) * i))
                }}
              />
            ))}
          </div>
          <span className={styles.legendLabel}>More</span>
        </div>
      </div>
    </div>
  );
};