const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
