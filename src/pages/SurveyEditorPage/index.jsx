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

  const { surveyData, isLoading } = useGetSurvey(surveyId);

  useEffect(() => {
    if (!isLoading && surveyData) {
      const formattedSurveyData = formatSurveyData(surveyData);
      const { coverData, styleData, endingData, questions } =
        formattedSurveyData;

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

  const {
    activeSection,
    coverData,
    styleData,
    endingData,
    setActiveSection,
    setCoverData,
    setStyleData,
    setEndingData,
    setQuestions,
    questions,
  } = useFormEditorStore();

  function handleSectionChange(section) {
    setActiveSection(section);
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "cover":
        return (
          <CoverEditor
            coverData={coverData}
            styleData={styleData}
            setCoverData={setCoverData}
          />
        );
      case "style":
        return (
          <StyleEditor
            coverData={coverData}
            styleData={styleData}
            setStyleData={setStyleData}
          />
        );
      case "question":
        return (
          <QuestionEditor
            questions={questions}
            setQuestions={setQuestions}
            styleData={styleData}
          />
        );
      case "ending":
        return (
          <EndingEditor
            endingData={endingData}
            setEndingData={setEndingData}
            coverData={coverData}
            styleData={styleData}
            questions={questions}
          />
        );
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
      />
      <div className="mt-7">{renderActiveSection()}</div>
    </>
  );
}

export default SurveyEditorPage;
