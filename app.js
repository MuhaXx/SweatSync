const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/authMiddleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config({ path: './.env' });
const path = require("path");
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

// Login route with middleware to check if user is already logged in

app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// Use the profile routes
app.use(profileRoutes);

app.use('/auth', authRoutes);