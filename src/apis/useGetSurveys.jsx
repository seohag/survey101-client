import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";

function useGetSurveys() {
  const [errors, setErrors] = useState(null);
  const { userId } = useUserIdStore();

  async function getSurveyList() {
    try {
      const response = await fetchData("get", `/user/${userId}/surveys`);

      return response.data;
    } catch (error) {
      console.error(error);
      return setErrors(error);
    }
  }

  const { data: surveys = [] } = useQuery({
    queryKey: ["surveys"],
    queryFn: getSurveyList,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    useErrorBoundary: true,
    retry: false,
    suspense: true,
  });

  if (errors) {
    throw errors;
  }

  return { surveys };
}

export default useGetSurveys;
