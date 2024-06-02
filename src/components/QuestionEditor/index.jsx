import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import QuestionPreview from "../QuestionPreview";
import QuestionList from "../QuestionList";
import AddQuestionPopup from "../AddQuestionPopup";
import useFormEditorStore from "../../store/useFormEditorStore";

function QuestionEditor() {
  const { setQuestions, questions } = useFormEditorStore();
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
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
    <div className="flex flex-col md:flex-row">
      <section className="md:w-2/5 p-4">
        {!isMobile && (
          <QuestionPreview selectedQuestionId={selectedQuestionId} />
        )}
      </section>
      <section className="md:w-3/5 p-4">
        <QuestionList
          handleAddQuestionPopup={handleAddQuestionPopup}
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
