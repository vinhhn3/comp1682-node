// server.js
const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");
const connectToDatabase = require("./src/config/database");
const cors = require("cors"); // Import the cors middleware
const rateLimitMiddleware = require("./src/middlewares/rateLimitMiddleware");
const swaggerUi = require("swagger-ui-express");
const specs = require("./src/docs/swagger"); // Import the Swagger configuration

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Apply rate limiting to all requests
app.use(rateLimitMiddleware);
// Enable cors
app.use(
  cors({
    origin: "*",
  })
);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/products", authMiddleware, productRoutes);
app.use("/users", userRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
