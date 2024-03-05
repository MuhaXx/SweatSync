// models/exerciseModel.js
const db = require('../config/database');

// Function to fetch all exercise items from the database
exports.getAllExercises = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM exercise', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
