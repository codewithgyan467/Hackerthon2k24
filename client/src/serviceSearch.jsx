import { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceSearch = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/services');
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Available Services</h1>
            <ul>
                {services.map(service => (
                    <li key={service.id}>{service.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSearch;
