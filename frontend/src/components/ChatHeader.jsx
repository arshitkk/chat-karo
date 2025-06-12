import { X } from "lucide-react";
import { useSelector } from "react-redux";
const ChatHeader = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state?.user?.onlineUsers);

  return (
    <div className="p-2 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profileUrl || "/avatar.png"}
                alt={selectedUser.firstName + " " + selectedUser.lastName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">
              {selectedUser.firstName + " " + selectedUser.lastName}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.some((user) => user.user._id === selectedUser._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
