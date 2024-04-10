const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mealModel = require('../models/mealModel');
const exerciseModel = require('../models/exerciseModel');

dotenv.config({ path: './.env' });

const adminEmail = process.env.ADMIN_EMAIL; // Admin email from environment variables
const adminPassword = process.env.ADMIN_PASSWORD; // Admin password from environment variables

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === adminEmail && password === adminPassword) {
            // Admin authentication successful
            // Generate JWT token
            const token = generateToken(email);
            // Set JWT token as HTTP-only cookie
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES)),
                httpOnly: true,
                secure: true // Set to true in production if using HTTPS
            });
            // Redirect to admin dashboard or any other desired route
            res.redirect('/admin/dashboard');
        } else {
            // Admin authentication failed
            res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while logging in' });
    }
};

exports.logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt');

        // Redirect the user to the home page or any other desired page
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while logging out' });
    }
};

const Exercise = require('../models/exerciseModel');
const Meal = require('../models/mealModel');

// Function to add a new exercise
exports.addExercise = async (req, res) => {
    try {
        // Extract exercise data from request body
        const { name,  type, video_link, weight, reps } = req.body;

        // Call the function from the Exercise model to create a new exercise
        const newExercise = await Exercise.createExercise({ name, type, video_link, weight, reps });

        // Send a success response
        res.status(200).json({ message: 'Exercise added successfully', exercise: newExercise });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding exercise' });
    }
};

// Function to add a new meal
exports.addMeal = async (req, res) => {
    try {
        // Extract meal data from request body
        const { name, description, calories } = req.body;

        // Call the function from the Meal model to create a new meal
        const newMeal = await Meal.createMeal({ name, description, calories });

        // Send a success response
        res.status(200).json({ message: 'Meal added successfully', meal: newMeal });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding meal' });
    }
};

exports.exercises = async (req, res) => {
    try {
        // Fetch all exercises from the database
        const exercises = await exerciseModel.getAllExercises();
        // Render the exercises page with the exercises data
        res.render("adminex", { title: "Edit Exercises", exercises: exercises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.deleteExercise = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        // Find the exercise by ID and delete it
        await Exercise.deleteExerciseById(exerciseId);
        res.status(200).json({ message: 'Exercise deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the exercise.' });
    }
};


const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};