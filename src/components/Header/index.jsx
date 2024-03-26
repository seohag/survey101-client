import { useParams , useNavigate } from "react-router-dom";

import useDeleteSurvey from "../../apis/useDeleteSurvey";

function FormEditorHeader({ activeSection, onSectionChange }) {
  const { surveyId } = useParams();
  const deleteSurvey = useDeleteSurvey(surveyId);
  const navigate = useNavigate();

  function nagivateToDash() {
    navigate("/dash");
  }

  return (
    <section className="bg-purple-800 text-white p-4">
      <div className="flex justify-between items-center">
        <span
          className="text-2xl font-bold"
          onClick={nagivateToDash}
          role="presentation"
        >
          Survey101
        </span>
        <div className="flex items-center space-x-4">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              activeSection === "cover" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("cover")}
          >
            커버
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              activeSection === "style" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("style")}
          >
            스타일
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              activeSection === "question" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("question")}
          >
            설문 내용
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              activeSection === "ending" ? "bg-blue-700" : ""
            }`}
            onClick={() => onSectionChange("ending")}
          >
            엔딩
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={deleteSurvey}
          >
            삭제
          </button>
        </div>
      </div>
    </section>
  );
}

export default FormEditorHeader;
