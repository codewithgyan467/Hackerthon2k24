// src/components/MapView.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const MapView = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/services');
                setServices(response.data);
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Map View</h2>
            {/* Implement the map rendering logic here */}
            {/* For example, you could use a library like Leaflet or Google Maps API */}
            {services.map(service => (
                <div key={service.id}>
                    <p>{service.name} - {service.location}</p>
                </div>
            ))}
        </div>
    );
};

export default MapView;
