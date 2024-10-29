const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    details: { type: String, required: true },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
