import axios from "axios";

async function authUser() {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/auth/check`,
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export default authUser;
