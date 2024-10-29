const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Optionally exclude password from the user object
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed: Token is invalid or expired' });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Access is denied' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
