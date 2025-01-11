const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/user", userRouter);
// app.use("/api/v1/project", projectRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
