import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/services/${id}`);
                setService(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch service details');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetails();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Service Details</h2>
            <p>Name: {service.name}</p>
            <p>Description: {service.description}</p>
            <p>Price: ${service.price}</p>
        </div>
    );
};

export default ServiceDetails;
