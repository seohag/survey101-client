import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

function QuestionControls({ questionId, handleArrowButtonClick }) {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        className="mr-2"
        onClick={() => handleArrowButtonClick(questionId, "up")}
        aria-label="arrow-up"
      >
        <FontAwesomeIcon icon={faArrowUp} className="text-xl mt-7 mb-7 px-2" />
      </button>
      <button
        type="button"
        className="ml-2"
        onClick={() => handleArrowButtonClick(questionId, "down")}
        aria-label="arrow-down"
      >
        <FontAwesomeIcon
          icon={faArrowDown}
          className="text-xl mt-7 mb-7 px-2"
        />
      </button>
    </div>
  );
}

export default QuestionControls;
