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
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100 p-4">
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
  );
}

export default ResponsePage;
