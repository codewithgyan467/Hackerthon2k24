import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const SmartNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/notifications');
                setNotifications(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch notifications');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Smart Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id} className="mt-2">
                        <p>{notification.message}</p>
                        <p className="text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SmartNotifications;
