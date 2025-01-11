const { Router } = require("express");
const userRouter = Router();
const {
  signUp,
  signIn,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");
const auth = require("../middleware/user.middleware");

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/me", auth, getUser);
userRouter.post("/update", auth, updateUser);
userRouter.post("/delete", auth, deleteUser);

module.exports = userRouter;
