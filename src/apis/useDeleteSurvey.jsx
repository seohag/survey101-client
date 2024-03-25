import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import fetchData from "../utils/axios";

import useUserIdStore from "../store/useUserIdStore";

function useDeleteSurvey(surveyId) {
  const navigate = useNavigate();
  const { userId } = useUserIdStore();

  async function handleDeleteSurvey() {
    const confirmDelete = window.confirm("정말로 설문을 삭제하시겠습니까?");

    if (!confirmDelete) {
      return;
    }

    await fetchData("delete", `/user/${userId}/surveys/${surveyId}`);
  }

  const { mutateAsync: fetchDelete } = useMutation({
    mutationFn: handleDeleteSurvey,
    useErrorBoundary: true,
    onSuccess: () => {
      console.log("설문삭제 성공");
      navigate(`/dash`);
    },
  });

  return fetchDelete;
}

export default useDeleteSurvey;
