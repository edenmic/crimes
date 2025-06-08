import React, { useMemo } from 'react';
import type { FC } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './PieChart.module.css';
import type { Crime } from '../../types';

interface PieChartProps {
  crimes: Crime[];
  title: string;
  dataKey: keyof Crime;
  limit?: number;
}

export const PieChartComponent: FC<PieChartProps> = ({ crimes, title, dataKey, limit = 10 }) => {
  const { darkMode } = useTheme();
  
  const data = useMemo(() => {
    if (!crimes.length) return [];
    
    const counts: Record<string, number> = {};
    
    // Count occurrences of each value
    crimes.forEach(crime => {
      const value = crime[dataKey];
      counts[value] = (counts[value] || 0) + 1;
    });
    
    // Convert to array format for recharts
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  }, [crimes, dataKey, limit]);

  if (!crimes.length) {
    return <div className={styles.noData}>No data to display</div>;
  }

  // Colors that work well in both light and dark modes
  const COLORS = darkMode ? 
    ['#6a9be6', '#e67a9b', '#e6c27a', '#7ae69b', '#9b7ae6', '#e67a7a', '#7ae6e6', '#e6e67a', '#c27ae6', '#7ac2e6'] :
    ['#4a80ba', '#ba4a80', '#ba804a', '#4aba80', '#804aba', '#ba4a4a', '#4ababa', '#baba4a', '#804aba', '#4a80ba'];

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
              color: darkMode ? '#e0e0e0' : '#333333',
              border: `1px solid ${darkMode ? '#444444' : '#e0e0e0'}`,
            }} 
          />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            wrapperStyle={{ color: darkMode ? '#e0e0e0' : '#333333' }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};