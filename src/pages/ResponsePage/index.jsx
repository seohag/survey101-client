import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetSurvey from "../../apis/useGetSurvey";
import Loading from "../../components/shared/Loading";

import CoverSection from "../../components/CoverSection";
import QuestionSection from "../../components/QuestionSection";

function ResponsePage() {
  const { surveyId } = useParams();
  const { surveyData, isLoading } = useGetSurvey(surveyId);
  const [showQuestionSection, setShowQuestionSection] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  function handleStartButtonClick() {
    setShowQuestionSection(true);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg h-screen min-w-96 flex flex-col justify-center items-center text-center overflow-auto">
      <div className="bg-white shadow-lg rounded-lg h-screen min-w-96 flex flex-col justify-center items-center overflow-auto">
        {showQuestionSection ? (
          <QuestionSection
            surveyData={surveyData}
            surveyAnswers={surveyAnswers}
            setSurveyAnswers={setSurveyAnswers}
          />
        ) : (
          <CoverSection
            surveyData={surveyData}
            onStartButtonClick={handleStartButtonClick}
          />
        )}
      </div>
    </div>
  );
}

export default ResponsePage;
