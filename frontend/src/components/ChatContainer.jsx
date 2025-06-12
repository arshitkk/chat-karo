import { useEffect, useRef } from "react";
import fetchMessages from "../utils/hooks/fetchMessages";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setMessages, addMessage } from "../utils/slices/chatSlice";
import { formatMessageTime } from "../utils/formatMessageTime";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { socket } from "../utils/socket";
function ChatContainer() {
  const messageEndRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages, shallowEqual);
  const user = useSelector((state) => state.chat.selectedUser);
  const loggedinUser = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchingMessage = async () => {
      const msg = await fetchMessages(user._id);
      if (msg) {
        dispatch(setMessages(msg.messages));
      }
    };

    if (user._id) {
      fetchingMessage();
    }
  }, [user._id, dispatch]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      // You may want to check if the message is for the currently open chat
      dispatch(addMessage(message));
    });

    // Cleanup on unmount
    return () => {
      socket && socket.off("receiveMessage");
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-auto w-screen">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages &&
          messages.map((message) => (
            <div
              key={message?._id}
              className={`chat ${
                (message?.senderId?._id || message?.senderId) ===
                loggedinUser._id
                  ? "chat-end"
                  : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      (message?.senderId?._id || message?.senderId) ===
                      loggedinUser._id
                        ? loggedinUser.profileUrl || "/avatar.png"
                        : user.profileUrl || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message?.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message?.image && (
                  <img
                    src={message?.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message?.text && <p>{message?.text}</p>}
              </div>
            </div>
          ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
