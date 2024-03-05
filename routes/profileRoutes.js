// profileRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// Route for the profile page with token verification middleware
router.get('/profile', verifyToken, (req, res) => {
    profileController.profilepage(req, res, { title: 'Profile' });
});

// Route for the meals page
router.get('/profile/meal', verifyToken, (req, res) => {
    profileController.mealsPage(req, res, { title: 'Meals' });
});

// Route for the exercises page
router.get('/profile/exercise', verifyToken, (req, res) => {
    profileController.exercisesPage(req, res, { title: 'Exercises' });
});

module.exports = router;
