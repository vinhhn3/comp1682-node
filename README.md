# Setup Project

## Set Up Folder Structure
Create the following folder structure:

```bash
project_root/
  |- src/
      |- controllers/
      |- models/
      |- repositories/
      |- routes/
  |- .env
  |- package.json
  |- server.js
```

## Initialize Project and Install Dependencies
Initialize a new Node.js project and install the required dependencies:

```bash
# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose dotenv
```

## Configure .env
In the root of your project, create a file named .env and add your MongoDB connection URL. For example:

```bash
MONGODB_URI=mongodb://localhost:27017/your-database-name
```