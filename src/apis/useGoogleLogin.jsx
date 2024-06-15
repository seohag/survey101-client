import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";

function useGoogleLogin() {
  const navigate = useNavigate();
  const { setUser, setUserId, setIsLoggedIn } = useUserIdStore();
  const [errors, setErrors] = useState(null);

  async function handleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);

      const userInfo = {
        email: result.user.email,
        username: result.user.displayName,
      };

      const response = await fetchData("post", "/auth/login", userInfo);

      if (response.data.result === true) {
        setIsLoggedIn(true);
        setUser(response.data.user);
        setUserId(response.data.user._id);
        navigate("/dash");
      }
    } catch (error) {
      setErrors(error);
      console.error(error);
    }
  }

  if (errors) {
    throw errors;
  }

  return handleLogin;
}

export default useGoogleLogin;
