import styles from './Widget.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useGetCountries from '../../hooks/useGetCountries';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';
import CountryCard from '../Card/CountryCard';




function Widget() {
    const [country, setCountry] = useState<string | undefined>(undefined)
    const [countries, setCountries] = useState<Array<string>>([])
    const { data, loading, error } = useGetCountries();
    const [value, setValue] = useState<string>('')


    useEffect(() => {
        const countries = data && data.filter((item: any) => item.name.common[0] === 'A').map((item) => item.name.common).sort()
        console.log('countries', countries)
    }, [data])



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

    function changeValueHandler(e: any) {
        const letterValue = e.target.value.toUpperCase();
        setValue(letterValue)
    }

    return (

        <div className={styles.container}>
            <div className={styles.search}>
                <Form.Control
                    type="text"
                    id="text"
                    placeholder='Search countries by a letter'
                    className={styles.input}
                    value={value}
                    onChange={changeValueHandler}
                />

                <Stack direction="horizontal" gap={3} className={styles.stack}>
                    {
                        countries && countries.map(item =>
                            <div className="p-2">
                                <Button variant="primary" data-country={item} className={styles.button} onClick={countryInfoHandler}>{item}</Button>
                            </div>
                        )



                        // ALPHABET.map((letter) => {
                        //     const letterNode = <div>{letter}</div>
                        //     return [letterNode, ...getCountriesByLetter(letter).map(item =>
                        //         <div className="p-2">
                        //             <Button variant="primary" data-country={item} className={styles.button} 
                        //               onClick={countryInfoHandler}>{item}</Button>
                        //         </div>
                        //     )]
                        // })
                    }

                </Stack>
            </div>


            <div className={styles.wrapper}>

                {country && <CountryCard name={country} />}
            </div>

        </div >
    );
}

export default Widget;
