const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Provider = require('../models/Provider');
const Service = require('../models/Service');
const { upload } = require('../middleware/upload');

// Get admin profile
exports.getAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
        res.status(404);
        throw new Error('Admin not found');
    }
    res.json(admin);
});

// Get all providers
exports.getAllProviders = asyncHandler(async (req, res) => {
    const providers = await Provider.find();
    res.json(providers);
});

// Delete a provider by ID
exports.deleteProvider = asyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
        res.status(404);
        throw new Error('Provider not found');
    }
    await provider.remove();
    res.json({ success: true });
});

// Get service analytics
exports.getServiceAnalytics = asyncHandler(async (req, res) => {
    const totalServices = await Service.countDocuments();
    const activeProviders = await Provider.countDocuments({ isActive: true });
    const completedBookings = await Service.countDocuments({ status: 'completed' });

    res.json({ totalServices, activeProviders, completedBookings });
});

// Upload file
exports.uploadFile = asyncHandler(async (req, res) => {
    const file = req.file; // handled by multer in middleware
    if (!file) {
        res.status(400);
        throw new Error('No file uploaded');
    }
    // Optionally, process the file here (e.g., save to database, etc.)
    res.json({ success: true, message: 'File uploaded successfully' });
});

// Get performance metrics
exports.getPerformanceMetrics = asyncHandler(async (req, res) => {
    const metrics = [
        { name: 'Total Services', value: await Service.countDocuments() },
        { name: 'Active Providers', value: await Provider.countDocuments({ isActive: true }) },
        // Add more metrics as needed
    ];
    res.json(metrics);
});
