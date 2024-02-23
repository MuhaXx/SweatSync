// controllers/profileController.js
const userModel = require('../models/userModel');

exports.profilepage = async (req, res) => {
    try {
        console.log(req.user.id);
        // Fetch user data using user ID from the token
        const userId = req.user.id; // Access user ID from request object
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Render the profile page with user data
        res.render("profilepage", { title: "Profile Page", username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the profile page' });
    }
};
