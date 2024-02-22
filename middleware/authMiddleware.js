// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        console.log('Unauthorised access, token is missing!');
        return res.redirect('/login'); // Redirect to login page if token is missing
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/login'); // Redirect to login page if token is invalid
        }

        // If token is valid, set user data in request object for further use
        req.user = decoded;
         // Move to the next middleware or route handler
         next();
    });
};

module.exports = verifyToken;