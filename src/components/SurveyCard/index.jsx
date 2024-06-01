import { useNavigate } from "react-router-dom";
import useDeleteSurvey from "../../apis/useDeleteSurvey";
import DropdownMenu from "../DropDownMenu";

function SurveyCard({ survey, openDropdownId, setOpenDropdownId }) {
  const navigate = useNavigate();
  const { openModal, modal } = useDeleteSurvey(survey._id);

  async function handleOptionClick(event) {
    event.stopPropagation();

    const action = event.target.textContent;

    if (action === "미리보기") {
      navigate(`/form/${survey._id}`);
    } else if (action === "편집") {
      navigate(`/editor/${survey._id}`);
    } else if (action === "링크 복사") {
      const surveyUrl = `${window.location.origin}/form/${survey._id}`;

      try {
        await navigator.clipboard.writeText(surveyUrl);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch (error) {
        console.error("링크를 복사하는데 실패했습니다.", error);
      }
    } else if (action === "응답 데이터 분석") {
      navigate(`/analytics/${survey._id}`);
    } else if (action === "삭제") {
      openModal();
    }
  }

  function handleCardClick() {
    if (!modal) {
      navigate(`/editor/${survey._id}`);
    }
  }

  return (
    <div
      key={survey._id}
      onClick={handleCardClick}
      role="presentation"
      className="group transition-all duration-300 bg-white rounded-md border border-gray-200 p-4 hover:shadow-lg hover:border-[#3182F6] hover:shadow-outline"
    >
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-semibold">{survey.title}</h2>
      </div>
      <div className="flex justify-center items-center mb-4 mx-2 relative">
        <img
          src={survey.coverImage?.imageUrl || "/assets/default-coverimg.png"}
          alt="Cover"
          className="object-contain"
          style={{ width: "200px", height: "147px" }}
        />
      </div>
      <DropdownMenu
        handleOptionClick={handleOptionClick}
        isOpen={openDropdownId === survey._id}
        toggle={() =>
          setOpenDropdownId(openDropdownId === survey._id ? null : survey._id)
        }
      />
      {modal}
    </div>
  );
}

export default SurveyCard;
