const express = require('express');
const { requestEmergencyService } = require('../controllers/emergencyController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/request', authenticate, requestEmergencyService);

module.exports = router;
