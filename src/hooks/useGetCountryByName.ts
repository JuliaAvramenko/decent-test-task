import { useState, useEffect } from 'react';

export interface ICountry {
    name: string
    flag: string
    alt: string
    capital: string
}


function useGetCountryByName(name: string) {
    const [data, setData] = useState<ICountry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
                const result: Array<any> = await response.json();
                const ourCountry = result && result.filter(item => item.name.common === name)
                if (ourCountry && ourCountry.length == 1) {
                    const c = ourCountry[0]
                    const name: string = c.name.common
                    const flag: string = c.flags.svg
                    const alt: string = c.flags.alt
                    const capital: string = c.capital && c.capital.join(', ') || ''


                    setData({
                        name,
                        flag,
                        alt,
                        capital
                    })
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [name]);

    return { data, loading, error };
}

export default useGetCountryByName;