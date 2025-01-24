const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Database");
    console.log("No error")
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
