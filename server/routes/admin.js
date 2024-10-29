const express = require('express');
const { getUsers, deleteUser, getProviders } = require('../controllers/adminController');
const router = express.Router();

// Admin routes
router.get('/users', getUsers);
router.get('/providers', getProviders);
router.delete('/users/:id', deleteUser);

module.exports = router;
