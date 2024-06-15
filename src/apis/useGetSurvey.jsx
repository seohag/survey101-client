import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/axios";

import useUserIdStore from "../store/useUserIdStore";

function useGetSurvey(surveyId) {
  const { userId } = useUserIdStore();
  const [errors, setErrors] = useState(null);

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
      return setErrors(error);
    }
  }

  const { data: surveyData = {} } = useQuery({
    queryKey: ["survey", surveyId],
    queryFn: getSurveyData,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    useErrorBoundary: true,
    suspense: true,
  });

  if (errors) {
    throw errors;
  }

  return { surveyData };
}

export default useGetSurvey;
