// middleware/adminAuthMiddleware.js

const jwtUtils = require('../utils/jwtUtils');

const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.admin_jwt;
    if (!token) {
        return res.redirect('/admin/login');
    }

    try {
        const decoded = jwtUtils.verifyToken(token);
        if (decoded.role !== 'admin') {
            throw new Error('Unauthorized');
        }
        
        req.admin = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.redirect('/admin/login');
    }
};

module.exports = authenticateAdmin;