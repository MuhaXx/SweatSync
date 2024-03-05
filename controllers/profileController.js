const userModel = require('../models/userModel');
const mealModel = require('../models/mealModel'); // Import the meal model
const exerciseModel = require('../models/exerciseModel'); // Import the exercise model


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