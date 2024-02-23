const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

// Register route
router.post('/register', (req, res) => {
    authController.register(req, res, 'Register');
});

router.get('/login', verifyToken, (req, res) => {
    res.send('Already logged in');
});

// Login route
router.post('/login', (req, res) => {
    authController.login(req, res, 'Login');
});

// Logout route
router.get('/logout', authController.logout);



module.exports = router;
