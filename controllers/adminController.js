const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mealModel = require('../models/mealModel');
const exerciseModel = require('../models/exerciseModel');

dotenv.config({ path: './.env' });

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === adminEmail && password === adminPassword) {
            const token = generateToken(email);
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES)),
                httpOnly: true,
                secure: false
            });
            res.redirect('/admin/dashboard');
        } else {
            res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while logging in' });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt');

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while logging out' });
    }
};

const Exercise = require('../models/exerciseModel');
const Meal = require('../models/mealModel');

exports.addExercise = async (req, res) => {
    try {
        const { name,  type, video_link, weight, reps } = req.body;

        const newExercise = await Exercise.createExercise({ name, type, video_link, weight, reps });

        res.status(200).json({ message: 'Exercise added successfully', exercise: newExercise });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding exercise' });
    }
};


exports.addMeal = async (req, res) => {
    try {
        const { name, description, calories } = req.body;
        
        await Meal.addMeal(name, description, calories);

        res.status(201).json({ message: 'Meal added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the meal' });
    }
};

exports.exercises = async (req, res) => {
    try {
        const exercises = await exerciseModel.getAllExercises();
        res.render("adminex", { title: "Edit Exercises", exercises: exercises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the exercises page' });
    }
};

exports.meals = async (req, res) => {
    try {
        const meals = await mealModel.getAllMeals();

        res.render("adminmeals", { title: "Meals", meals: meals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the meals page' });
    }
};

exports.deleteExercise = async (req, res) => {
    const exerciseId = req.params.id;

    try {
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