const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    services: { type: [String], required: true },
    availability: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
});
const AvailabilitySchema = new mongoose.Schema({
    day: { type: String, required: true },
    available: { type: Boolean, default: false },
});

module.exports = mongoose.model('Provider', ProviderSchema);
