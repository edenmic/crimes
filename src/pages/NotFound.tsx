import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/404.jpg';

export const NotFound = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '5rem', margin: '0', color: '#e74c3c' }}>404</h1>
      <h2>Oops! Crime scene not found</h2>
      <p>The page you're looking for seems to have vanished without a trace...</p>
      
      <div style={{ margin: '2rem 0', maxWidth: '500px' }}>
        <img 
          src={notFoundImage} 
          alt="404 Not Found Reaction" 
          style={{ 
            width: '100%', 
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }} 
        />
      </div>
      
      <div style={{ fontSize: '5rem', margin: '1rem 0' }}>🕵️‍♂️</div>
      <p>Let's get you back to <Link to="/" style={{ color: '#3498db' }}>safety</Link></p>
    </div>
  );
};