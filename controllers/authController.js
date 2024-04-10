const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (req, res) => {
    const { username, email, password, password_confirm } = req.body;

    if (password !== password_confirm) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        const existingEmailUser = await userModel.getUserByEmail(email);
        if (existingEmailUser) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        const existingUsernameUser = await userModel.getUserByUsername(username);
        if (existingUsernameUser) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await userModel.createUser({ username, email, password: hashedPassword });

        const token = generateToken(userId);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES)),
            httpOnly: true,
            secure: process.env.NODE_ENV
        });

        res.redirect(`/profile?username=${username}&title=Register`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while registering the user' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.user_id);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES)),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.redirect(`/profile?username=${user.username}&title=Login`);
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
