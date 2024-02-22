// models/userModel.js
const db = require('../config/database');
const mysql = require("mysql")

exports.createUser = async ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

exports.getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};
