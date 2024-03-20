import { useState, useEffect } from "react";

import FormEditorHeader from "../../components/Header";
import CoverEditor from "../../components/CoverEditor";
import StyleEditor from "../../components/StyleEditor";
import QuestionEditor from "../../components/QuestionEditor";
import EndingEditor from "../../components/EndingEditor";

function FormEditorPage() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [activeSection, setActiveSection] = useState("cover");
  const [coverData, setCoverData] = useState({
    title: "설문지",
    subtitle: "부제목",
    startButtonText: "설문 시작하기",
    coverImage: null,
  });
  const [styleData, setStyleData] = useState({
    themeColor: "#000000",
    buttonShape: "rounded",
    animation: "fade",
  });
  const [endingData, setEndingData] = useState({
    title: "제출 완료",
    content: "결과에 대한 내용을 입력해주세요",
  });
  const [questions, setQuestions] = useState([]);

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
            styleData={styleData}
          />
        );
      default:
        return null;
    }
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

export default FormEditorPage;
