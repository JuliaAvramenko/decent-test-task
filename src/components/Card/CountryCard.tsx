import { FC, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import useGetCountryByName from '../../hooks/useGetCountryByName';

interface Props {
    name: string
}

const CountryCard: FC<Props> = ({ name }) => {
    const { data, loading, error } = useGetCountryByName(name)

    useEffect(() => {
        console.log('country card name', name)
    }, [name])

    useEffect(() => {
        console.log('data, loading, error ', data, loading, error)
    }, [data, loading, error])

    return (
        <>
            {
                data && <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={data.flag} alt={data.alt} />
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>
                            {data.capital}
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
        </>

    );
}

export default CountryCard;