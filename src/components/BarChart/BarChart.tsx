import React, { useMemo } from 'react';
import type { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './BarChart.module.css';
import type { Crime } from '../../types';

interface BarChartProps {
  crimes: Crime[];
  title: string;
  dataKey: keyof Crime;
  limit?: number;
}

export const BarChartComponent: FC<BarChartProps> = ({ crimes, title, dataKey, limit = 10 }) => {
  const { darkMode } = useTheme();
  
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

  // Add custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '0.875rem',
          boxShadow: 'var(--shadow)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: 0, color: 'var(--accent-color)' }}>
            {payload[0].value} crimes
          </p>
        </div>
      );
    }
    return null;
  };

  if (!crimes.length) {
    return <div className={styles.noData}>No data to display</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444444' : '#e0e0e0'} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: darkMode ? '#e0e0e0' : '#333333' }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis tick={{ fill: darkMode ? '#e0e0e0' : '#333333' }} />
          <Tooltip 
            content={<CustomTooltip />}
            wrapperStyle={{ color: darkMode ? '#e0e0e0' : '#333333' }}
          />
          <Legend wrapperStyle={{ color: darkMode ? '#e0e0e0' : '#333333' }} />
          <Bar dataKey="value" fill={darkMode ? '#6a9be6' : '#4a80ba'} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};