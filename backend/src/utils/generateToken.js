const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = async (id) => {
  try {
    const token = await jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    if (token) {
      return token;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateToken;
