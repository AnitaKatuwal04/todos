// config/db.js

require("dotenv").config();
const mongoose = require("mongoose");

const mongoDbUri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDbUri);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;