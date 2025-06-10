const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary.js");
const generateToken = require("../utils/generateToken.js");
const validator = require("validator");
const signup = async (req, res) => {
  try {
    // Extracting the required fields
    let { firstName, lastName, email, password, profileUrl } = req.body;

    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    // Validating the password
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        message:
          "Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.",
      });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (hashedPassword) {
      password = hashedPassword;
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      profileUrl,
    });
    // Saving the user
    await user.save();
    // Generating JWT Token
    const token = await generateToken(user._id.toString());
    // Sending the response
    res.cookie("token", token, {
      httpOnly: true, //accessible only by the web server
      secure: process.env.NODE_ENV === "production", // if true, cookie will only be sent over HTTPS
      // sameSite: "strict", // it will only be sent with requests from the same site
      maxAge: 3 * 24 * 60 * 60 * 1000, //cookie will expire in 3 days
    });
    res.status(200).send({ message: "User Created Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
const login = async (req, res) => {
  try {
    // Extracting the required fields
    let { email, password } = req.body;
    // Checking if the user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    // Checking if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid Password" });
    }
    // Generating JWT Token
    const token = await generateToken(user._id.toString());
    // setting the cookie
    res.cookie("token", token, {
      httpOnly: true, //accessible only by the web server
      secure: process.env.NODE_ENV === "production", // if true, cookie will only be sent over HTTPS
      // sameSite: "none", // it will only be sent with requests from the same site
      maxAge: 3 * 24 * 60 * 60 * 1000, //cookie will expire in 3 days
    });
    res.status(200).send({
      message: "User Logged In Successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
const logout = (req, res) => {
  try {
    // clearing the cookie 
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).send({ message: "User Logged Out Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    // Extracting the id of the current logged in user
    const id = req.user._id;
    // Extracting the profileUrl from the req.body
    const { profileUrl } = req.body;
    // Checking if the profileUrl is provided
    if (!profileUrl) {
      return res.status(400).send({ message: "Profile URL is required" });
    }
    // Uploading the profileUrl to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profileUrl);
    // Updating the profileUrl in the database
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { profileUrl: uploadResponse.secure_url },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Profile Updated Successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
const checkAuth = (req, res) => {
  // Checking if the user is authenticated
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};
module.exports = { signup, login, logout, updateProfile, checkAuth };
