const rateLimit = require("express-rate-limit");
const rateLimitConfig = require("../config/rateLimitConfig");

const limiter = rateLimit(rateLimitConfig);

module.exports = limiter;
