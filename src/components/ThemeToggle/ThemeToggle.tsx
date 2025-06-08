import type { FC } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleDarkMode}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};