import { Link, useNavigate } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/slices/userSlice";
import { disconnectSocket } from "../utils/socket";
const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    let res = await axios.post(
      BASE_URL + "/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    disconnectSocket();
    dispatch(removeUser());
    navigate("/login");
  };
  return (
    <header
      className=" bg-base-100 border-b border-base-300 fixed w-full top-0 
    backdrop-blur-lg z-30"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatting Karo</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <>
                <Link
                  to={"/settings"}
                  className={`btn btn-sm gap-2 transition-colors cursor-pointer`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 cursor-pointer`}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="size-5 cursor-pointer " />
                  <span className="hidden sm:inline cursor-pointer">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
