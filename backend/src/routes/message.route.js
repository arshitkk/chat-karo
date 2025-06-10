const express = require("express");
const protectRoute = require("../middlewares/auth.middleware");
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} = require("../controllers/message.controller.js");
const router = express.Router();

router.get("/get-users", protectRoute, getUsersForSidebar); // get users for sidebar
router.get("/:id", protectRoute, getMessages); // get messages
router.post("/send/:id", protectRoute, sendMessage); // send message

module.exports = router;
