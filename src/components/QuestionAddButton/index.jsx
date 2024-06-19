import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function QuestionAddButton({ showAddQuestionPopup, handleAddQuestionPopup }) {
  return (
    <div
      id="questionAddButton"
      className="absolute xl:right-6 z-10"
      style={{ opacity: showAddQuestionPopup ? 0 : 1 }}
    >
      <button
        type="button"
        className="mt-2 bg-gray-300 text-[#4E5968] px-2 py-2.5 rounded-md hover:bg-gray-200"
        onClick={handleAddQuestionPopup}
        aria-label="Question Button"
      >
        질문<br></br>추가
        <br />
        <FontAwesomeIcon icon={faPlusCircle} className="text-xl ml-0.5 mt-1" />
      </button>
    </div>
  );
}

export default QuestionAddButton;
