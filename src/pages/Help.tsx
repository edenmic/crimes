import React from 'react';

export const Help = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Help & Instructions</h1>
      <h2>Using the Dashboard</h2>
      <ul>
        <li>Use the filters at the top to narrow down the crime data by type, district, day of week, or date range</li>
        <li>View the summary statistics to get key insights at a glance</li>
        <li>Explore the charts to understand patterns and distributions</li>
        <li>Check the map to see the geographical distribution of crimes</li>
      </ul>
    </div>
  );
};