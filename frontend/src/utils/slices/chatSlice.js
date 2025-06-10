// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    messages: [],
    selectedUser: null,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { setUsers, setMessages, setSelectedUser, addMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
