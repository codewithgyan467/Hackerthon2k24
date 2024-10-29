import  { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/provider/reviews');
                setReviews(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id} className="mt-2">
                        <p><strong>{review.userName}:</strong> {review.content}</p>
                        <p className="text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;
