# 💬 chatting-karo

**[Link to the website](https://chatting-karo.onrender.com/)**

**chatting-karo** is a **full-stack real-time chat application** built with React, Redux Toolkit, Node.js, and Socket.IO. It features secure authentication, private messaging, image uploads, and a modern responsive UI. Users can chat in real-time, view online users, and share media effortlessly.

## 🌟 Features

- 🔐 **JWT-based Authentication** (Sign up / Login)
- 🧑‍🤝‍🧑 **1-on-1 Real-time Messaging** (via Socket.IO)
- 📷 **Image Upload Support** using Cloudinary
- 👁️ **Online Users Indicator**
- 📱 **Responsive UI** (Mobile-Friendly)
- 🎨 Choose from **32 stunning themes** to personalize your chat experience.
- 🧼 **Clean & Modern Design** using Tailwind CSS and DaisyUI
- 🚫 **Protected Routes** with React Router
- 💾 **MongoDB Database Integration**
- ⚛️ **State Management with Redux Toolkit**

## 📁 Tech Stack

### 🚀 Frontend

- **ReactJS**
- **Redux Toolkit** (for global state management)
- **React Router DOM** (for navigation)
- **Tailwind CSS** (for utility-first styling)
- **DaisyUI** (for pre-styled components)
- **Lucide Icons** (for clean and minimal icons)
- **Socket.IO Client** (for real-time chat)
- **Cloudinary** (for uploading and rendering media)

### 🛠️ Backend

- **Node.js**
- **Express.js**
- **MongoDB** (with **Mongoose**)
- **JWT** (for user authentication)
- **Socket.IO Server** (for managing live chat communication)
- **Cloudinary** (media storage)

> and some other neccessary npm packages like validator, bcrypt to ease the process and reduce boilerplate code

## 🧑‍💻 How It Works

1. **Authentication:**

   - Users register or login using their credentials.
   - A JWT token is issued and stored in the cookies for session management.

2. **Messaging:**

   - Users can chat with other users in real-time.
   - Socket.IO is used to handle live communication.
   - Online/offline status updates are shown instantly.

3. **Image Sharing:**

   - Users can send images using Cloudinary.
   - Uploaded images are previewed within the chat.

4. **State & Routes:**

   - Redux manages user state, chat state, and online users.
   - React Router guards protected routes using auth state.

## 🚀 Deployment

This project is deployed using a **Monorepo structure**, where both the **frontend (React)** and **backend (Node.js + Express)** live in the same repository.
It is deployed directly to **Render** from the root monorepo folder — no separation needed between frontend and backend repositories.

- **Frontend build** is handled via a custom `build` script in the monorepo.
- The backend serves both the API and the frontend's static files.
- **`express.static`** middleware are used to serve the React app in production.

> ✅ No need for Vercel or separate hosting — everything runs from a single Render web service.

---
