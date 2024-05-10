import styles from './Widget.module.css';
import Button from 'react-bootstrap/Button';
import useGetCountries from '../../hooks/useGetCountries';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';
import CountryCard from '../Card/CountryCard';
import Search from '../Search/Search';
import { Toast } from 'react-bootstrap';


function Widget() {
    const [country, setCountry] = useState<string | undefined>(undefined)
    const [countries, setCountries] = useState<Array<string>>([])
    const [value, setValue] = useState<string>('')
    const { data, loading, error } = useGetCountries();


    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const getCountriesByLetter = (letter: string) => {
        const countries = data && data.filter((item: any) => item.name.common[0] === letter).map((item) => item.name.common).sort()
        return countries
    }

    useEffect(() => {
        const countries = getCountriesByLetter(value)
        setCountries(countries)
    }, [value])

    function countryInfoHandler(e: any) {
        setCountry(e.currentTarget.dataset.country)
    }

    function chooseLetterHandler(e: any) {
        setValue(e.currentTarget.dataset.letter)
    }

    return (

        <div className={styles.container}>
            <div className={styles.search}>
                <Search
                    initialValue={value}
                    callback={setCountries}
                />

                <Stack direction="horizontal" gap={2} className={styles.stack}>
                    {ALPHABET.map(letter =>
                        <div key={letter} className="p-1">
                            <Button variant="success" data-letter={letter} className={styles.button} onClick={chooseLetterHandler}>{letter}</Button>
                        </div>
                    )}
                </Stack>

                <Stack direction="horizontal" gap={2} className={styles.stack}>
                    {
                        countries && countries.map(item =>
                            <div key={item} className="p-2">
                                <Button variant="primary" data-country={item} className={styles.button} onClick={countryInfoHandler}>{item}</Button>
                            </div>
                        )

                    }
                </Stack>
            </div>


            <div className={styles.wrapper}>
                {country && <CountryCard name={country} />}
            </div>

            {
                error && <Toast>
                    <Toast.Header>Error</Toast.Header>
                    <Toast.Body>Oops: {error}</Toast.Body>
                </Toast>
            }
        </div >
    );
}

export default Widget;
