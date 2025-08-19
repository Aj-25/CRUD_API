const pool = require('../config/db');

exports.createTodo = async (userId, title, description, status) => {
  const [result] = await pool.query(
    'INSERT INTO todos (user_id, title, description, status) VALUES (?, ?, ?, ?)',
    [userId, title, description, status || 'incomplete']
  );
  return result.insertId;
};

exports.getTodosByUser = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
  return rows;
};

exports.getTodoById = async (id, userId) => {
  const [rows] = await pool.query('SELECT * FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
  return rows[0];
};

exports.updateTodo = async (id, userId, title, description, status) => {
  const [result] = await pool.query(
    'UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
    [title, description, status, id, userId]
  );
  return result.affectedRows;
};

exports.deleteTodo = async (id, userId) => {
  const [result] = await pool.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
  return result.affectedRows;
};
