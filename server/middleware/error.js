// server/middleware/error.js
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 for server errors
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
};

module.exports = { errorHandler };
