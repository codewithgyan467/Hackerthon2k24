import  { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:5000/api/admin/users');
                const providerResponse = await axios.get('http://localhost:5000/api/admin/providers');
                setUsers(userResponse.data);
                setProviders(providerResponse.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from state
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to delete user');
        }
    };

    if (loading) return <p>Loading admin data...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name}
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Service Providers</h2>
            <ul>
                {providers.map((provider) => (
                    <li key={provider._id}>{provider.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
