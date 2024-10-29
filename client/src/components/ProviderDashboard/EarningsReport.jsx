import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const EarningsReport = () => {
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/earnings');
                setEarnings(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch earnings');
            } finally {
                setLoading(false);
            }
        };

        fetchEarnings();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Earnings Report</h2>
            <ul>
                {earnings.map((earning) => (
                    <li key={earning._id} className="mt-2">
                        <p><strong>{earning.serviceName}:</strong> ₹{earning.amount}</p>
                        <p className="text-gray-500">{new Date(earning.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EarningsReport;
