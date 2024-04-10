const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const adminEmail = process.env.ADMIN_EMAIL; // Admin email from environment variables
const adminPassword = process.env.ADMIN_PASSWORD; // Admin password from environment variables

exports.adminLogin = async (req, res) => {
    // Extract data from request body
    const { email, password } = req.body;

    try {
        // Check if the provided email and password match the admin credentials
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

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};