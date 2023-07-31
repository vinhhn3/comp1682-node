// docs/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "comp1682-node api documentation",
      version: "1.0.0",
      description: "API documentation for comp1682-node course",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update with your server URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = specs;
