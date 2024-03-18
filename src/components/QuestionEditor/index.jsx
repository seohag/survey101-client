import { useState } from "react";

import QuestionPreview from "../QuestionPreview";
import AddQuestionPopup from "../../services/AddQuestionPopup";

function QuestionEditor({ questions, setQuestions }) {
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);

  return (
    <div className="flex">
      <section className="w-2/5 p-4">
        <QuestionPreview />
      </section>

      <section className="w-3/5 p-4 overflow-y-auto max-h-[calc(100vh-100px)] flex justify-center"></section>

      {showAddQuestionPopup && (
        <AddQuestionPopup
          handleClosePopup={() => setShowAddQuestionPopup(false)}
        />
      )}
    </div>
  );
}

export default QuestionEditor;
