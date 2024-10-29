import { useState } from 'react';
import axios from 'axios';

const ServiceSearch = () => {
    const [query, setQuery] = useState('');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/services/search?query=${query}`);
            setServices(response.data);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for services"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {services.map(service => (
                    <li key={service._id}>{service.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSearch;
