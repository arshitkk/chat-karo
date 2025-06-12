import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  document.title = "Chatting Karo";

  const selectedUser = useSelector((state) => state.chat.selectedUser); 
  return (
    <div className="w-full min-h-screen shadow-2xl overflow-hidden pt-1 bg-base-200">
      <div className="flex items-center justify-center pt-16 px-1">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-5rem)]">
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
