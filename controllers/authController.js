const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

// Function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (req, res) => {
    // Extract data from request body
    const { username, email, password } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const userId = await userModel.createUser({ username, email, password: hashedPassword });

        // Generate JWT token
        const token = generateToken(userId);

        // Set JWT token as HTTP-only cookie
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES)),
            httpOnly: true,
            secure: true // Set to true in production if using HTTPS
        });

        // Redirect to profile page with custom title
        res.redirect(`/profile?username=${username}&title=Register`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while registering the user' });
    }
};

exports.login = async (req, res) => {
    // Extract data from request body
    const { email, password } = req.body;

    try {
        // Retrieve user from the database by email
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user.user_id);
        // Set JWT token as HTTP-only cookie
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES)),
            httpOnly: true,
            secure: true // Set to true in production if using HTTPS
        });

        // Redirect to profile page with custom title
        res.redirect(`/profile?username=${user.username}&title=Login`);
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
