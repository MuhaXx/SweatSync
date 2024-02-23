// models/userModel.js
const db = require('../config/database');

exports.createUser = async ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

exports.getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            console.log(email);
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

exports.getUserById = async (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE user_id = ?', [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};