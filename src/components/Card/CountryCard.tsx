import { FC, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import useGetCountryByName from '../../hooks/useGetCountryByName';
import { Toast } from 'react-bootstrap';

interface Props {
    name: string
}

const CountryCard: FC<Props> = ({ name }) => {
    const { data, loading, error } = useGetCountryByName(name)

    return (
        <>
            {
                data && <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={data.flag} alt={data.alt} />
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        {data.capital && <Card.Text>{`The capital is ${data.capital}`}</Card.Text>}

                    </Card.Body>
                </Card>
            }

            {
                error && <Toast>
                    <Toast.Header>Error</Toast.Header>
                    <Toast.Body>Oops: {error}</Toast.Body>
                </Toast>
            }
        </>

    );
}

export default CountryCard;