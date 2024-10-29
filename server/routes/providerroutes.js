const express = require('express');
const { getProfile, getAvailability, updateAvailability, getRequests, respondToRequest, getReviews, getEarnings, getNotifications } = require('../controllers/providerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('provider'));

// Get Provider Profile
router.get('/profile', getProfile);

// Get Provider Availability
router.get('/availability', getAvailability);

// Update Provider Availability
router.patch('/availability/:day', updateAvailability);

// Get Service Requests
router.get('/requests', getRequests);

// Respond to Service Requests
router.patch('/requests/:id', respondToRequest);

// Get Reviews
router.get('/reviews', getReviews);

// Get Earnings Report
router.get('/earnings', getEarnings);

// Get Notifications
router.get('/notifications', getNotifications);

module.exports = router;
