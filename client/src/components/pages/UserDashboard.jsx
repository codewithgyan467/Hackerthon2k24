import  { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUserData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>User Dashboard</h1>
            <ul>
                {userData.map((user) => (
                    <li key={user._id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
