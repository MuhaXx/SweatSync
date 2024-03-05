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
