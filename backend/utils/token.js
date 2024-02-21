// utils/token.js

const jwt = require('jsonwebtoken');

async function signToken(user) {

  return jwt.sign({id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

}

module.exports = {
  signToken 
}
