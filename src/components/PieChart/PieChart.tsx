import { recharts } from 'recharts';
import { FC } from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useCrimeData } from '../../hooks/useCrimeData';
import { useFilters } from '../../hooks/useFilters';
import { filterCrimes } from '../../utils/filterCrimes';
import { calculateStats } from '../../utils/calculateStats';

export const PieChartComponent: FC = () => {
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
        <PieChart width={600} height={300}>
            <Pie data={filteredCrimes} dataKey="incidentNumber" nameKey="offenseDescription" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
            <Tooltip />
        </PieChart>
    );
}   