## Refactor: Move rate limiting config to middleware

The diagram below shows the current project structure

![Alt text](image-22.png)

## Move Rate Limiter Configuration

In the config folder, create a file named `rateLimitConfig.js` and move the rate limiter configuration to it:

```js
// config/rateLimitConfig.js
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
};

module.exports = rateLimitConfig;
```

## Crate Retelimit Middleware

In the middleware folder, create a file named `rateLimitMiddleware.js` to handle rate limiter

```js
const rateLimit = require("express-rate-limit");
const rateLimitConfig = require("../config/rateLimitConfig");

const limiter = rateLimit(rateLimitConfig);

module.exports = limiter;
```

## Update the Server Configuration

In the server.js file, update the server configuration to use the `rateLimitConfig.js`:

```js
// server.js
// ... (previous imports)
const rateLimitMiddleware = require("./src/middlewares/rateLimitMiddleware"); // import rateLimitMiddleware

// ... (previous code)

// Apply rate limiting to all requests
app.use(rateLimitMiddleware);

// ... (remaining code)
```
