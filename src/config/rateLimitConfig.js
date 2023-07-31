// config/rateLimitConfig.js
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
};

module.exports = rateLimitConfig;
