import React from 'react';

export const About = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>About This Dashboard</h1>
      <p>
        This dashboard visualizes crime data from Boston in 2017. It was created as a demonstration 
        of React and data visualization capabilities.
      </p>
      <p>
        The data comes from the Boston Police Department and includes information about various 
        incidents reported throughout the year.
      </p>
    </div>
  );
};