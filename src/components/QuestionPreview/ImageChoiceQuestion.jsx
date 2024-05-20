function ImageChoiceQuestion({ options }) {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {options.map((option) => (
        <button key={option.optionId} className="mb-4 mx-2">
          {option.image && (
            <img
              src={
                typeof option.image.imageUrl === "string"
                  ? option.image.imageUrl
                  : URL.createObjectURL(option.image)
              }
              alt={`${option.optionId}`}
              className="w-24 h-24 object-cover"
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default ImageChoiceQuestion;
