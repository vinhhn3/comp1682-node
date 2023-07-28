## Refactor

Move the MongoDB configuration to a separate `/config` folder, you can follow these steps:

1. Create a new folder named `config` at the root level of your project.
2. Inside the `config` folder, create a new file named `database.js`.
3. Move the MongoDB configuration code to the `database.js` file.
4. Update the `server.js` file to require the `database.js` file from the config folder.

Here's the updated diagram

![Alt text](image-10.png)

Here's the refactored code:

Create a new folder named config and add the following content to the `database.js` file:

```js
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
```

Update the `server.js` file:

```js
// server.js
const express = require("express");
const connectToDatabase = require("./config/database");
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

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
```
