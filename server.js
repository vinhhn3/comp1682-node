// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");
const connectToDatabase = require("./src/config/database");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/products", authMiddleware, productRoutes);
app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
