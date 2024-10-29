import  { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forum');
                setPosts(response.data);
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to fetch forum posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Community Forum</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommunityForum;
