const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SALT_ROUNDS = 10;

exports.registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error('Missing fields');
  const existing = await userModel.findUserByEmail(email);
  if (existing) throw new Error('User already exists');
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await userModel.createUser({ name, email, password: hashed });
  return { id: result.insertId, name, email };
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error('Missing fields');
  const user = await userModel.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  return token;
};
