import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner'; // Make sure to import your LoadingSpinner

const ManageProviders = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/providers');
                setProviders(response.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Failed to fetch providers');
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Providers</h2>
            <ul className="space-y-2">
                {providers.map(provider => (
                    <li key={provider._id} className="p-2 border rounded shadow hover:bg-gray-100 transition">
                        {provider.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProviders;
