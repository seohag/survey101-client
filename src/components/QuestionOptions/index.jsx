import TextChoiceOption from "./TextChoiceOption";
import ImageChoiceOption from "./ImageChoiceOption";
import RadioInput from "./RadioInput";
import ReadOnlyInput from "./ReadOnlyInput";

function QuestionOptions({
  question,
  handleAddTextOption,
  handleAddImageOption,
  handleDeleteOption,
  handleQuestionOptionChange,
  handleImageChange,
  handleOptionOrderChange,
  errorMessage,
}) {
  return (
    <div>
      {question.questionType === "textChoice" && (
        <div>
          {question.options.map((option) => (
            <TextChoiceOption
              key={option.optionId}
              question={question}
              option={option}
              handleQuestionOptionChange={handleQuestionOptionChange}
              handleDeleteOption={handleDeleteOption}
              handleOptionOrderChange={handleOptionOrderChange}
            />
          ))}
          <div className="w-full text-center">
            <button
              onClick={() => {
                handleAddTextOption(question.questionId);
              }}
              className="bg-gray-300 text-[#4E5968] px-4 py-2 rounded-md hover:bg-gray-200"
            >
              옵션 추가
            </button>
          </div>
        </div>
      )}
      {question.questionType === "imageChoice" && (
        <div className="flex flex-wrap justify-center">
          {question.options.map((option) => (
            <ImageChoiceOption
              key={option.optionId}
              question={question}
              option={option}
              handleImageChange={handleImageChange}
              handleOptionOrderChange={handleOptionOrderChange}
              handleDeleteOption={handleDeleteOption}
            />
          ))}
          <div className="w-full text-center">
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            <button
              onClick={() => handleAddImageOption(question.questionId)}
              className="bg-gray-300 text-[#4E5968] px-4 py-2 rounded-md hover:bg-gray-200"
            >
              이미지 옵션 추가
            </button>
          </div>
        </div>
      )}
      {question.questionType === "textInput" && (
        <ReadOnlyInput type="text" placeholder="텍스트만 입력 가능합니다" />
      )}
      {question.questionType === "emailInput" && (
        <ReadOnlyInput type="email" placeholder="이메일만 입력 가능합니다" />
      )}
      {question.questionType === "phoneInput" && (
        <ReadOnlyInput type="tel" placeholder="전화번호만 입력 가능합니다" />
      )}
      {question.questionType === "dateInput" && <ReadOnlyInput type="date" />}
      {question.questionType === "timeInput" && <ReadOnlyInput type="time" />}
      {question.questionType === "numberInput" && (
        <ReadOnlyInput type="number" placeholder="숫자만 입력 가능합니다" />
      )}
      {question.questionType === "rangeInput" && <ReadOnlyInput type="range" />}
      {question.questionType === "radioInput" && (
        <RadioInput question={question} />
      )}
    </div>
  );
}

export default QuestionOptions;
