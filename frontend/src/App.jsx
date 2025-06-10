import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import fetchUser from "./utils/hooks/fetchUser";
import { addUser } from "./utils/slices/userSlice";
import Navbar from "./components/Navbar";
import { connectSocket, disconnectSocket } from "./utils/socket";
function App() {
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const theme = useSelector((state) => state.theme);
  const loggedinStatus = localStorage.getItem("userLoggedIn");
  const userCreatedAndLoggedIn = localStorage.getItem("userCreatedAndLoggedIn"); 

  useEffect(() => {
    const getUserAndNavigate = async () => {
      try {
        const res = await fetchUser(); // fetch the user
        if (res) {
          // if user is logged in then navigate to home and add user to redux
          dispatch(addUser(res));
          navigate("/");

          // toast logic
          if (loggedinStatus) {
            setToastText(localStorage.getItem("msg"));
            setShowToast(true);

            setTimeout(() => {
              setShowToast(false);
              localStorage.removeItem("userLoggedIn");
              localStorage.removeItem("msg");
            }, 2000);
          } else if (userCreatedAndLoggedIn) {
            setToastText(localStorage.getItem("msg"));
            setShowToast(true);

            setTimeout(() => {
              setShowToast(false);
              localStorage.removeItem("userCreatedAndLoggedIn");
              localStorage.removeItem("msg");
            }, 2000);
          }
        } else {
          //  if user is not logged in then navigate to login
          if (
            location.pathname !== "/sign-up" &&
            location.pathname !== "/login"
          ) {
            navigate("/login");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    getUserAndNavigate(); // call the function
  }, [loggedinStatus, userCreatedAndLoggedIn, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      //  if user is logged in then connect socket
      connectSocket(user, dispatch);
    }
    return () => disconnectSocket();
  }, [user]);

  if (loading) {
    return (
      <div
        data-theme={theme}
        className="flex justify-center items-center h-screen w-screen "
      >
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme} className="max-w-screen bg-base-100 min-h-screen ">
      <div className="flex justify-center items-center">
        {showToast && (
          <div className="toast toast-top toast-center z-40 shadow-2xl ">
            <div className="alert alert-success bg-green-700 text-white font-bold">
              <span>{toastText}</span>
            </div>
          </div>
        )}
        <Navbar user={user} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
