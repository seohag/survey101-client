import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DropdownMenu from "../DropDownMenu";
import useDeleteSurvey from "../../apis/useDeleteSurvey";

function SurveyCard({ survey }) {
  const navigate = useNavigate();
  const deleteSurvey = useDeleteSurvey(survey._id);

  async function handleOptionClick(event) {
    event.stopPropagation();

    if (event.target.textContent === "미리보기") {
      navigate(`/form/${survey._id}`);
    }

    if (event.target.textContent === "편집") {
      navigate(`/editor/${survey._id}`);
    }

    if (event.target.textContent === "링크 복사") {
      const surveyUrl = `${window.location.origin}/form/${survey._id}`;

      try {
        await navigator.clipboard.writeText(surveyUrl);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch (error) {
        console.error("링크를 복사하는데 실패했습니다.", error);
      }
    }

    if (event.target.textContent === "응답 및 분석") {
      navigate(`/analytics/${survey._id}`);
    }

    if (event.target.textContent === "삭제") {
      await deleteSurvey();
    }
  }

  return (
    <div
      key={survey._id}
      onClick={() => navigate(`/editor/${survey._id}`)}
      onKeyDown={() => navigate(`/editor/${survey._id}`)}
      className="cursor-pointer bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none min-h-60"
      role="presentation"
    >
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-semibold">{survey.title}</h2>
      </div>
      {survey.coverImage && (
        <div className="flex justify-center items-center mb-4 mx-2 relative">
          <img
            src={
              typeof survey.coverImage.imageUrl === "string"
                ? survey.coverImage.imageUrl
                : URL.createObjectURL(survey.coverImage)
            }
            alt="Cover"
            style={{ width: "200px", height: "147px" }}
          />
        </div>
      )}
      {!survey.coverImage && (
        <div className="flex justify-center items-center mb-4 mx-2 relative">
          <img
            src="/assets/default-coverimg.png"
            alt="No Cover"
            className="object-contain"
            style={{ width: "200px", height: "147px" }}
          />
        </div>
      )}
      <DropdownMenu handleOptionClick={handleOptionClick} />
    </div>
  );
}

export default SurveyCard;
