import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const LoyaltyRewards = () => {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/rewards');
                setRewards(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch rewards');
            } finally {
                setLoading(false);
            }
        };

        fetchRewards();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Loyalty Rewards</h2>
            <ul>
                {rewards.map((reward) => (
                    <li key={reward._id}>{reward.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default LoyaltyRewards;
