import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const AvailabilityManagement = () => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/availability');
                setAvailability(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch availability');
            } finally {
                setLoading(false);
            }
        };

        fetchAvailability();
    }, []);

    const handleUpdate = async (day) => {
        try {
            await axios.patch(`http://localhost:5000/api/provider/availability/${day}`);
            setAvailability((prev) => prev.map((a) => (a.day === day ? { ...a, available: !a.available } : a)));
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to update availability');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Availability Management</h2>
            <ul>
                {availability.map((day) => (
                    <li key={day.day} className="flex justify-between items-center mt-2">
                        <span>{day.day}</span>
                        <button
                            className={`py-1 px-3 rounded ${day.available ? 'bg-green-500' : 'bg-red-500'} text-white`}
                            onClick={() => handleUpdate(day.day)}
                        >
                            {day.available ? 'Available' : 'Unavailable'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailabilityManagement;
