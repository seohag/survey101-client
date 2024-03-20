import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import QuestionPreview from "../QuestionPreview";
import AddQuestionPopup from "../../services/AddQuestionPopup";

function QuestionEditor({ questions, setQuestions, styleData }) {
  const [errorMessage, setErrorMessage] = useState("");
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

  function handleDeleteQuestion(questionId) {
    if (questions.length <= 1) {
      return;
    }

    const newQuestions = questions.filter(
      (question) => question.questionId !== questionId,
    );
    setQuestions(newQuestions);
  }

  function handleAddTextOption(questionId) {
    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        return {
          ...question,
          options: [...question.options, { id: uuidv4(), text: "" }],
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  }

  function handleAddImageOption(questionId) {
    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        return {
          ...question,
          options: [...question.options, { id: uuidv4(), image: null }],
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  }

  function handleDeleteOption(questionId, optionId) {
    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId && question.options.length > 1) {
        return {
          ...question,
          options: question.options.filter((option) => option.id !== optionId),
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  }

  function handleQuestionTextChange(questionId, newText) {
    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        return {
          ...question,
          questionText: newText,
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  }

  function handleQuestionOptionChange(questionId, optionId, newOption) {
    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        return {
          ...question,
          options: question.options.map((option) =>
            option.id === optionId ? { ...option, text: newOption } : option,
          ),
        };
      }
      return question;
    });

    setQuestions(newQuestions);
  }

  function handleImageChange(event, questionId, optionId) {
    const file = event.target.files[0];
    if (!file) return;

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("지원되는 이미지 형식은 JPEG, PNG, JPG 입니다.");
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage("파일 크기는 5MB 이하로 제한됩니다.");
        return;
      }
    }

    const reader = new FileReader();

    reader.onload = (ev) => {
      const imageUrl = ev.target.result;

      const newQuestions = questions.map((question) => {
        if (question.questionId === questionId) {
          const newOptions = question.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, image: file };
            }
            return option;
          });
          return { ...question, options: newOptions };
        }
        return question;
      });
      setQuestions(newQuestions);
    };

    setErrorMessage("");

    reader.readAsDataURL(file);
  }

  function handleArrowButtonClick(questionId, direction) {
    const currentQuestionIndex = questions.findIndex(
      (q) => q.questionId === questionId,
    );

    if (direction === "up") {
      if (currentQuestionIndex === 0) return;

      const newQuestions = [...questions];
      const previousQuestionIndex = currentQuestionIndex - 1;
      [
        newQuestions[currentQuestionIndex],
        newQuestions[previousQuestionIndex],
      ] = [
        newQuestions[previousQuestionIndex],
        newQuestions[currentQuestionIndex],
      ];
      setQuestions(newQuestions);
    } else if (direction === "down") {
      if (currentQuestionIndex === questions.length - 1) return;

      const newQuestions = [...questions];
      const nextQuestionIndex = currentQuestionIndex + 1;
      [newQuestions[currentQuestionIndex], newQuestions[nextQuestionIndex]] = [
        newQuestions[nextQuestionIndex],
        newQuestions[currentQuestionIndex],
      ];
      setQuestions(newQuestions);
    }
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
        <div style={{ maxHeight: "500px" }}>
          {questions.map((question) => (
            <div
              key={question.questionId}
              className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center"
              onClick={() => setSelectedQuestionId(question.questionId)}
              role="presentation"
            >
              <h3 className="text-lg font-bold mb-2 text-center relative">
                질문
                {questions.findIndex(
                  (q) => q.questionId === question.questionId,
                ) + 1}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.questionId)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2 text-end absolute right-0"
                  aria-label="trash-button"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xl" />
                </button>
              </h3>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="mr-2"
                  onClick={() =>
                    handleArrowButtonClick(question.questionId, "up")
                  }
                  aria-label="arrow-up"
                >
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-xl mt-7 px-2"
                  />
                </button>

                <button
                  type="button"
                  className="ml-2"
                  onClick={() =>
                    handleArrowButtonClick(question.questionId, "down")
                  }
                  aria-label="arrow-down"
                >
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-xl mt-3 py-7"
                  />
                </button>
              </div>
              <div className="mb-4">
                <label
                  htmlFor={`questionText-${question.questionId}`}
                  className="block mb-2"
                >
                  <input
                    type="text"
                    id={`questionText-${question.questionId}`}
                    value={question.questionText}
                    onChange={(event) =>
                      handleQuestionTextChange(
                        question.questionId,
                        event.target.value,
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="질문을 입력해주세요"
                  />
                </label>
              </div>

              {question.questionType === "textChoice" && (
                <div>
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        type="text"
                        onChange={(event) => {
                          handleQuestionOptionChange(
                            question.questionId,
                            option.id,
                            event.target.value,
                          );
                        }}
                        className="w-full p-2 border border-gray-300 rounded mr-2"
                        placeholder="옵션을 입력해주세요"
                      />
                      {question.options.length > 1 && (
                        <button
                          onClick={() =>
                            handleDeleteOption(question.questionId, option.id)
                          }
                          className="bg-red-500 text-white px-1 rounded"
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="w-full text-center">
                    <button
                      onClick={() => {
                        handleAddTextOption(question.questionId);
                      }}
                      className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                      옵션 추가
                    </button>
                  </div>
                </div>
              )}

              {question.questionType === "imageChoice" && (
                <div className="flex flex-wrap justify-center">
                  {question.options.map((option) => (
                    <div key={option.id} className="mb-4 mx-2 relative">
                      <label
                        htmlFor={`image-upload-${question.questionId}-${option.id}`}
                        className="block cursor-pointer"
                      >
                        <div className="w-24 h-24 border border-gray-300 rounded flex justify-center items-center">
                          {option.image ? (
                            <img
                              src={URL.createObjectURL(option.image)}
                              alt={`Option ${option.id}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>이미지 선택</span>
                          )}
                        </div>
                        <input
                          type="file"
                          id={`image-upload-${question.questionId}-${option.id}`}
                          onChange={(event) =>
                            handleImageChange(
                              event,
                              question.questionId,
                              option.id,
                            )
                          }
                          className="hidden"
                        />
                      </label>
                      {question.options.length > 1 && (
                        <button
                          onClick={() =>
                            handleDeleteOption(question.questionId, option.id)
                          }
                          className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="w-full text-center">
                    {errorMessage && (
                      <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}
                    <button
                      onClick={() => {
                        handleAddImageOption(question.questionId);
                      }}
                      className="bg-gray-300 text-black px-4 py-2 rounded mt-2"
                    >
                      이미지 옵션 추가
                    </button>
                  </div>
                </div>
              )}

              {question.questionType === "textInput" && (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="텍스트를 입력해주세요"
                />
              )}
              {question.questionType === "emailInput" && (
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="이메일만 입력 가능합니다"
                />
              )}
              {question.questionType === "phoneInput" && (
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="전화번호만 입력 가능합니다"
                />
              )}
              {question.questionType === "dateInput" && (
                <input
                  type="date"
                  value={question.answer}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
              {question.questionType === "timeInput" && (
                <input
                  type="time"
                  value={question.answer}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
              {question.questionType === "numberInput" && (
                <input
                  type="number"
                  value={question.answer}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="숫자만 입력 가능합니다"
                />
              )}
              {question.questionType === "rangeInput" && (
                <input
                  type="range"
                  value={question.answer}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}

              {question.questionType === "radioInput" && (
                <div className="flex items-center justify-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="inline-block mr-2">
                      <input
                        type="radio"
                        value={rating}
                        checked={question.answer === rating}
                        className="hidden"
                      />
                      <span
                        className={`text-3xl ${rating <= question.answer ? "text-yellow-500" : "text-gray-300"} cursor-pointer`}
                      >
                        ★
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {question.questionType === "selectInput" && (
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option value="">옵션을 선택해주세요</option>
                  <option value="whale">고래</option>
                  <option value="dog">개</option>
                  <option value="cat">고양이</option>
                  <option value="giraffe">기린</option>
                  <option value="tiger">호랑이</option>
                  <option value="lion">사자</option>
                </select>
              )}
            </div>
          ))}
        </div>
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
