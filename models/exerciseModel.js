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

exports.getFavoriteExercises = async (userId) => {
    try {
        const query = 'SELECT * FROM exercise WHERE exercise_id IN (SELECT ex_id FROM fav_ex WHERE user_id = ?)';
        const [favoriteExercises] = await db.query(query, [userId]);
        console.log(userId, favoriteExercises);
        return favoriteExercises;
    } catch (error) {
        throw error;
    }
};


