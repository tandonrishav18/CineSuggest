const pool = require('../config/db');

exports.createUser = async ({ name, email, password }) => {
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return result;
};

exports.findUserByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows && rows.length ? rows[0] : null;
};
