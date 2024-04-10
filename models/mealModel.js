const db = require('../config/database');

exports.getAllMeals = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM meal', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

exports.addMeal = async (name, description, calories) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO meals (name, description, calories) VALUES (?, ?, ?)', [name, description, calories], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};