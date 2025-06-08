import { useState, useMemo } from 'react';
import type { Crime } from '../../types';
import type { FC } from 'react';
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
  
  // Calculate total pages
  const totalPages = Math.ceil(crimes.length / pageSize);
  
  // Handle sorting
  const sortedCrimes = useMemo(() => {
    if (!sortable) return crimes;
    
    return [...crimes].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle date sorting
      if (sortField === 'occuredOnDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      // Sort based on direction
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [crimes, sortField, sortDirection, sortable]);
  
  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedCrimes.slice(startIndex, startIndex + pageSize);
  }, [sortedCrimes, currentPage, pageSize]);
  
  // Handle sort click
  const handleSort = (field: keyof Crime) => {
    if (!sortable) return;
    
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  if (!crimes.length) {
    return <div className={styles.noData}>No data to display</div>;
  }
  
  return (
    <div className={styles.tableContainer}>
      <h3>Crime Data Table</h3>
      
      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('occuredOnDate')} 
                className={sortable ? styles.sortable : ''}
                aria-sort={sortField === 'occuredOnDate' 
                  ? (sortDirection === 'asc' ? 'ascending' : 'descending') 
                  : undefined}
              >
                Date
                {sortField === 'occuredOnDate' && (
                  <span className={styles.sortIcon}>
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                onClick={() => handleSort('offenseCode')}
                className={sortable ? styles.sortable : ''}
                aria-sort={sortField === 'offenseCode' 
                  ? (sortDirection === 'asc' ? 'ascending' : 'descending') 
                  : undefined}
              >
                Offense
                {sortField === 'offenseCode' && (
                  <span className={styles.sortIcon}>
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                onClick={() => handleSort('district')}
                className={sortable ? styles.sortable : ''}
                aria-sort={sortField === 'district' 
                  ? (sortDirection === 'asc' ? 'ascending' : 'descending') 
                  : undefined}
              >
                District
                {sortField === 'district' && (
                  <span className={styles.sortIcon}>
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                onClick={() => handleSort('street')}
                className={sortable ? styles.sortable : ''}
                aria-sort={sortField === 'street' 
                  ? (sortDirection === 'asc' ? 'ascending' : 'descending') 
                  : undefined}
              >
                Location
                {sortField === 'street' && (
                  <span className={styles.sortIcon}>
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((crime, index) => (
              <tr key={`${crime.incidentNumber}-${index}`}>
                <td>
                  {new Date(crime.occuredOnDate).toLocaleDateString()} 
                  <br />
                  <small>{crime.dayOfWeek}</small>
                </td>
                <td>
                  <div className={styles.offenseCell}>
                    <span>{crime.offenseCode}</span>
                    <small>{crime.offenseDescription}</small>
                  </div>
                </td>
                <td>{crime.district}</td>
                <td>{crime.street}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className={styles.pagination} role="navigation" aria-label="Pagination">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
      
      <div className={styles.tableFooter}>
        Showing {currentItems.length} of {crimes.length} incidents
      </div>
    </div>
  );
};