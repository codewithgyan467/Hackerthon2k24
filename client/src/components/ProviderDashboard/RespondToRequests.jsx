import  { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const RespondToRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/requests');
                setRequests(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleRespond = async (requestId, status) => {
        try {
            await axios.patch(`http://localhost:5000/api/provider/requests/${requestId}`, { status });
            setRequests((prev) => prev.filter((req) => req._id !== requestId));
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to respond to request');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Respond to Service Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request._id} className="flex justify-between items-center mt-2">
                        <span>{request.serviceName}</span>
                        <div>
                            <button
                                className="py-1 px-3 bg-blue-500 text-white rounded mr-2"
                                onClick={() => handleRespond(request._id, 'accepted')}
                            >
                                Accept
                            </button>
                            <button
                                className="py-1 px-3 bg-red-500 text-white rounded"
                                onClick={() => handleRespond(request._id, 'declined')}
                            >
                                Decline
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RespondToRequests;
