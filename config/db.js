const mongoose = require("mongoose");

const connectDB = async () => {
  try { 
    const conn = await mongoose.connect("mongodb://localhost:27017/Ikigai");
    console.log(`MongoDB Connected to: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
