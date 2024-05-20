import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function QuestionOptions({
  question,
  handleAddTextOption,
  handleAddImageOption,
  handleDeleteOption,
  handleQuestionOptionChange,
  handleImageChange,
  errorMessage,
}) {
  return (
    <div>
      {question.questionType === "textChoice" && (
        <div>
          {question.options.map((option) => (
            <div key={option.optionId} className="flex items-center mb-2">
              <input
                type="text"
                onChange={(event) => {
                  handleQuestionOptionChange(
                    question.questionId,
                    option.optionId,
                    event.target.value,
                  );
                }}
                value={option.text}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="옵션을 입력해주세요"
              />
              {question.options.length > 1 && (
                <button
                  onClick={() =>
                    handleDeleteOption(question.questionId, option.optionId)
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
            <div key={option.optionId} className="mb-4 mx-2 relative">
              <label
                htmlFor={`image-upload-${question.questionId}-${option.optionId}`}
                className="block cursor-pointer"
              >
                <div className="w-24 h-24 border border-gray-300 rounded flex justify-center items-center">
                  {option.image ? (
                    <img
                      src={
                        typeof option.image.imageUrl === "string"
                          ? option.image.imageUrl
                          : URL.createObjectURL(option.image)
                      }
                      alt={`Option ${option.optionId}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCamera} className="text-xl" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id={`image-upload-${question.questionId}-${option.optionId}`}
                  onChange={(event) =>
                    handleImageChange(
                      event,
                      question.questionId,
                      option.optionId,
                    )
                  }
                  className="hidden"
                />
              </label>
              {question.options.length > 1 && (
                <button
                  onClick={() =>
                    handleDeleteOption(question.questionId, option.optionId)
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
          placeholder="텍스트만 입력 가능합니다"
          readOnly
        />
      )}
      {question.questionType === "emailInput" && (
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="이메일만 입력 가능합니다"
          readOnly
        />
      )}
      {question.questionType === "phoneInput" && (
        <input
          type="tel"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="전화번호만 입력 가능합니다"
          readOnly
        />
      )}
      {question.questionType === "dateInput" && (
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded"
          readOnly
        />
      )}
      {question.questionType === "timeInput" && (
        <input
          type="time"
          className="w-full p-2 border border-gray-300 rounded"
          readOnly
        />
      )}
      {question.questionType === "numberInput" && (
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="숫자만 입력 가능합니다"
          readOnly
        />
      )}
      {question.questionType === "rangeInput" && (
        <input
          type="range"
          className="w-full p-2 border border-gray-300 rounded"
          readOnly
        />
      )}
      {question.questionType === "radioInput" && (
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="inline-block mr-2">
              <input
                type="radio"
                checked={question.answer === rating}
                className="hidden"
                readOnly
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
    </div>
  );
}

export default QuestionOptions;
