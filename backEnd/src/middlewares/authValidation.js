const validator = require('validator');
const jwt = require('jsonwebtoken');
const { passwordRequirements } = require('../utils/validationRules');

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = {};

  if (!name || name.trim().length < 3) {
    errors.name = "Name must have at least 3 characters";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email";
  }

  if (!password || password.length < 8) {
    errors.password = "Password must have at least 8 characters";
  } else if (!validator.isStrongPassword(password, passwordRequirements)) {
    errors.password = "Weak password. Must have at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = user;  
    next(); 
  });
}

module.exports = {
  validateRegister,
  validateLogin,
  authenticate
};