import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetchData from "../utils/axios";

function useGetSurveyReponses() {
  const { surveyId } = useParams();

  async function getSurveyResponses() {
    try {
      const surveyResponses = await fetchData(
        "get",
        `/surveys/${surveyId}/surveyResponses`,
      );
      return surveyResponses.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const { data: surveyResponses, isLoading } = useQuery({
    queryKey: ["surveyResponses", surveyId],
    queryFn: getSurveyResponses,
    refetchOnMount: true,
    refetchInterval: true,
    refetchOnWindowFocus: true,
  });

  return { surveyResponses, isLoading };
}

export default useGetSurveyReponses;
