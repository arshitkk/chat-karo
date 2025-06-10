import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import themeReducer from "../slices/themeSlice.js";
import chatReducer from "../slices/chatSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    chat: chatReducer,
  },
});

export default store;
