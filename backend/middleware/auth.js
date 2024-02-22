// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async function(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
  
    if(!user) {
      throw new Error();
    }
  
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send({error: 'Please authenticate'});
  }

}
