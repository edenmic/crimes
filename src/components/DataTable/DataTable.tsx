import React, { useState, useMemo } from 'react';
import type { FC } from 'react';
import type { Crime } from '../../types';
import styles from './DataTable.module.css';

interface DataTableProps {
  crimes: Crime[];
  pageSize?: number;
  sortable?: boolean;
}

export const DataTableComponent: FC<DataTableProps> = ({ 
  crimes, 
  pageSize = 10, 
  sortable = true 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Crime>('occuredOnDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sort and paginate data
  const { paginatedData, totalPages } = useMemo(() => {
    let sortedCrimes = [...crimes];

    if (sortable && sortField) {
      sortedCrimes.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      paginatedData: sortedCrimes.slice(startIndex, endIndex),
      totalPages: Math.ceil(sortedCrimes.length / pageSize)
    };
  }, [crimes, currentPage, pageSize, sortField, sortDirection, sortable]);

  const handleSort = (field: keyof Crime) => {
    if (!sortable) return;
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'Invalid Date') return 'Invalid Date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDayOfWeek = (dateString: string) => {
    if (!dateString || dateString === 'Invalid Date') return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Crime Data Table</h3>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('occuredOnDate')} style={{ cursor: sortable ? 'pointer' : 'default' }}>
                Date {sortField === 'occuredOnDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('offenseDescription')} style={{ cursor: sortable ? 'pointer' : 'default' }}>
                Offense {sortField === 'offenseDescription' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('district')} style={{ cursor: sortable ? 'pointer' : 'default' }}>
                District {sortField === 'district' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('street')} style={{ cursor: sortable ? 'pointer' : 'default' }}>
                Location {sortField === 'street' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((crime, index) => (
              <tr key={`${crime.incidentNumber}-${index}`}>
                <td className={styles.dateCell}>
                  {formatDate(crime.occuredOnDate)}
                  <br />
                  <small style={{ color: 'var(--text-secondary)' }}>
                    {formatDayOfWeek(crime.occuredOnDate)}
                  </small>
                </td>
                <td className={styles.offenseCell}>
                  <strong>{crime.offenseDescription || 'Other'}</strong>
                  <br />
                  <small style={{ color: 'var(--text-secondary)' }}>
                    {crime.offenseCode || 'N/A'}
                  </small>
                </td>
                <td className={styles.districtCell}>
                  {crime.district || 'Unknown'}
                </td>
                <td className={styles.locationCell}>
                  {crime.street || 'Not specified'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages} ({crimes.length} total records)
          </span>
          
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};