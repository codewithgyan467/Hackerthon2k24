import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;
