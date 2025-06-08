import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  height?: string;
  width?: string;
  variant?: 'text' | 'rectangle' | 'circle';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  height = '1.2rem', 
  width = '100%', 
  variant = 'rectangle',
  className = '' 
}) => {
  return (
    <div 
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ height, width }}
    />
  );
};

export const ChartSkeleton: React.FC<{ height?: string }> = ({ height = '300px' }) => {
  return (
    <div className={styles.chartSkeleton}>
      <Skeleton height="2rem" width="50%" className={styles.title} />
      <Skeleton height={height} width="100%" className={styles.chart} />
    </div>
  );
};