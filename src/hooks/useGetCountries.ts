import { useState, useEffect } from 'react';

// Хук useFetch
function useGetCountries() {
    const [data, setData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Зависимость от URL гарантирует, что запрос будет повторно выполнен, если URL изменится

    return { data, loading, error };
}

export default useGetCountries;