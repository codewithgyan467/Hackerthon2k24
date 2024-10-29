import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

// eslint-disable-next-line react/prop-types
const Reviews = ({ serviceId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/services/${serviceId}/reviews`);
                setReviews(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [serviceId]);

    const handleAddReview = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/services/${serviceId}/reviews`, { review: newReview });
            setReviews([...reviews, response.data]);
            setNewReview('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to add review');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>{review.text}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Add a review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            />
            <button onClick={handleAddReview}>Submit</button>
        </div>
    );
};

export default Reviews;
