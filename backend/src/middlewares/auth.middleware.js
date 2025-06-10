const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
require("dotenv").config();
const protectRoute = async (req, res, next) => {
  try {
    // if user is loggedin then get the token from the cookies
    const { token } = req.cookies;

    if (!token) {
      // if token not found then return error
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // verify the token

    const user = await User.findById(decoded.id).select("-password");  // find the user

    if (!user) {
      // if user not found then return error
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user; // set the user in the request (req.user)
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session Expired. Please log in again." });
    }

    res.status(401).json({ message: "Invalid Token. Please log in again." });
  }
};

module.exports = protectRoute;
