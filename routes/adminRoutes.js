const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');

// Admin login route
router.get('/login', (req, res) => {
    res.render('admin', { title: "Admin" });
});
router.post('/login', (req, res) => {
    adminController.adminLogin(req, res);
});

// Admin dashboard route

router.get('/dashboard', (req, res) => {
    res.render('admindash', { title: "Dashboard" });
});

router.get('/exercise', (req, res) => {
    res.render("adminex", { title: "Admin excercises" });
});

router.get('/meals', (req, res) => {
    res.render("adminmeals", { title: "Admin excercises" });
});

router.get('/logout', adminController.logout);

module.exports = router;
