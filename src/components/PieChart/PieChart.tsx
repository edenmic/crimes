import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './PieChart.module.css';
import type { Crime } from '../../types';
import type { FC } from 'react';

interface PieChartProps {
  crimes: Crime[];
  title: string;
  dataKey: keyof Crime;
  limit?: number;
}

export const PieChartComponent: FC<PieChartProps> = ({ crimes, title, dataKey, limit = 8 }) => {
  const { darkMode } = useTheme();
  
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    
    crimes.forEach(crime => {
      const value = String(crime[dataKey] || 'Unknown');
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ 
        name: name.length > 20 ? name.substring(0, 20) + '...' : name, // חיתוך טקסט ארוך
        fullName: name,
        value 
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  }, [crimes, dataKey, limit]);

  // צבעים מותאמים לערכת הצבעים
  const COLORS = darkMode ? 
    ['#6a9be6', '#e67a9b', '#e6c27a', '#7ae69b', '#9b7ae6', '#e67a7a', '#7ae6e6', '#e6e67a'] :
    ['#4a80ba', '#ba4a80', '#ba804a', '#4aba80', '#804aba', '#ba4a4a', '#4ababa', '#baba4a'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
          color: darkMode ? '#e0e0e0' : '#333333',
          border: `1px solid ${darkMode ? '#444444' : '#e0e0e0'}`,
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.fullName}</p>
          <p style={{ margin: 0, color: darkMode ? '#6a9be6' : '#4a80ba' }}>
            {data.value} crimes ({((data.value / crimes.length) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="40%" // הזזת הגרף שמאלה כדי לפנות מקום ללגנדה
              cy="50%"
              outerRadius={80} // הקטנת הגרף
              innerRadius={25} // יצירת חור באמצע לעיצוב יפה יותר
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ 
                paddingLeft: '20px',
                fontSize: '0.875rem',
                color: darkMode ? '#e0e0e0' : '#333333'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};