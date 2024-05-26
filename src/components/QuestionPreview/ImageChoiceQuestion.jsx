import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function ImageChoiceQuestion({ options }) {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {options.map((option) => (
        <label key={option.optionId} className="block cursor-pointer">
          <div className="w-24 h-24 border border-gray-300 rounded flex justify-center items-center">
            {option.image ? (
              <img
                src={
                  typeof option.image.imageUrl === "string"
                    ? option.image.imageUrl
                    : URL.createObjectURL(option.image)
                }
                alt={`${option.optionId}`}
                className="w-24 h-24 object-cover"
              />
            ) : (
              <FontAwesomeIcon icon={faCamera} className="text-xl" />
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export default ImageChoiceQuestion;
