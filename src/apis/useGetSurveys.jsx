import { useQuery } from "@tanstack/react-query";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/store";

function useGetSurveys() {
  const { userId } = useUserIdStore();

  async function getSurveyList() {
    try {
      const response = await fetchData("get", `/user/${userId}/surveys`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const { data: surveys = [] } = useQuery({
    queryKey: ["surveys"],
    queryFn: getSurveyList,
    refetchOnWindowFocus: false,
    staleTime: 60 * 3000,
  });

  return { surveys };
}

export default useGetSurveys;
