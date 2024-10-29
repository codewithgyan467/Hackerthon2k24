const express = require('express');
const { searchServices, getServiceDetails } = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const ServiceController = require('../controllers/serviceController');

const router = express.Router();
router.get('/', protect, ServiceController.getAllServices);
router.get('/search', searchServices);
router.get('/:id', getServiceDetails);

module.exports = router;
const express = require('express');

const { protect } = require('../middleware/auth');
const PaymentController = require('../controllers/PaymentController');

// Handle payment processing
router.post('/', protect, PaymentController.processPayment);

module.exports = router;