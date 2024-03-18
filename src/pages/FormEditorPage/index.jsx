import { useState } from "react";

import FormEditorHeader from "../../components/Header";
import CoverEditor from "../../components/CoverEditor";
import StyleEditor from "../../components/StyleEditor";
import QuestionEditor from "../../components/QuestionEditor";

function FormEditorPage() {
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
          <QuestionEditor questions={questions} setQuestions={setQuestions} />
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
