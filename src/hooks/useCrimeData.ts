import { useState, useEffect } from "react";
import { parseCSVData } from '../utils/csvParse';
import type { Crime } from '../types';

export const useCrimeData = () => {
    const [crimes, setCrimes] = useState<Crime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCrimeData = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error when retrying
            const data = await parseCSVData('/src/data/boston_crime_2017.csv');
            setCrimes(data);
        } catch (err) {
            console.error("Failed to fetch crime data:", err);
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    };

    // Function to retry fetching data
    const refetch = () => {
        fetchCrimeData();
    };

    useEffect(() => {
        fetchCrimeData();
    }, []);

    return { crimes, loading, error, refetch };
};