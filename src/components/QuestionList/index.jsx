import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import QuestionTitle from "../QuestionTitle";
import QuestionOptions from "../QuestionOptions";
import QuestionControls from "../QuestionControls";
import useFormEditorStore from "../../store/useFormEditorStore";
import AddQuestionPopup from "../AddQuestionPopup";

function QuestionList({ setSelectedQuestionId }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);

  const { questions, setQuestions } = useFormEditorStore();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const menuButton = document.getElementById("menuButton");

      const offsetTop = container.scrollTop;
      const containerHeight = container.scrollHeight;
      const menuButtonHeight = menuButton.offsetHeight;

      let newTop;

      if (offsetTop < 0) {
        newTop = 0;
      } else if (offsetTop + menuButtonHeight > containerHeight) {
        newTop = containerHeight - menuButtonHeight;
      } else {
        newTop = offsetTop;
      }

      setTimeout(() => {
        menuButton.style.top = `${newTop}px`;
      }, 70);
    };

    const handleResize = () => {
      handleScroll();
    };

    const container = containerRef.current;

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
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
      const newOptionId = uuidv4();

      const newQuestions = questions.map((question) => {
        if (question.questionId === questionId) {
          const newOptions = question.options.map((option) => {
            if (option.optionId === optionId) {
              return { ...option, image: file, optionId: newOptionId };
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

  function handleOptionOrderChange(questionId, optionId, direction) {
    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        const optionIndex = question.options.findIndex(
          (opt) => opt.optionId === optionId,
        );

        if (optionIndex === -1) return question;

        const newOptions = [...question.options];

        if (direction === "up" && optionIndex > 0) {
          const temp = newOptions[optionIndex - 1];
          newOptions[optionIndex - 1] = newOptions[optionIndex];
          newOptions[optionIndex] = temp;
        } else if (
          direction === "down" &&
          optionIndex < newOptions.length - 1
        ) {
          const temp = newOptions[optionIndex + 1];
          newOptions[optionIndex + 1] = newOptions[optionIndex];
          newOptions[optionIndex] = temp;
        }

        return { ...question, options: newOptions };
      }

      return question;
    });

    setQuestions(newQuestions);
  }

  return (
    <div
      ref={containerRef}
      className="relative max-h-[85vh] overflow-auto container"
    >
      <div
        id="menuButton"
        className="absolute mt-5 md:right-10 z-10"
        style={{ opacity: showAddQuestionPopup ? 0 : 1 }}
      >
        <button
          type="button"
          className="bg-gray-300 text-[#4E5968] px-2 py-2.5 rounded-md hover:bg-gray-200"
          onClick={handleAddQuestionPopup}
          aria-label="Question Button"
        >
          질문<br></br>추가
          <br />
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="text-xl ml-0.5 mt-1"
          />
        </button>
      </div>
      {questions.map((question) => (
        <div
          key={question.questionId}
          className="cursor-pointer bg-white p-4 rounded-xl border-2 hover:border-blue-700 hover:shadow-outline transition-transform transform mb-4 max-w-[67%] mx-auto"
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
          <QuestionTitle
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
            handleOptionOrderChange={handleOptionOrderChange}
            errorMessage={errorMessage}
          />
        </div>
      ))}
      {showAddQuestionPopup && (
        <AddQuestionPopup
          handleAddQuestion={handleAddQuestion}
          handleClosePopup={() => setShowAddQuestionPopup(false)}
        />
      )}
    </div>
  );
}

export default QuestionList;
