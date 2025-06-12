import { useEffect, useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

function Profile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  let user = useSelector((state) => state.user.data);

  document.title = "Profile";
  const submitHandler = async (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (!selectedFile) return; // If no file is selected, return
    setLoading(true); // Set loading to true
    try {
      const reader = new FileReader(); // Create a file reader
      reader.readAsDataURL(selectedFile); // Read the selected file
      // convert to base64 and set the state
      reader.onloadend = async () => {
        const base64data = reader.result;
        setFile(base64data);

        // update profile
        const res = await axios.put(
          BASE_URL + "/api/auth/update-profile",
          { profileUrl: base64data },
          { withCredentials: true }
        );
        setFile(res.data.updatedProfile.profileUrl);
        setLoading(false); // Set loading to false
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="scale-85 lg:scale-100">
      <div className="max-w-2xl mx-auto p-3 py-8 pt-18 ">
        <div className="bg-base-300 rounded-2xl px-4 py-3  ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold pb-1">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-3 px-8">
            <div className="relative ">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 ">
                {loading ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="loading loading-spinner loading-xl"></span>
                  </div>
                ) : (
                  <img
                    src={file || user?.profileUrl || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                absolute bottom-0 right-0 
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
              `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={submitHandler}
                />
              </label>
            </div>
            <p
              className={`text-sm text-zinc-400 mb-5 w-72 text-center ${
                loading && "animate pulse"
              } `}
            >
              {loading
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user.firstName + " " + user.lastName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{new Date(user.createdAt).toDateString()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 animate-pulse">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
