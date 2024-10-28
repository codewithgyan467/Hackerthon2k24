import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};
