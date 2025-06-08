import { useState, useEffect } from "react";
import { parseCsvData } from '../utils/csvParse';


export const useCrimeData = () => {
    const [crimes, setCrimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrimeData = async () => {
            try {
                setLoading(true);
                const response = await parseCsvData('/src/data/boston_crime_2017.csv');
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCrimes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCrimeData();
    }, []);

    return { crimes, loading, error };
}