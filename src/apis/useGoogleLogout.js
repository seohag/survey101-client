import { useNavigate } from "react-router-dom";

import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import useUserStore from "../store/store";

function useGoogleLogOut() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useUserStore();

  async function handleLogOut() {
    try {
      await signOut(auth);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        { withCredentials: true },
      );

      if (response.data.result === true) {
        setIsLoggedIn(false);
        setUser("");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return handleLogOut;
}

export default useGoogleLogOut;
