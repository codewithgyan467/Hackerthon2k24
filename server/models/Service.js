const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    details: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Service', ServiceSchema);
