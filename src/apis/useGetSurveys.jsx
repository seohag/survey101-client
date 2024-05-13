import { useQuery } from "@tanstack/react-query";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";

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

  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["surveys"],
    queryFn: getSurveyList,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  return { surveys, isLoading };
}

export default useGetSurveys;
