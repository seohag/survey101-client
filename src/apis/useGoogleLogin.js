import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import axios from "axios";
import { auth, provider } from "../../config/firebase";
import useUserStore from "../store/store";

function useGoogleLogin() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useUserStore();

  async function handleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const userInfo = {
        email: result.user.email,
        username: result.user.displayName,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.data.result === true) {
        setIsLoggedIn(true);
        setUser(response.data.user);
        navigate("/dash");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return handleLogin;
}

export default useGoogleLogin;
