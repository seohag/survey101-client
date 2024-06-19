import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useState, useRef } from "react";

import QuestionTitle from "../QuestionTitle";
import QuestionOptions from "../QuestionOptions";
import QuestionControls from "../QuestionControls";
import useFormEditorStore from "../../store/useFormEditorStore";
import AddQuestionPopup from "../AddQuestionPopup";
import QuestionAddButton from "../QuestionAddButton";
import ScrollHandler from "../ScrollHandler";

import {
  handleAddQuestion,
  handleDeleteQuestion,
  handleAddTextOption,
  handleAddImageOption,
  handleDeleteOption,
  handleQuestionTextChange,
  handleQuestionOptionChange,
  handleImageChange,
  handleArrowButtonClick,
  handleOptionOrderChange,
} from "../../utils/questionUtils";

function QuestionList({ setSelectedQuestionId }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);

  const { questions, setQuestions } = useFormEditorStore();
  const containerRef = useRef(null);

  function handleAddQuestionPopup() {
    setShowAddQuestionPopup(true);
  }

  return (
    <div
      ref={containerRef}
      className="relative max-h-[85vh] overflow-auto container lg:mt-0 md:mt-0 xs:-mt-14 scrollbar-hide"
    >
      <ScrollHandler containerRef={containerRef} />
      <QuestionAddButton
        showAddQuestionPopup={showAddQuestionPopup}
        handleAddQuestionPopup={handleAddQuestionPopup}
      />
      {questions.map((question) => (
        <div
          key={question.questionId}
          className="cursor-pointer bg-white p-4 rounded-xl border-2 hover:border-blue-700 hover:shadow-outline transition-transform transform mb-4 lg:max-w-[75%] xs:max-w-[90%] xs:ml-20 sm:ml-[104px] mx-auto "
          onClick={() => setSelectedQuestionId(question.questionId)}
          role="presentation"
        >
          <h3 className="text-lg font-bold mb-2 text-center relative">
            질문
            {questions.findIndex((q) => q.questionId === question.questionId) +
              1}
            <button
              type="button"
              onClick={() =>
                handleDeleteQuestion(
                  question.questionId,
                  questions,
                  setQuestions,
                )
              }
              className="bg-red-500 text-white px-2 sm:px-1 xs:px-0.5 py-0.5 rounded ml-2 text-end absolute right-0"
              aria-label="trash-button"
            >
              <FontAwesomeIcon icon={faTrash} className="text-xl" />
            </button>
          </h3>
          <QuestionControls
            questionId={question.questionId}
            handleArrowButtonClick={(questionId, direction) =>
              handleArrowButtonClick(
                questionId,
                direction,
                questions,
                setQuestions,
              )
            }
          />
          <QuestionTitle
            question={question}
            handleQuestionTextChange={(questionId, newText) =>
              handleQuestionTextChange(
                questionId,
                newText,
                questions,
                setQuestions,
              )
            }
          />
          <QuestionOptions
            question={question}
            handleAddTextOption={(questionId) =>
              handleAddTextOption(questionId, questions, setQuestions)
            }
            handleAddImageOption={(questionId) =>
              handleAddImageOption(questionId, questions, setQuestions)
            }
            handleImageChange={(event, questionId, optionId) =>
              handleImageChange(
                event,
                questionId,
                optionId,
                questions,
                setQuestions,
                setErrorMessage,
              )
            }
            handleQuestionOptionChange={(questionId, optionId, newOption) =>
              handleQuestionOptionChange(
                questionId,
                optionId,
                newOption,
                questions,
                setQuestions,
              )
            }
            handleDeleteOption={(questionId, optionId) =>
              handleDeleteOption(questionId, optionId, questions, setQuestions)
            }
            handleOptionOrderChange={(questionId, optionId, direction) =>
              handleOptionOrderChange(
                questionId,
                optionId,
                direction,
                questions,
                setQuestions,
              )
            }
            errorMessage={errorMessage}
          />
        </div>
      ))}
      {showAddQuestionPopup && (
        <AddQuestionPopup
          handleAddQuestion={(questionType) =>
            handleAddQuestion(questionType, questions, setQuestions)
          }
          handleClosePopup={() => setShowAddQuestionPopup(false)}
        />
      )}
    </div>
  );
}

export default QuestionList;
