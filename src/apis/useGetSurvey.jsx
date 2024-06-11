import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/axios";

import useUserIdStore from "../store/useUserIdStore";

function useGetSurvey(surveyId) {
  const { userId } = useUserIdStore();

  async function getSurveyData() {
    try {
      let endpoint = `response/surveys/${surveyId}`;

      if (userId) {
        endpoint = `/user/${userId}/surveys/${surveyId}`;
      }

      const response = await fetchData("get", endpoint);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const { data: surveyData = {} } = useQuery({
    queryKey: ["survey", surveyId],
    queryFn: getSurveyData,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    suspense: true,
    staleTime: 60 * 3000,
  });

  return { surveyData };
}

export default useGetSurvey;
