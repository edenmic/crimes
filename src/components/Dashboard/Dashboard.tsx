import { FC , useMemo } from 'react';
import { useCrimeData } from '../../hooks/useCrimeData';
import { useFilters } from '../../hooks/useFilters';
import { SummaryWindow } from '../SummaryWindow/SummaryWindow';
import { Bar, BarChart, Pie, PieChart } from 'recharts';

//import { Crime } from '../../types/Crime';

export const Dashboard: FC = () => {
    const { crimes, loading: crimesLoading } = useCrimeData();
    const { filters, filterOptions, loading: filtersLoading, updaterFiler } = useFilters();

    //apply filters to the crimes
    const filteredCrimes = useMemo(() => {
        return filteredCrimes(crimes, filters);
    }
    , [crimes, filters, filterCrimes]);

    //calculate stats from filtered crimes
    const stats = useMemo(() => {
        return calculateStats(filteredCrimes);
    }, [filteredCrimes]);

    const loading = crimesLoading || filtersLoading;

    if (error) {
        return <div>Error loading data</div>;
    }   

    return (
        <div className="dashboard">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <h1>Dashboard</h1>
                <CrimesFilter
                    filters={filters}
                    filterOptions={filterOptions}
                    updateFilter={updaterFiler}
                    />
                <SummaryWindow stats={stats} />
                <PieChart>
                <BarChart>
        </div>
        )}
    </div>
    );
};
