import { io } from "socket.io-client";
import { BASE_URL } from "./constants";
import { setOnlineUsers } from "./slices/userSlice";

let socket = null; // Global variable to store the socket instance

// Function to connect to the socket
function connectSocket(user, dispatch) {
  if (!socket || !socket.connected) {
    // Connect to the socket
    if (user) {
      socket = io("https://chatting-karo.onrender.com", {
        withCredentials: true, // Enable cross-origin requests
        auth: user, // Pass the user object
      });
    }
    if (socket) {
      socket.on("connect", () => {
        console.log(user.firstName + "(you) is connected on server");
      });

      // Listen for online users event
      socket.on("onlineUsers", (users) => {
        if (users) dispatch(setOnlineUsers(users)); // Update online users
      });

      // socket.on("disconnect", () => {
      //   console.log(" Disconnected");
      // });
    }
  }
  return socket;
}

// Function to disconnect from the socket
function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
  socket = null;
}

export { connectSocket, disconnectSocket, socket };
