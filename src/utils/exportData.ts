import type { Crime } from '../types';

export const exportToCsv = (crimes: Crime[], filename: string = 'crime-data') => {
  // Define headers
  const headers = [
    'Incident Number',
    'Offense Code',
    'Offense Description',
    'District',
    'Date',
    'Day of Week',
    'Street',
    'Latitude',
    'Longitude'
  ];
  
  // Map data to rows
  const rows = crimes.map(crime => [
    crime.incidentNumber,
    crime.offenseCode,
    crime.offenseDescription,
    crime.district,
    crime.occuredOnDate,
    crime.dayOfWeek,
    crime.street,
    crime.latitude.toString(),
    crime.longitude.toString()
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};