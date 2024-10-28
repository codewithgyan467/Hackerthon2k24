import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    serviceDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
