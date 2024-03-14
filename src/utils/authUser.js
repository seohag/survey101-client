import fetchData from "./axios";

async function authUser() {
  const response = await fetchData("get", "/auth/check");

  return response.data;
}

export default authUser;
