import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const AdminProfile = () => {
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/profile');
                setAdmin(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch admin profile');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminProfile();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Admin Profile</h2>
            <p>Name: {admin.name}</p>
            <p>Email: {admin.email}</p>
        </div>
    );
};

export default AdminProfile;
