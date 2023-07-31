## Refactor: Move rate limiting config to middleware

The diagram below shows the current project structure

![Alt text](image-22.png)

## Move Rate Limiter Configuration

In the config folder, create a file named `rateLimitConfig.js` and move the rate limiter configuration to it:

```js
// config/rateLimitConfig.js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

module.exports = limiter;
```

## Update the Server Configuration

In the server.js file, update the server configuration to use the `rateLimitConfig.js`:

```js
// server.js
// ... (previous imports)
const limiter = require("./config/rateLimitConfig"); // Import rate limiter configuration

// ... (previous code)

// Apply rate limiting and cors to all requests
app.use(limiter);

// ... (remaining code)
```
