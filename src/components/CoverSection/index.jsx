import ResponseCustomButton from "../ResponseCustomButton";

function CoverSection({ surveyData, onStartButtonClick }) {
  const {
    title,
    subtitle,
    coverImage,
    startButtonText,
    themeColor,
    buttonShape,
  } = surveyData;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-xl">{title}</h1>
      <h3 className="text-center">{subtitle}</h3>
      {coverImage && coverImage.imageUrl && (
        <img
          src={
            typeof coverImage.imageUrl === "string"
              ? coverImage.imageUrl
              : URL.createObjectURL(coverImage.imageUrl)
          }
          alt="Cover"
          className="max-w- mt-7"
        />
      )}
      <ResponseCustomButton
        themeColor={themeColor}
        buttonShape={buttonShape}
        text={startButtonText}
        onClick={onStartButtonClick}
      />
    </div>
  );
}

export default CoverSection;
