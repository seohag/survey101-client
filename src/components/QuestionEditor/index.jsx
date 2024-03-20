import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import QuestionPreview from "../QuestionPreview";
import QuestionList from "../QuestionList";
import AddQuestionPopup from "../../services/AddQuestionPopup";

function QuestionEditor({ questions, setQuestions, styleData }) {
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
          options: [],
        };
        break;
      case "imageChoice":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "imageChoice",
          questionText: "",
          options: [],
        };
        break;
      case "textInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "textInput",
          questionText: "",
          answer: "",
        };
        break;
      case "emailInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "emailInput",
          questionText: "",
          answer: "",
        };
        break;
      case "phoneInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "phoneInput",
          questionText: "",
          answer: "",
        };
        break;
      case "dateInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "dateInput",
          questionText: "",
          answer: "",
        };
        break;
      case "timeInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "timeInput",
          questionText: "",
          answer: "",
        };
        break;
      case "numberInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "numberInput",
          questionText: "",
          answer: "",
        };
        break;
      case "rangeInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "rangeInput",
          questionText: "",
          answer: "",
        };
        break;
      case "radioInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "radioInput",
          questionText: "",
          answer: "",
        };
        break;
      case "selectInput":
        newQuestion = {
          questionId: newQuestionId,
          questionType: "selectInput",
          questionText: "",
          answer: "",
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
        <QuestionPreview
          questions={questions}
          styleData={styleData}
          selectedQuestionId={selectedQuestionId}
        />
      </section>

      <section className="w-3/5 p-4 overflow-auto">
        <div className="text-center">
          <button
            className="bg-gray-300 px-4 py-2 rounded mb-2"
            onClick={handleAddQuestionPopup}
          >
            질문 추가
          </button>
        </div>
        <QuestionList
          questions={questions}
          setQuestions={setQuestions}
          setSelectedQuestionId={setSelectedQuestionId}
        />
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
