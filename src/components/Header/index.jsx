import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import usePutSurvey from "../../apis/usePutSurvey";

import useFormEditorStore from "../../store/useFormEditorStore";
import useUserIdStore from "../../store/useUserIdStore";

import SurveyUrlModal from "../shared/SurveyUrlModal";

function FormEditorHeader({ activeSection, onSectionChange, isNewForm }) {
  const { userId } = useUserIdStore();
  const { surveyId } = useParams();
  const [surveyUrl, setSurveyUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { coverData, styleData, endingData, questions } = useFormEditorStore();

  const surveyData = {
    creator: userId,
    title: coverData.title,
    subtitle: coverData.subtitle,
    startButtonText: coverData.startButtonText,
    coverImage: coverData.coverImage,
    themeColor: styleData.themeColor,
    buttonShape: styleData.buttonShape,
    animation: styleData.animation,
    endingTitle: endingData.title,
    endingContent: endingData.content,
    questions,
  };

  const updateSurvey = usePutSurvey(surveyData, surveyId, setSurveyUrl);
  const navigate = useNavigate();

  function handleSubmit() {
    updateSurvey();
    setShowModal(true);
  }

  return (
    <section className="text-black p-2 border-b border-[[#4E5968]]">
      {showModal && (
        <SurveyUrlModal url={surveyUrl} onClose={() => setShowModal(false)} />
      )}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dash")}
            role="presentation"
          >
            <img src="/assets/survey-icon.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold ml-2">Survey101</span>
          </span>
          <div className="ml-2 md:hidden">
            {isNewForm ? null : (
              <button
                type="button"
                aria-label="save-button"
                className="bg-[#C9E2FF] text-[#004EFF] px-2 py-1 rounded-md"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faSave} className="text-xl" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center space-x-2 md:space-x-7">
          <button
            className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-base whitespace-nowrap ${
              activeSection === "cover" ? "bg-[#C9E2FF]" : ""
            }`}
            onClick={() => onSectionChange("cover")}
          >
            <span
              className={`w-2 h-2 rounded-full hidden md:block ${
                activeSection === "cover" ? "bg-[#004EFF]" : "bg-white"
              }`}
            ></span>
            <span className="whitespace-nowrap">설문 커버</span>
          </button>
          <span className="hidden md:block">
            <FontAwesomeIcon icon={faArrowRight} className="text-black" />
          </span>
          <button
            className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-base whitespace-nowrap ${
              activeSection === "style" ? "bg-[#C9E2FF]" : ""
            }`}
            onClick={() => onSectionChange("style")}
          >
            <span
              className={`w-2 h-2 rounded-full hidden md:block ${
                activeSection === "style" ? "bg-[#004EFF]" : "bg-white"
              }`}
            ></span>
            <span className="whitespace-nowrap">설문 스타일</span>
          </button>
          <span className="hidden md:block">
            <FontAwesomeIcon icon={faArrowRight} className="text-black" />
          </span>
          <button
            className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-base whitespace-nowrap ${
              activeSection === "question" ? "bg-[#C9E2FF]" : ""
            }`}
            onClick={() => onSectionChange("question")}
          >
            <span
              className={`w-2 h-2 rounded-full hidden md:block ${
                activeSection === "question" ? "bg-[#004EFF]" : "bg-white"
              }`}
            ></span>
            <span className="whitespace-nowrap">설문 내용</span>
          </button>
          <span className="hidden md:block">
            <FontAwesomeIcon icon={faArrowRight} className="text-black" />
          </span>
          <button
            className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-base whitespace-nowrap ${
              activeSection === "ending" ? "bg-[#C9E2FF]" : ""
            }`}
            onClick={() => onSectionChange("ending")}
          >
            <span
              className={`w-2 h-2 rounded-full hidden md:block ${
                activeSection === "ending" ? "bg-[#004EFF]" : "bg-white"
              }`}
            ></span>
            <span className="whitespace-nowrap">설문 마무리</span>
          </button>
        </div>
        <div className="hidden md:block">
          {isNewForm ? null : (
            <button
              type="button"
              aria-label="save-button"
              className="bg-[#C9E2FF] text-[#004EFF] px-2 py-1 rounded-md"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faSave} className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default FormEditorHeader;
