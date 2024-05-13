import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import usePutSurvey from "../../apis/usePutSurvey";
import useDeleteSurvey from "../../apis/useDeleteSurvey";

import useFormEditorStore from "../../store/useFormEditorStore";
import useUserIdStore from "../../store/useUserIdStore";

import SurveyUrlModal from "../shared/SurveyUrlModal";

function FormEditorHeader({ activeSection, onSectionChange, isNewForm }) {
  const { userId } = useUserIdStore();
  const { surveyId } = useParams();
  const { coverData, styleData, endingData, questions, setEndingData } =
    useFormEditorStore();

  const [surveyUrl, setSurveyUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const deleteSurvey = useDeleteSurvey(surveyId);
  const updateSurvey = usePutSurvey(surveyData, surveyId, setSurveyUrl);
  const navigate = useNavigate();

  function handleSubmit() {
    updateSurvey();
    setShowModal(true);
  }

  function navigateToDash() {
    navigate("/dash");
  }

  return (
    <section className="bg-purple-800 text-white p-4">
      {showModal && (
        <SurveyUrlModal url={surveyUrl} onClose={() => setShowModal(false)} />
      )}
      <div className="flex justify-between items-center">
        <span
          className="text-2xl font-bold"
          onClick={navigateToDash}
          role="presentation"
        >
          Survey101
        </span>
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeSection === "cover" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("cover")}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeSection === "cover" ? "bg-black" : "bg-white"
              }`}
            ></span>
            <span>설문 커버</span>
          </button>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeSection === "style" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("style")}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeSection === "style" ? "bg-black" : "bg-white"
              }`}
            ></span>
            <span>설문 스타일</span>
          </button>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeSection === "question" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("question")}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeSection === "question" ? "bg-black" : "bg-white"
              }`}
            ></span>
            <span>설문 내용</span>
          </button>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeSection === "ending" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("ending")}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeSection === "ending" ? "bg-black" : "bg-white"
              }`}
            ></span>
            <span>설문 마무리</span>
          </button>
        </div>
        {isNewForm ? null : (
          <button
            type="button"
            aria-label="save-button"
            className="bg-green-500 text-white px-2 py-1 rounded-md"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSave} className="text-xl" />
          </button>
        )}
        <button
          type="button"
          onClick={deleteSurvey}
          className="bg-red-500 text-white px-2 py-1 rounded-md"
          aria-label="trash-button"
        >
          <FontAwesomeIcon icon={faTrash} className="text-xl" />
        </button>
      </div>
    </section>
  );
}

export default FormEditorHeader;
