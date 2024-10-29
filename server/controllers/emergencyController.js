const EmergencyRequest = require('../models/EmergencyRequest');

exports.requestEmergencyService = async (req, res) => {
    try {
        const request = new EmergencyRequest({ userId: req.user.id, details: req.body.details });
        await request.save();
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
