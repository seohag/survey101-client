import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import authUser from "../utils/authUser";
import useUserIdStore from "../store/useUserIdStore";

function useGetAuthUser() {
  const { setUser, setIsLoggedIn } = useUserIdStore();
  const [errors, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authUser();
        const { result, user } = response;

        if (result) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser("");
        setError(error);
      }
    };

    checkAuth();
  }, [navigate, setIsLoggedIn, setUser]);

  if (errors) {
    throw errors;
  }
}

export default useGetAuthUser;
