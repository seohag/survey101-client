import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authUser from "../utils/authUser";

import useUserStore from "../store/store";

function useGetAuthUser() {
  const { setUser, setIsLoggedIn } = useUserStore();
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
