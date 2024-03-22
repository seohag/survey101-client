import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authUser from "../utils/authUser";
import useUserIdStore from "../store/useUserIdStore";

function useGetAuthUser() {
  const { setUser, setIsLoggedIn } = useUserIdStore();
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
          setUser("");
        }
      } catch (error) {
        setUser("");
        navigate("/");
      }
    };

    checkAuth();
  }, []);
}

export default useGetAuthUser;
