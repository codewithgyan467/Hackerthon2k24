import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const PerformanceMetrics = () => {
    const [metrics, setMetrics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/performance-metrics');
                setMetrics(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch metrics');
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Performance Metrics</h2>
            {/* Render metrics data here */}
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
        </div>
    );
};

export default PerformanceMetrics;
