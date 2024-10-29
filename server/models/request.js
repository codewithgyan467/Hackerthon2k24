const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    serviceName: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    // Additional fields as needed
});

module.exports = mongoose.model('Request', RequestSchema);
