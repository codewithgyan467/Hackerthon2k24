import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/profile');
                setUser(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;
