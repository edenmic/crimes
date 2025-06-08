import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export const Header: FC = () => {
  const location = useLocation();
  
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <div className={styles.logoText}>
            <span className={styles.title}>Boston Crime Dashboard</span>
          </div>
        </div>
      </div>
      
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>📊</span>
              Dashboard
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              to="/about" 
              className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>ℹ️</span>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link 
              to="/help" 
              className={`${styles.navLink} ${location.pathname === '/help' ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>❓</span>
              Help
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </header>
  );
};