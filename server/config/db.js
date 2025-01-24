const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://azilahmed2016:Azil2030Ahmed@cluster0.5ghpu.mongodb.net/code-IDE");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
