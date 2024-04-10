const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
    res.render('admin', { title: "Admin" });
});
router.post('/login', (req, res) => {
    adminController.adminLogin(req, res);
});

router.get('/dashboard', (req, res) => {
    res.render('admindash', { title: "Dashboard" });
});

router.get('/exercise', adminController.exercises, (req, res) => {
    res.render("adminex", { title: "Admin excercises" });
});

router.get('/meals', adminController.meals,(req, res) => {
    res.render("adminmeals", { title: "Admin excercises" });
});

router.post('/exercise', verifyToken, adminController.addExercise);

router.post('/meals', verifyToken, adminController.addMeal);

router.delete('/exercise/:id', verifyToken, adminController.deleteExercise);

router.get('/logout', adminController.logout);

module.exports = router;