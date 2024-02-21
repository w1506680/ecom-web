// utils/token.js

process.env.JWT_SECRET = "test"

const jwt = require('jsonwebtoken');

function signToken(user) {

  return jwt.sign({id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };

  } catch (err) {
    return { valid: false };
  } 
}


module.exports = {
  signToken 
}

const user =  {
  _id: "1",
  email: '<EMAIL>',
  password: '<PASSWORD>',
  name: 'test'
}

tok = signToken(user)
console.log(verifyToken(tok))