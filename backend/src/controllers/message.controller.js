const Message = require("../models/message.model");
const cloudinary = require("cloudinary").v2;
const fields = "firstName lastName profileUrl";
const User = require("../models/user.model");
// const { getReceiverSocketId, io } = require("../lib/socket.js");
const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    // find all filteredUsers except the current user
    const filteredUsers = await User.find({ _id: { $ne: userId } })
      .select("-password")
      .sort({ updatedAt: -1 });
    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const getMessages = async (req, res) => {
  try {
    const userId = req.user._id; // id of the current user (sender)
    const receiverId = req.params.id; // id of the receiver
    // find all messages between the current user and the receiver
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    })
      .populate("senderId", fields)
      .populate("receiverId", fields);
    console.log(messages);
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body; // get the text and image from the request body
    const senderId = req.user._id; // id of the current user (sender)
    const receiverId = req.params.id; // id of the receiver
    let imageUrl = "";
    if (image) {
      // if image is provided
      const imageResponse = await cloudinary.uploader.upload(image); // upload the image
      imageUrl = imageResponse.secure_url; // get the image url and set it in imageUrl
    }
    const message = await new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    const savedMessage = await message.save(); // save the message
    await User.findByIdAndUpdate(senderId, { updatedAt: new Date() }); // update the updatedAt field of the sender

    res.status(200).json({ savedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = { getUsersForSidebar, getMessages, sendMessage };
