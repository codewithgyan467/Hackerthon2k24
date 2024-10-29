const express = require('express');
const { getForumPosts, createPost } = require('../controllers/forumController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/posts', getForumPosts);
router.post('/posts', authenticate, createPost);

module.exports = router;
