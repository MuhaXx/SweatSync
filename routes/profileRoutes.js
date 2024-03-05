// profileRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

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

// Route for displaying user information
router.get('/profile/userinfo', verifyToken, (req, res) => {
    profileController.showUserInfo(req, res, { title: 'User Info' });
});


router.get('/profile/userinfo/edit', verifyToken, (req, res) => {
    profileController.editUserInfo(req, res, { title: 'Edit User Info' });
});
router.post('/profile/userinfo/edit', verifyToken, (req, res) => {
    profileController.updateUserInfo(req, res);
});

router.get('/profile/favorite-exercises', verifyToken, (req, res) => {
    profileController.renderFavoriteExercises(req, res, { title: 'Favorite Exercises' });
});

router.post('/profile/exercise/:exerciseId/favorite', verifyToken, (req, res) => {
    profileController.addToFavorites(req, res);
});

module.exports = router;