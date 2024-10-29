const mongoose = require('mongoose');

const EarningsSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    serviceName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Earnings', EarningsSchema);
