import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/booking-history');
                setHistory(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch booking history');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Booking History</h2>
            <ul>
                {history.map((booking) => (
                    <li key={booking._id}>
                        {booking.serviceDetails} - {booking.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingHistory;
