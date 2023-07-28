// config/database.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
