import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";

function useGoogleLogOut() {
  const navigate = useNavigate();
  const { setUser, setUserId, setIsLoggedIn } = useUserIdStore();

  async function handleLogOut() {
    try {
      await signOut(auth);
      const response = await fetchData("get", "/auth/logout");

      if (response.data.result === true) {
        setIsLoggedIn(false);
        setUser("");
        setUserId(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return handleLogOut;
}

export default useGoogleLogOut;
