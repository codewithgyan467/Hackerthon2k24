const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

exports.createPost = async (req, res) => {
    const newPost = new Post({ content: req.body.content });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post' });
    }
};
