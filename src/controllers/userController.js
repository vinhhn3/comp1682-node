// controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const dotenv = require("dotenv");

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

class UserController {
  async registerUser(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userRepository.createUser({
        username,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: "Unable to register user" });
    }
  }

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userRepository.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateAccessToken({
        id: user._id,
        username: user.username,
      });
      const refreshToken = generateRefreshToken({
        id: user._id,
        username: user.username,
      });

      res.json({ token, refreshToken });
    } catch (err) {
      res.status(500).json({ error: "Unable to log in" });
    }
  }
  async refreshAccessToken(req, res) {
    const refreshToken = req.header("Refresh-Token");

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken({
        id: user.id,
        username: user.username,
      });
      res.json({ token: newAccessToken });
    });
  }
}

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

module.exports = new UserController();
