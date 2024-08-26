const db = require('../../config/db');

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

const deductCredits = (userId, credits) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE users SET credits = credits - ? WHERE id = ?', [credits, userId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getRemainingCredits = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT credits FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) reject(err);
      resolve(results[0]?.credits || null);
    });
  });
};

module.exports = {
  getUserById,
  deductCredits,
  getRemainingCredits
};
