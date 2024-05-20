import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Question from "../Question";
import QuestionOptions from "../QuestionOptions";
import QuestionControls from "../QuestionControls";

function QuestionList({ questions, setQuestions, setSelectedQuestionId }) {
  const [errorMessage, setErrorMessage] = useState("");
  console.log(questions);
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
          options: [...question.options, { optionId: uuidv4(), text: "" }],
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
          options: [...question.options, { optionId: uuidv4(), image: null }],
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
          options: question.options.filter(
            (option) => option.optionId !== optionId,
          ),
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
            option.optionId === optionId
              ? { ...option, text: newOption }
              : option,
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

    reader.onload = () => {
      const newQuestions = questions.map((question) => {
        if (question.questionId === questionId) {
          const newOptions = question.options.map((option) => {
            if (option.optionId === optionId) {
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
      (question) => question.questionId === questionId,
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
    <div style={{ maxHeight: "500px" }}>
      {questions.map((question) => (
        <div
          key={question.questionId}
          className="cursor-pointer bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-95"
          onClick={() => setSelectedQuestionId(question.questionId)}
          role="presentation"
        >
          <h3 className="text-lg font-bold mb-2 text-center relative">
            질문
            {questions.findIndex((q) => q.questionId === question.questionId) +
              1}
            <button
              type="button"
              onClick={() => handleDeleteQuestion(question.questionId)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-2 text-end absolute right-0"
              aria-label="trash-button"
            >
              <FontAwesomeIcon icon={faTrash} className="text-xl" />
            </button>
          </h3>
          <QuestionControls
            questionId={question.questionId}
            handleArrowButtonClick={handleArrowButtonClick}
          />
          <Question
            question={question}
            handleQuestionTextChange={handleQuestionTextChange}
          />
          <QuestionOptions
            question={question}
            handleAddTextOption={handleAddTextOption}
            handleAddImageOption={handleAddImageOption}
            handleImageChange={handleImageChange}
            handleQuestionOptionChange={handleQuestionOptionChange}
            handleDeleteOption={handleDeleteOption}
            errorMessage={errorMessage}
          />
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
