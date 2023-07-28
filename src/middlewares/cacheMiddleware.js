// middlewares/cacheMiddleware.js
const cache = require("memory-cache");

function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl || req.url;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      return res.json(cachedBody);
    } else {
      res.sendResponse = res.json;
      res.json = (body) => {
        cache.put(key, body, duration * 1000); // Convert seconds to milliseconds
        res.sendResponse(body);
      };
      next();
    }
  };
}

module.exports = cacheMiddleware;
