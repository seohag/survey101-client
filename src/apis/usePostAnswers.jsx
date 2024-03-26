import { useMutation } from "@tanstack/react-query";
import { useParams , useNavigate } from "react-router-dom";

import fetchData from "../utils/axios";

function usePostAnswers(surveyAnswers) {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  async function handleFetchAnswers() {
    try {
      const response = await fetchData("post", `/surveys/${surveyId}/answers`, {
        surveyAnswers,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
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

  return { fetchAnswers };
}

export default usePostAnswers;
