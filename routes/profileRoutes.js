// profileRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// Route for the profile page with token verification middleware
router.get('/profile', verifyToken, profileController.profilepage);

module.exports = router;
