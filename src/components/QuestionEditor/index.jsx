import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import QuestionPreview from "../QuestionPreview";
import QuestionList from "../QuestionList";
import AddQuestionPopup from "../AddQuestionPopup";
import useFormEditorStore from "../../store/useFormEditorStore";

function QuestionEditor() {
  const { setQuestions, questions } = useFormEditorStore();
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  function handleAddQuestionPopup() {
    setShowAddQuestionPopup(true);
  }

  function handleAddQuestion(questionType) {
    setShowAddQuestionPopup(false);

    const newQuestionId = uuidv4();
    let newQuestion;

    switch (questionType) {
      case "textChoice":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "textChoice",
          questionText: "",
          options: [{ optionId: uuidv4(), text: "" }],
        };
        break;
      case "imageChoice":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "imageChoice",
          questionText: "",
          options: [{ optionId: uuidv4(), image: null }],
        };
        break;
      case "textInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "textInput",
          questionText: "",
        };
        break;
      case "emailInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "emailInput",
          questionText: "",
        };
        break;
      case "phoneInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "phoneInput",
          questionText: "",
        };
        break;
      case "dateInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "dateInput",
          questionText: "",
        };
        break;
      case "timeInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "timeInput",
          questionText: "",
        };
        break;
      case "numberInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "numberInput",
          questionText: "",
        };
        break;
      case "rangeInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "rangeInput",
          questionText: "",
        };
        break;
      case "radioInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "radioInput",
          questionText: "",
        };
        break;
      default:
        break;
    }

    setQuestions([...questions, newQuestion]);
  }

  return (
    <div className="flex">
      <section className="w-2/5 p-4">
        <QuestionPreview selectedQuestionId={selectedQuestionId} />
      </section>
      <section className="w-3/5 p-4 overflow-auto">
        <div className="text-center">
          <button
            className="bg-gray-300 text-[#4E5968] px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={handleAddQuestionPopup}
          >
            질문 추가
          </button>
        </div>
        <QuestionList setSelectedQuestionId={setSelectedQuestionId} />
      </section>
      {showAddQuestionPopup && (
        <AddQuestionPopup
          handleAddQuestion={handleAddQuestion}
          handleClosePopup={() => setShowAddQuestionPopup(false)}
        />
      )}
    </div>
  );
}

export default QuestionEditor;
