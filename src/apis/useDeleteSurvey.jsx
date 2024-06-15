import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";
import ConfirmModal from "../components/shared/ConfirmModal";

function useDeleteSurvey(surveyId) {
  const [errors, setErrors] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useUserIdStore();

  async function handleDeleteSurvey(userInput) {
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

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const modal = isModalOpen && (
    <ConfirmModal
      title="콘텐츠 삭제"
      message="해당 콘텐츠 및 관련 응답 데이터를 모두 삭제하시겠습니까? 삭제하시려면 아래에 '삭제' 를 입력해 주세요."
      confirmText="삭제"
      onClose={closeModal}
      onConfirm={async (userInput) => {
        await fetchDelete(userInput);
        closeModal();
      }}
    />
  );

  if (errors) {
    throw errors;
  }

  return { openModal, modal };
}

export default useDeleteSurvey;
