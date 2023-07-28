// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function authMiddleware(req, res, next) {
  const accessToken = req.header("Authorization");

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(
    accessToken.replace("Bearer ", ""),
    ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        const refreshToken = req.header("Refresh-Token");
        if (!refreshToken) {
          return res.status(403).json({ error: "Invalid token" });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.status(403).json({ error: "Invalid refresh token" });
          }

          const newAccessToken = generateAccessToken({
            id: user.id,
            username: user.username,
          });
          req.user = user;
          req.token = newAccessToken;
          next();
        });
      } else {
        req.user = user;
        next();
      }
    }
  );
}

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

module.exports = authMiddleware;
