const express = require('express');
const { 
    getAdminProfile, 
    getAllProviders, 
    deleteProvider, 
    getServiceAnalytics, 
    uploadFile, 
    getPerformanceMetrics 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth'); // Import authentication and authorization middleware
const { upload } = require('../middleware/upload'); // Import file upload middleware

const router = express.Router();

router.route('/profile').get(protect, getAdminProfile); // Protected route for getting admin profile
router.route('/providers').get(protect, authorize('admin'), getAllProviders); // Get all providers
router.route('/providers/:id').delete(protect, authorize('admin'), deleteProvider); // Delete a provider
router.route('/analytics').get(protect, authorize('admin'), getServiceAnalytics); // Get service analytics
router.route('/upload').post(protect, authorize('admin'), upload.single('file'), uploadFile); // File upload
router.route('/performance').get(protect, authorize('admin'), getPerformanceMetrics); // Get performance metrics

module.exports = router;
