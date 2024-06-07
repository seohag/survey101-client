import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import QuestionHeader from "../shared/QuestionPreviewHeader";

function ImageChoiceQuestion({
  questionIndex,
  questionText,
  options,
  styleData,
}) {
  return (
    <div className="flex flex-col items-center min-w-[23vw]">
      <QuestionHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
      <div className="flex flex-wrap justify-center">
        {options.map((option) => (
          <label key={option.optionId} className="block cursor-pointer m-2">
            <div className="w-24 h-24 border border-gray-300 rounded flex justify-center items-center overflow-hidden">
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
          </label>
        ))}
      </div>
    </div>
  );
}

export default ImageChoiceQuestion;
