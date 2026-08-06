const pool = require('../config/db');

const inMemoryUsers = [];

exports.createUser = async ({ name, email, password }) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result;
  } catch (error) {
    console.warn('DB execute failed, using in-memory user storage:', error.message);
    const newUser = { id: Date.now(), name, email, password };
    inMemoryUsers.push(newUser);
    return { insertId: newUser.id };
  }
};

exports.findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows && rows.length ? rows[0] : null;
  } catch (error) {
    console.warn('DB execute failed, checking in-memory user storage:', error.message);
    return inMemoryUsers.find(u => u.email === email) || null;
  }
};

