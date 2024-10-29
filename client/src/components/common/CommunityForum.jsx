import { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forum/posts');
                setPosts(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/forum/posts', { content: newPost });
            setPosts([...posts, response.data]);
            setNewPost('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to create post');
        }
    };

    if (loading) return <p>Loading forum posts...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Community Forum</h2>
            <form onSubmit={handlePostSubmit}>
                <input
                    type="text"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts..."
                    required
                />
                <button type="submit">Post</button>
            </form>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommunityForum;
