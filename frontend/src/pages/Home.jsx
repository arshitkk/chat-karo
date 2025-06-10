import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  document.title = "Chat Karo";

  const selectedUser = useSelector((state) => state.chat.selectedUser);
  return (
    <div className="min-h-screen  w-full shadow-2xl pt-8 bg-base-200">
      <div className="flex items-center justify-center pt-17 px-1">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
