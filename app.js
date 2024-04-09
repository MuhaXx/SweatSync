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

app.listen(5000, '0.0.0.0', () => {
    console.log("Server started on port 5000");
});

app.get("/", (req, res) => {
    res.render("index", { title: "SweatSync", user: req.user });
});

app.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

app.get("/admin", (req, res) => {
    res.render("admin", { title: "Admin" });
});

app.get("/adminex", (req, res) => {
    res.render("adminex", { title: "Admin excercises" });
});

app.get("/admindash", (req, res) => {
    res.render("admindash", { title: "Admin dashboard" });
});


app.use(profileRoutes);

app.use('/auth', authRoutes);