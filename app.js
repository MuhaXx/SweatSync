const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')
const bcrypt = require("bcryptjs")
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config({ path: './.env' });

app.set('view engine', 'hbs')

const path = require("path")

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))

app.listen(5000, () => {
    console.log("server started on port 5000")
})
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/auth/register", (req, res) => {
    const { name, email, password, password_confirm } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, ress) => {
        if (error) {
            console.log(error)
        }
        if (ress.length > 0) { // Corrected from `result` to `ress`
            return res.render('register', {
                message: 'This email is already in use'
            })
        } else if (password !== password_confirm) {
            console.log(password)
            console.log(password_confirm)
            return res.render('register', {
                message: 'Passwords do not match!'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, result) => { // Changed `res` to `result`
            if (err) { // Changed `error` to `err`
                console.log(err)
            } else {
                return res.render('register', {
                    message: 'User registered!'
                })
            }
        })
    })
})

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'An error occurred. Please try again later.' });
        }

        if (results.length === 0) {
            return res.status(401).send({ message: 'Email or password is incorrect.' });
        }

        const isMatch = await bcrypt.compare(password, results[0].password);

        if (isMatch) {
            return res.status(200).send({ message: 'Login successful.' });
        } else {
            return res.status(401).send({ message: 'Email or password is incorrect.' });
        }
    });
});

