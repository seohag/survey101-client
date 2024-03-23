import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/axios";

import useUserIdStore from "../store/useUserIdStore";

function useGetSurvey(surveyId) {
  const { userId } = useUserIdStore();

  async function getSurveyData() {
    try {
      const response = await fetchData(
        "get",
        `/user/${userId}/surveys/${surveyId}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const { data: surveyData = {}, isLoading } = useQuery({
    queryKey: ["survey", surveyId],
    queryFn: getSurveyData,
    refetchOnWindowFocus: false,
    staleTime: 60 * 3000,
  });

  return { surveyData, isLoading };
}

export default useGetSurvey;
