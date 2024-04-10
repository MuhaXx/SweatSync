const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        console.log('Unauthorised access, token is missing!');
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/login'); 
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;