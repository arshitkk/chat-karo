import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { setUsers, setSelectedUser } from "../utils/slices/chatSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [ShowOnlineOnly, setShowOnlineOnly] = useState(() => {
    const bool = localStorage.getItem("showOnline");
    return bool === "true" ? true : false;
  });
  const users = useSelector((state) => state.chat.users);
  const onlineUsers = useSelector((state) => state?.user?.onlineUsers);
  const dispatch = useDispatch();

  const fetchingUser = async () => {
    let res = await axios.get(BASE_URL + "/api/message/get-users", {
      withCredentials: true,
    });
    dispatch(setUsers(res.data.filteredUsers));
  };
  useEffect(() => {
    fetchingUser();
  }, []);
  useEffect(() => {
    localStorage.setItem("showOnline", ShowOnlineOnly);
  }, [ShowOnlineOnly]);

  // 1. Extract all online user IDs from onlineUsers
  const onlineUserIds =
    onlineUsers && users && onlineUsers.map((user) => user.user._id);

  // 2. Filter users array based on those IDs
  const onlineFilteredUsers = users.filter((user) =>
    onlineUserIds.includes(user._id)
  );
  const filteredUsers = ShowOnlineOnly ? onlineFilteredUsers : users;
  return (
    <aside className="h-full lg:w-60 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-1">
        <div className="flex items-center gap-2"> 
          <Users className="size-6 ml-6" />
          <span className="font-medium hidden lg:block ">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={ShowOnlineOnly}
              onChange={(e) => {
                setShowOnlineOnly(e.target.checked);
              }}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers &&
            filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => user && dispatch(setSelectedUser(user))}
                className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors

            `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user?.profileUrl || "/avatar.png"}
                    alt={user?.firstName}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.some(
                    (onlineUser) => onlineUser?.user._id === user?._id
                  ) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0 ml-2">
                  <div className="font-medium truncate">{user?.firstName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUserIds.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))}

          {users.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              No online users
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
