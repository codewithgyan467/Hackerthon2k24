const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBookingHistory = async (req, res) => {
    try {
        // Assume we have a booking model
        const history = await Booking.find({ userId: req.user.id });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLoyaltyRewards = async (req, res) => {
    try {
        const rewards = await Reward.find({ userId: req.user.id });
        res.json(rewards);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { registerUser, loginUser };
