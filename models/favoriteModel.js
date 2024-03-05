const db = require('../config/database');

exports.addToFavorites = async (userId, exerciseId) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO fav_ex (user_id, ex_id) VALUES (?, ?)', [userId, exerciseId], (error, results) => {
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
        const results = await db.query(query, [userId]);
        const favoriteExercises = results[0];
        return favoriteExercises;
    } catch (error) {
        throw error;
    }
};