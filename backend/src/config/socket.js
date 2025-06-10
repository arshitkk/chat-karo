const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const onlineUsers = new Map(); // Map to store online users because we cant use simple array here as we need to keep track of socketId and avoid duplication

// Socket.io setup
io.on("connection", (socket) => {
  console.log("a user connected  ", socket.id);
  const user = socket.handshake.auth; // Get user object from handshake
  const userId = user._id; // Get user id
  // Add user to onlineUsers
  onlineUsers.set(userId, {
    socketId: socket.id,
    user,
  });

  io.emit("onlineUsers", Array.from(onlineUsers.values())); // Emit online users to all connected clients

  // Handle incoming messages
  socket.on("newMessage", (message) => {
    const receiverId = message.receiverId;
    // Send message only to that user's socket
    const receiverSocketId = onlineUsers.get(receiverId); // Get the socketId of the receiver
    if (receiverSocketId) {
      // Emit message to that receiver
      io.to(receiverSocketId.socketId).emit("receiveMessage", message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    onlineUsers.delete(userId); // Remove user from onlineUsers
    io.emit("onlineUsers", Array.from(onlineUsers.values())); // Emit online users to all connected clients
    console.log("a user disconnected ", socket.id);
  });
});

module.exports = { io, app, server };
