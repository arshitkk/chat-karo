import axios from "axios";
import { BASE_URL } from "../constants";
const fetchMessages = async (user) => {
  try {
    if (user) {
      const res = await axios.get(BASE_URL + "/api/message/" + user, {
        withCredentials: true,
      });
      return res.data;
    }
  } catch (err) {
    console.log("User not logged in");
  }
};
export default fetchMessages;
