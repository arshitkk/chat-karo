import { useState } from "react";
import { Mails } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthImagePattern from "../components/AuthImagePattern";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice.js";
import { BASE_URL } from "../utils/constants.js";
function SignUp() {
  const [firstName, setFirstName] = useState("Anusha");
  const [lastName, setLastName] = useState("Jha");
  const [email, setEmail] = useState("annu123@gmail.com");
  const [password, setPassword] = useState("Annu@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  document.title = "Sign Up";
  
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const user = await axios.post(
        BASE_URL + "/api/auth/sign-up",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/");
      dispatch(addUser(user.data)); // adding logged in user to redux store

      // setting  local storage for toast
      localStorage.setItem("userCreatedAndLoggedIn", "true");
      localStorage.setItem("msg", "User created and Logged In successfully");
    } catch (error) {
      const e = error?.response?.data?.message.split(":");
      setError(e[e.length - 1]);
    }
  };
  return (
    <div className="h-screen w-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className=" w-full max-w-md space-y-8 flex flex-col justify-center items-center">
          {/* Logo */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
                transition-colors"
              >
                <Mails className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs p-4">
              <label className="label">First Name</label>
              <input
                type="text"
                value={firstName}
                className="input"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                value={lastName}
                className="input"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="label">Email</label>
              <input
                type="text"
                value={email}
                className="input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="text-end text-blue-500 cursor-pointer select-none"
                onClick={showPasswordHandler}
              >
                {showPassword ? "Hide" : "Show"} Password
              </span>
              <p className="text-red-500 text-sm font-bold text-center animate-pulse">
                {error && `${error}`}
              </p>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
          {/* footer section for signup */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Join our community"}
        subtitle={
          "Connect with friends, share moments, and stay in touch with your loved ones."
        }
      />
    </div>
  );
}

export default SignUp;
