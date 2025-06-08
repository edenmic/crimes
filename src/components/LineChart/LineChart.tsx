import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Crime } from '../../types';
import type { FC } from 'react';
import styles from './LineChart.module.css';

interface TimeDataPoint {
  name: string;
  count: number;
  date: Date; // For sorting
}

interface LineChartProps {
  crimes: Crime[];
  title: string;
  timeGrouping: 'day' | 'week' | 'month';
}

export const LineChartComponent: FC<LineChartProps> = ({ 
  crimes, 
  title, 
  timeGrouping = 'month' 
}) => {
  const data = useMemo(() => {
    if (!crimes.length) return [];
    
    // Map to group crimes by time period
    const groupedCrimes: Record<string, number> = {};
    
    crimes.forEach(crime => {
      try {
        const date = new Date(crime.occuredOnDate);
        if (isNaN(date.getTime())) return; // Skip invalid dates
        
        let periodKey: string;
        
        // Format the date based on the timeGrouping
        if (timeGrouping === 'day') {
          periodKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
        } else if (timeGrouping === 'week') {
          // Get start of week (Sunday)
          const day = date.getDay();
          const diff = date.getDate() - day;
          const startOfWeek = new Date(date);
          startOfWeek.setDate(diff);
          periodKey = startOfWeek.toISOString().split('T')[0];
        } else { // month
          periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }
        
        groupedCrimes[periodKey] = (groupedCrimes[periodKey] || 0) + 1;
      } catch (err) {
        console.error('Error processing date:', err);
      }
    });
    
    // Convert to array format for chart
    const dataArray: TimeDataPoint[] = Object.entries(groupedCrimes).map(([key, value]) => {
      let name: string;
      let date: Date;
      
      if (timeGrouping === 'month') {
        const [year, month] = key.split('-');
        date = new Date(parseInt(year), parseInt(month) - 1, 1);
        name = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      } else if (timeGrouping === 'week') {
        date = new Date(key);
        const endOfWeek = new Date(date);
        endOfWeek.setDate(date.getDate() + 6);
        name = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      } else {
        date = new Date(key);
        name = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      
      return {
        name,
        count: value,
        date // Keep date for sorting
      };
    });
    
    // Sort by date
    return dataArray.sort((a, b) => a.date.getTime() - b.date.getTime());
    
  }, [crimes, timeGrouping]);

  if (!crimes.length) {
    return <div className={styles.noData}>No data to display</div>;
  }

  return (
    <div className={styles.lineChartContainer}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60
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
          <Tooltip 
            formatter={(value: number) => [`${value} incidents`, 'Count']}
            labelFormatter={(label) => `Period: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            name="Number of Incidents" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};