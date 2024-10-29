const mongoose = require('mongoose');

const ServiceHistorySchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    details: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ServiceHistory', ServiceHistorySchema);
