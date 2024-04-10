const userModel = require('../models/userModel');
const mealModel = require('../models/mealModel');
const exerciseModel = require('../models/exerciseModel');
const favoriteModel = require('../models/favoriteModel');

exports.profilepage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.render("profilepage", { title: "Profile Page", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the profile page' });
    }
};

exports.mealsPage = async (req, res) => {
    try {
        const meals = await mealModel.getAllMeals();

        res.render("meal", { title: "Meals", meals: meals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the meals page' });
    }
};

exports.exercisesPage = async (req, res) => {
    try {
        const exercises = await exerciseModel.getAllExercises();

        res.render("exercise", { title: "Exercises", exercises: exercises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.showUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await userModel.getUserById(userId);

        res.render("userInfo", { title: "Personal Info", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.showUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await userModel.getUserById(userId);

        res.render("userInfo", { title: "Personal Info", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.editUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.render("editUserInfo", { title: "Edit User Info", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the edit user info page' });
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { username, email, age, gender, weight, height, experience } = req.body;

        await userModel.updateUserInfo(userId, { username, email, age, gender, weight, height, experience });

        res.redirect('/profile/userinfo');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating user information' });
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const exerciseId = req.params.exerciseId; 
        await favoriteModel.addToFavorites(userId, exerciseId);
        res.status(200).json({ message: 'Exercise added to favorites successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding exercise to favorites' });
    }
};

exports.renderFavoriteExercises = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const favoriteExercises = await exerciseModel.getFavoriteExercises(userId);

        res.render("fav_ex", { title: "Favorite Exercises", favoriteExercises: favoriteExercises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the favorite exercises page' });
    }
};