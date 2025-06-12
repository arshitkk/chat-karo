// Dependencies
const express = require("express");
const { app, server } = require("./src/config/socket.js");
require("dotenv").config();
const connectDB = require("./src/config/db.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/auth.routes.js");
const messageRouter = require("./src/routes/message.route.js");
const cors = require("cors");
const path = require("path");
// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatting-karo.onrender.com",
      "http://192.168.1.4:5173",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
  });
});
