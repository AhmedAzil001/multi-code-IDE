const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    if (userId) {
        req._id = userId;
        next();
      } else {
        res.status(401).json({
          message: "Token is expired",
        });
      }
  } catch (error) {
    return res.status(500).json({
      messsage: error.messsage,
    });
  }
};

module.exports =  auth;
