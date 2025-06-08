import { useMemo } from 'react';
import type { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Crime } from '../../types';
import styles from './PieChart.module.css';

interface PieChartProps {
  crimes: Crime[];
  title: string;
  dataKey: 'offenseCode' | 'district' | 'dayOfWeek';
}

export const PieChartComponent: FC<PieChartProps> = ({ crimes, title, dataKey }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];
  
  const data = useMemo(() => {
    if (!crimes.length) return [];
    
    const counts: Record<string, number> = {};
    
    // Count occurrences of each value
    crimes.forEach(crime => {
      const value = crime[dataKey];
      counts[value] = (counts[value] || 0) + 1;
    });
    
    // Convert to array format for recharts
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [crimes, dataKey]);

  if (!crimes.length) {
    return <div className={styles.noData}>No data to display</div>;
  }

  return (
    <div className={styles.pieChartContainer}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value} incidents`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};