import { recharts } from 'recharts';
import { FC } from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useCrimeData } from '../../hooks/useCrimeData';
import { useFilters } from '../../hooks/useFilters';
import { filterCrimes } from '../../utils/filterCrimes';
import { calculateStats } from '../../utils/calculateStats';

export const BarChartComponent: FC = () => {
    const { crimes, loading: crimesLoading } = useCrimeData();
    const { filters, filterOptions, loading: filtersLoading, updateFilter } = useFilters();

    // Apply filters to the crimes
    const filteredCrimes = filterCrimes(crimes, filters);

    // Calculate stats from filtered crimes
    const stats = calculateStats(filteredCrimes);

    const loading = crimesLoading || filtersLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BarChart width={600} height={300} data={filteredCrimes}>
            <XAxis dataKey="offenseDescription" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="incidentNumber" fill="#8884d8" />
        </BarChart>
    );
}