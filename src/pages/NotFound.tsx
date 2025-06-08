import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import notFoundImage from '../assets/404.jpg';
import styles from './NotFound.module.css';

export const NotFound: FC = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Oops! Crime scene not found</h2>
        <p className={styles.description}>
          The page you're looking for seems to have vanished without a trace...
        </p>
        
        <div className={styles.imageContainer}>
          <img 
            src={notFoundImage} 
            alt="404 Not Found Reaction" 
            className={styles.image}
          />
        </div>
        
        <div className={styles.detective}>🕵️‍♂️</div>
        
        <p className={styles.backText}>
          Let's get you back to{' '}
          <Link to="/" className={styles.backLink}>
            safety
          </Link>
        </p>
        
        <div className={styles.actions}>
          <Link to="/" className={styles.button}>
            Go to Dashboard
          </Link>
          <Link to="/about" className={styles.buttonSecondary}>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};