// utils/password.js

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(plainPassword, hash) {
  return await bcrypt.compare(plainPassword, hash);
}

module.exports = {
  hashPassword,
  comparePassword  
}