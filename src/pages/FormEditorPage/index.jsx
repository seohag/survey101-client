import { useEffect } from "react";

import FormEditorHeader from "../../components/Header";
import CoverEditor from "../../components/CoverEditor";
import StyleEditor from "../../components/StyleEditor";
import QuestionEditor from "../../components/QuestionEditor";
import EndingEditor from "../../components/EndingEditor";

import useFormEditorStore from "../../store/useFormEditorStore";

function FormEditorPage() {
  const { activeSection, setActiveSection, reset } = useFormEditorStore();

  useEffect(() => {
    reset();
  }, []);

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

  return (
    <>
      <FormEditorHeader
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isNewForm
      />
      <div className="lg:mt-20 md:mt-20 sm:mt-28 xs:mt-28 xxs:mt-20">
        {renderActiveSection()}
      </div>
    </>
  );
}

export default FormEditorPage;
