import { useEffect } from "react";
import { useParams } from "react-router-dom";

import FormEditorHeader from "../../components/Header";
import CoverEditor from "../../components/CoverEditor";
import StyleEditor from "../../components/StyleEditor";
import QuestionEditor from "../../components/QuestionEditor";
import EndingEditor from "../../components/EndingEditor";

import useFormEditorStore from "../../store/useFormEditorStore";
import useGetSurvey from "../../apis/useGetSurvey";

import Loading from "../../components/shared/Loading";

import { formatSurveyData } from "../../utils/utils";

function SurveyEditorPage() {
  const { surveyId } = useParams();
  const {
    activeSection,
    setActiveSection,
    setCoverData,
    setStyleData,
    setEndingData,
    setQuestions,
  } = useFormEditorStore();
  const { surveyData, isLoading } = useGetSurvey(surveyId);
  const formattedSurveyData = formatSurveyData(surveyData);
  const { coverData, styleData, endingData, questions } = formattedSurveyData;

  useEffect(() => {
    if (!isLoading && surveyData) {
      setCoverData(coverData);
      setStyleData(styleData);
      setEndingData(endingData);
      setQuestions(questions);
    }
  }, [surveyData, isLoading]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function handleSectionChange(section) {
    setActiveSection(section);
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "cover":
        return <CoverEditor />;
      case "style":
        return <StyleEditor />;
      case "question":
        return <QuestionEditor />;
      case "ending":
        return <EndingEditor />;
      default:
        return null;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FormEditorHeader
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isNewForm={false}
      />
      <div className="mt-7">{renderActiveSection()}</div>
    </>
  );
}

export default SurveyEditorPage;
