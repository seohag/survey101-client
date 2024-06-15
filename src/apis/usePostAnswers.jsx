import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import fetchData from "../utils/axios";

function usePostAnswers(surveyAnswers) {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const [errors, setErrors] = useState(null);

  async function handleFetchAnswers() {
    try {
      const response = await fetchData(
        "post",
        `/response/surveys/${surveyId}/answers`,
        {
          surveyAnswers,
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return setErrors(error);
    }
  }

  const { mutate: fetchAnswers } = useMutation({
    mutationFn: handleFetchAnswers,
    useErrorBoundary: true,
    onSuccess: () => {
      console.log("설문답변 성공");
      navigate("/");
    },
  });

  if (errors) {
    throw errors;
  }

  return { fetchAnswers };
}

export default usePostAnswers;
