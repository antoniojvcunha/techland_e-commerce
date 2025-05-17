const jwt = require('jsonwebtoken');
const userService = require("../services/userService");
const argon2 = require("argon2");
require('dotenv').config();

async function registerUser(req, res) {
    const {name, email, password} = req.body;

    try {
        const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "A user with this email already exists" });
    }

        const user = await userService.createUser(name, email, password);
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin
              }
        });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await userService.getUserByEmail(email);
      
      if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, is_admin: user.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_admin: user.is_admin
        }
      });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    registerUser,
    login
}