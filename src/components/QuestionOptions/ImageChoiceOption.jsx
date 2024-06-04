import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function ImageChoiceOption({
  question,
  option,
  handleImageChange,
  handleDeleteOption,
}) {
  return (
    <div key={option.optionId} className="mb-4 mx-2 relative">
      <label className="block cursor-pointer">
        <div className="border border-gray-300 rounded flex justify-center items-center lg:w-24 xs:w-20 h-24">
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
          className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
        >
          X
        </button>
      )}
    </div>
  );
}

export default ImageChoiceOption;
