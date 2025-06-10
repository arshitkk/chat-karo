const express = require("express");
const router = express.Router();
const protectRoute = require("../middlewares/auth.middleware");
const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/auth.controller.js");
router.post("/sign-up", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
module.exports = router;
