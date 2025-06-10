import axios from "axios";
import { BASE_URL } from "../constants";
const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "/api/auth/check", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log("User not logged in");
  }
};
export default fetchUser;
