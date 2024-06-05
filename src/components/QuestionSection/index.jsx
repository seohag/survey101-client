import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../CustomButton";
import EndingSection from "../EndingSection";


function QuestionSection({ surveyData, surveyAnswers, setSurveyAnswers }) {
  const { themeColor, buttonShape, questions } = surveyData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [animationOption, setAnimationOption] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPrevAnimating, setIsPrevAnimating] = useState(false);

  useEffect(() => {
    switch (surveyData.animation) {
      case "fade":
        setAnimationOption("fade");
        break;
      case "slide":
        setAnimationOption("slide");
        break;
      case "zoom":
        setAnimationOption("zoom");
        break;
      default:
        setAnimationOption("");
        break;
    }
  }, [animationOption]);

  const totalQuestions = questions.length;
  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100,
  );

  function handleAnswer(answer) {
    setSurveyAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.questionId]: answer,
    }));

    handleNextQuestion();
  }

  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setIsPrevAnimating(true);
      setIsAnimating(false);

      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
      setIsAnimating(true);
      setIsPrevAnimating(false);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(totalQuestions);
    }
  }

  function handleMouseEnter(rating) {
    setHoveredRating(rating);
  }

  function handleMouseLeave() {
    setHoveredRating(null);
  }

  function handleRatingClick(rating) {
    setSelectedRating(rating);
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestionIndex < totalQuestions ? (
        <div
          className={`w-full max-w-md ${
            animationOption === "slide" && isAnimating ? "animate-slide-in" : ""
          } ${
            animationOption === "fade" && isAnimating ? "animate-fade-in" : ""
          } ${
            animationOption === "zoom" && isAnimating ? "animate-zoom-in" : ""
          } ${
            animationOption === "slide" && isPrevAnimating
              ? "animate-slide-out"
              : ""
          } ${
            animationOption === "fade" && isPrevAnimating
              ? "animate-fade-out"
              : ""
          } ${
            animationOption === "zoom" && isPrevAnimating
              ? "animate-zoom-out"
              : ""
          }`}
          onAnimationEnd={() => {
            setIsAnimating(false);
            setIsPrevAnimating(false);
          }}
        >
          <div className="flex flex-col bg-gray-200 p-4 border items-center rounded min-h-screen min-w-screen">
            <div className="relative mb-4 w-full h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div className="absolute inset-0 flex justify-center items-center text-white font-bold">
                {progressPercent}%
              </div>
            </div>
            <div className="flex justify-between items-center w-full mb-4">
              {currentQuestionIndex > 0 && (
                <button
                  type="button"
                  aria-label="Question Prev Button"
                  onClick={() => {
                    setIsPrevAnimating(true);
                    handlePreviousQuestion();
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="text-l" />
                </button>
              )}
            </div>
            <h3
              className="text-l font-bold text-center"
              style={{ color: themeColor }}
            >
              {currentQuestion.questionText}
            </h3>
            {currentQuestion.questionType === "textChoice" && (
              <div className="mt-4 flex flex-col items-center">
                {currentQuestion.options.map((option) => (
                  <CustomButton
                    key={option.optionId}
                    text={option.text}
                    themeColor={themeColor}
                    buttonShape={buttonShape}
                    onClick={() => handleAnswer(option.text)}
                  />
                ))}
              </div>
            )}
            {currentQuestion.questionType === "imageChoice" && (
              <div className="mt-4 flex flex-wrap justify-center">
                {currentQuestion.options.map((option, index) => (
                  <div className="m-2" key={option.optionId}>
                    <button
                      onClick={() => handleAnswer(`${index + 1}번째 이미지`)}
                    >
                      {option.image && (
                        <img
                          src={
                            typeof option.image.imageUrl === "string"
                              ? option.image.imageUrl
                              : null
                          }
                          alt={`${option.optionId}`}
                          className="w-24 h-24 m-1 object-cover"
                        />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
            {currentQuestion.questionType === "textInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="텍스트를 입력해주세요"
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
            {currentQuestion.questionType === "emailInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="email@example.org"
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
            {currentQuestion.questionType === "phoneInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="010-0000-0000"
                  maxLength="14"
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
            {currentQuestion.questionType === "numberInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="숫자를 입력해주세요"
                  min={0}
                  max={100000}
                  maxLength={100000}
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
            {currentQuestion.questionType === "dateInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="날짜를 입력해주세요"
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
            {currentQuestion.questionType === "timeInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="시간을 입력해주세요"
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
            {currentQuestion.questionType === "rangeInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="range"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(event) =>
                    setSurveyAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.questionId]: event.target.value,
                    }))
                  }
                />
                <div className="mt-4">
                  <CustomButton
                    text="다음"
                    themeColor={themeColor}
                    buttonShape={buttonShape}
                    onClick={handleNextQuestion}
                  />
                </div>
              </div>
            )}
            {currentQuestion.questionType === "radioInput" && (
              <div className="mt-4 flex flex-col">
                <div className="flex justify-center items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div
                      key={rating}
                      className="mr-2"
                      onMouseEnter={() => handleMouseEnter(rating)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <input
                        type="radio"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={() => {
                          handleRatingClick(rating);
                          handleAnswer(rating.toString());
                        }}
                        id={`rating-${rating}`}
                        className="hidden"
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className={`text-3xl cursor-pointer text-gray-300 ${
                          (hoveredRating !== null && rating <= hoveredRating) ||
                          (selectedRating !== null && rating <= selectedRating)
                            ? "text-yellow-500"
                            : ""
                        }`}
                        style={{ transition: "color 0.3s" }}
                      >
                        ★
                      </label>
                    </div>
                  ))}
                </div>
                <CustomButton
                  text="다음"
                  themeColor={themeColor}
                  buttonShape={buttonShape}
                  onClick={handleNextQuestion}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <EndingSection surveyAnswers={surveyAnswers} surveyData={surveyData} />
      )}
    </div>
  );
}

export default QuestionSection;
