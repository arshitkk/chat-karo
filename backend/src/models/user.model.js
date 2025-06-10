const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: () => "it is not a valid email",
      },
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dg9t9l9s2/image/upload/v1645674046/Chat%20Karo/avatars/defaultAvatar_gw3gpk.jpg",
      validate: {
        validator: (value) => validator.isURL(value),
        message: "it is not a valid URL",
      },
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("User", userSchema);
module.exports = user;
