import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

function ImageChoiceOption({
  question,
  option,
  handleImageChange,
  handleOptionOrderChange,
  handleDeleteOption,
}) {
  const optionIndex = question.options.findIndex(
    (opt) => opt.optionId === option.optionId,
  );

  return (
    <div key={option.optionId} className="mb-4 mx-2 relative flex items-center">
      <div className="flex flex-col md:hidden mr-3">
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
      <div className="hidden md:flex">
        <button
          onClick={() =>
            handleOptionOrderChange(question.questionId, option.optionId, "up")
          }
          disabled={optionIndex === 0}
          aria-label="arrow-left"
          className="mr-2"
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} className="text-xl" />
        </button>
      </div>
      <div className="relative">
        <label className="block cursor-pointer">
          <div className="border border-gray-300 rounded flex justify-center items-center lg:w-24 xs:w-20 h-24 relative">
            {option.image ? (
              <img
                src={
                  typeof option.image.imageUrl === "string"
                    ? option.image.imageUrl
                    : URL.createObjectURL(option.image)
                }
                alt={`${option.optionId}`}
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
              handleImageChange(event, question.questionId, option.optionId)
            }
            className="hidden"
          />
        </label>
        {question.options.length > 1 && (
          <button
            onClick={() =>
              handleDeleteOption(question.questionId, option.optionId)
            }
            className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded hidden md:block"
          >
            X
          </button>
        )}
      </div>

      <div className="hidden md:flex">
        <button
          onClick={() =>
            handleOptionOrderChange(
              question.questionId,
              option.optionId,
              "down",
            )
          }
          disabled={optionIndex === question.options.length - 1}
          aria-label="arrow-right"
          className="ml-2"
        >
          <FontAwesomeIcon icon={faArrowCircleRight} className="text-xl" />
        </button>
      </div>
      {question.options.length > 1 && (
        <button
          onClick={() =>
            handleDeleteOption(question.questionId, option.optionId)
          }
          className="md:hidden bg-red-500 text-white px-1 rounded ml-2"
        >
          X
        </button>
      )}
    </div>
  );
}

export default ImageChoiceOption;
