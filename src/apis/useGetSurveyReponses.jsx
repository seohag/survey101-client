import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetchData from "../utils/axios";

function useGetSurveyReponses() {
  const { surveyId } = useParams();

  async function getSurveyResponses() {
    try {
      const surveyResponses = await fetchData(
        "get",
        `response/surveys/${surveyId}/surveyResponses`,
      );

      return surveyResponses.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const { data: surveyResponses } = useQuery({
    queryKey: ["surveyResponses", surveyId],
    queryFn: getSurveyResponses,
    refetchOnMount: true,
    refetchInterval: true,
    refetchOnWindowFocus: true,
    suspense: true,
    staleTime: 60 * 1000,
    cacheTime: 1000 * 60 * 5,
  });

  return { surveyResponses };
}

export default useGetSurveyReponses;
