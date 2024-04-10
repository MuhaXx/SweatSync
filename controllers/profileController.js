const userModel = require('../models/userModel');
const mealModel = require('../models/mealModel');
const exerciseModel = require('../models/exerciseModel');
const favoriteModel = require('../models/favoriteModel');

exports.profilepage = async (req, res) => {
    try {
        // Fetch user data using user ID from the token
        const userId = req.user.id; // Access user ID from request object
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Render the profile page with user data
        res.render("profilepage", { title: "Profile Page", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the profile page' });
    }
};

exports.mealsPage = async (req, res) => {
    try {
        // Fetch all meals from the database
        const meals = await mealModel.getAllMeals();

        // Render the meals page with the meals data
        res.render("meal", { title: "Meals", meals: meals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the meals page' });
    }
};

exports.exercisesPage = async (req, res) => {
    try {
        // Fetch all exercises from the database
        const exercises = await exerciseModel.getAllExercises();

        // Render the exercises page with the exercises data
        res.render("exercise", { title: "Exercises", exercises: exercises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.showUserInfo = async (req, res) => {
    try {
        // Fetch all exercises from the database
        const userId = req.user.id; // Access user ID from request object
        const user = await userModel.getUserById(userId);

        // Render the exercises page with the exercises data
        res.render("userInfo", { title: "Personal Info", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.showUserInfo = async (req, res) => {
    try {
        // Fetch all exercises from the database
        const userId = req.user.id; // Access user ID from request object
        const user = await userModel.getUserById(userId);

        // Render the exercises page with the exercises data
        res.render("userInfo", { title: "Personal Info", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.editUserInfo = async (req, res) => {
    try {
        // Fetch user data using user ID from the token
        const userId = req.user.id;
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
            
        // Render the edit user info page with user data
        res.render("editUserInfo", { title: "Edit User Info", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the edit user info page' });
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; // Access user ID from request object
        const { username, email, age, gender, weight, height, experience } = req.body;

        // Update user information in the database
        await userModel.updateUserInfo(userId, { username, email, age, gender, weight, height, experience });

        // Redirect to the profile page after successful update
        res.redirect('/profile/userinfo');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating user information' });
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const exerciseId = req.params.exerciseId; // Assuming the exercise ID is passed in the request parameters
        await favoriteModel.addToFavorites(userId, exerciseId);
        res.status(200).json({ message: 'Exercise added to favorites successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding exercise to favorites' });
    }
};

exports.renderFavoriteExercises = async (req, res) => {
    try {
        
        // Fetch user ID from request object
        const userId = req.user.id;
        console.log(userId);
        // Fetch favorite exercises for the user
        const favoriteExercises = await exerciseModel.getFavoriteExercises(userId);

        // Render the favorite exercises page with the favorite exercises data
        res.render("fav_ex", { title: "Favorite Exercises", favoriteExercises: favoriteExercises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the favorite exercises page' });
    }
};