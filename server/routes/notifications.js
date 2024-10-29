const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const router = express.Router();

// Notifications routes
router.get('/', getNotifications);

module.exports = router;
