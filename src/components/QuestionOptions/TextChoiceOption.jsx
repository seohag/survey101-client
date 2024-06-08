import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

function TextChoiceOption({
  question,
  option,
  handleQuestionOptionChange,
  handleDeleteOption,
  handleOptionOrderChange,
}) {
  const optionIndex = question.options.findIndex(
    (opt) => opt.optionId === option.optionId,
  );

  return (
    <div key={option.optionId} className="flex items-center mb-2">
      <div className="flex flex-col mr-2">
        <button
          onClick={() =>
            handleOptionOrderChange(question.questionId, option.optionId, "up")
          }
          disabled={optionIndex === 0}
          aria-label="arrow-up"
        >
          <FontAwesomeIcon icon={faArrowCircleUp} className="text-xl" />
        </button>
        <button
          onClick={() =>
            handleOptionOrderChange(
              question.questionId,
              option.optionId,
              "down",
            )
          }
          disabled={optionIndex === question.options.length - 1}
          aria-label="arrow-down"
        >
          <FontAwesomeIcon icon={faArrowCircleDown} className="text-xl" />
        </button>
      </div>
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
          className="bg-red-500 text-white px-1 rounded ml-1"
        >
          X
        </button>
      )}
    </div>
  );
}

export default TextChoiceOption;
