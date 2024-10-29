import  { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const EmergencyServices = () => {
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmergencyRequest = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/emergency/request', { details });
            alert('Emergency request sent!');
            setDetails('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to send emergency request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Emergency Services</h2>
            <textarea
                placeholder="Describe your emergency..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={handleEmergencyRequest} disabled={loading}>
                {loading ? <LoadingSpinner /> : 'Send Emergency Request'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default EmergencyServices;
