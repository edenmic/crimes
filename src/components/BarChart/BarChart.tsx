import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Crime } from '../../types';
import type { FC } from 'react';
import styles from './BarChart.module.css';

interface BarChartProps {
  crimes: Crime[];
  title: string;
  dataKey: 'offenseCode' | 'district' | 'dayOfWeek';
  limit?: number;
}

export const BarChartComponent: FC<BarChartProps> = ({ crimes, title, dataKey, limit = 10 }) => {
  const data = useMemo(() => {
    if (!crimes.length) return [];
    
    const counts: Record<string, number> = {};
    
    // Count occurrences of each value
    crimes.forEach(crime => {
      const value = crime[dataKey];
      counts[value] = (counts[value] || 0) + 1;
    });
    
    // Convert to array and sort by count (descending)
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit); // Limit the number of bars
  }, [crimes, dataKey, limit]);

  if (!crimes.length) {
    return <div className={styles.noData}>No data to display</div>;
  }

  return (
    <div className={styles.barChartContainer}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value} incidents`, 'Count']} />
          <Legend />
          <Bar dataKey="value" name="Number of Incidents" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};