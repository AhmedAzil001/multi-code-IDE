const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../config/config");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const id = user._id;
    const token = jwt.sign({ userId: id }, SECRET_KEY);
    res.status(200).json({
      token: token,
      message: "Account succefully created",
    });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB's duplicate key error code
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }
    return res.status(500).json({
      message: "Bad authentication",
    });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exists",
      });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    return res.status(200).json({
      token: token,
      message: "Sign in successfully",
    });
  } catch (error) {
    return res.status(500).status({
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  const userId = req._id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    return res.status(200).json({
      user: user,
      message: "User logged in",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req._id;
  const { name } = req.body;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name: name },
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators` ensures schema validation
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      user: user,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {};
