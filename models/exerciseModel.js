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

exports.createExercise = async (exerciseData) => {
    return new Promise((resolve, reject) => {
        const { name, type, video_link, weight, reps } = exerciseData;
        const query = 'INSERT INTO exercise (name, type, video_link, weight, reps) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, type, video_link, weight, reps], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

exports.deleteExerciseById = async (exerciseId) => {
    try {
        const query = 'DELETE FROM exercise WHERE exercise_id = ?';
        const [result] = await db.query(query, [exerciseId]);
        if (result.affectedRows === 0) {
            throw new Error('Exercise not found');
        }
        return { message: 'Exercise deleted successfully' };
    } catch (error) {
        throw error;
    }
};
