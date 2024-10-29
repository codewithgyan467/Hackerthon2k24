import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const ServiceHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServiceHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/history');
                setHistory(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch service history');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceHistory();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Service History</h2>
            <ul>
                {history.map((service) => (
                    <li key={service._id}>
                        {service.details} - {service.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceHistory;
