import { useState, useEffect } from "react";

import QuestionPreview from "../QuestionPreview";
import QuestionList from "../QuestionList";

function QuestionEditor() {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <section className="md:w-2/5 p-4">
        {!isMobile && (
          <QuestionPreview
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
          />
        )}
      </section>
      <section className="md:w-3/5 p-4">
        <QuestionList setSelectedQuestionId={setSelectedQuestionId} />
      </section>
    </div>
  );
}

export default QuestionEditor;
