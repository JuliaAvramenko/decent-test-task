import { useState, useEffect } from 'react';
import { IError } from '../types/types';

export interface ICountry {
    name: string
    flag: string
    alt: string
    capital: string
}


function useSearchCountries(search: string) {
    const [data, setData] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${search}`);
                const result: Array<any> | IError = await response.json();
                if ((result as IError).message) {
                    setError((result as IError).message)
                }

                if ((result as Array<any>).length > 0) {
                    setData((result as Array<any>).map(item => item.name.common))
                }



            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        if (search.length >= 3) {
            fetchData();
        }
    }, [search]);

    return { data, loading, error };
}

export default useSearchCountries;