import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const ServiceAnalytics = () => {
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/analytics');
                setAnalytics(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Service Analytics</h2>
            {/* Render analytics data here */}
            <pre>{JSON.stringify(analytics, null, 2)}</pre>
        </div>
    );
};

export default ServiceAnalytics;
