exports.profilepage = async (req, res) => {
    try {
        // Fetch user data or any necessary data for the profile page
        // For example:
        const username = req.query.username; // Assuming you are passing the username as a query parameter

        // Render the profile page and pass the title variable
        res.render("profilepage", { title: "Profile Page", username: username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while rendering the profile page' });
    }
};
