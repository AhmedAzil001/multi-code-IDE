const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req._id = decoded.userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = auth;
