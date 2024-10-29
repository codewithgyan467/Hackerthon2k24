const express = require('express');
const router = express.Router();
const { getUserProfile, getBookingHistory, getLoyaltyRewards } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { registerUser, loginUser } = require('../controllers/userController');


router.get('/profile', authenticate, getUserProfile);
router.get('/booking-history', authenticate, getBookingHistory);
router.get('/rewards', authenticate, getLoyaltyRewards);
// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

module.exports = router;
