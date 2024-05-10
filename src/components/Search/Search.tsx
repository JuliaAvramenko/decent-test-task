import { FC, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import useSearchCountries from '../../hooks/useSearchCountries';
import { Toast } from 'react-bootstrap';

interface Props {
    initialValue: string
    callback: (value: Array<string>) => void
}

const Search: FC<Props> = ({ initialValue, callback }) => {
    const [value, setValue] = useState<string>('')
    const { data, loading, error } = useSearchCountries(value)

    function changeValueHandler(e: any) {
        setValue(e.target.value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        data && !loading && callback(data)
    }, [data, loading, error])

    return (
        <>
            <Form.Control
                type="text"
                placeholder='Search countries by name'
                value={value}
                onChange={changeValueHandler}
            />
            {
                error && <Toast>
                    <Toast.Header>Error</Toast.Header>
                    <Toast.Body>Oops: {error}</Toast.Body>
                </Toast>
            }
        </>



    );
}

export default Search;