import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";
import ConfirmModal from "../components/shared/ConfirmModal";

function useGoogleLogOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser, setUserId, setIsLoggedIn } = useUserIdStore();

  async function handleLogOut() {
    try {
      await signOut(auth);
      const response = await fetchData("get", "/auth/logout");

      if (response.data.result === true) {
        setIsLoggedIn(false);
        setUser("");
        setUserId(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const modal = isModalOpen && (
    <ConfirmModal
      title="로그아웃"
      message="로그아웃 하시겠습니까?"
      confirmText="확인"
      onClose={closeModal}
      onConfirm={async () => {
        await handleLogOut();
        closeModal();
      }}
    />
  );

  return { openModal, modal };
}

export default useGoogleLogOut;
