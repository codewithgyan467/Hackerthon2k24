import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const ProviderProfile = () => {
    const [provider, setProvider] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProviderProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/profile');
                setProvider(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch provider profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProviderProfile();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Provider Profile</h2>
            <p className="mt-2"><strong>Name:</strong> {provider.name}</p>
            <p className="mt-2"><strong>Email:</strong> {provider.email}</p>
            <p className="mt-2"><strong>Services Offered:</strong> {provider.services.join(', ')}</p>
        </div>
    );
};

export default ProviderProfile;
