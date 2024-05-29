import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import fetchData from "../utils/axios";

import useUserIdStore from "../store/useUserIdStore";

function useDeleteSurvey(surveyId) {
  const navigate = useNavigate();
  const { userId } = useUserIdStore();

  async function handleDeleteSurvey() {
    const userInput = window.prompt(
      `해당 콘텐츠 및 관련 응답 데이터를 모두 삭제하시겠습니까? 삭제하시려면 아래에 삭제를 입력해 주세요.`,
    );

    if (userInput !== "삭제") {
      return false;
    }

    await fetchData("delete", `/user/${userId}/surveys/${surveyId}`);

    return true;
  }

  const { mutateAsync: fetchDelete } = useMutation({
    mutationFn: handleDeleteSurvey,
    useErrorBoundary: true,
    onSuccess: (data) => {
      if (data) {
        console.log("설문삭제 성공");
        window.location.reload();
      }
    },
  });

  return fetchDelete;
}

export default useDeleteSurvey;
